/*
  # Update projects with slugs and additional fields

  1. Changes
    - Add slugs to existing projects
    - Add content, client, year, role, and gallery fields
*/

UPDATE projects
SET 
  slug = CASE 
    WHEN id = 1 THEN 'bolt'
    WHEN id = 2 THEN 'stackblitz'
    WHEN id = 3 THEN 'enterprise-cloud-ide'
  END,
  content = CASE 
    WHEN id = 1 THEN 'Bolt is an AI-powered coding assistant that revolutionizes the way developers write code. By leveraging advanced language models and deep learning techniques, Bolt provides intelligent code suggestions, automates repetitive tasks, and helps developers maintain consistent code quality across their projects.'
    WHEN id = 2 THEN 'WebContainer™ is a groundbreaking technology that brings the full power of Node.js directly to your browser. This innovative solution eliminates the need for local development environments, making web development more accessible and efficient than ever before.'
    WHEN id = 3 THEN 'Our Enterprise Cloud IDE is a comprehensive development environment designed specifically for enterprise teams. It combines powerful collaboration features with enterprise-grade security, enabling teams to work together seamlessly while maintaining the highest standards of code quality and security.'
  END,
  client = CASE 
    WHEN id = 1 THEN 'StackBlitz'
    WHEN id = 2 THEN 'StackBlitz'
    WHEN id = 3 THEN 'Enterprise Clients'
  END,
  year = CASE 
    WHEN id = 1 THEN '2023'
    WHEN id = 2 THEN '2022'
    WHEN id = 3 THEN '2021'
  END,
  role = CASE 
    WHEN id = 1 THEN 'Lead Developer'
    WHEN id = 2 THEN 'Technical Architect'
    WHEN id = 3 THEN 'Solution Architect'
  END,
  gallery = CASE 
    WHEN id = 1 THEN ARRAY[
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80'
    ]
    WHEN id = 2 THEN ARRAY[
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'
    ]
    WHEN id = 3 THEN ARRAY[
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80'
    ]
  END
WHERE id IN (1, 2, 3);