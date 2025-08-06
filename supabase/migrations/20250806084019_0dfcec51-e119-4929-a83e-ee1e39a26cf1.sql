-- Create storage bucket for payment proofs (skip if exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-proofs', 'payment-proofs', false)
ON CONFLICT (id) DO NOTHING;

-- Create policies for payment proof uploads
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Users can upload payment proofs'
    ) THEN
        CREATE POLICY "Users can upload payment proofs" 
        ON storage.objects 
        FOR INSERT 
        WITH CHECK (bucket_id = 'payment-proofs' AND auth.uid() IS NOT NULL);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Users can view payment proofs'
    ) THEN
        CREATE POLICY "Users can view payment proofs" 
        ON storage.objects 
        FOR SELECT 
        USING (bucket_id = 'payment-proofs' AND auth.uid() IS NOT NULL);
    END IF;
END $$;

-- Add payment_proof_url column to events table (skip if exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'events' 
        AND column_name = 'payment_proof_url'
    ) THEN
        ALTER TABLE public.events ADD COLUMN payment_proof_url TEXT;
    END IF;
END $$;