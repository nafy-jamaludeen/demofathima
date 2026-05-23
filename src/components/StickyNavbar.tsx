import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function StickyNavbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "game", label: "Interactive" },
    { id: "contact", label: "Contact" },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? "py-4 bg-[#021C1B]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(2,28,27,0.5)]" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Monogram */}
          <button
            onClick={() => handleScrollTo("home")}
            className="group flex flex-col text-left relative z-50 cursor-pointer"
          >
            <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-brand-offwhite transition-colors duration-300 group-hover:text-brand-mint">
              Fathima Vakayil
            </span>
            <span className="font-sans text-[10px] uppercase font-bold tracking-[0.25em] text-brand-mint/90">
              Qatar • Educator
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="flex gap-1 p-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`relative px-4 py-1.5 text-xs uppercase font-semibold tracking-widest transition-all duration-300 rounded-full cursor-pointer ${
                      isActive 
                        ? "text-brand-dark font-bold" 
                        : "text-brand-offwhite/75 hover:text-brand-offwhite"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-brand-mint rounded-full z-[-1] shadow-[0_0_15px_rgba(159,203,179,0.3)]"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handleScrollTo("contact")}
              className="px-6 py-2.5 bg-gradient-to-r from-brand-forest to-brand-emerald text-brand-offwhite text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-500 hover:shadow-[0_0_20px_rgba(79,143,115,0.4)] hover:scale-[1.05] active:scale-[0.98] flex items-center gap-2 group cursor-pointer border border-white/10"
            >
              Get In Touch
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1 text-brand-mint" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-brand-offwhite hover:text-brand-mint z-50 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6 animate-pulse" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-[#021C1B]/95 backdrop-blur-2xl pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden border-b border-white/10"
          >
            {/* Editorial Line Deco */}
            <div className="editorial-grid-line-v left-8" />
            <div className="editorial-grid-line-v right-8" />

            <div className="flex flex-col gap-6 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-mint font-bold block mb-4">
                Navigation
              </span>
              <nav className="flex flex-col gap-3">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleScrollTo(item.id)}
                      className="text-left py-2 font-serif text-4xl font-light tracking-tight flex items-center justify-between group cursor-pointer"
                    >
                      <span className={`${isActive ? "text-brand-mint font-bold italic" : "text-brand-offwhite/80"}`}>
                        {item.label}
                      </span>
                      <ArrowRight className="w-5 h-5 text-brand-mint opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2" />
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/5 flex flex-col gap-4">
              <span className="font-sans text-xs text-brand-offwhite/50">Based in Doha, Qatar</span>
              <button
                onClick={() => handleScrollTo("contact")}
                className="w-full py-4 bg-gradient-to-r from-brand-forest to-brand-emerald text-brand-offwhite uppercase tracking-widest text-xs font-bold rounded-full hover:shadow-[0_0_20px_rgba(79,143,115,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 cursor-pointer border border-white/15"
              >
                Let's Collaborate
                <ArrowRight className="w-4 h-4 text-brand-mint" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
