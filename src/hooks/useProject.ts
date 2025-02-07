import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/database';

export function useProject(slug: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select()
          .eq('slug', slug)
          .maybeSingle();

        if (error) {
          console.error('Error fetching project:', error);
          setProject(null);
          return;
        }

        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  return { project, loading };
}