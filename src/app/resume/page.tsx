"use client";
import { useState, useEffect, useRef } from "react";
import ReturnButton from "../components/returnButton";

const timelineItems = [
  {
    title: "Software Engineer 2",
    company: "Epsilon",
    location: "Chicago, IL · Hybrid",
    date: "April 2024 - Present",
    description: [
      "Guided and mentored interns through a structured program, delineating detailed tasks aligned with overarching project epics",
      "Designed and implemented a Redis-backed queue system using NestJS to manage High Availability tunnel requests",
      "Migrated from BrowserMob Proxy to Sauce Labs HTTP Logging, rewriting the validation system and ensuring thread-safe execution — reducing impression regression time by 42% and tagging regression time by 30%",
    ],
  },
  {
    title: "Associate Software Engineer",
    company: "Epsilon",
    location: "Chicago, IL · Hybrid",
    date: "June 2022 - April 2024",
    description: [
      "Led the charge in Selenium testing, collaborating with Sauce Labs to beta test their SC 5.0 while enhancing existing regression testing procedures",
      "Leveraged expertise in React Native and ExpressJS to serve as the primary liaison for all web applications",
    ],
  },
  {
    title: "Software Engineering Automation Intern",
    company: "Ameren",
    location: "Champaign, IL · Remote",
    date: "May 2021 - May 2022",
    description: [
      "Utilized PowerShell, Python, and VRA to craft automation scripts driving a shift-left approach, streamlining workflows and enhancing operational efficiency",
      "Developed an automated redemption code generator for all Apple products using Power Automate and Power Apps",
    ],
  },
  {
    title: "Talent Director / Ex Senior Operations Manager",
    company: "Disruption Labs",
    location: "Champaign, IL · Remote",
    date: "June 2021 - May 2022",
    description: [
      "Developed and led internal training sessions on technical tools including React, Tailwind CSS, and Solidity",
      "Oversaw project delivery by managing the Senior Operations Manager, ensuring timely execution and adequate resource allocation",
      "Initiated and facilitated partnerships with leading companies such as AMD and EY, enabling students to collaborate on real-world projects",
    ],
  },
];

const skills = {
  Professional: [
    "Java",
    "JavaScript/Node.js",
    "TypeScript",
    "Selenium",
    "Docker",
    "Kubernetes",
    "JBehave",
    "Sauce Labs",
    "Redis",
    "NestJS",
    "React",
    "Express",
    "Amazon Q",
    "Git",
  ],
  Misc: ["Figma", "Agile", "Python", "SQL", "Firebase", "VectorDB", "DSPy"],
};

const education = {
  degree: "BS Systems Engineering and Design",
  minor: "Computer Science",
  school: "University of Illinois at Urbana-Champaign",
  college: "Grainger College of Engineering",
  year: "Aug 2018 - May 2022",
};

const CONTACT_EMAIL = "klmrmt99@gmail.com";
const CONTACT_PHONE = "224.240.5300";

