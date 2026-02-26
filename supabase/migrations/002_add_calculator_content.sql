-- Add structured content column to calculators
-- Stores SEO sections: intro, howToUse, explanation, deepDive, keyNumbers, FAQ
ALTER TABLE calculators ADD COLUMN IF NOT EXISTS content jsonb NOT NULL DEFAULT '{}';
