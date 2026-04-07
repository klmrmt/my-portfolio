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

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] pt-10 pb-10 text-[var(--text-primary)]">
      <div className="relative w-[90%] border-2 border-[var(--border)] bg-[var(--surface-primary)] p-8 shadow-[8px_8px_0px_var(--shadow-color)] md:w-[70%]">
        <div className="absolute top-4 right-4">
          <ReturnButton />
        </div>

        {/* Hero Section */}
        <section
          ref={addToRefs}
          data-section="hero"
          className={`mb-10 transition-all duration-500 ease-out ${
            visibleSections.has('hero')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex h-32 w-32 items-center justify-center border-2 border-[var(--border)] bg-[var(--surface-secondary)] shadow-[4px_4px_0px_var(--shadow-color)]">
              <span className="text-4xl">👨‍💻</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 crt-cursor">Hey, I'm Kyle</h1>
              <p className="text-xl text-[var(--text-muted)]">Software Engineer building things that matter</p>
            </div>
          </div>
        </section>

        {/* My Story */}
        <section
          ref={addToRefs}
          data-section="story"
          className={`mb-10 transition-all duration-500 ease-out delay-75 ${
            visibleSections.has('story')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="mb-4 border-b-2 border-[var(--border)] pb-2 text-2xl font-bold">My Story</h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              I first got into programming during college at the University of Illinois, where a 
              single intro to CS course completely changed my trajectory. What started as curiosity 
              quickly became an obsession—I loved the feeling of building something from nothing.
            </p>
            <p>
              After graduating in 2022, I joined Epsilon as a Software Engineer, where I've been 
              focused on developing testing frameworks through automation. There's something deeply 
              satisfying about creating systems that help other engineers ship better code faster.
            </p>
          </div>
        </section>

        {/* What Drives Me */}
        <section
          ref={addToRefs}
          data-section="drives"
          className={`mb-10 transition-all duration-500 ease-out delay-150 ${
            visibleSections.has('drives')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="mb-4 border-b-2 border-[var(--border)] pb-2 text-2xl font-bold">What Drives Me</h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              I'm motivated by solving problems that have real impact. Whether it's automating 
              away tedious manual work, building tools that make developers' lives easier, or 
              learning new technologies that push my boundaries—I thrive when I'm challenged.
            </p>
            <p>
              I believe in writing clean, maintainable code and building systems that last. 
              There's an artistry to good software engineering that goes beyond just "making it work."
            </p>
          </div>
        </section>

        {/* Interests & Hobbies */}
        <section
          ref={addToRefs}
          data-section="interests"
          className={`mb-10 transition-all duration-500 ease-out delay-200 ${
            visibleSections.has('interests')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="mb-4 border-b-2 border-[var(--border)] pb-2 text-2xl font-bold">When I'm Not Coding</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🎮", label: "Gaming" },
              { emoji: "📚", label: "Reading" },
              { emoji: "🏃", label: "Running" },
              { emoji: "🎵", label: "Music" },
            ].map((interest, index) => (
              <div
                key={index}
                className="border-2 border-[var(--border)] bg-[var(--surface-primary)] p-4 text-center shadow-[4px_4px_0px_var(--shadow-color)] transition-all duration-150 ease-out hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-[var(--surface-secondary)] hover:shadow-[5px_5px_0px_var(--shadow-color)]"
              >
                <span className="text-3xl block mb-2">{interest.emoji}</span>
                <span className="font-semibold">{interest.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Connect */}
        <section
          ref={addToRefs}
          data-section="connect"
          className={`transition-all duration-500 ease-out delay-300 ${
            visibleSections.has('connect')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="mb-4 border-b-2 border-[var(--border)] pb-2 text-2xl font-bold">Let's Connect</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[var(--border)] bg-[var(--surface-primary)] px-4 py-2 font-semibold text-[var(--text-primary)] shadow-[4px_4px_0px_var(--shadow-color)] transition-all duration-150 ease-out hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-[var(--surface-secondary)] hover:shadow-[5px_5px_0px_var(--shadow-color)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[var(--border)] bg-[var(--surface-primary)] px-4 py-2 font-semibold text-[var(--text-primary)] shadow-[4px_4px_0px_var(--shadow-color)] transition-all duration-150 ease-out hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-[var(--surface-secondary)] hover:shadow-[5px_5px_0px_var(--shadow-color)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:klmrmt99@gmail.com"
              className="inline-flex items-center gap-2 border-2 border-[var(--border)] bg-[var(--surface-primary)] px-4 py-2 font-semibold text-[var(--text-primary)] shadow-[4px_4px_0px_var(--shadow-color)] transition-all duration-150 ease-out hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-[var(--surface-secondary)] hover:shadow-[5px_5px_0px_var(--shadow-color)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Email
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
