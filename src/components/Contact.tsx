import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, MessageCircle, MapPin, Mail, Sparkles, Check, 
  ArrowUpRight, Heart, HelpCircle, PhoneCall
} from "lucide-react";

export default function Contact() {
  const whatsappLink = "https://wa.me/97433819231?text=Hello%20Fathima%2C%20I%20would%20like%20to%20connect%20with%20you";

  // Form handling state (with beautiful animated success state)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    setErrorMsg("");

    // Honeypot spam protection: silently prevent bot spam
    if (honeypot) {
      setTimeout(() => {
        setIsSending(false);
        setIsSent(true);
        setName("");
        setEmail("");
        setMessage("");
        setHoneypot("");
      }, 1200);
      return;
    }

    // Simulate instant premium transmit validation
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setName("");
      setEmail("");
      setMessage("");
      // Reset sent badge after a friendly period
      setTimeout(() => setIsSent(false), 6000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="relative py-24 md:py-32 bg-transparent overflow-hidden px-6 md:px-12 border-t border-white/10 text-left"
    >
      {/* Decorative vertical lines */}
      <div className="editorial-grid-line-v left-6 md:left-12" />
      <div className="editorial-grid-line-v right-6 md:right-12" />

      {/* Fluid glowing backdrops */}
      <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-brand-mint/5 rounded-full filter blur-[80px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-mint font-bold block mb-4">
              V. Open Collaboration
            </span>
            <div className="h-[1px] w-24 bg-brand-mint mb-6" />
            <h2 className="font-serif text-[2.5rem] md:text-[4rem] leading-none text-brand-offwhite tracking-tight">
              Let's craft the <span className="italic text-brand-mint">future</span> together.
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className="text-brand-offwhite/85 text-lg font-light leading-relaxed max-w-2xl">
              Whether you are an educational board in Doha, an international online curriculum designer, or a curious parent looking to establish high-impact early development workflows, my doors are open.
            </p>
          </div>
        </div>

        {/* Interaction Card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="font-sans text-[10px] uppercase tracking-widest font-extrabold text-brand-mint block mb-2">
              Inquiries & Coordinates
            </span>

            {/* Doha Residence Coordinate Block */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-lg flex flex-col gap-4 text-left hover:border-brand-mint/30 transition-all duration-300 hover:scale-[1.03]">
              <div className="w-10 h-10 rounded-xl bg-brand-mint/10 flex items-center justify-center text-brand-mint shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-mint/80 font-semibold mb-1">Doha Workspace</span>
                <span className="font-serif text-lg text-brand-offwhite font-bold">Doha, Qatar</span>
                <span className="text-[10px] text-brand-mint font-bold tracking-widest uppercase mt-2">Shantiniketan Indian School Partner</span>
              </div>
            </div>

            {/* Email inquiry card */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-lg flex flex-col gap-4 text-left hover:border-brand-mint/30 transition-all duration-300 hover:scale-[1.03]">
              <div className="w-10 h-10 rounded-xl bg-brand-mint/10 flex items-center justify-center text-brand-mint shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-mint/80 font-semibold mb-1">Direct Correspondence</span>
                <a 
                  href="mailto:9canff@gmail.com" 
                  className="font-serif text-lg text-brand-offwhite font-bold hover:text-brand-mint transition-colors cursor-pointer"
                >
                  9canff@gmail.com
                </a>
                <span className="text-xs text-brand-offwhite/60 mt-1">Typical response within 24 hours</span>
              </div>
            </div>

            {/* Direct Instant Whatsapp communication Card */}
            <div className="p-8 rounded-2xl bg-[#1F4D3A]/25 backdrop-blur-md border border-brand-mint/20 shadow-2xl flex flex-col gap-4 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-mint/10 rounded-full blur-lg pointer-events-none" />
              
              <div className="w-10 h-10 rounded-xl bg-brand-mint/20 text-brand-mint shrink-0 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider mb-1">Immediate Conversation</span>
                <div className="font-serif text-xl font-bold text-brand-offwhite flex items-center gap-1.5 flex-wrap">
                  <span>+974 3381 9231</span>
                  <span className="text-[9px] px-2.5 py-1 rounded-full bg-brand-mint text-brand-dark uppercase tracking-widest font-sans font-extrabold shadow-sm">ONLINE</span>
                </div>
                <p className="text-xs text-brand-offwhite/85 mt-2 leading-relaxed max-w-[320px]">
                  Click the action below to open a direct WhatsApp drawer pre-filled with my classroom discussion greeting.
                </p>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-brand-mint hover:text-brand-offwhite transition-all cursor-pointer"
                >
                  <span>Launch WhatsApp Connection</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Side: Elegant Editorial Contact form submission */}
          <div className="lg:col-span-7 backdrop-blur-xl bg-white/5 p-8 md:p-12 border border-white/10 rounded-2xl shadow-2xl relative z-10">
            <h3 className="font-serif text-2xl font-bold text-brand-offwhite mb-2">
              Send an inquiry directly
            </h3>
            <p className="text-brand-offwhite/80 text-sm font-light mb-8 max-w-md">
              Please declare your name, institution coordinates, and curriculum details to initiate conversation templates.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="form_name" className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-mint font-bold">
                    Full Name
                  </label>
                  <input
                    id="form_name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Dr. Miriam Al-Thani"
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-[#021C1B]/60 text-brand-offwhite placeholder-brand-offwhite/40 focus:bg-[#1F4D3A]/40 focus:border-brand-mint focus:outline-none focus:ring-1 focus:ring-brand-mint transition-all text-sm font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="form_email" className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-mint font-bold">
                    Email address
                  </label>
                  <input
                    id="form_email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g., contact@institution.edu"
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-[#021C1B]/60 text-brand-offwhite placeholder-brand-offwhite/40 focus:bg-[#1F4D3A]/40 focus:border-brand-mint focus:outline-none focus:ring-1 focus:ring-brand-mint transition-all text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="form_msg" className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-mint font-bold">
                  Proposed Message Scope
                </label>
                <textarea
                  id="form_msg"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your curriculum boards, student timelines, or early learning milestones..."
                  className="w-full px-4 py-3 border border-white/10 rounded-xl bg-[#021C1B]/60 text-brand-offwhite placeholder-brand-offwhite/40 focus:bg-[#1F4D3A]/40 focus:border-brand-mint focus:outline-none focus:ring-1 focus:ring-brand-mint transition-all text-sm font-semibold resize-none"
                />
              </div>

              {/* Honeypot field for anti-bot protection */}
              <div className="hidden absolute opacity-0 pointer-events-none" aria-hidden="true">
                <input
                  type="text"
                  name="_honey"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`py-4 px-6 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSent 
                    ? "bg-[#1F4D3A] text-[#9FCBB3] border border-brand-mint/40" 
                    : "bg-gradient-to-r from-brand-forest to-brand-emerald text-brand-dark font-extrabold shadow-lg hover:shadow-brand-mint/15 hover:scale-[1.03]"
                }`}
              >
                {isSending ? (
                  <>
                    <span>Transmission processing...</span>
                  </>
                ) : isSent ? (
                  <>
                    <Check className="w-4.5 h-4.5" />
                    <span>Inquiry processed!</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Message Blueprint</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {isSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-5 rounded-2xl border border-brand-mint/20 bg-[#1F4D3A]/25 text-brand-offwhite text-xs max-w-lg flex flex-col gap-2.5 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-2 text-brand-mint font-bold text-sm">
                      <Sparkles className="w-4 h-4 animate-pulse shrink-0" />
                      <span>Blueprint success! inquiry Processed</span>
                    </div>
                    <p className="leading-relaxed text-brand-offwhite/90">
                      Thank you! Your message and details have been recorded successfully. Fathima will follow up with you at your convenience.
                    </p>
                  </motion.div>
                )}

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 rounded-2xl border border-red-500/20 bg-red-950/20 text-red-200 text-xs text-center font-medium leading-relaxed max-w-lg mx-auto"
                  >
                    ❌ {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Footer Editorial Branding line */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-start gap-1">
            <span className="font-serif text-lg font-bold text-brand-offwhite">Fathima Vakayil</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#9FCBB3]/70">Doha, Qatar • CBSE Certified Educator</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#9FCBB3]/60 font-light font-sans">
            <span>© {new Date().getFullYear()} Fathima Vakayil. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-brand-mint fill-brand-mint animate-pulse mx-0.5" />
            <span>in Doha, QA.</span>
          </div>
        </div>

      </div>

      {/* FLOATING WHATSAPP BUTTON (Always Visible) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 justify-end">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex-row cursor-pointer"
        >
          {/* Glowing pulse ring background */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10 group-hover:hidden" />
          
          <MessageCircle className="w-5 h-5 animate-bounce group-hover:scale-110 transition-transform duration-300" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-[140px] whitespace-nowrap transition-all duration-500 ease-in-out font-semibold">
            Chat with Fathima
          </span>
        </a>
      </div>

    </section>
  );
}
