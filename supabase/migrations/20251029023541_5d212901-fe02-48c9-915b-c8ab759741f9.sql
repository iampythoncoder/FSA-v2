-- Add GoFundMe link column to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS gofundme_link text;

-- Make creator_id nullable since we won't have auth
ALTER TABLE public.projects 
ALTER COLUMN creator_id DROP NOT NULL;

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Authenticated users can create projects" ON public.projects;
DROP POLICY IF EXISTS "Project creators can update their own projects" ON public.projects;

-- Create new public RLS policies
CREATE POLICY "Anyone can create projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update projects" 
ON public.projects 
FOR UPDATE 
USING (true);