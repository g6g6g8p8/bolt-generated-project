-- Insert projects data
INSERT INTO projects (title, description, image_url, tags, link) VALUES
(
  'Bolt',
  'An AI-powered coding assistant that helps developers write better code faster. Built with advanced language models and deep learning.',
  'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80',
  ARRAY['AI', 'TypeScript', 'React', 'Node.js'],
  'https://stackblitz.com'
),
(
  'StackBlitz',
  'WebContainer™ technology that runs Node.js natively in your browser. A development environment that works everywhere.',
  'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80',
  ARRAY['WebAssembly', 'TypeScript', 'React', 'Node.js'],
  'https://stackblitz.com'
),
(
  'Enterprise Cloud IDE',
  'Cloud development environment for enterprise teams. Features include real-time collaboration, instant environment setup, and advanced security.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
  ARRAY['Cloud', 'Enterprise', 'DevOps', 'Security'],
  'https://stackblitz.com'
);

-- Insert experiences data
INSERT INTO experiences (company, position, period, description, technologies) VALUES
(
  'StackBlitz',
  'Senior Software Engineer',
  '2020 - Present',
  'Leading the development of WebContainer™ technology and cloud development tools. Architecting scalable solutions for enterprise clients.',
  ARRAY['TypeScript', 'React', 'Node.js', 'WebAssembly', 'Cloud Infrastructure']
),
(
  'Google',
  'Software Engineer',
  '2018 - 2020',
  'Worked on cloud infrastructure and developer tools. Contributed to key projects improving developer productivity.',
  ARRAY['Go', 'Kubernetes', 'Cloud Platform', 'Infrastructure']
),
(
  'Microsoft',
  'Software Developer',
  '2016 - 2018',
  'Developed enterprise solutions and cloud services. Focused on scalability and performance optimization.',
  ARRAY['C#', '.NET', 'Azure', 'Microservices']
);