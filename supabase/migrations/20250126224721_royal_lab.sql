/*
  # Regions Database Schema

  1. New Tables
    - `regions`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `countries`
      - `id` (uuid, primary key) 
      - `name` (text)
      - `code` (text)
      - `region_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `states_provinces`
      - `id` (uuid, primary key)
      - `name` (text)
      - `code` (text)
      - `type` (text) - either 'state' or 'province'
      - `country_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Create regions table
CREATE TABLE IF NOT EXISTS regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  region_id uuid REFERENCES regions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name, region_id),
  UNIQUE(code, region_id)
);

-- Create states_provinces table
CREATE TABLE IF NOT EXISTS states_provinces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text,
  type text NOT NULL CHECK (type IN ('state', 'province')),
  country_id uuid REFERENCES countries(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name, country_id)
);

-- Enable RLS
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE states_provinces ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to regions"
  ON regions
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to countries"
  ON countries
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to states_provinces"
  ON states_provinces
  FOR SELECT
  USING (true);

-- Insert initial data
INSERT INTO regions (name) VALUES
  ('North America'),
  ('Europe'),
  ('Asia'),
  ('South America'),
  ('Africa'),
  ('Oceania')
ON CONFLICT (name) DO NOTHING;

-- Insert North American countries
WITH na AS (SELECT id FROM regions WHERE name = 'North America')
INSERT INTO countries (name, code, region_id) VALUES
  ('Canada', 'CA', (SELECT id FROM na)),
  ('United States', 'US', (SELECT id FROM na)),
  ('Mexico', 'MX', (SELECT id FROM na)),
  ('Costa Rica', 'CR', (SELECT id FROM na))
ON CONFLICT (name, region_id) DO NOTHING;

-- Insert Canadian provinces
WITH ca AS (SELECT id FROM countries WHERE code = 'CA')
INSERT INTO states_provinces (name, code, type, country_id) VALUES
  ('Alberta', 'AB', 'province', (SELECT id FROM ca)),
  ('British Columbia', 'BC', 'province', (SELECT id FROM ca)),
  ('Ontario', 'ON', 'province', (SELECT id FROM ca)),
  ('Quebec', 'QC', 'province', (SELECT id FROM ca))
ON CONFLICT (name, country_id) DO NOTHING;

-- Insert US states
WITH us AS (SELECT id FROM countries WHERE code = 'US')
INSERT INTO states_provinces (name, code, type, country_id) VALUES
  ('California', 'CA', 'state', (SELECT id FROM us)),
  ('New York', 'NY', 'state', (SELECT id FROM us)),
  ('Texas', 'TX', 'state', (SELECT id FROM us)),
  ('Florida', 'FL', 'state', (SELECT id FROM us))
ON CONFLICT (name, country_id) DO NOTHING;

-- Add remaining data for other regions...