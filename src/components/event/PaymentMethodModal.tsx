import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentMethodSelect: (method: 'esewa' | 'khalti', proofUrl: string) => void;
}

export const PaymentMethodModal = ({ isOpen, onClose, onPaymentMethodSelect }: PaymentMethodModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'esewa' | 'khalti' | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleMethodSelect = (method: 'esewa' | 'khalti') => {
    setSelectedMethod(method);
    setShowQR(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  const handlePaymentProofUpload = async () => {
    if (!selectedMethod || !paymentProof) return;

    setIsUploading(true);
    try {
      const fileExt = paymentProof.name.split('.').pop();
      const fileName = `payment-proof-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, paymentProof);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(data.path);

      onPaymentMethodSelect(selectedMethod, publicUrl);
      resetModal();
      onClose();
      
      toast({
        title: "Payment proof uploaded successfully!",
        description: "Your payment is being reviewed and your event will be featured soon.",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetModal = () => {
    setShowQR(false);
    setSelectedMethod(null);
    setPaymentProof(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
        </DialogHeader>

        {!showQR ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-center">
              Select your preferred payment method to feature your event
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => handleMethodSelect('esewa')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">e</span>
                  </div>
                  <h3 className="font-semibold">eSewa</h3>
                  <p className="text-sm text-muted-foreground">Digital Wallet</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => handleMethodSelect('khalti')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">K</span>
                  </div>
                  <h3 className="font-semibold">Khalti</h3>
                  <p className="text-sm text-muted-foreground">Digital Payment</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
              {selectedMethod === 'esewa' ? 'eSewa' : 'Khalti'} Payment
            </h3>
            
            <div className="bg-white p-4 rounded-lg border">
              <img 
                src={selectedMethod === 'esewa' 
                  ? '/lovable-uploads/d96cb2c7-9938-4ab5-b739-fbe2d7fe7519.png' 
                  : '/lovable-uploads/8b17bc99-4a57-4c86-ae4b-2821c2f195eb.png'
                }
                alt={`${selectedMethod} QR Code`}
                className="w-full max-w-64 mx-auto"
              />
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              Scan the QR code above to make payment, then upload your payment screenshot below
            </p>

            <div className="space-y-2">
              <Label htmlFor="payment-proof">Upload Payment Proof *</Label>
              <Input
                id="payment-proof"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
              {paymentProof && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  {paymentProof.name} selected
                </p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetModal} className="flex-1">
                Change Method
              </Button>
              <Button 
                onClick={handlePaymentProofUpload} 
                className="flex-1"
                disabled={!paymentProof || isUploading}
              >
                {isUploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Proof
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};