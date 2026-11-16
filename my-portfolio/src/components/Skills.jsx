import React from "react";
import {
  FaCode,
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaBrain,
  FaCloud,
  FaChartPie,
  FaToolbox,
} from "react-icons/fa";

const SKILL_GROUPS = [
  {
    title: "Languages",
    icon: FaCode,
    span: 2,
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    title: "Frontend",
    icon: FaLaptopCode,
    skills: ["React"],
  },
  {
    title: "Cloud & DevOps",
    icon: FaCloud,
    skills: ["AWS", "Docker", "Linux"],
  },
  {
    title: "Backend",
    icon: FaServer,
    span: 2,
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "REST APIs",
      "Socket.IO",
      "JWT Authentication",
    ],
  },
  {
    title: "Databases & ORM",
    icon: FaDatabase,
    span: 2,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Prisma ORM", "TypeORM"],
  },
  {
    title: "AI & Machine Learning",
    icon: FaBrain,
    span: 2,
    skills: [
      "AI / GenAI",
      "LangChain",
      "RAG",
      "Ollama",
      "ChromaDB",
      "Vector Databases",
    ],
  },
  {
    title: "Analytics & Visualization",
    icon: FaChartPie,
    skills: ["Cube.js", "AWS QuickSight"],
  },
  {
    title: "Tools",
    icon: FaToolbox,
    skills: ["Git", "GitHub", "Postman", "Jira"],
  },
];

const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.skills);
const ROW_A = ALL_SKILLS.filter((_, i) => i % 2 === 0);
const ROW_B = ALL_SKILLS.filter((_, i) => i % 2 === 1);

function MarqueeRow({ items, reverse }) {
  return (
    <div className={`marquee ${reverse ? "reverse" : ""}`}>
      <div className="marquee-track">
        {[...items, ...items].map((skill, i) => (
          <span className="marquee-item" key={i}>
            {skill}
            <span className="marquee-star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow-index">03</span>
            Skills
          </span>
          <h2 className="section-title">
            Tools &amp; <em>Technologies</em>
          </h2>
          <p className="section-subtitle">
            Technologies I use to build scalable enterprise software,
            AI-powered applications, and cloud solutions.
          </p>
        </div>
      </div>

      <div className="marquee-wrap" aria-hidden="true" data-reveal="fade">
        <MarqueeRow items={ROW_A} />
        <MarqueeRow items={ROW_B} reverse />
      </div>

      <div className="container">
        <div className="skills-grid">
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={group.title}
              className={`skill-group spot ${
                group.span === 2 ? "span-2" : ""
              }`}
              data-reveal
              style={{ "--d": i % 4 }}
            >
              <div className="skill-group-head">
                <span className="skill-group-icon">
                  <group.icon />
                </span>
                <span className="skill-group-count">
                  {String(group.skills.length).padStart(2, "0")}
                </span>
              </div>

              <h3>{group.title}</h3>

              <div className="skill-chips">
                {group.skills.map((skill) => (
                  <span className="skill-box" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
