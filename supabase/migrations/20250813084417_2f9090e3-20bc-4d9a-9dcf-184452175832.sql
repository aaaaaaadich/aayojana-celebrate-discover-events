-- Create table for ticket purchases with attendee information
CREATE TABLE public.ticket_purchases (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid NOT NULL,
  user_id uuid,
  ticket_type_id text NOT NULL,
  ticket_type_name text NOT NULL,
  ticket_price numeric NOT NULL DEFAULT 0,
  quantity integer NOT NULL DEFAULT 1,
  total_amount numeric NOT NULL DEFAULT 0,
  
  -- Attendee information
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  
  -- Payment information
  payment_proof_url text,
  payment_status text NOT NULL DEFAULT 'pending',
  payment_method text,
  
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ticket_purchases ENABLE ROW LEVEL SECURITY;

-- Create policies for ticket purchases
CREATE POLICY "Users can view their own ticket purchases" 
ON public.ticket_purchases 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Anyone can create ticket purchases" 
ON public.ticket_purchases 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own ticket purchases" 
ON public.ticket_purchases 
FOR UPDATE 
USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Create index for better performance
CREATE INDEX idx_ticket_purchases_event_id ON public.ticket_purchases(event_id);
CREATE INDEX idx_ticket_purchases_email ON public.ticket_purchases(email);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_ticket_purchases_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ticket_purchases_updated_at
  BEFORE UPDATE ON public.ticket_purchases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_ticket_purchases_updated_at();