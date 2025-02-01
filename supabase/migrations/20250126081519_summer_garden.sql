/*
  # Update profiles table and policies

  1. Changes
    - Create profiles table
    - Enable RLS
    - Add policies for profile management
    - Create user trigger

  2. Security
    - Allow profile creation during signup
    - Restrict profile updates to owners
    - Allow public profile viewing
*/

-- Create profiles table if not exists
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name text,
  last_name text,
  country text,
  language text,
  plan text NOT NULL DEFAULT 'free_plan' CHECK (plan IN ('free_plan', 'pro_plan')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure clean slate
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT 
USING (true);

CREATE POLICY "Enable insert for service role" 
ON profiles FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable update for users based on id" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create or replace function to handle user creation
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
    COALESCE(new.raw_user_meta_data->>'plan', 'free_plan')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Safely create or replace trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();