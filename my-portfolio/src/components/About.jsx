import React from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaLaptopCode,
  FaAward,
  FaCode,
  FaServer,
  FaBrain,
} from "react-icons/fa";
import { Counter } from "./Motion";

const DETAILS = [
  { icon: FaBriefcase, text: "Software Engineer" },
  { icon: FaLaptopCode, text: "Full Stack Developer" },
  { icon: FaGraduationCap, text: "MCA Post Graduate" },
  { icon: FaMapMarkerAlt, text: "Hyderabad, India" },
];

const HIGHLIGHTS = [
  { icon: FaCode, title: "Frontend", text: "React.js, JavaScript, TypeScript" },
  { icon: FaServer, title: "Backend", text: "NestJS, Node.js, Express.js" },
  {
    icon: FaBrain,
    title: "Artificial Intelligence",
    text: "LangChain, RAG, Ollama",
  },
  {
    icon: FaAward,
    title: "Enterprise Experience",
    text: "Healthcare & Analytics Platforms",
  },
];

const STATS = [
  { value: "1+", label: "Years Experience" },
  { value: "25+", label: "Projects Built" },
  { value: "10+", label: "Technologies" },
  { value: "2+", label: "Enterprise Apps" },
];

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow-index">01</span>
            About
          </span>
          <h2 className="section-title">
            About <em>Me</em>
          </h2>
          <p className="section-subtitle">
            Passionate about building scalable software, enterprise
            applications, and AI-powered solutions that create real business
            value.
          </p>
        </div>

        <div className="about-container">
          {/* LEFT */}
          <div className="about-left">
            <figure className="about-photo" data-reveal="clip">
              <img
                src="/Sai.png"
                alt="Sai Charan"
                className="about-profile"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <ul className="about-details" data-reveal style={{ "--d": 1 }}>
              {DETAILS.map((item) => (
                <li className="detail" key={item.text}>
                  <span className="detail-icon">
                    <item.icon />
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="about-right">
            <h3 data-reveal>
              Software Engineer specializing in{" "}
              <em>Full Stack &amp; AI Development</em>
            </h3>

            <div className="about-copy" data-reveal style={{ "--d": 1 }}>
              <p>
                I'm a Software Engineer with experience building scalable,
                enterprise-grade web applications using modern JavaScript
                technologies. I enjoy transforming business requirements into
                secure, high-performance software.
              </p>

              <p>
                Currently working on the <strong>MIYO Health Platform</strong>,
                where I develop secure REST APIs, optimize PostgreSQL databases,
                build analytics dashboards, and enhance healthcare applications
                using React.js, NestJS, Cube.js, and AWS QuickSight.
              </p>

              <p>
                I also build AI-powered applications using LangChain, RAG,
                Ollama, ChromaDB, Embeddings, and Vector Databases to create
                intelligent assistants and analytics platforms.
              </p>
            </div>

            {/* Highlights */}
            <div className="highlights">
              {HIGHLIGHTS.map((item, i) => (
                <div
                  className="highlight-card spot"
                  key={item.title}
                  data-reveal
                  style={{ "--d": i }}
                >
                  <span className="highlight-icon">
                    <item.icon />
                  </span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="about-cards" data-reveal>
              {STATS.map((stat) => (
                <div className="about-card" key={stat.label}>
                  <h2>
                    <Counter value={stat.value} />
                  </h2>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
