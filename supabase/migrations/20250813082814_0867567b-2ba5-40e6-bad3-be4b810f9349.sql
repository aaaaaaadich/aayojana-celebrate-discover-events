-- Fix event_ratings RLS policy to protect user privacy
-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can view ratings" ON public.event_ratings;

-- Create new policies that protect user privacy while maintaining functionality
-- Policy 1: Users can only see their own individual ratings
CREATE POLICY "Users can view their own ratings" 
ON public.event_ratings 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Allow aggregate queries without exposing user_ids
-- Create a view for public rating statistics
CREATE OR REPLACE VIEW public.event_rating_stats AS
SELECT 
  event_id,
  ROUND(AVG(rating), 1) as average_rating,
  COUNT(*) as rating_count
FROM public.event_ratings
GROUP BY event_id;

-- Enable RLS on the view (though it's not strictly necessary for views)
ALTER VIEW public.event_rating_stats SET (security_barrier = true);

-- Grant public access to the view
GRANT SELECT ON public.event_rating_stats TO anon, authenticated;

-- Create a function to get event rating details securely
CREATE OR REPLACE FUNCTION public.get_event_rating_details(event_uuid uuid)
RETURNS TABLE(
  average_rating numeric,
  rating_count bigint,
  user_rating integer
) 
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 
    ROUND(AVG(r.rating), 1) as average_rating,
    COUNT(*) as rating_count,
    COALESCE(
      (SELECT rating FROM public.event_ratings 
       WHERE event_id = event_uuid AND user_id = auth.uid()), 
      0
    ) as user_rating
  FROM public.event_ratings r
  WHERE r.event_id = event_uuid;
$$;