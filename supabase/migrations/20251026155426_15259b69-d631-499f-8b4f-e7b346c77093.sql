-- Add RLS policies for profiles table to improve security

-- Add INSERT policy to allow trigger-based profile creation
-- This provides a safety mechanism if the trigger needs manual intervention
CREATE POLICY "Allow system to insert profiles"
ON public.profiles
FOR INSERT
TO postgres
WITH CHECK (true);

-- Explicitly prevent profile deletion for data integrity
CREATE POLICY "Prevent profile deletion"
ON public.profiles
FOR DELETE
USING (false);

-- Improve handle_new_user() trigger with error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer')
  )
  ON CONFLICT (id) DO NOTHING;  -- Prevent duplicate errors
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't block user creation
    RAISE WARNING 'Profile creation failed for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;