/*
  # Sports and Leagues Schema

  1. New Tables
    - `sports`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `icon` (text)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `leagues`
      - `id` (uuid, primary key) 
      - `name` (text)
      - `sport_id` (uuid, foreign key)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create sports table
CREATE TABLE IF NOT EXISTS sports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  icon text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create leagues table with foreign key to sports
CREATE TABLE IF NOT EXISTS leagues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sport_id uuid REFERENCES sports(id) ON DELETE CASCADE,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name, sport_id)
);

-- Enable RLS
ALTER TABLE sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;

-- Create policies for sports table
CREATE POLICY "Sports are viewable by everyone"
  ON sports
  FOR SELECT
  USING (true);

CREATE POLICY "Sports are insertable by authenticated users"
  ON sports
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Sports are updatable by authenticated users"
  ON sports
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for leagues table
CREATE POLICY "Leagues are viewable by everyone"
  ON leagues
  FOR SELECT
  USING (true);

CREATE POLICY "Leagues are insertable by authenticated users"
  ON leagues
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Leagues are updatable by authenticated users"
  ON leagues
  FOR UPDATE
  TO authenticated
  USING (true);

-- Insert initial sports data
INSERT INTO sports (name, icon) VALUES
  ('Alpine Skiing', '⛷️'),
  ('American Football', '🏈'),
  ('Badminton', '🏸'),
  ('Baseball', '⚾'),
  ('Basketball', '🏀'),
  ('Beach Volleyball', '🏐'),
  ('Boxing', '🥊'),
  ('Cricket', '🏏'),
  ('Cross Country', '🎿'),
  ('Cycling', '🚴'),
  ('Darts', '🎯'),
  ('Esports', '🎮'),
  ('F1', '🏎️'),
  ('Football', '⚽'),
  ('Futsal', '⚽'),
  ('Golf', '⛳'),
  ('Handball', '🤾'),
  ('Horse Racing', '🏇'),
  ('Ice Hockey', '🏒'),
  ('MMA', '🥊'),
  ('Rugby League', '🏉'),
  ('Rugby Union', '🏉'),
  ('Snooker', '🎱'),
  ('Speedway', '🏍️'),
  ('Table Tennis', '🏓'),
  ('Tennis', '🎾'),
  ('Volleyball', '🏐')
ON CONFLICT (name) DO UPDATE SET
  icon = EXCLUDED.icon;

-- Insert leagues data
WITH 
  alpine_skiing AS (SELECT id FROM sports WHERE name = 'Alpine Skiing'),
  american_football AS (SELECT id FROM sports WHERE name = 'American Football'),
  badminton AS (SELECT id FROM sports WHERE name = 'Badminton'),
  baseball AS (SELECT id FROM sports WHERE name = 'Baseball'),
  basketball AS (SELECT id FROM sports WHERE name = 'Basketball'),
  beach_volleyball AS (SELECT id FROM sports WHERE name = 'Beach Volleyball'),
  boxing AS (SELECT id FROM sports WHERE name = 'Boxing'),
  cricket AS (SELECT id FROM sports WHERE name = 'Cricket'),
  cross_country AS (SELECT id FROM sports WHERE name = 'Cross Country'),
  cycling AS (SELECT id FROM sports WHERE name = 'Cycling'),
  darts AS (SELECT id FROM sports WHERE name = 'Darts'),
  esports AS (SELECT id FROM sports WHERE name = 'Esports'),
  f1 AS (SELECT id FROM sports WHERE name = 'F1'),
  football AS (SELECT id FROM sports WHERE name = 'Football'),
  futsal AS (SELECT id FROM sports WHERE name = 'Futsal'),
  golf AS (SELECT id FROM sports WHERE name = 'Golf'),
  handball AS (SELECT id FROM sports WHERE name = 'Handball'),
  horse_racing AS (SELECT id FROM sports WHERE name = 'Horse Racing'),
  ice_hockey AS (SELECT id FROM sports WHERE name = 'Ice Hockey'),
  mma AS (SELECT id FROM sports WHERE name = 'MMA'),
  rugby_league AS (SELECT id FROM sports WHERE name = 'Rugby League'),
  rugby_union AS (SELECT id FROM sports WHERE name = 'Rugby Union'),
  snooker AS (SELECT id FROM sports WHERE name = 'Snooker'),
  speedway AS (SELECT id FROM sports WHERE name = 'Speedway'),
  table_tennis AS (SELECT id FROM sports WHERE name = 'Table Tennis'),
  tennis AS (SELECT id FROM sports WHERE name = 'Tennis'),
  volleyball AS (SELECT id FROM sports WHERE name = 'Volleyball')
INSERT INTO leagues (name, sport_id) VALUES
  -- Alpine Skiing
  ('FIS World Cup', (SELECT id FROM alpine_skiing)),
  ('Winter Olympics', (SELECT id FROM alpine_skiing)),

  -- American Football
  ('NFL', (SELECT id FROM american_football)),
  ('NCAA Football', (SELECT id FROM american_football)),
  ('CFL', (SELECT id FROM american_football)),
  ('XFL', (SELECT id FROM american_football)),

  -- Badminton
  ('BWF World Tour', (SELECT id FROM badminton)),
  ('BWF World Championships', (SELECT id FROM badminton)),

  -- Baseball
  ('MLB', (SELECT id FROM baseball)),
  ('NPB', (SELECT id FROM baseball)),
  ('KBO', (SELECT id FROM baseball)),
  ('CPBL', (SELECT id FROM baseball)),

  -- Basketball
  ('NBA', (SELECT id FROM basketball)),
  ('EuroLeague', (SELECT id FROM basketball)),
  ('NCAA', (SELECT id FROM basketball)),
  ('NBL', (SELECT id FROM basketball)),

  -- Beach Volleyball
  ('FIVB World Tour', (SELECT id FROM beach_volleyball)),
  ('AVP Tour', (SELECT id FROM beach_volleyball)),

  -- Boxing
  ('WBA', (SELECT id FROM boxing)),
  ('WBC', (SELECT id FROM boxing)),
  ('IBF', (SELECT id FROM boxing)),
  ('WBO', (SELECT id FROM boxing)),

  -- Cricket
  ('IPL', (SELECT id FROM cricket)),
  ('BBL', (SELECT id FROM cricket)),
  ('The Hundred', (SELECT id FROM cricket)),
  ('Test Cricket', (SELECT id FROM cricket)),

  -- Cross Country
  ('FIS World Cup', (SELECT id FROM cross_country)),
  ('Winter Olympics', (SELECT id FROM cross_country)),

  -- Cycling
  ('Tour de France', (SELECT id FROM cycling)),
  ('Giro d''Italia', (SELECT id FROM cycling)),
  ('UCI World Tour', (SELECT id FROM cycling)),

  -- Darts
  ('PDC World Championship', (SELECT id FROM darts)),
  ('Premier League Darts', (SELECT id FROM darts)),

  -- Esports
  ('League of Legends', (SELECT id FROM esports)),
  ('CS:GO', (SELECT id FROM esports)),
  ('Dota 2', (SELECT id FROM esports)),
  ('Valorant', (SELECT id FROM esports)),

  -- F1
  ('Formula 1 World Championship', (SELECT id FROM f1)),

  -- Football (Soccer)
  ('EPL', (SELECT id FROM football)),
  ('LaLiga', (SELECT id FROM football)),
  ('Serie A', (SELECT id FROM football)),
  ('Bundesliga', (SELECT id FROM football)),
  ('Ligue 1', (SELECT id FROM football)),
  ('MLS', (SELECT id FROM football)),
  ('Champions League', (SELECT id FROM football)),

  -- Futsal
  ('FIFA Futsal World Cup', (SELECT id FROM futsal)),
  ('UEFA Futsal Champions League', (SELECT id FROM futsal)),

  -- Golf
  ('PGA Tour', (SELECT id FROM golf)),
  ('European Tour', (SELECT id FROM golf)),
  ('LPGA', (SELECT id FROM golf)),
  ('Masters Tournament', (SELECT id FROM golf)),

  -- Handball
  ('IHF World Championship', (SELECT id FROM handball)),
  ('EHF Champions League', (SELECT id FROM handball)),

  -- Horse Racing
  ('Triple Crown', (SELECT id FROM horse_racing)),
  ('Royal Ascot', (SELECT id FROM horse_racing)),
  ('Melbourne Cup', (SELECT id FROM horse_racing)),

  -- Ice Hockey
  ('NHL', (SELECT id FROM ice_hockey)),
  ('KHL', (SELECT id FROM ice_hockey)),
  ('SHL', (SELECT id FROM ice_hockey)),
  ('IIHF', (SELECT id FROM ice_hockey)),

  -- MMA
  ('UFC', (SELECT id FROM mma)),
  ('Bellator', (SELECT id FROM mma)),
  ('ONE', (SELECT id FROM mma)),
  ('PFL', (SELECT id FROM mma)),

  -- Rugby League
  ('NRL', (SELECT id FROM rugby_league)),
  ('Super League', (SELECT id FROM rugby_league)),
  ('State of Origin', (SELECT id FROM rugby_league)),

  -- Rugby Union
  ('Six Nations', (SELECT id FROM rugby_union)),
  ('Rugby Championship', (SELECT id FROM rugby_union)),
  ('World Cup', (SELECT id FROM rugby_union)),

  -- Snooker
  ('World Snooker Championship', (SELECT id FROM snooker)),
  ('UK Championship', (SELECT id FROM snooker)),

  -- Speedway
  ('Speedway Grand Prix', (SELECT id FROM speedway)),
  ('Speedway World Cup', (SELECT id FROM speedway)),

  -- Table Tennis
  ('ITTF World Tour', (SELECT id FROM table_tennis)),
  ('World Table Tennis Championships', (SELECT id FROM table_tennis)),

  -- Tennis
  ('ATP', (SELECT id FROM tennis)),
  ('WTA', (SELECT id FROM tennis)),
  ('ITF', (SELECT id FROM tennis)),
  ('Grand Slams', (SELECT id FROM tennis)),

  -- Volleyball
  ('FIVB World Championship', (SELECT id FROM volleyball)),
  ('CEV Champions League', (SELECT id FROM volleyball))
ON CONFLICT (name, sport_id) DO NOTHING;