"use client";
import { useState, useEffect, useRef } from "react";
import ReturnButton from "../components/returnButton";

const timelineItems = [
  {
    type: "work",
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
    type: "work",
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
    type: "work",
    title: "Research Assistant",
    company: "University of Illinois - Disruption Lab",
    date: "2021 - 2022",
    description: [
      "Conducted research on emerging technologies",
      "Analyzed market disruption patterns",
      "Contributed to academic publications and presentations",
    ],
  },
  {
    type: "education",
    title: "Bachelor of Science in Computer Science",
    company: "University of Illinois",
    date: "2019 - 2023",
    description: [
      "Focus on software engineering and systems",
      "Relevant coursework in algorithms, data structures, and distributed systems",
    ],
  },
];

const skills = {
  Languages: ["JavaScript/TypeScript", "Python", "Java", "C++", "Go"],
  Frameworks: ["React/Next.js", "Node.js", "Express", "Django", "Flask"],
  Tools: ["Git/GitHub", "Docker", "AWS", "Selenium", "pytest"],
};

export default function Resume() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = (entry.target as HTMLElement).dataset.index;
            if (index !== undefined) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const headerObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.1 }
    );

    const skillsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setSkillsVisible(true);
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (skillsRef.current) skillsObserver.observe(skillsRef.current);

    return () => {
      observer.disconnect();
      headerObserver.disconnect();
      skillsObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pt-10 pb-16">
      <div className="w-[90%] md:w-[85%] lg:w-[75%] mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex justify-between items-start mb-12 transition-all duration-700 ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-[-30px] opacity-0"
          }`}
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Kyle Morimoto</h1>
            <p className="text-xl text-gray-700">Software Engineer</p>
            <p className="text-sm text-gray-500 mt-1">
              Chicago, IL • kyle.morimoto@example.com
            </p>
          </div>
          <ReturnButton />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-black h-full" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleItems.has(String(index));

              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) itemRefs.current[index] = el;
                  }}
                  data-index={index}
                  className={`relative flex items-center ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div
                    className={`w-[45%] transition-all duration-700 ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : isLeft
                        ? "translate-x-[-50px] opacity-0"
                        : "translate-x-[50px] opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`p-5 border-2 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] ${
                        item.type === "education" ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {item.type === "education" && (
                          <span className="text-lg">🎓</span>
                        )}
                        <h3 className="text-lg font-bold">{item.title}</h3>
                      </div>
                      <p className="text-blue-600 font-medium mb-3">
                        {item.company}
                      </p>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Date in Center */}
                  <div
                    className={`w-[10%] flex justify-center transition-all duration-500 ${
                      isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="px-3 py-1.5 bg-black text-white text-xs font-bold whitespace-nowrap">
                      {item.date}
                    </div>
                  </div>

                  {/* Empty Space */}
                  <div className="w-[45%]" />

                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 border-black bg-white transition-all duration-300 ${
                      isVisible ? "scale-100" : "scale-0"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 100}ms` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Timeline End Cap */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-4 h-4 bg-black" />
        </div>

        {/* Skills Section */}
        <section
          ref={skillsRef}
          className={`mt-16 p-6 border-2 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-700 ${
            skillsVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-[50px] opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h4 className="font-bold mb-3 text-lg">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm border-2 border-black bg-gray-100 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
