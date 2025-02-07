/*
  # Portfolio Database Schema

  1. New Tables
    - `projects`
      - `id` (serial primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `tags` (text[])
      - `link` (text)
      - `created_at` (timestamptz)
    - `experiences`
      - `id` (serial primary key)
      - `company` (text)
      - `position` (text)
      - `period` (text)
      - `description` (text)
      - `technologies` (text[])
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access for experiences"
  ON experiences
  FOR SELECT
  TO public
  USING (true);