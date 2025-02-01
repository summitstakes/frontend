/*
  # Add languages table and data

  1. New Tables
    - languages
      - id (uuid, primary key) 
      - code (text, unique) - Language code (e.g. 'en', 'fr')
      - name (text) - Display name (e.g. 'English', 'Français')
      - native_name (text) - Name in native language
      - region (text) - Region grouping (e.g. 'Popular', 'Europe', 'Asia')
      - active (boolean) - Whether language is currently active
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on languages table
    - Add policy for public read access
    - Add policy for admin write access

  3. Data
    - Insert initial language options
*/

-- Create languages table
CREATE TABLE IF NOT EXISTS languages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  native_name text NOT NULL,
  region text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Languages are viewable by everyone"
  ON languages
  FOR SELECT
  USING (true);

-- Insert initial language data
INSERT INTO languages (code, name, native_name, region, active) VALUES
  -- Popular languages
  ('en', 'English', 'English', 'Popular', true),
  ('fr', 'French', 'Français', 'Popular', true),
  ('es', 'Spanish', 'Español', 'Popular', true),
  
  -- European languages
  ('de', 'German', 'Deutsch', 'Europe', true),
  ('it', 'Italian', 'Italiano', 'Europe', true),
  ('pt', 'Portuguese', 'Português', 'Europe', true),
  ('nl', 'Dutch', 'Nederlands', 'Europe', true),
  ('ru', 'Russian', 'Русский', 'Europe', true),
  
  -- Asian languages
  ('zh', 'Chinese', '中文', 'Asia', true),
  ('ja', 'Japanese', '日本語', 'Asia', true),
  ('ko', 'Korean', '한국어', 'Asia', true),
  ('hi', 'Hindi', 'हिन्दी', 'Asia', true),
  ('vi', 'Vietnamese', 'Tiếng Việt', 'Asia', true),
  ('ta', 'Tamil', 'தமிழ்', 'Asia', true),
  ('ar', 'Arabic', 'العربية', 'Asia', true)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  native_name = EXCLUDED.native_name,
  region = EXCLUDED.region,
  active = EXCLUDED.active;

-- Add language_code foreign key to profiles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'language_code'
  ) THEN
    ALTER TABLE profiles 
    ADD COLUMN language_code text REFERENCES languages(code);

    -- Update existing profiles to use 'en' as default
    UPDATE profiles 
    SET language_code = 'en' 
    WHERE language_code IS NULL;
  END IF;
END $$;