const projects = [
  {
    name: "Threads",
    description:
      "Reddit-style web app that allows users to vote for questions of the day and respond",
  },
  {
    name: "Circles",
    description:
      "Developing a POC for a social media platform focused on genuine social interaction",
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/klmrmt",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kylemorimoto/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function Resume() {
  const [visibleSections, setVisibleSections] = useState(new Set<string>());
  const [emailCopied, setEmailCopied] = useState(false);
  const [expandedCards, setExpandedCards] = useState(new Set<number>());
  const sectionRefs = useRef<HTMLElement[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = (entry.target as HTMLElement).dataset.section;
          if (!section) return;

          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(section));
          }
        });
      },
      { threshold: 0.08 }
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
    <div className="min-h-screen bg-[var(--background)] pt-10 pb-16 text-[var(--text-primary)]">
      <div className="mx-auto w-[90%] md:w-[85%] lg:w-[90%] max-w-6xl">
        {/* Header */}
        <div
          ref={addToRefs}
          data-section="header"
          className={`mb-10 flex justify-between items-start transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visibleSections.has("header")
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <h1 className="mb-2 font-display text-4xl font-extrabold crt-cursor">Kyle Morimoto</h1>
            <p className="text-xl text-[var(--text-muted)]">
              Software Engineer
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--text-muted)]">
              <span>Chicago, IL</span>
              <span aria-hidden>·</span>
              <span>{CONTACT_PHONE}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[var(--text-primary)] underline underline-offset-2 hover:text-[var(--accent)]"
                >
                  {CONTACT_EMAIL}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center border-2 border-[var(--border)] bg-[var(--surface-secondary)] px-2 py-0.5 text-xs font-semibold text-[var(--text-primary)] shadow-[2px_2px_0px_var(--shadow-color)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]"
                  aria-label={
                    emailCopied
                      ? "Email copied to clipboard"
                      : "Copy email to clipboard"
                  }
                >
                  <svg className="h-3.5 w-3.5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {emailCopied ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    )}
                  </svg>
                  <span className="hidden sm:inline">{emailCopied ? "Copied!" : "Copy"}</span>
                </button>
              </span>
            </p>
          </div>
          <div className="flex items-stretch gap-3">
            <a
              href="/Kyle_Morimoto_Resume.pdf"
              download
              className="inline-flex items-center gap-2 border-2 border-[var(--border)] bg-[var(--surface-primary)] px-4 py-2 font-semibold text-[var(--text-primary)] shadow-[4px_4px_0px_var(--shadow-color)] transition-all duration-150 ease-out hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-[var(--surface-secondary)] hover:shadow-[5px_5px_0px_var(--shadow-color)]"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                />
              </svg>
              <span className="hidden sm:inline">Resume</span>
            </a>
            <ReturnButton />
          </div>
        </div>

        {/* Education */}
        <section
          ref={addToRefs}
          data-section="education"
          className={`mb-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visibleSections.has("education")
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Education
          </h2>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-bold">{education.degree}</h3>
              <p className="font-medium text-[var(--accent)]">
                {education.school}
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                {education.college} · Minor: {education.minor}
              </p>
            </div>
            <span className="mt-2 w-fit whitespace-nowrap text-sm font-medium text-[var(--text-muted)] sm:mt-0">
              {education.year}
            </span>
          </div>
          <div className="mt-4 h-px bg-[var(--border)] opacity-20" />
        </section>

        {/* Skills */}
        <section
          ref={addToRefs}
          data-section="skills"
          className={`mb-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 ${
            visibleSections.has("skills")
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Skills
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h4 className="mb-2 text-sm font-bold">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      className="border border-[var(--border)] px-3 py-1 text-sm font-medium transition-colors duration-150 hover:bg-[var(--surface-secondary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-px bg-[var(--border)] opacity-20" />
        </section>

        {/* Experience */}
        <section
          ref={addToRefs}
          data-section="experience-heading"
          className={`mb-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
            visibleSections.has("experience-heading")
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Experience
          </h2>
        </section>

        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {timelineItems.map((item, index) => {
            const sectionKey = `card-${index}`;
            const isVisible = visibleSections.has(sectionKey);
            const isExpanded = expandedCards.has(index);

            return (
              <article
                key={index}
                ref={addToRefs}
                data-section={sectionKey}
                className={`flex flex-col border-2 border-[var(--border)] bg-[var(--surface-primary)] p-5 shadow-[6px_6px_0px_var(--shadow-color)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible
                    ? "translate-y-0 opacity-100 blur-0 scale-100"
                    : "translate-y-6 opacity-0 blur-[2px] scale-[0.98]"
                }`}
                style={{ transitionDelay: `${(index % 2) * 75}ms` }}
              >
                <div className="mb-2 flex flex-col gap-1">
                  <h3 className="text-lg font-bold leading-tight">
                    {item.title}
                  </h3>
                  <span className="w-fit whitespace-nowrap bg-[var(--surface-inverse)] px-1.5 py-0.5 text-xs font-bold text-[var(--text-inverse)]">
                    {item.date}
                  </span>
                  <span className="font-medium text-[var(--accent)]">
                    {item.company}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {item.location}
                  </span>
                </div>
                <div className="relative">
                  <ul
                    className={`space-y-1.5 text-sm text-[var(--text-muted)] overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      isExpanded ? "max-h-[800px]" : "max-h-[7rem]"
                    }`}
                  >
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--border)]" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                  {!isExpanded && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--surface-primary)] to-transparent" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggleCard(index)}
                  className="mt-2 self-start text-xs font-semibold text-[var(--accent)] hover:underline underline-offset-2"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              </article>
            );
          })}
        </div>

        {/* Extracurricular Projects */}
        <section
          ref={addToRefs}
          data-section="projects"
          className={`mb-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
            visibleSections.has("projects")
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Extracurricular
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.name}
                className="border border-[var(--border)] bg-[var(--surface-primary)] p-4 shadow-[3px_3px_0px_var(--shadow-color)]"
              >
                <h3 className="mb-1 text-base font-bold">{project.name}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact / Links */}
        <section
          ref={addToRefs}
          data-section="connect"
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
            visibleSections.has("connect")
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Get In Touch
          </h2>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="inline-flex items-center gap-2 border-2 border-[var(--border)] bg-[var(--surface-primary)] px-4 py-2 font-semibold text-[var(--text-primary)] shadow-[4px_4px_0px_var(--shadow-color)] transition-all duration-150 ease-out hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-[var(--surface-secondary)] hover:shadow-[5px_5px_0px_var(--shadow-color)]"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
