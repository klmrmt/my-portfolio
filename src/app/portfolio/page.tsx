"use client";
import { useState, useEffect, useRef } from "react";
import ReturnButton from "../components/returnButton";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "Rally",
    description:
      "A group decision-making app that takes friends from \"what should we do?\" to a concrete plan in under 2 minutes. One person creates a rally, shares a code, everyone votes on budget, vibe, and distance — then AI recommends venues and the group goes.",
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Express 5", "PostgreSQL", "Twilio"],
  },
  {
    title: "Circles",
    description:
      "A social platform with a vector-based permission system for granular content sharing. Users create custom circles — Work, Family, Friends — and selectively share posts with specific groups.",
    techStack: ["Python", "NumPy"],
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
          className={`flex justify-between items-start mb-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visibleSections.has('header')
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-6 opacity-0'
          }`}
        >
          <div>
            <h1 className="font-display text-4xl font-extrabold mb-2 crt-cursor">Portfolio</h1>
            <p className="text-lg text-[var(--text-muted)]">A selection of projects I&apos;ve worked on</p>
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
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                visibleSections.has(`card-${index}`)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: `${(index % 2) * 75}ms` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
