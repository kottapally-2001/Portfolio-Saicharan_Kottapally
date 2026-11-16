import React from "react";
import { FaStar } from "react-icons/fa";
import { prefersReducedMotion } from "../lib/motion";

const projects = [
  {
    title: "MIYO Health Platform",
    category: "Enterprise Healthcare Platform",
    image: "/Miyo.jpg",
    featured: true,
    status: "Production",

    description:
      "Contributed as a Software Engineer at QTrams IT Solutions Pvt. Ltd. to the MIYO Health Platform, an enterprise healthcare solution serving therapists, schools, students, and administrators. Developed secure REST APIs with NestJS and PostgreSQL, optimized backend performance, implemented business modules, integrated Cube.js and AWS QuickSight analytics, and enhanced scalable healthcare workflows.",

    tech: [
      "React.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Cube.js",
      "AWS QuickSight",
      "REST APIs",
      "Prisma ORM",
      "Docker",
      "AWS",
    ],
  },

  {
    title: "AI Project Management Platform",
    category: "AI Powered Collaboration",
    image: "/Ai Analytics.png",
    status: "Completed",

    description:
      "Full-stack project management platform featuring authentication, team collaboration, document intelligence, semantic search, AI chatbot, vector embeddings, and Retrieval-Augmented Generation (RAG) using LangChain and Ollama.",

    tech: ["React.js", "Node.js", "MongoDB", "LangChain", "Ollama", "ChromaDB"],
  },

  {
    title: "Employee AI Analytics Dashboard",
    category: "Business Intelligence",
    image: "/Employee.png",
    status: "Completed",

    description:
      "Developed an enterprise analytics dashboard with JWT authentication, RBAC, PostgreSQL, NestJS, and Gemini AI integration to generate intelligent reports, analytics, and business insights.",

    tech: ["NestJS", "PostgreSQL", "JWT", "Gemini AI", "RBAC"],
  },

  {
    title: "Attendance Management System",
    category: "Enterprise Web Application",
    image: "/Attendence.png",
    status: "Completed",

    description:
      "Designed a complete attendance management system featuring secure authentication, dashboards, reporting, analytics, and role-based access control for educational institutions.",

    tech: ["React.js", "Node.js", "Express.js", "MySQL"],
  },
];

/* Gentle 3D tilt that follows the cursor */
const canTilt = () =>
  !prefersReducedMotion() &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function handleTilt(e) {
  if (!canTilt()) return;
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  const max = card.classList.contains("featured") ? 2.5 : 5;
  card.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
  card.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
}

function resetTilt(e) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow-index">04</span>
            Work
          </span>
          <h2 className="section-title">
            Featured <em>Projects</em>
          </h2>
          <p className="section-subtitle">
            Enterprise software, AI-powered applications, and scalable
            full-stack solutions built using modern technologies.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`project-card spot ${
                project.featured ? "featured" : ""
              }`}
              data-reveal
              style={{ "--d": project.featured ? 0 : index - 1 }}
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
            >
              <div className="project-media">
                {project.featured && (
                  <div className="featured-badge">
                    <FaStar />
                    Featured
                  </div>
                )}

                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="project-content">
                <div className="project-top">
                  <span className="project-category">{project.category}</span>

                  <span
                    className={`project-status ${
                      project.status === "Production" ? "is-live" : ""
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3>
                  <span className="project-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {project.title}
                </h3>

                <p>{project.description}</p>

                <div className="project-stack">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
