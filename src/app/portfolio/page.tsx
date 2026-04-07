"use client";
import { useState, useEffect, useRef } from "react";
import ReturnButton from "../components/returnButton";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "Testing Automation Framework",
    description: "A comprehensive testing framework built to automate QA processes, reducing manual testing time by 60%. Features parallel test execution and detailed reporting.",
    techStack: ["Python", "Selenium", "pytest", "Docker"],
    githubUrl: "https://github.com",
  },
  {
    title: "Personal Portfolio",
    description: "This portfolio site you're viewing! Built with Next.js and styled with a neo-brutalist design system featuring bold shadows and clean typography.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "/",
    githubUrl: "https://github.com",
  },
  {
    title: "Energy Dashboard",
    description: "An internal dashboard for monitoring and visualizing energy consumption data in real-time. Built during my internship at Ameren.",
    techStack: ["React", "D3.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "Task Management CLI",
    description: "A command-line task manager with natural language processing for due dates. Syncs with popular calendar applications.",
    techStack: ["Go", "SQLite", "Cobra"],
    githubUrl: "https://github.com",
  },
  {
    title: "Market Disruption Analyzer",
    description: "Research tool for analyzing market disruption patterns using machine learning. Developed during my time at the Disruption Lab.",
    techStack: ["Python", "scikit-learn", "Pandas", "Flask"],
    githubUrl: "https://github.com",
  },
  {
    title: "Real-time Chat App",
    description: "A WebSocket-based chat application with room support, typing indicators, and message persistence.",
    techStack: ["React", "Socket.io", "Express", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

export default function Portfolio() {
  const [visibleSections, setVisibleSections] = useState(new Set<string>());
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = (entry.target as HTMLElement).dataset.section;
            if (section) {
              setVisibleSections((prev) => new Set([...prev, section]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-10 pb-10 text-[var(--text-primary)]">
      <div className="w-[90%] md:w-[85%] mx-auto">
        {/* Header */}
        <div 
          ref={addToRefs}
          data-section="header"
          className={`flex justify-between items-start mb-10 transition-all duration-500 ease-out ${
            visibleSections.has('header')
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-0'
          }`}
        >
          <div>
            <h1 className="text-4xl font-bold mb-2 crt-cursor">Portfolio</h1>
            <p className="text-lg text-[var(--text-muted)]">A selection of projects I've worked on</p>
          </div>
          <ReturnButton />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={addToRefs}
              data-section={`card-${index}`}
              className={`transition-all duration-500 ease-out ${
                visibleSections.has(`card-${index}`)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${(index % 2) * 75}ms` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
