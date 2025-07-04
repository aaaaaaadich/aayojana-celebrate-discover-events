
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface QRCodeUploadProps {
  onImageUpload: (url: string | null) => void;
  currentImage?: string | null;
}

export const QRCodeUpload = ({ onImageUpload, currentImage }: QRCodeUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const uploadToSupabase = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      setUploading(true);
      
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('qr-codes')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('qr-codes')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Show preview immediately
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      // Upload to Supabase
      const uploadedUrl = await uploadToSupabase(file);
      
      if (uploadedUrl) {
        // Clean up local URL and use uploaded URL
        URL.revokeObjectURL(localUrl);
        setPreviewUrl(uploadedUrl);
        onImageUpload(uploadedUrl);
      } else {
        // Revert preview on upload failure
        setPreviewUrl(currentImage || null);
        URL.revokeObjectURL(localUrl);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeImage = async () => {
    if (previewUrl && previewUrl.includes('supabase')) {
      try {
        // Extract file path from URL
        const url = new URL(previewUrl);
        const path = url.pathname.split('/').slice(-2).join('/');
        
        // Delete from Supabase storage
        await supabase.storage
          .from('qr-codes')
          .remove([path]);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
    
    setPreviewUrl(null);
    onImageUpload(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">
          Payment QR Code Image
        </label>
        <span className="text-xs text-muted-foreground">Optional</span>
      </div>
      
      {previewUrl ? (
        <div className="relative">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-center">
              <img 
                src={previewUrl} 
                alt="QR Code Preview" 
                className="max-w-full max-h-48 rounded-lg"
              />
            </div>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
            disabled={uploading}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver 
              ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-900/10' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Upload QR Code Image</h3>
              <p className="text-xs text-muted-foreground">
                Upload a QR code image for payment processing (PNG, JPG up to 5MB)
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="qr-upload"
                disabled={uploading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('qr-upload')?.click()}
                disabled={uploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Choose File"}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        This QR code will be displayed to attendees for payment processing. 
        Make sure it's clear and scannable.
      </p>
    </div>
  );
};
