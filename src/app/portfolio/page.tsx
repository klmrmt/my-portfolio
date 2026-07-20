"use client";
import { useState, useEffect, useRef } from "react";
import ReturnButton from "../components/returnButton";
import ProjectCard from "../components/ProjectCard";
import SummerGamesPreview from "../components/SummerGamesPreview";

const featuredProject = {
  title: "The Computer Summer Games",
  eyebrow: "Featured · Interactive",
  description:
    "An original five-event computer-athletics circuit inside a playful early-2000s desktop. Players scroll, type, aim, time, and click through ranked events, with every score validated by the server before it reaches the leaderboard.",
  highlights: [
    "Five distinct ranked events",
    "Pointer, keyboard, and touch controls",
    "Server-owned run validation",
    "Per-event mobile and desktop rankings",
  ],
  techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "DynamoDB", "PostHog"],
  liveUrl: "https://summergames.tapp.inc",
  githubUrl: "https://github.com/klmrmt/summergames",
};

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
            <p className="text-lg text-[var(--text-muted)]">Interactive products and systems, built end to end</p>
          </div>
          <ReturnButton />
        </div>

        {/* Featured Project */}
        <section
          ref={addToRefs}
          data-section="featured"
          className={`mb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visibleSections.has('featured')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <ProjectCard
            title={featuredProject.title}
            eyebrow={featuredProject.eyebrow}
            description={featuredProject.description}
            highlights={featuredProject.highlights}
            techStack={featuredProject.techStack}
            liveUrl={featuredProject.liveUrl}
            githubUrl={featuredProject.githubUrl}
            liveLabel="Play the games"
            githubLabel="View source"
            featured
            visual={<SummerGamesPreview />}
          />
        </section>

        <div
          ref={addToRefs}
          data-section="more-work"
          className={`mb-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visibleSections.has('more-work')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            More work
          </h2>
        </div>

        {/* Supporting Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
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
