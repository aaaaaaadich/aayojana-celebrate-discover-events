-- Create storage bucket for event posters
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-posters', 'event-posters', true);

-- Create policies for event poster uploads
CREATE POLICY "Anyone can view event posters" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'event-posters');

CREATE POLICY "Authenticated users can upload event posters" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'event-posters' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own event posters" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'event-posters' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own event posters" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'event-posters' AND auth.uid() IS NOT NULL);