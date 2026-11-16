import React, { useEffect, useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaArrowRight,
  FaAws,
} from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si";
import { HiSparkles } from "react-icons/hi";
import { Counter, WordRotator } from "./Motion";
import { prefersReducedMotion } from "../lib/motion";

const ROLES = [
  "Software Engineer",
  "Full Stack Developer",
  "Backend Developer",
  "AI Engineer",
  "React Developer",
];

const TECH = [
  { label: "React.js", icon: SiReact, pos: "react", depth: 26 },
  { label: "JavaScript", icon: SiJavascript, pos: "js", depth: -18 },
  { label: "TypeScript", icon: SiTypescript, pos: "ts", depth: 34 },
  { label: "NestJS", icon: SiNestjs, pos: "nest", depth: -28 },
  { label: "Node.js", icon: SiNodedotjs, pos: "node", depth: 20 },
  { label: "PostgreSQL", icon: SiPostgresql, pos: "sql", depth: -22 },
  { label: "AI / GenAI", icon: HiSparkles, pos: "ai", depth: 30 },
  { label: "AWS", icon: FaAws, pos: "aws", depth: -16 },
];

const STATS = [
  { value: "1+", label: "Years Experience" },
  { value: "25+", label: "Projects Completed" },
  { value: "10+", label: "Technologies" },
];

function Hero() {
  const heroRef = useRef(null);

  /* Subtle pointer parallax on the portrait + floating chips */
  useEffect(() => {
    const el = heroRef.current;
    if (
      !el ||
      prefersReducedMotion() ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;

    let raf = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="container hero-container">
        {/* Left Side */}
        <div className="hero-left">
          <span className="hero-badge load" style={{ "--d": 0 }}>
            <span className="pulse-dot" />
            Welcome to my Portfolio
          </span>

          <h1 className="hero-title">
            <span className="line">
              <span className="line-inner hello" style={{ "--d": 1 }}>
                Hi, I'm
              </span>
            </span>
            <span className="line">
              <span className="line-inner" style={{ "--d": 2 }}>
                Sai Charan
              </span>
            </span>
            <span className="line">
              <span className="line-inner gold-text" style={{ "--d": 3 }}>
                <em>Kottapally</em>
              </span>
            </span>
          </h1>

          <div className="hero-role load" style={{ "--d": 4 }}>
            <span className="role-rule" />
            <WordRotator words={ROLES} />
          </div>

          <p className="hero-text load" style={{ "--d": 5 }}>
            Software Engineer with hands-on experience in building scalable
            full-stack and AI-powered applications using React.js, NestJS,
            Node.js, Express.js, PostgreSQL, MongoDB, and modern cloud
            technologies. Passionate about clean architecture, performance,
            and exceptional user experiences.
          </p>

          <div className="hero-buttons load" style={{ "--d": 6 }}>
            <a href="/Resume.pdf" download className="btn btn-primary magnetic">
              <FaDownload />
              Download Resume
            </a>

            <a href="#projects" className="btn btn-ghost magnetic">
              View Projects
              <FaArrowRight className="icon-arrow" />
            </a>
          </div>

          <div className="hero-foot load" style={{ "--d": 7 }}>
            <div className="hero-social">
              <a
                href="https://github.com/kottapally-2001"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="magnetic"
                data-strength="0.4"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/saicharan-kottapally-69bb1a1a4/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="magnetic"
                data-strength="0.4"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:saicharan.kottapally@gmail.com"
                aria-label="Email"
                className="magnetic"
                data-strength="0.4"
              >
                <FaEnvelope />
              </a>
            </div>

            <div className="hero-stats">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <h3>
                    <Counter value={stat.value} />
                  </h3>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hero-right">
          <div className="portrait">
            <div className="portrait-glow" />
            <div className="portrait-arc arc-1" />
            <div className="portrait-arc arc-2" />

            <div className="portrait-frame">
              <img
                src="/profile.png"
                alt="Sai Charan Kottapally"
                fetchPriority="high"
              />
            </div>
          </div>

          {TECH.map((tech, i) => (
            <div
              key={tech.label}
              className={`tech tech-${tech.pos}`}
              style={{ "--depth": tech.depth, "--i": i }}
            >
              <span className="tech-inner">
                <tech.icon className="tech-icon" />
                {tech.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span>Scroll</span>
        <span className="scroll-cue-line" />
      </a>
    </section>
  );
}

export default Hero;
