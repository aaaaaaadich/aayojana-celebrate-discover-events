-- Create event attendances table to track which users attend which events
CREATE TABLE public.event_attendances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attendance_status TEXT DEFAULT 'registered', -- registered, attended, no-show
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Enable RLS on event_attendances table
ALTER TABLE public.event_attendances ENABLE ROW LEVEL SECURITY;

-- Create policies for event_attendances
CREATE POLICY "Users can view their own attendances" 
ON public.event_attendances 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events" 
ON public.event_attendances 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own attendances" 
ON public.event_attendances 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_event_attendances_user_id ON public.event_attendances(user_id);
CREATE INDEX idx_event_attendances_event_id ON public.event_attendances(event_id);