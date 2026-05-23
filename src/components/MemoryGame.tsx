import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Puzzle, BookOpen, Microscope, Globe, Palette, Calculator, Apple, 
  RotateCcw, Trophy, Sparkles, Volume2, VolumeX, Info 
} from "lucide-react";
import { MemoryCard } from "../types";

// Cute kid-friendly educational card definitions (6 pairs = 12 cards with bright, clear emojis)
const CARD_TEMPLATES = [
  { iconName: "book", label: "Reading", colorClass: "bg-[#1F4D3A] border-brand-mint/30 text-brand-mint", emoji: "📚" },
  { iconName: "microscope", label: "Science", colorClass: "bg-[#1F4D3A] border-brand-mint/30 text-brand-mint", emoji: "🔬" },
  { iconName: "globe", label: "Geography", colorClass: "bg-[#1F4D3A] border-brand-mint/30 text-brand-mint", emoji: "🌐" },
  { iconName: "palette", label: "Art", colorClass: "bg-[#1F4D3A] border-brand-mint/30 text-brand-mint", emoji: "🎨" },
  { iconName: "calculator", label: "Math", colorClass: "bg-[#1F4D3A] border-brand-mint/30 text-brand-mint", emoji: "🧮" },
  { iconName: "apple", label: "Health", colorClass: "bg-[#1F4D3A] border-brand-mint/30 text-brand-mint", emoji: "🍎" },
];

