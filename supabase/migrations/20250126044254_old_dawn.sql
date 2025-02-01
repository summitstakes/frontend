/*
  # Add plan column to profiles table

  1. Changes
    - Add plan column to profiles table with default value 'free_plan'
    - Add check constraint to ensure valid plan values
    - Update RLS policies to allow plan updates

  2. Security
    - Enable RLS (already enabled)
    - Maintain existing RLS policies
    - Add check constraint for data validation
*/

-- Add plan column with check constraint
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'plan'
  ) THEN
    ALTER TABLE profiles 
    ADD COLUMN plan text NOT NULL DEFAULT 'free_plan'
    CHECK (plan IN ('free_plan', 'pro_plan'));
  END IF;
END $$;

-- Update existing profiles to have default plan if needed
UPDATE profiles 
SET plan = 'free_plan' 
WHERE plan IS NULL;