
-- Create storage bucket for QR code images
INSERT INTO storage.buckets (id, name, public)
VALUES ('qr-codes', 'qr-codes', true);

-- Create storage policies for QR code images
CREATE POLICY "Anyone can view QR code images"
ON storage.objects FOR SELECT
USING (bucket_id = 'qr-codes');

CREATE POLICY "Authenticated users can upload QR code images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'qr-codes' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own QR code images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'qr-codes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own QR code images"
ON storage.objects FOR DELETE
USING (bucket_id = 'qr-codes' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add qr_code_image_url column to events table
ALTER TABLE public.events ADD COLUMN qr_code_image_url TEXT;
