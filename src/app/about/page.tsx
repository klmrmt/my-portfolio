"use client";
import { useState, useEffect, useRef } from "react";
import ReturnButton from "../components/returnButton";

export default function About() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, (entry.target as HTMLElement).dataset.section]));
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

  const sectionClass = (key: string, delay: string = "") =>
    `transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${delay} ${
      visibleSections.has(key)
        ? "translate-y-0 opacity-100"
        : "translate-y-6 opacity-0"
    }`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-16 text-[var(--text-primary)]">
      <div className="relative w-full max-w-2xl">
        <div className="absolute top-0 right-0 z-10">
          <ReturnButton />
        </div>

        {/* Hero */}
        <section
          ref={addToRefs}
          data-section="hero"
          className={`mb-16 pt-8 ${sectionClass("hero")}`}
        >
          <h1 className="font-display text-5xl font-extrabold tracking-tight crt-cursor">Kyle Morimoto</h1>
          <p className="mt-3 text-lg text-[var(--text-muted)]">
            Software Engineer &middot; Automation
          </p>
          <div className="mt-6 h-px w-16 bg-[var(--border)]" />
        </section>

        {/* My Story */}
        <section
          ref={addToRefs}
          data-section="story"
          className={`mb-14 ${sectionClass("story", "delay-75")}`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            My Story
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              I first got into programming during college at the University of Illinois, where a
              single intro to CS course completely changed my trajectory. What started as curiosity
              quickly became an obsession — I loved the feeling of building something from nothing.
            </p>
            <p>
              After graduating in 2022, I joined Epsilon as a Software Engineer, where I&apos;ve been
              focused on developing testing frameworks through automation. There&apos;s something deeply
              satisfying about creating systems that help other engineers ship better code faster.
            </p>
          </div>
        </section>

        {/* What Drives Me */}
        <section
          ref={addToRefs}
          data-section="drives"
          className={`mb-14 ${sectionClass("drives", "delay-150")}`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            What Drives Me
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              I&apos;m motivated by solving problems that have real impact. Whether it&apos;s automating
              away tedious manual work, building tools that make developers&apos; lives easier, or
              learning new technologies that push my boundaries — I thrive when I&apos;m challenged.
            </p>
            <p>
              I believe in writing clean, maintainable code and building systems that last.
              There&apos;s an artistry to good software engineering that goes beyond just &ldquo;making it work.&rdquo;
            </p>
          </div>
        </section>

        {/* Interests */}
        <section
          ref={addToRefs}
          data-section="interests"
          className={`mb-14 ${sectionClass("interests", "delay-200")}`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            When I&apos;m Not Coding
          </h2>
          <div className="flex flex-wrap gap-3">
            {["Gaming", "Reading", "Climbing", "Violin"].map((hobby) => (
              <span
                key={hobby}
                className="border border-[var(--border)] px-4 py-2 text-sm font-medium transition-colors duration-150 hover:bg-[var(--surface-secondary)]"
              >
                {hobby}
              </span>
            ))}
          </div>
        </section>

        {/* Connect */}
        <section
          ref={addToRefs}
          data-section="connect"
          className={sectionClass("connect", "delay-300")}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Connect
          </h2>
          <div className="flex gap-6">
            <a
              href="https://github.com/klmrmt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--text-primary)] underline underline-offset-4 decoration-[var(--text-muted)] transition-colors duration-150 hover:decoration-[var(--text-primary)]"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kylemorimoto/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--text-primary)] underline underline-offset-4 decoration-[var(--text-muted)] transition-colors duration-150 hover:decoration-[var(--text-primary)]"
            >
              LinkedIn
            </a>
            <a
              href="mailto:klmrmt99@gmail.com"
              className="text-sm font-medium text-[var(--text-primary)] underline underline-offset-4 decoration-[var(--text-muted)] transition-colors duration-150 hover:decoration-[var(--text-primary)]"
            >
              Email
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
