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
          <h1 className="font-display text-5xl font-extrabold tracking-tight crt-cursor">About Me</h1>
          <div className="mt-6 h-px w-16 bg-[var(--border)]" />
        </section>

        {/* My Story */}
        <section
          ref={addToRefs}
          data-section="story"
          className={`mb-14 ${sectionClass("story", "delay-75")}`}
        >
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              I first got into programming in high school, where my school offered CS classes
              that immediately clicked for me. It wasn&apos;t completely new territory though&mdash;my
              dad is a software engineer, so I grew up seeing code on his screen long before I
              ever wrote my first line. That early exposure made engineering feel familiar, and
              once I finally tried it myself, I was hooked.
            </p>
            <p>
              After graduating in 2022, I joined Epsilon as a Software Engineer, where I&apos;ve
              focused on building automation systems and testing frameworks. A lot of my work
              sits behind the scenes, but it plays a critical role&mdash;helping teams ship
              faster, reduce risk, and trust their systems.
            </p>
            <p>
              Outside of engineering, music has been a huge part of my life. I&apos;ve been playing
              violin since I was five years old, and I&apos;ve been incredibly fortunate to travel
              and perform around the world with my academy. Those experiences shaped a lot of
              how I think&mdash;about discipline, creativity, and putting in the work to refine
              something over time. More recently, I started playing again casually&mdash;last
              year I even played at a few farmers markets just for fun and to reconnect with it.
            </p>
            <p>
              I also spend a lot of time climbing&mdash;it&apos;s one of the few things that fully
              pulls me away from a screen. If you climb too, feel free to follow me on{" "}
              <a
                href="https://www.kayaclimb.com/user/klmrmt"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-[var(--text-muted)] transition-colors duration-150 hover:decoration-[var(--text-primary)]"
              >
                Kaya (@klmrmt)
              </a>
              .
            </p>
            <p>
              Over time, I&apos;ve gravitated toward solving broader engineering
              problems&mdash;designing systems for scale, improving developer workflows, and
              building tools that remove friction across teams. I enjoy working on things that
              don&apos;t just function, but make everything around them better.
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
              I&apos;m motivated by building things that actually make someone&apos;s life easier.
            </p>
            <p>That could mean:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Automating away something repetitive and painful</li>
              <li>Creating internal tools that engineers rely on every day</li>
              <li>Or designing systems that quietly make everything run smoother</li>
            </ul>
            <p>
              Lately, I&apos;ve been especially interested in moving closer to product-focused
              engineering&mdash;building experiences, not just systems. I like the idea of owning
              something end-to-end and seeing how it impacts real users.
            </p>
            <p>
              I&apos;m also really interested in the social space. It feels like modern social
              media has slowly drifted away from its original purpose&mdash;helping people stay
              connected with their friends and actually share life with each other. I&apos;m drawn
              to the idea of building products that bring that feeling back in a more intentional
              and meaningful way.
            </p>
            <p>
              I care a lot about writing clean, maintainable code&mdash;but also about why
              I&apos;m building something in the first place. In a world where AI can generate
              code instantly and products ship faster than ever, I think it matters even more to
              slow down and build things thoughtfully&mdash;systems that are not just functional,
              but efficient, elegant, and built to last.
            </p>
            <p>
              At the end of the day, I just like building. Whether it&apos;s a small side project,
              a new idea, or a system at scale&mdash;that process of turning something from
              nothing into something real is what keeps me coming back.
            </p>
          </div>
        </section>

        {/* Connect */}
        <section
          ref={addToRefs}
          data-section="connect"
          className={sectionClass("connect", "delay-200")}
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
