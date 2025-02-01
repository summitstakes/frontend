/*
  # Email Templates

  1. New Tables
    - `email_templates`
      - `id` (uuid, primary key)
      - `language` (text)  
      - `type` (text)
      - `subject` (text)
      - `content` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `email_templates` table
    - Add policy for authenticated users to read templates
*/

-- Create email templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL,
  type text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(language, type)
);

-- Enable RLS
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read email templates"
  ON email_templates
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default templates
INSERT INTO email_templates (language, type, subject, content) VALUES
  ('en', 'confirmation', 'Welcome to Summit Stakes - Verify Your Email', 'Welcome! Your verification code is: {{ .ConfirmationCode }}'),
  ('fr', 'confirmation', 'Bienvenue sur Summit Stakes - Vérifiez votre email', 'Bienvenue! Votre code de vérification est: {{ .ConfirmationCode }}'),
  ('es', 'confirmation', 'Bienvenido a Summit Stakes - Verifica tu correo', '¡Bienvenido! Tu código de verificación es: {{ .ConfirmationCode }}')
ON CONFLICT (language, type) DO NOTHING;