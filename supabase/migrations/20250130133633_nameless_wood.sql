/*
  # Add country display columns

  1. New Columns
    - subdomain (text) - For routing to country-specific versions
    - flag_code (text) - For displaying country flags
    - background_image (text) - URL for country background image
    - welcome_text (text) - Custom welcome message
    - description_text (text) - Custom description text

  2. Changes
    - Add columns without constraints
    - Update existing records
    - Add NOT NULL constraints
    - Add unique constraint if not exists
*/

-- First add columns without constraints
ALTER TABLE countries
ADD COLUMN IF NOT EXISTS subdomain text,
ADD COLUMN IF NOT EXISTS flag_code text,
ADD COLUMN IF NOT EXISTS background_image text,
ADD COLUMN IF NOT EXISTS welcome_text text,
ADD COLUMN IF NOT EXISTS description_text text;

-- Update existing records with values
UPDATE countries 
SET 
  subdomain = LOWER(code),
  flag_code = LOWER(code),
  background_image = CASE 
    WHEN code = 'CA' THEN 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?auto=format&fit=crop&q=80&w=2671&ixlib=rb-4.0.3'
    WHEN code = 'US' THEN 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=2669&ixlib=rb-4.0.3'
    WHEN code = 'GB' THEN 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
    WHEN code = 'IT' THEN 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&q=80&w=2676&ixlib=rb-4.0.3'
    ELSE 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2672&ixlib=rb-4.0.3'
  END,
  welcome_text = CASE 
    WHEN code = 'CA' THEN 'Welcome to Summit Stakes Canada'
    WHEN code = 'US' THEN 'Welcome to Summit Stakes USA'
    WHEN code = 'GB' THEN 'Welcome to Summit Stakes UK'
    WHEN code = 'IT' THEN 'Welcome to Summit Stakes Italy'
    ELSE 'Welcome to Summit Stakes'
  END,
  description_text = CASE 
    WHEN code = 'CA' THEN 'You are currently on the Canadian version of our website'
    WHEN code = 'US' THEN 'You are currently on the American version of our website'
    WHEN code = 'GB' THEN 'You are currently on the British version of our website'
    WHEN code = 'IT' THEN 'You are currently on the Italian version of our website'
    ELSE 'You are currently on our website'
  END;

-- Now that all records have values, add constraints
ALTER TABLE countries 
ALTER COLUMN subdomain SET NOT NULL,
ALTER COLUMN flag_code SET NOT NULL,
ALTER COLUMN background_image SET NOT NULL,
ALTER COLUMN welcome_text SET NOT NULL,
ALTER COLUMN description_text SET NOT NULL;

-- Add unique constraint only if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'countries_subdomain_key'
  ) THEN
    ALTER TABLE countries
    ADD CONSTRAINT countries_subdomain_key UNIQUE (subdomain);
  END IF;
END $$;

-- Add comments
COMMENT ON TABLE countries IS 'Countries table with display information for region-specific versions of the site';
COMMENT ON COLUMN countries.subdomain IS 'Subdomain for country-specific version (e.g., ca for Canada)';
COMMENT ON COLUMN countries.flag_code IS 'Two-letter country code for flag display';
COMMENT ON COLUMN countries.background_image IS 'URL for country background image';
COMMENT ON COLUMN countries.welcome_text IS 'Custom welcome message for country';
COMMENT ON COLUMN countries.description_text IS 'Custom description text for country';