export default function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<number>(() => {
    const saved = localStorage.getItem("fathima_matching_best");
    return saved ? parseInt(saved, 10) : 999;
  });

  // Confetti helper state
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; size: number; rotation: number }[]>([]);

  // Sound Synth Generator (Web Audio API - No static filesystem load issues!)
  const playSound = (type: "flip" | "match" | "mismatch" | "win") => {
    if (muted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "flip") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "match") {
        // High double chime
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "mismatch") {
        // Low dud slide
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "win") {
        // Star arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = "sine";
          o.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          g.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.3);
          o.start(ctx.currentTime + idx * 0.08);
          o.stop(ctx.currentTime + idx * 0.08 + 0.3);
        });
      }
    } catch (e) {
      // Audio permission limits in sandboxed iframes
    }
  };

  // Initialize and Shuffle
  const initializeGame = () => {
    const list: MemoryCard[] = [];
    let idCounter = 1;

    // Create dual pairs
    CARD_TEMPLATES.forEach((temp) => {
      list.push({
        id: idCounter++,
        iconName: temp.iconName,
        label: temp.label,
        colorClass: temp.colorClass,
        emoji: temp.emoji,
        isFlipped: false,
        isMatched: false,
      });
      list.push({
        id: idCounter++,
        iconName: temp.iconName,
        label: temp.label,
        colorClass: temp.colorClass,
        emoji: temp.emoji,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle list using Fisher-Yates
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    setCards(list);
    setSelectedIndices([]);
    setMoves(0);
    setIsWon(false);
    setConfetti([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Trigger confetti shower
  const spawnConfetti = () => {
    const colors = ["#8A9A86", "#FA8072", "#C5A880", "#BA5757", "#A4B2A0", "#6D9E9B"];
    const items = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random start horizontal %
      y: -10 - Math.random() * 40, // stagger vertically above scroll container
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 14,
      rotation: Math.random() * 360,
    }));
    setConfetti(items);
  };

  // Action: Flip Card
  const handleCardClick = (index: number) => {
    // Escape criteria: Already flipped, matched, or busy checking 2 card index
    if (cards[index].isFlipped || cards[index].isMatched || selectedIndices.length >= 2 || isWon) {
      return;
    }

    // Flip transition
    playSound("flip");
    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    // Evaluate pairs upon second flip
    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstIdx, secondIdx] = newSelected;
      const cardA = cards[firstIdx];
      const cardB = cards[secondIdx];

      if (cardA.iconName === cardB.iconName) {
        // MATCH!
        setTimeout(() => {
          playSound("match");
          const matchedCards = [...cards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          setSelectedIndices([]);

          // Evaluate win condition
          const allMatched = matchedCards.every((c) => c.isMatched);
          if (allMatched) {
            setIsWon(true);
            playSound("win");
            spawnConfetti();
            
            // Save best score
            const finalScore = moves + 1;
            if (finalScore < bestScore) {
              setBestScore(finalScore);
              localStorage.setItem("fathima_matching_best", finalScore.toString());
            }
          }
        }, 500);
      } else {
        // MISMATCH!
        setTimeout(() => {
          playSound("mismatch");
          const resetCards = [...cards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(resetCards);
          setSelectedIndices([]);
        }, 1000);
      }
    }
  };

  // Icon Resolver
  const renderCardIcon = (name: string) => {
    const iconProps = { className: "w-8 h-8 md:w-10 md:h-10" };
    switch (name) {
      case "book": return <BookOpen {...iconProps} />;
      case "microscope": return <Microscope {...iconProps} />;
      case "globe": return <Globe {...iconProps} />;
      case "palette": return <Palette {...iconProps} />;
      case "calculator": return <Calculator {...iconProps} />;
      case "apple": return <Apple {...iconProps} />;
      default: return <Puzzle {...iconProps} />;
    }
  };

  return (
    <section 
      id="game" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent overflow-hidden px-6 md:px-12 border-t border-white/10 flex flex-col justify-center"
    >
      {/* Decorative vertical lines */}
      <div className="editorial-grid-line-v left-6 md:left-12" />
      <div className="editorial-grid-line-v right-6 md:right-12" />

      {/* Confetti Container Overlay */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-30 overflow-hidden">
        {confetti.map((conf) => (
          <motion.div
            key={conf.id}
            className="absolute rounded"
            style={{
              left: `${conf.x}%`,
              width: `${conf.size}px`,
              height: `${conf.size}px`,
              backgroundColor: conf.color,
              rotate: conf.rotation,
            }}
            initial={{ y: `${conf.y}vh`, opacity: 1, rotate: conf.rotation }}
            animate={{
              y: "110vh",
              x: `${conf.x + (Math.random() * 20 - 10)}%`,
              rotate: conf.rotation + 720,
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">

        {/* Section Header Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-mint font-bold block mb-4">
            IV. Interactive Engagement
          </span>
          <div className="h-[1px] w-24 bg-brand-mint mb-6" />
          <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] leading-none text-brand-offwhite tracking-tight mb-4">
            Curated Discovery <span className="italic text-brand-mint">Playground</span>
          </h2>
          <p className="text-brand-offwhite/85 text-base md:text-lg font-light leading-relaxed max-w-xl">
            My teaching philosophy honors tactile exploration. Complete this forest-themed learning puzzle to explore how play supports foundational concepts.
          </p>
        </div>

        {/* Game Console Frame Box */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl flex flex-col gap-6 relative">
          
          {/* Audio & Score Indicators Navbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10 text-left">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9FCBB3]/80">Total Flips</span>
                <span className="font-serif text-2xl font-bold text-brand-offwhite">{moves}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#9FCBB3]/80">
                  <Trophy className="w-3.5 h-3.5 text-brand-mint" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Personal Best</span>
                </div>
                <span className="font-serif text-2xl font-bold text-brand-offwhite">
                  {bestScore === 999 ? "—" : `${bestScore} moves`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Mute Button Toggle */}
              <button
                onClick={() => setMuted(!muted)}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-mint/40 bg-[#1F4D3A]/20 backdrop-blur-md text-brand-offwhite hover:text-brand-mint flex items-center justify-center transition-all cursor-pointer"
                title={muted ? "Unmute sounds" : "Mute sounds"}
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={initializeGame}
                className="px-5 py-2.5 bg-gradient-to-r from-brand-forest to-brand-emerald text-brand-offwhite shadow-lg hover:shadow-brand-mint/15 hover:scale-[1.05] flex items-center gap-2 text-xs font-semibold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
              >
                <RotateCcw className="w-4.5 h-4.5" />
                <span>Reset Grid</span>
              </button>
            </div>
          </div>

          {/* Cards Playing Board Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 py-4 justify-center md:max-w-2xl mx-auto w-full">
            {cards.map((card, idx) => {
              const isRevealed = card.isFlipped || card.isMatched;
              
              return (
                <div 
                  key={card.id} 
                  onClick={() => handleCardClick(idx)}
                  className="aspect-square w-full memory-game-perspective cursor-pointer select-none active:scale-95 transition-transform"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(idx);
                    }
                  }}
                  aria-label={`Educational match card showing ${isRevealed ? card.label : "hidden symbol"}`}
                >
                  <div className={`memory-game-inner ${isRevealed ? "is-flipped" : ""} ${card.isMatched ? "card-matched-effect" : ""}`}>
                    
                    {/* FRONT SIDE (Visible initially) */}
                    <div className="memory-game-front cursor-pointer border border-white/10 bg-[#021C1B]/90 hover:bg-[#1f4d3a]/60 shadow-lg transition-all rounded-xl">
                      <div className="flex flex-col items-center gap-1 p-2">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-mint/5 border border-brand-mint/20 flex items-center justify-center shadow-xs transition-transform hover:scale-105">
                          <Puzzle className="w-5 h-5 md:w-6 md:h-6 text-brand-mint" />
                        </div>
                        <span className="text-[10px] font-sans font-bold tracking-widest text-brand-mint/90 mt-1">
                          LEARN
                        </span>
                      </div>
                    </div>

                    {/* BACK SIDE (Revealed after flip / matching) */}
                    <div className={`memory-game-back ${card.colorClass} border border-brand-mint/30 shadow-2xl rounded-xl`}>
                      <div className="flex flex-col items-center justify-center gap-1.5 p-2 text-center w-full h-full">
                        {/* Huge System Emoji - Guarantees visual compliance in any hardware or browser sandbox */}
                        <span className="text-3xl md:text-4xl filter drop-shadow-sm select-none leading-none animate-bounce" style={{ contentVisibility: "auto" }}>
                          {card.emoji}
                        </span>
                        
                        <span className="font-serif text-xs md:text-sm font-extrabold tracking-tight text-brand-offwhite leading-none mt-1">
                          {card.label}
                        </span>
                        
                        <span className="text-[9px] font-mono tracking-widest text-[#9FCBB3]/60 uppercase leading-none hidden sm:block">
                          Primary
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Educational overlay cards when matched & finished */}
          <AnimatePresence>
            {isWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-[#021C1B]/98 backdrop-blur-md z-20 rounded-2xl flex flex-col items-center justify-center p-6 text-center border-2 border-brand-mint/20 shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-brand-mint/10 flex items-center justify-center mb-4 border border-brand-mint/30 shadow-[0_0_15px_rgba(159,203,179,0.3)]">
                  <Trophy className="w-8 h-8 text-brand-mint animate-pulse" />
                </div>

                <div className="flex items-center gap-1 mb-2 text-brand-mint">
                  <Sparkles className="w-5 h-5 text-brand-mint animate-bounce" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] font-extrabold block">Success!</span>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl italic text-brand-offwhite leading-tight max-w-lg mb-6">
                  "Great job! Learning can be fun 🎉 – Just like in my classroom."
                </h3>

                <p className="text-brand-offwhite/85 text-sm md:text-base max-w-sm mb-8 leading-relaxed font-light">
                  You completed the classroom challenge in <span className="font-semibold text-brand-mint">{moves} moves</span>. By adding interactive puzzles to assignments, retention and excitement levels soar!
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={initializeGame}
                    className="px-8 py-4 bg-gradient-to-r from-brand-forest to-brand-emerald text-brand-dark text-xs font-bold uppercase tracking-widest rounded-full hover:scale-[1.05] transition-all flex items-center gap-2 group cursor-pointer shadow-lg shadow-brand-mint/20"
                  >
                    Play Again
                    <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick instructions badge */}
          {!isWon && (
            <div className="flex items-center justify-center gap-2 py-3 px-6 bg-[#1F4D3A]/20 backdrop-blur-md border border-white/5 rounded-xl text-xs text-brand-offwhite/75 w-fit mx-auto mt-2 text-left">
              <Info className="w-4 h-4 text-brand-mint shrink-0" />
              <span>Flip matching pairs relating to different curriculum courses taught in class to complete.</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
