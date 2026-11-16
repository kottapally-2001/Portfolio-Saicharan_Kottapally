import React, { useState, useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../lib/theme";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const progressRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  /* Scroll state + reading progress */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(y / max, 1) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }
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

  /* Active section highlight */
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Lock page scroll + Escape to close while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`header ${scrolled ? "is-scrolled" : ""} ${
        menuOpen ? "menu-open" : ""
      }`}
    >
      <div className="scroll-progress" ref={progressRef} />

      <div className="nav-shell">
        <div className="nav-container">
          <a href="#hero" className="logo" onClick={closeMenu}>
            <span className="logo-mark">SK</span>
            <span className="logo-text">
              SaiCharan <em>Kottapally</em>
            </span>
          </a>

          <nav className={menuOpen ? "nav active" : "nav"} aria-label="Primary">
            {LINKS.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={closeMenu}
                className={active === link.id ? "is-active" : ""}
                style={{ "--i": i }}
              >
                <span className="nav-index">0{i + 1}</span>
                {link.label}
              </a>
            ))}

            <a
              href="/Resume.pdf"
              download
              className="resume-btn magnetic"
              onClick={closeMenu}
              style={{ "--i": LINKS.length }}
            >
              <FaDownload />
              Resume
            </a>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
              }
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              <FiSun className="icon-sun" />
              <FiMoon className="icon-moon" />
            </button>

            <button
              type="button"
              className="menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
