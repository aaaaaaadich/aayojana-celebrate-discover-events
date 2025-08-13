-- Fix security issue: Drop trigger and function, then recreate with search_path
DROP TRIGGER IF EXISTS update_ticket_purchases_updated_at ON public.ticket_purchases;
DROP FUNCTION IF EXISTS public.update_ticket_purchases_updated_at();

CREATE OR REPLACE FUNCTION public.update_ticket_purchases_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate the trigger
CREATE TRIGGER update_ticket_purchases_updated_at
  BEFORE UPDATE ON public.ticket_purchases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_ticket_purchases_updated_at();