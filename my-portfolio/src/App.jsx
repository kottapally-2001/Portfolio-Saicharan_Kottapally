import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { useMotionEffects } from "./lib/motion";

function App() {
  useMotionEffects();

  return (
    <div className="app">
      <div className="ambient" aria-hidden="true">
        <div className="ambient-glow glow-1" />
        <div className="ambient-glow glow-2" />
        <div className="ambient-glow glow-3" />
        <div className="ambient-grid" />
        <div className="ambient-noise" />
      </div>

      <Header />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
