/*
  # Fix Plan Handling in User Creation

  1. Changes
    - Updates handle_new_user() function to properly handle plan selection
    - Ensures plan is set based on the user's selection during signup
    - Maintains default fallback to 'free_plan' if no plan is specified

  2. Security
    - Maintains existing RLS policies
    - No changes to table structure or permissions
*/

-- Update the handle_new_user function to properly handle plan selection
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    first_name,
    last_name,
    country,
    language,
    plan
  )
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'language',
    CASE 
      WHEN new.raw_user_meta_data->>'plan' = 'pro' THEN 'pro_plan'
      WHEN new.raw_user_meta_data->>'plan' = 'free' THEN 'free_plan'
      ELSE 'free_plan'  -- Default fallback
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;