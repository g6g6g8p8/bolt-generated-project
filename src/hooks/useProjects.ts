import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/database';

export interface ProjectFilters {
  client?: string;
  year?: string;
  tag?: string;
}

export function useProjects(filters?: ProjectFilters) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        let query = supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (filters?.client) {
          query = query.eq('client', filters.client);
        }
        if (filters?.year) {
          query = query.eq('year', filters.year);
        }
        if (filters?.tag) {
          query = query.contains('tags', [filters.tag]);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [filters?.client, filters?.year, filters?.tag]);

  return { projects, loading };
}