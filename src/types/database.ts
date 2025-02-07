export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  link: string;
  created_at: string;
  slug: string;
  content: string;
  client: string;
  year: string;
  role: string;
  gallery: string[];
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}