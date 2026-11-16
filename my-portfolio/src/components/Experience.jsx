import React, { useEffect, useRef } from "react";

import experience1 from "../assets/experience1.jpeg";
import experience2 from "../assets/experience2.jpeg";
import experience3 from "../assets/experience3.jpeg";
import experience4 from "../assets/experience4.jpeg";

import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

function Experience() {
  const experiences = [
    {
      company: "Tejoma Technologies Private Limited",
      role: "Software Engineer | Full Stack Developer",
      duration: "Aug 2026 - Present",
      location: "Hyderabad, India",
      description: [
        "Developed a full-stack company website showcasing Tejoma's services and business offerings.",
        "Built responsive frontend pages using React.js, JavaScript, HTML5, and CSS3.",
        "Developed backend functionality and REST APIs using Node.js and Express.js.",
        "Integrated frontend components with backend services and implemented application workflows.",
        "Performed debugging, testing, and code improvements to enhance application reliability and maintainability.",
      ],
      tech: [
        "AI / GenAI",
        "React.js",
        "JavaScript",
        "Node.js",
        "Express.js",
        "NestJS",
        "REST APIs",
        "PostgreSQL",
        "HTML5",
        "CSS3",
        "Git",
        "GitHub",
        "Docker",
        "AWS",
      ],
      current: true,
      images: [],
    },
    {
      company: "QTrams IT Solutions Pvt. Ltd.",
      role: "Software Engineer | Full Stack Developer",
      duration: "Jul 2025 - Jul 2026",
      location: "Hyderabad, India",
      description: [
        "Contributed to the development and optimization of the MIYO Health Platform.",
        "Developed and optimized NestJS REST APIs, improving API performance by 25%.",
        "Built features for appointment scheduling, treatment management, and user administration.",
        "Optimized PostgreSQL queries and integrated React.js frontend components with backend services.",
        "Developed analytics dashboards using Cube.js and AWS QuickSight.",
        "Supported data migration, debugging, testing, and Agile development practices.",
      ],
      tech: [
        "React.js",
        "JavaScript",
        "Node.js",
        "Express.js",
        "NestJS",
        "PostgreSQL",
        "Cube.js",
        "AWS QuickSight",
        "Prisma",
        "MongoDB",
        "TypeScript",
        "LangChain",
        "Ollama",
        "ChromaDB",
        "Embeddings",
        "AI / GenAI",
        "Docker",
        "AWS",
        "REST APIs",
        "Git",
        "Agile",
      ],
      current: false,
      images: [
        { src: experience1, alt: "QTrams 1" },
        { src: experience2, alt: "QTrams 2" },
      ],
    },
    {
      company: "Infoz IT Solutions",
      role: "Full Stack Developer Intern",
      duration: "Apr 2025 - Jun 2025",
      location: "Hyderabad, India",
      description: [
        "Built responsive web applications using Python, Django, HTML, CSS, JavaScript, and Bootstrap.",
        "Developed REST APIs for authentication, CRUD operations, and business logic.",
        "Worked with MySQL databases, validation, debugging, and application testing.",
        "Used Git/GitHub and followed Agile development practices.",
      ],
      tech: [
        "Python",
        "Django",
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
        "MySQL",
        "REST APIs",
        "Git",
      ],
      current: false,
      images: [
        { src: experience3, alt: "Infoz 1" },
        { src: experience4, alt: "Infoz 2" },
      ],
    },
  ];

  const timelineRef = useRef(null);

  /* Gold line fills as you scroll through the timeline */
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      el.style.setProperty("--progress", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow-index">02</span>
            Experience
          </span>
          <h2 className="section-title">
            Professional <em>Experience</em>
          </h2>
          <p className="section-subtitle">
            Building scalable enterprise software, cloud applications and
            AI-powered solutions with modern technologies.
          </p>
        </div>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-track" aria-hidden="true">
            <div className="timeline-fill" />
          </div>

          {experiences.map((exp) => (
            <article className="timeline-item" key={exp.company} data-reveal>
              <div className="timeline-node" aria-hidden="true">
                <FaBriefcase />
              </div>

              <div
                className={`experience-layout ${
                  exp.images.length ? "" : "no-images"
                }`}
              >
                {/* Left Side */}
                <div className="experience-card spot">
                  <div className="experience-top">
                    <div>
                      <span className="experience-company">{exp.company}</span>
                      <h3>{exp.role}</h3>
                    </div>

                    {exp.current && (
                      <span className="current-badge">
                        <span className="pulse-dot" />
                        Current
                      </span>
                    )}
                  </div>

                  <div className="experience-meta">
                    <span>
                      <FaCalendarAlt />
                      {exp.duration}
                    </span>

                    <span>
                      <FaMapMarkerAlt />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="experience-list">
                    {exp.description.map((item, i) => (
                      <li key={i}>
                        <FaCheckCircle />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="experience-tech">
                    {exp.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Right Side Images */}
                {exp.images.length > 0 && (
                  <div className="experience-images">
                    {exp.images.map((img, i) => (
                      <figure
                        key={img.alt}
                        data-reveal="clip"
                        style={{ "--d": i + 1 }}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
