/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import StickyNavbar from "./components/StickyNavbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import MemoryGame from "./components/MemoryGame";
import Contact from "./components/Contact";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position to update active navbar links dynamically
  useEffect(() => {
    const sections = ["home", "about", "experience", "skills", "game", "contact"];
    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        {
          rootMargin: "-25% 0px -60% 0px", // Trigger when center of section enters view
          threshold: 0,
        }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  return (
    <div id="portfolio-root" className="min-h-screen bg-brand-dark text-brand-offwhite flex flex-col relative select-none selection:bg-brand-mint selection:text-brand-dark">
      
      {/* Luxury Editorial Background Watermarks (Fine layout grids) */}
      <div className="fixed inset-0 pointer-events-none z-10 select-none overflow-hidden">
        {/* Fine grid lines matching luxury editorial style */}
        <div className="editorial-grid-line-v left-6 md:left-12" />
        <div className="editorial-grid-line-v right-6 md:right-12" />
        <div className="editorial-grid-line-v left-1/3 hidden lg:block" />
        <div className="editorial-grid-line-v left-2/3 hidden lg:block" />
      </div>

      {/* Modern custom lag-behind pointer */}
      <CustomCursor />

      {/* Core Layout Navbar */}
      <StickyNavbar activeSection={activeSection} />

      {/* Layout Content Stacks */}
      <main className="relative z-20 flex-grow">
        
        {/* I. Landing Area */}
        <Hero />

        {/* II. Creative Persona Profile */}
        <About />

        {/* III. Curriculum Timeline */}
        <Experience />

        {/* IV. Skills & Pedagogy */}
        <Skills />

        {/* V. Interactive Edu-Playground */}
        <MemoryGame />

        {/* VI. Contact & Correspondence */}
        <Contact />

      </main>

    </div>
  );
}

