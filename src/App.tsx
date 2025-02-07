import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useSearchParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedinIcon, FenceIcon as BehanceIcon, YoutubeIcon, CloudIcon, FilterIcon, ArrowRight, UserCircle } from 'lucide-react';
import { useProjects, ProjectFilters } from './hooks/useProjects';
import { cn } from './lib/utils';
import ProjectDetail from './components/ProjectDetail';
import { getImageColor } from './lib/utils';

function DesktopSidebar() {
  const { projects } = useProjects();
  
  const categories = projects?.reduce((acc, project) => {
    const category = project.tags[0] || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  return (
    <aside className="hidden lg:block fixed h-screen w-80 bg-background border-r border-border p-6 overflow-y-auto">
      <Link to="/" className="text-title-2 block mb-8">
        Giulio Pinotti
      </Link>
      
      <nav className="space-y-8">
        <div className="space-y-4">
          {categories && Object.entries(categories).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-subheadline font-medium opacity-60 mb-2">
                {category} ({items.length})
              </h2>
              <ul className="space-y-2">
                {items.map((project) => (
                  <li key={project.id}>
                    <NavLink
                      to={`/projects/${project.slug}`}
                      className={({ isActive }) =>
                        cn(
                          "block text-callout hover:opacity-80 transition-opacity",
                          isActive ? "opacity-100" : "opacity-60"
                        )
                      }
                    >
                      {project.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              cn(
                "block text-callout hover:opacity-80 transition-opacity",
                isActive ? "opacity-100" : "opacity-60"
              )
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              cn(
                "block text-callout hover:opacity-80 transition-opacity",
                isActive ? "opacity-100" : "opacity-60"
              )
            }
          >
            Contact
          </NavLink>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://linkedin.com/in/pinotti"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="https://behance.net/pinotti"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <BehanceIcon size={20} />
          </a>
          <a
            href="https://youtube.com/@pinotti"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <YoutubeIcon size={20} />
          </a>
          <a
            href="https://soundcloud.com/pinotti"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <CloudIcon size={20} />
          </a>
        </div>
      </nav>
    </aside>
  );
}

function FeaturedProjects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters: ProjectFilters = {
    client: searchParams.get('client') || undefined,
    year: searchParams.get('year') || undefined,
    tag: searchParams.get('tag') || undefined,
  };

  const { projects, loading } = useProjects(filters);
  const [imageColors, setImageColors] = useState<Record<number, string>>({});

  useEffect(() => {
    async function loadImageColors() {
      const colors: Record<number, string> = {};
      for (const project of projects) {
        colors[project.id] = await getImageColor(project.image_url);
      }
      setImageColors(colors);
    }
    
    if (projects.length > 0) {
      loadImageColors();
    }
  }, [projects]);

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="space-y-6">
      {hasFilters && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilterIcon size={20} className="opacity-60" />
            <span className="text-subheadline opacity-60">
              Filtering by: {filters.client || filters.year || filters.tag}
            </span>
          </div>
          <button
            onClick={clearFilters}
            className="text-subheadline opacity-60 hover:opacity-100 transition-opacity"
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center h-64">
            <p className="text-body opacity-60 mb-4">No projects found</p>
            <button
              onClick={clearFilters}
              className="text-subheadline opacity-60 hover:opacity-100 transition-opacity"
            >
              Clear filters
            </button>
          </div>
        ) : (
          projects.map((project) => (
            <Link
              to={`/projects/${project.slug}`}
              key={project.id}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full pb-[133.33%] md:pb-[75%]"
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t"
                  style={{
                    background: imageColors[project.id] 
                      ? `linear-gradient(to top, ${imageColors[project.id]}99 0%, ${imageColors[project.id]}00 100%)`
                      : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)'
                  }}
                >
                  <div className="absolute bottom-0 left-0 p-6 text-left max-w-[90%]">
                    <h3 className="text-title-3 text-white mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-callout text-white/90 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="p-8">
      <div className="lg:hidden flex items-center justify-between mb-8">
        <Link to="/" className="text-title-2">
          Giulio Pinotti
        </Link>
        <Link 
          to="/about"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-border/10 hover:bg-border/20 transition-colors"
        >
          <UserCircle size={24} className="opacity-60" />
        </Link>
      </div>
      <FeaturedProjects />
      <div className="mt-16 max-w-3xl">
        <h2 className="text-title-1 mb-8">About</h2>
        <div className="prose">
          <p className="text-body">
            Creative Director, Art & Design with 15+ years in advertising, blending strategy,
            design, and storytelling to inspire and engage. Explore my work and passion for creativity.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-foreground border border-border rounded-lg text-callout hover:bg-border/10 transition-colors"
          >
            Read More
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="lg:hidden flex items-center justify-between mb-8">
        <Link to="/" className="text-title-2">
          Giulio Pinotti
        </Link>
        <Link 
          to="/about"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-border/10 hover:bg-border/20 transition-colors"
        >
          <UserCircle size={24} className="opacity-60" />
        </Link>
      </div>
      <h2 className="text-title-1 mb-8">About</h2>
      <div className="prose">
        <p className="text-body">
          Creative Director, Art & Design with 15+ years in advertising, blending strategy,
          design, and storytelling to inspire and engage. Explore my work and passion for creativity.
        </p>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="lg:hidden flex items-center justify-between mb-8">
        <Link to="/" className="text-title-2">
          Giulio Pinotti
        </Link>
        <Link 
          to="/about"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-border/10 hover:bg-border/20 transition-colors"
        >
          <UserCircle size={24} className="opacity-60" />
        </Link>
      </div>
      <h2 className="text-title-1 mb-8">Contact</h2>
      <div className="prose">
        <p className="text-body">
          Get in touch for collaborations, inquiries, or just to say hello.
        </p>
        <a
          href="mailto:contact@pinotti.work"
          className="inline-block mt-4 text-body hover:opacity-80 transition-opacity"
        >
          contact@pinotti.work
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <DesktopSidebar />
        <main className="lg:ml-80">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App