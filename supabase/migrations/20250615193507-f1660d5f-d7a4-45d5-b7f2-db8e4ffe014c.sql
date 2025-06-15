
-- Create an enum for user roles
CREATE TYPE public.user_role AS ENUM ('organizer', 'attendee');

-- Create a user_roles table to store user roles
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable Row Level Security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own roles
CREATE POLICY "Users can view their own roles" 
  ON public.user_roles 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own roles during signup
CREATE POLICY "Users can insert their own roles" 
  ON public.user_roles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create a security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create a function to get user roles
CREATE OR REPLACE FUNCTION public.get_user_roles(_user_id UUID)
RETURNS TABLE(role user_role)
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT ur.role
  FROM public.user_roles ur
  WHERE ur.user_id = _user_id
$$;

-- Create policy for organizers to manage their own events
CREATE POLICY "Organizers can manage their own events" 
  ON public.events 
  FOR ALL 
  USING (auth.uid() = organizer_id OR public.has_role(auth.uid(), 'organizer'));

-- Create policy for attendees to view all events
CREATE POLICY "Everyone can view events" 
  ON public.events 
  FOR SELECT 
  TO PUBLIC 
  USING (true);

-- Enable RLS on events table
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
