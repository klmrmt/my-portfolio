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
          <h1 className="font-display text-5xl font-extrabold tracking-tight crt-cursor">
            Hey, I&apos;m Kyle.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">
            Software engineer in Chicago.
          </p>
          <div className="mt-8 h-px w-16 bg-[var(--border)]" />
        </section>

        {/* How I got here */}
        <section
          ref={addToRefs}
          data-section="story"
          className={`mb-14 ${sectionClass("story", "delay-75")}`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            How I got here
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Back when I was a kid, I remember staring at my dad&apos;s computer screen and seeing
              code and terminals for the first time. Later, when he told me more about what he
              did, I decided I wanted to do something similar in engineering. He started as an
              electrical engineer and later became a software engineer working in telecom
              networking. By high school, I was dabbling in engineering classes to see if I liked
              them. I took computer science classes too and realized that I really enjoyed the
              problem-solving they gave me.
            </p>
            <p>
              Since graduating from UIUC in 2022, I&apos;ve been at Epsilon building testing
              frameworks, automation, and the tooling around them. Much of my current work has
              focused on improving our overall systems, since many of them were pretty old and
              hadn&apos;t been maintained well. Most of the repos we maintain started as POCs and
              were never refactored into production-ready suites. Basically, there were a lot of
              Band-Aids. Over the past year, I&apos;ve focused on improving our applications, whether
              that means changing the architecture or improving code quality throughout our
              repos.
            </p>
          </div>
        </section>

        {/* Off screen */}
        <section
          ref={addToRefs}
          data-section="off-screen"
          className={`mb-14 ${sectionClass("off-screen", "delay-150")}`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Off screen
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              I started playing violin when I was five. I spent years traveling and performing
              with my academy, took a break, and recently started playing again. Last year, that
              meant playing at a few farmers markets, which was low-stakes and a lot of fun.
            </p>
            <p>
              I also climb a lot (very typical asian swe)! I&apos;ve found that it scratches
              a competitive and problem solving itch that I really enjoy. If you climb too, I&apos;m{" "}
              <a
                href="https://www.kayaclimb.com/user/klmrmt"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[var(--text-muted)] underline-offset-4 transition-colors duration-150 hover:decoration-[var(--text-primary)]"
              >
                @klmrmt on Kaya
              </a>
              .
            </p>
          </div>
        </section>

        {/* What I am curious about */}
        <section
          ref={addToRefs}
          data-section="curious"
          className={`mb-14 ${sectionClass("curious", "delay-200")}`}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            What I&apos;m curious about
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              The part I like most is finding whatever is slow, fragile, or confusing and making
              it simpler. Lately, I&apos;ve been more interested in building products. I&apos;ve
              been working on games and a few social platforms on the side. I&apos;ve also been
              playing around with AI to see how prompting might change the way software engineers
              work.
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
