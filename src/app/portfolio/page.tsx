"use client";
import { useState, useEffect, useRef } from "react";
import ReturnButton from "../components/returnButton";
import ProjectCard from "../components/ProjectCard";
import SummerGamesPreview from "../components/SummerGamesPreview";

const featuredProject = {
  title: "The Computer Summer Games",
  eyebrow: "Featured project · Live",
  description:
    "A five-event browser competition disguised as an early-2000s desktop. I designed and built the full experience—from tactile events with mouse, keyboard, and touch controls to server-validated scoring and per-event world rankings.",
  highlights: [
    "Five original events, each with a distinct interaction",
    "Controls tuned for mouse, keyboard, and touch",
    "Scores validated by the server before they are ranked",
    "Separate world rankings by event and device class",
  ],
  techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "DynamoDB", "PostHog"],
  liveUrl: "https://summergames.tapp.inc",
  githubUrl: "https://github.com/klmrmt/summergames",
};

const projects = [
  {
    title: "Rally",
    eyebrow: "Group planning · Full-stack build",
    description:
      "A faster answer to \"what should we do?\" One person starts a Rally and shares a code; friends vote on budget, vibe, and distance; then AI turns the group’s overlap into venue recommendations.",
    highlights: [
      "Code-based group sessions",
      "Preference voting across three practical constraints",
      "AI-assisted venue recommendations",
      "Group coordination through Twilio",
    ],
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Express 5", "PostgreSQL", "Twilio"],
  },
  {
    title: "Circles",
    eyebrow: "Social systems · Technical prototype",
    description:
      "An experiment in making online sharing feel more like real life. People organize relationships into custom circles—such as Family, Friends, and Work—and choose exactly which groups can see each post.",
    highlights: [
      "Vector-based audience model",
      "Granular visibility for every post",
      "Custom groups that can reflect real relationships",
      "Permission logic prototyped with NumPy",
    ],
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
          className={`mb-12 flex items-start justify-between gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visibleSections.has('header')
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-6 opacity-0'
          }`}
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Selected work
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl crt-cursor">
              Projects built from the idea up.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              Finished products and focused experiments, built end to end—from the useful
              interaction to the system behind it and the details that make it hold up.
            </p>
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
            liveLabel="Play Summer Games"
            githubLabel="Explore the code"
            featured
            visual={<SummerGamesPreview />}
          />
        </section>

        <div
          ref={addToRefs}
          data-section="more-work"
          className={`mb-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visibleSections.has('more-work')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <h2 className="font-display text-2xl font-bold">
            Other explorations
          </h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-[var(--text-muted)]">
            Smaller builds for exploring how people decide together and share with intention.
          </p>
        </div>

        {/* Supporting Project Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.08fr_0.92fr]">
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
                eyebrow={project.eyebrow}
                description={project.description}
                highlights={project.highlights}
                techStack={project.techStack}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
