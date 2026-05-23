import { motion } from "motion/react";
import { Sparkles, Compass, Lightbulb, HeartHandshake, Puzzle, BookOpen, UserCheck } from "lucide-react";
import { SkillCategory } from "../types";

export default function Skills() {
  const skillSets: SkillCategory[] = [
    {
      id: "ece",
      title: "Early Childhood Education",
      description: "Masters pedagogical strategies engineered for the physical, cognitive, social, and emotional sprints of preschoolers. Builds a classroom climate rooted in psychological safety, active voice, and exploratory curiosity.",
      iconName: "Puzzle",
      tags: ["Early Years", "Pedagogical Care", "Milestone Tracking", "Multi-Sensory"]
    },
    {
      id: "curr",
      title: "Curriculum Design",
      description: "Engineers customized CBSE-foundational syllabus schedules and interactive digital courseware. Formulates bespoke lesson guidelines, digital interactive visual boards, and structured learning ladders for local and global teams.",
      iconName: "BookOpen",
      tags: ["CBSE Compliance", "Interactive Slides", "Gamified Loops", "Instructional Systems"]
    },
    {
      id: "student",
      title: "Student Development",
      description: "Develops customized positive reinforcement blueprints, emotional regulation exercises, and targeted learning accelerators. Conducts periodic testing paired with thorough, diagnostic caregiver counseling.",
      iconName: "UserCheck",
      tags: ["Positive Reinforcement", "Behavioral Safety", "Diagnostic Guidance", "Parent Support"]
    }
  ];

  // Helper mapping string icon names to icons to ensure clean imports
  const getIcon = (name: string) => {
    switch (name) {
      case "Puzzle": return Puzzle;
      case "BookOpen": return BookOpen;
      case "UserCheck": return UserCheck;
      default: return Sparkles;
    }
  };

  return (
    <section 
      id="skills" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent overflow-hidden px-6 md:px-12 border-t border-white/10"
    >
      {/* Decorative vertical lines */}
      <div className="editorial-grid-line-v left-6 md:left-12" />
      <div className="editorial-grid-line-v right-6 md:right-12" />

      {/* Luxury light grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(159,203,179,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(159,203,179,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-5 text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-mint font-bold block mb-4">
              III. Methodological Stance
            </span>
            <div className="h-[1px] w-24 bg-brand-mint mb-6" />
            <h2 className="font-serif text-[2.5rem] md:text-[4rem] leading-none text-brand-offwhite tracking-tight animate-fade-in">
              Sustainably <span className="italic text-brand-mint">engineered</span> competencies.
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end text-left">
            <p className="text-brand-offwhite/85 text-lg font-light leading-relaxed max-w-2xl">
              Focusing on high craftsmanship across key early learning disciplines. Fathima bridges raw educational objectives with real classroom engagement, utilizing custom materials and tactile digital interactive elements.
            </p>
          </div>
        </div>

        {/* Triple Editorial Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {skillSets.map((skill, sIdx) => {
            const IconComponent = getIcon(skill.iconName);
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: sIdx * 0.15 }}
                className="group relative flex flex-col justify-between p-8 md:p-10 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-mint/30 transition-all duration-500 overflow-hidden text-left hover:scale-[1.04] hover:shadow-[0_15px_35px_rgba(159,203,179,0.15)]"
              >
                {/* Decorative glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-brand-mint/5 group-hover:bg-brand-mint/15 filter blur-lg transition-all duration-500" />

                <div className="flex flex-col">
                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-xl bg-[#1F4D3A]/60 border border-white/10 flex items-center justify-center text-brand-mint group-hover:bg-brand-mint group-hover:text-brand-dark group-hover:border-brand-mint transition-all duration-300 mb-8 shrink-0">
                    <IconComponent className="w-5.5 h-5.5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold text-brand-offwhite mb-4 group-hover:text-brand-mint transition-colors duration-300">
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p className="text-brand-offwhite/80 text-sm md:text-base leading-relaxed font-light font-sans mb-8">
                    {skill.description}
                  </p>
                </div>

                {/* Tags block */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                  {skill.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[10px] font-mono tracking-wider font-semibold text-brand-mint bg-brand-mint/10 border border-brand-mint/20 px-2.5 py-1 rounded shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Methodology Footer Banner card */}
        <div className="mt-16 bg-gradient-to-r from-[#021C1B] via-[#1f4d3a]/60 to-[#021C1B] text-brand-offwhite p-8 md:p-12 border border-white/15 rounded-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
          {/* Subtle background motif */}
          <div className="absolute top-0 right-0 w-[300px] h-full bg-[radial-gradient(#9FCBB3_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          <div className="flex flex-col items-start text-left max-w-xl relative z-10 font-sans">
            <div className="flex items-center gap-2 mb-2 text-brand-mint">
              <Compass className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Guiding Light</span>
            </div>
            <h4 className="font-serif text-2xl md:text-3xl font-light mb-4 text-brand-offwhite">
              "We must remember that education is not the filling of a bucket, but the lighting of a fire."
            </h4>
            <span className="font-sans text-xs uppercase tracking-wider text-brand-mint/80 font-semibold">
              - Active Child Behavior Modeling
            </span>
          </div>

          <div className="relative group overflow-hidden max-w-[280px] w-full aspect-square rounded-2xl border border-white/10 shadow-2xl text-left bg-[#1F4D3A]/20 backdrop-blur-md p-2 shrink-0 z-10 transition-all duration-500 hover:scale-[1.03] hover:border-brand-mint/30">
            <img 
              src="/classroom_learning_art_1779549217370.png" 
              alt="Organic class materials of Fathima Vakayil" 
              className="w-full h-full object-cover rounded-xl opacity-95"
              referrerPolicy="no-referrer"
            />
            {/* Soft text overlay flag */}
            <div className="absolute bottom-4 left-4 right-4 bg-brand-dark/95 backdrop-blur-2xl p-4 border border-white/15 rounded-xl shadow-xl text-brand-offwhite flex flex-col gap-1">
              <span className="text-[9px] font-mono tracking-widest text-brand-mint uppercase font-black">Interactive Focus</span>
              <p className="text-[10px] text-brand-offwhite/90 leading-snug font-light">
                Tactile materials and child-friendly card puzzles keep active lesson goals engaging.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
