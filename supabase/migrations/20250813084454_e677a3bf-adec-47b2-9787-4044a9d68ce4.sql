-- Fix security issue: Set search_path for the function
DROP FUNCTION IF EXISTS public.update_ticket_purchases_updated_at();

CREATE OR REPLACE FUNCTION public.update_ticket_purchases_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;