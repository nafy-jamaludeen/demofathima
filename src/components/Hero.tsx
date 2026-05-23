import { motion } from "motion/react";
import { ArrowDown, GraduationCap, MapPin, Sparkles } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const handleLearnMore = () => {
    const element = document.getElementById("about");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-between bg-transparent pt-32 pb-12 overflow-hidden px-6 md:px-12"
    >
      {/* Structural Editorial Layout Lines */}
      <div className="editorial-grid-line-v left-6 md:left-12" />
      <div className="editorial-grid-line-v right-6 md:right-12" />
      <div className="editorial-grid-line-v left-1/3 hidden lg:block" />
      <div className="editorial-grid-line-v left-2/3 hidden lg:block" />

      {/* Floating premium organic light glows */}
      <div className="absolute top-1/4 right-[10%] w-[380px] h-[380px] bg-brand-mint/10 rounded-full filter blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-12 left-1/4 w-[300px] h-[300px] bg-brand-emerald/10 rounded-full filter blur-[80px] pointer-events-none z-0" />

      {/* Hero Header Space Tracker */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex justify-between items-center text-xs uppercase tracking-[0.25em] font-semibold text-brand-mint/90 mt-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-brand-mint" />
          <span>Doha, Qatar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-mint animate-pulse" />
          <span>Interactive Pedagogy</span>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10 py-8">
        
        {/* Left Column - Colossal Text & Titles */}
        <motion.div 
          className="lg:col-span-8 flex flex-col justify-center text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle / Role Tag */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-4.5 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md w-fit mb-6"
          >
            <GraduationCap className="w-4 h-4 text-brand-mint" />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-offwhite">
              EDUCATOR | CURRICULUM DEVELOPER
            </span>
          </motion.div>

          {/* Monumental Editorial Titles */}
          <div className="overflow-hidden mb-2">
            <motion.h1 
              variants={itemVariants}
              className="font-serif text-[4rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[8.5rem] leading-[0.85] font-light text-brand-offwhite tracking-tight"
            >
              Fathima
            </motion.h1>
          </div>

          <div className="overflow-hidden pb-4 md:pb-6 mb-2 md:mb-0 flex flex-wrap items-baseline gap-x-6">
            <motion.h1 
              variants={itemVariants}
              className="font-serif text-[4rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[8.5rem] leading-[0.85] font-light text-brand-offwhite tracking-tight italic text-transparent stroke-text"
            >
              Vakayil
            </motion.h1>
            <motion.span 
              variants={itemVariants}
              className="font-sans text-xs tracking-[0.15em] text-brand-dark bg-brand-mint font-bold px-3 py-1 rounded shadow-[0_0_15px_rgba(159,203,179,0.3)]"
            >
              PORTFOLIO
            </motion.span>
          </div>

          {/* Luxury Divider */}
          <motion.div 
            variants={lineVariants}
            className="h-[1px] w-full bg-brand-mint/20 origin-left mb-8"
          />

          {/* Narrative / Intro Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            <motion.p 
              variants={itemVariants}
              className="text-brand-offwhite/85 text-base md:text-lg leading-relaxed font-sans font-light"
            >
              Crafting premium educational opportunities that spark curiosity, active engagement, and profound foundation-level development. Specialized in early childhood environments in Qatar and bespoke international curriculum design.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col gap-4 justify-end items-start md:items-end text-left md:text-right"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-mint">
                Coordinates & Stance
              </div>
              <div className="font-mono text-xs text-brand-offwhite/60">
                25.2854° N, 51.5310° E
              </div>
              <div className="font-serif text-base italic text-brand-mint/90">
                "Early years shape lifelong paradigms."
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Luxury Editorial Mask Image Reveal */}
        <motion.div 
          className="lg:col-span-4 relative flex justify-center lg:justify-end animate-fade-in"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Overlapping aesthetic blocks containing the beautiful synced children_creative_art */}
          <div className="relative w-full max-w-[320px] aspect-[4/5] bg-[#1F4D3A]/30 rounded-t-[160px] border border-white/10 p-3 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-brand-mint/30">
            {/* Fine grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#9FCBB3_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none z-10" />

            {/* Main organic/education background artwork */}
            <div className="absolute inset-0 w-full h-full p-2">
              <img 
                src="/children_creative_art_1779549239716.png" 
                alt="Fathima Vakayil creative class style" 
                className="w-full h-full object-cover rounded-t-[144px] rounded-b-md opacity-90 transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#021C1B]/20 to-[#021C1B]/80 rounded-t-[144px] rounded-b-md" />
            </div>

            <div className="self-end text-[9px] font-mono tracking-widest text-[#021C1B] bg-brand-mint px-2py-0.5 px-2.5 rounded shadow-[0_2px_10px_rgba(159,203,179,0.3)] relative z-20 font-bold">
              QTR 2026
            </div>

            <div className="relative z-20 mt-auto p-4 text-center bg-[#1F4D3A]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
              <span className="font-serif text-base font-semibold text-brand-mint mb-1 block">Creative Pedagogy</span>
              <p className="text-[10px] text-brand-offwhite/90 leading-relaxed font-light">
                Blending academic structure with creative spatial and digital interactive tools.
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-brand-mint font-bold pt-3 border-t border-white/5 relative z-20">
              <span>Foundation Years</span>
              <span>• CBSE & Noorify</span>
            </div>
          </div>

          {/* Red decorative offset frame block */}
          <div className="absolute inset-0 bg-transparent border border-brand-mint/10 rounded-t-[160px] translate-x-3 translate-y-3 pointer-events-none -z-10" />
        </motion.div>

      </div>

      {/* Footer Element & Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex justify-between items-center text-xs mt-4">
        <span className="font-mono text-[10px] text-brand-offwhite/40">
          DESIGNED FOR HEIRLOOM INSTRUCTION 
        </span>
        <button
          onClick={handleLearnMore}
          className="group flex items-center gap-3 font-semibold uppercase tracking-widest text-xs text-brand-mint hover:text-brand-offwhite transition-all duration-300 cursor-pointer"
        >
          <span>Discover Journey</span>
          <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-brand-mint group-hover:text-brand-dark transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_15px_rgba(159,203,179,0.4)]">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </span>
        </button>
      </div>
    </section>
  );
}
