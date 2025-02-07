import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Experience } from '../types/database';

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setExperiences(data || []);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  return { experiences, loading };
}