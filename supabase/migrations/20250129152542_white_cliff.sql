/*
  # Update projects table with additional fields

  1. New Fields
    - `slug` (text, unique) - URL-friendly identifier
    - `content` (text) - Markdown content for project details
    - `client` (text) - Client name
    - `year` (text) - Project year
    - `role` (text) - Role in the project
    - `gallery` (text[]) - Array of image URLs
*/

-- Add new columns to projects table
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'slug'
  ) THEN 
    ALTER TABLE projects ADD COLUMN slug text UNIQUE;
    ALTER TABLE projects ADD COLUMN content text;
    ALTER TABLE projects ADD COLUMN client text;
    ALTER TABLE projects ADD COLUMN year text;
    ALTER TABLE projects ADD COLUMN role text;
    ALTER TABLE projects ADD COLUMN gallery text[] DEFAULT '{}';
  END IF;
END $$;