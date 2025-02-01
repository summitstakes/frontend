/*
  # Update languages table with complete list

  1. Changes
    - Add missing languages
    - Update regions and native names
    - Ensure all languages are active

  2. Security
    - No changes to existing RLS policies needed
*/

-- Update and insert languages
INSERT INTO languages (code, name, native_name, region, active) VALUES
  -- Popular languages
  ('en', 'English', 'English', 'Popular', true),
  ('fr', 'French', 'Français', 'Popular', true),
  ('es', 'Spanish', 'Español', 'Popular', true),
  ('de', 'German', 'Deutsch', 'Popular', true),

  -- European languages
  ('pt', 'Portuguese', 'Português', 'Europe', true),
  ('nl', 'Dutch', 'Nederlands', 'Europe', true),
  ('it', 'Italian', 'Italiano', 'Europe', true),
  ('pl', 'Polish', 'Polski', 'Europe', true),
  ('sv', 'Swedish', 'Svenska', 'Europe', true),
  ('no', 'Norwegian', 'Norsk', 'Europe', true),
  ('da', 'Danish', 'Dansk', 'Europe', true),
  ('fi', 'Finnish', 'Suomi', 'Europe', true),
  ('el', 'Greek', 'Ελληνικά', 'Europe', true),
  ('ro', 'Romanian', 'Română', 'Europe', true),
  ('sr', 'Serbian', 'Српски', 'Europe', true),
  ('hr', 'Croatian', 'Hrvatski', 'Europe', true),
  ('bs', 'Bosnian', 'Bosanski', 'Europe', true),
  ('is', 'Icelandic', 'Íslenska', 'Europe', true),

  -- Asian languages
  ('hi', 'Hindi', 'हिन्दी', 'Asia', true),
  ('ja', 'Japanese', '日本語', 'Asia', true),
  ('ko', 'Korean', '한국어', 'Asia', true),
  ('th', 'Thai', 'ไทย', 'Asia', true),

  -- African languages
  ('sw', 'Swahili', 'Kiswahili', 'Africa', true),
  ('zu', 'Zulu', 'isiZulu', 'Africa', true),
  ('af', 'Afrikaans', 'Afrikaans', 'Africa', true),

  -- Middle Eastern languages
  ('ar', 'Arabic', 'العربية', 'Middle East', true)

ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  native_name = EXCLUDED.native_name,
  region = EXCLUDED.region,
  active = EXCLUDED.active;