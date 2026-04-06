"use client";
import { useState, useEffect, useRef } from "react";
import ReturnButton from "../components/returnButton";

const timelineItems = [
  {
    title: "Software Engineer",
    company: "Epsilon",
    date: "2023 - Present",
    description: [
      "Developing testing frameworks through automation",
      "Building scalable software solutions for data-driven marketing",
      "Collaborating with cross-functional teams on product development",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Ameren",
    date: "Summer 2022",
    description: [
      "Developed internal tools and applications",
      "Worked on energy management systems",
      "Gained experience in enterprise software development",
    ],
  },
  {
    title: "Research Assistant",
    company: "University of Illinois - Disruption Lab",
    date: "2021 - 2022",
    description: [
      "Conducted research on emerging technologies",
      "Analyzed market disruption patterns",
      "Contributed to academic publications and presentations",
    ],
  },
];

const skills = {
  Languages: ["JavaScript/TypeScript", "Python", "Java", "C++", "Go"],
  Frameworks: ["React/Next.js", "Node.js", "Express", "Django", "Flask"],
  Tools: ["Git/GitHub", "Docker", "AWS", "Selenium", "pytest"],
};

const CONTACT_EMAIL = "klmrmt99@gmail.com";

/** Shown in header — keeps education minimal without a separate card */
const EDUCATION_LINE =
  "BS Systems Engineering and Design, minor CS · University of Illinois · 2022";

export default function Resume() {
  const [visibleSections, setVisibleSections] = useState(new Set<string>());
  const [emailCopied, setEmailCopied] = useState(false);
  const sectionRefs = useRef<HTMLElement[]>([]);

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
    <div className="min-h-screen bg-[var(--background)] pt-10 pb-16 text-[var(--text-primary)]">
      <div className="mx-auto w-[90%] md:w-[85%] lg:w-[90%] max-w-6xl">
        {/* Header */}
        <div
          ref={addToRefs}
          data-section="header"
          className={`mb-10 flex justify-between items-start transition-all duration-500 ease-out ${
            visibleSections.has("header")
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div>
            <h1 className="mb-2 text-4xl font-bold">Kyle Morimoto</h1>
            <p className="text-xl text-[var(--text-muted)]">Software Engineer</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{EDUCATION_LINE}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--text-muted)]">
              <span>Chicago, IL</span>
              <span aria-hidden>•</span>
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
                aria-label={emailCopied ? "Email copied to clipboard" : "Copy email to clipboard"}
              >
                {emailCopied ? "Copied!" : "Copy"}
              </button>
            </p>
          </div>
          <ReturnButton />
        </div>

        {/* Skills — above experience */}
        <section
          ref={addToRefs}
          data-section="skills"
          className={`mb-10 border-2 border-[var(--border)] bg-[var(--surface-primary)] p-6 shadow-[6px_6px_0px_var(--shadow-color)] transition-all duration-500 ease-out ${
            visibleSections.has("skills")
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h4 className="mb-3 text-lg font-bold">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      className="border-2 border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-1 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience — 3 cards in one column */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6">
          {timelineItems.map((item, index) => {
            const sectionKey = `card-${index}`;
            const isVisible = visibleSections.has(sectionKey);

            return (
              <article
                key={index}
                ref={addToRefs}
                data-section={sectionKey}
                className={`flex h-full flex-col border-2 border-[var(--border)] bg-[var(--surface-primary)] p-5 shadow-[6px_6px_0px_var(--shadow-color)] transition-all duration-500 ease-out ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="mb-3 flex flex-col gap-1">
                  <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                  <span className="w-fit whitespace-nowrap bg-[var(--surface-inverse)] px-2 py-1 text-xs font-bold text-[var(--text-inverse)]">
                    {item.date}
                  </span>
                  <span className="font-medium text-[var(--accent)]">{item.company}</span>
                </div>
                <ul className="mt-auto space-y-1.5 text-sm text-[var(--text-muted)]">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--border)]" />
                      {desc}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
