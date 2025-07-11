-- Add feature plan fields to events table
ALTER TABLE public.events 
ADD COLUMN is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN plan_type TEXT DEFAULT 'standard' CHECK (plan_type IN ('standard', 'premium')),
ADD COLUMN payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
ADD COLUMN payment_method TEXT DEFAULT NULL CHECK (payment_method IN ('esewa', 'khalti', NULL)),
ADD COLUMN feature_payment_amount NUMERIC DEFAULT NULL;