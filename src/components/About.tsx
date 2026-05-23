import { motion } from "motion/react";
import { BookOpen, Award, CheckCircle, ShieldCheck } from "lucide-react";

export default function About() {
  const credentials = [
    {
      id: "ba-econ",
      num: "01",
      degree: "BA in Economics",
      description: "University graduate. Formed a robust understanding of structural resource allocation, critical thinking, and logical analysis. Applied directly to planning, developmental milestones, and pedagogical cost-benefit analyses for educational institutes.",
      icon: BookOpen,
      tag: "Academic Core"
    },
    {
      id: "nsdtc",
      num: "02",
      degree: "NSDTC Teacher Training",
      description: "Comprehensive qualification in Early Childhood Education and modern foundational section curriculum frameworks. Advanced specialization in learner-centric frameworks, psychological safety, and experiential learning systems.",
      icon: Award,
      tag: "Professional License"
    }
  ];

  return (
    <section 
      id="about" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent overflow-hidden px-6 md:px-12 border-t border-white/10"
    >
      {/* Decorative vertical lines */}
      <div className="editorial-grid-line-v left-6 md:left-12" />
      <div className="editorial-grid-line-v right-6 md:right-12" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-4 flex flex-col justify-start">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-mint font-bold block mb-4">
              I. Architectural Mindset
            </span>
            <div className="h-[1px] w-24 bg-brand-mint mb-6" />
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-serif text-[2.5rem] md:text-[4rem] leading-none text-brand-offwhite tracking-tight mb-6 animate-fade-in">
              Educators define the <span className="italic text-brand-mint">foundations</span> of intellectual growth.
            </h2>
            <p className="text-brand-offwhite/85 text-lg leading-relaxed max-w-2xl font-light">
              Fathima Vakayil blends rigorous economics training with a deep mastery of early childhood instruction. By treating classrooms as structured environments of organic discovery, she develops curricula where complex, creative subjects are broken down into engaging, kid-friendly interactions.
            </p>
          </div>
        </div>

        {/* Credentials & Art Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Custom Generated Editorial Art with overlaps */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-brand-mint/10 rounded-2xl blur-xl filter opacity-40 pointer-events-none" />
            
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] p-3 shadow-2xl transition-all duration-500 border border-white/10 bg-[#1F4D3A]/20 backdrop-blur-md hover:border-brand-mint/30">
              {/* Asset Path refers to generated file with absolute care */}
              <img 
                src="/src/assets/images/editorial_education_art_1779548287378.png" 
                alt="Minimalist abstract watercolor art of modern early childhood education" 
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlapping text flag */}
              <div className="absolute bottom-8 left-8 right-8 bg-brand-dark/95 backdrop-blur-md p-6 border border-white/10 rounded-xl shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-brand-mint" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-mint">Pedagogical Philosophy</span>
                </div>
                <p className="font-serif text-sm italic text-brand-offwhite leading-relaxed">
                  "By establishing mathematical and logical harmony early, students excel effortlessly in complex subjects later."
                </p>
              </div>
            </div>

            {/* Red accent frame background offset */}
            <div className="absolute -inset-2 bg-transparent border border-brand-mint/15 rounded-2xl -z-10 translate-x-4 translate-y-4 pointer-events-none" />
          </div>

          {/* Right: Academic Credentials */}
          <div className="lg:col-span-7 flex flex-col gap-8 md:pl-6">
            <span className="font-sans text-xs uppercase tracking-widest font-bold text-brand-mint block mb-2">
              Academic Credentials
            </span>

            <div className="flex flex-col gap-6">
              {credentials.map((cred, idx) => {
                const IconComponent = cred.icon;
                return (
                  <motion.div
                    key={cred.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="group relative p-8 backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 hover:border-brand-mint/30 transition-all duration-500 flex flex-col md:flex-row gap-6 items-start hover:scale-[1.03] shadow-md hover:shadow-[0_10px_35px_rgba(159,203,179,0.15)]"
                  >
                    {/* Index Overlay */}
                    <div className="font-serif text-5xl font-light text-brand-mint/10 group-hover:text-brand-mint/25 transition-colors duration-300 select-none absolute right-6 top-4">
                      {cred.num}
                    </div>

                    <div className="w-12 h-12 rounded-lg bg-[#1F4D3A]/60 border border-white/10 flex items-center justify-center text-brand-mint group-hover:bg-brand-mint group-hover:text-brand-dark group-hover:border-brand-mint transition-all duration-300 shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-offwhite">
                          {cred.degree}
                        </h3>
                        <span className="text-[10px] uppercase font-bold text-brand-mint tracking-widest px-2.5 py-1 border border-brand-mint/20 bg-brand-mint/10 rounded-full">
                          {cred.tag}
                        </span>
                      </div>
                      <p className="text-brand-offwhite/80 text-sm md:text-base leading-relaxed font-light font-sans">
                        {cred.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Dynamic bullet items in high-end format */}
            <div className="mt-6 p-6 border-l-2 border-brand-mint bg-[#1F4D3A]/20 backdrop-blur-sm rounded-r-2xl">
              <span className="font-display text-xs font-bold text-brand-mint uppercase tracking-wider block mb-3">Key Paradigms</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-offwhite/85 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-mint shrink-0" />
                  <span>Interactive lesson design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-mint shrink-0" />
                  <span>Differentiated learning speeds</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-mint shrink-0" />
                  <span>Cognitive milestone matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-mint shrink-0" />
                  <span>Multi-sensory educational models</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
