import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  PenTool,
  Image as ImageIcon,
  Layers,
  Wand2,
  FileCheck,
  ChevronRight,
} from "lucide-react";

/* ---------------- Seamless Video Crossfade Background ---------------- */
export const SeamlessVideo = ({
  src,
  className = "",
  crossfadeDuration = 1.2,
}) => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [activeVideo, setActiveVideo] = useState(1);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const handleTimeUpdate1 = () => {
      if (v1.duration && v1.currentTime >= v1.duration - crossfadeDuration) {
        if (activeVideo === 1) {
          v2.currentTime = 0;
          v2.play().catch(() => {});
          setActiveVideo(2);
        }
      }
    };

    const handleTimeUpdate2 = () => {
      if (v2.duration && v2.currentTime >= v2.duration - crossfadeDuration) {
        if (activeVideo === 2) {
          v1.currentTime = 0;
          v1.play().catch(() => {});
          setActiveVideo(1);
        }
      }
    };

    v1.addEventListener("timeupdate", handleTimeUpdate1);
    v2.addEventListener("timeupdate", handleTimeUpdate2);

    return () => {
      v1.removeEventListener("timeupdate", handleTimeUpdate1);
      v2.removeEventListener("timeupdate", handleTimeUpdate2);
    };
  }, [activeVideo, crossfadeDuration]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={video1Ref}
        autoPlay
        muted
        playsInline
        src={src}
        className={`absolute inset-0 h-full w-full object-cover scale-105 transition-opacity duration-1000 ease-in-out ${
          activeVideo === 1 ? "opacity-85" : "opacity-0"
        }`}
      />
      <video
        ref={video2Ref}
        muted
        playsInline
        src={src}
        className={`absolute inset-0 h-full w-full object-cover scale-105 transition-opacity duration-1000 ease-in-out ${
          activeVideo === 2 ? "opacity-85" : "opacity-0"
        }`}
      />
    </div>
  );
};

/* ---------------- WordsPullUp ---------------- */
export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.22em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.6em] -right-[0.32em] text-[0.3em] text-[#E1E0CC]/80 font-light">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

const toolHighlights = [
  { label: "Article Studio", icon: PenTool, path: "/ai/write-article" },
  { label: "Image Generation", icon: ImageIcon, path: "/ai/generate-images" },
  { label: "Background Removal", icon: Layers, path: "/ai/remove-background" },
  { label: "Object Inpainting", icon: Wand2, path: "/ai/remove-object" },
  { label: "Resume Analysis", icon: FileCheck, path: "/ai/review-resume" },
];

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const handleLaunch = () => {
    if (user) {
      navigate("/ai");
    } else {
      openSignIn();
    }
  };

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Showcase", href: "#reviews" },
    { label: "Pricing", href: "#pricing" },
    { label: "Community", href: user ? "/ai/community" : "#reviews", onClick: (e) => {
      if (user) {
        e.preventDefault();
        navigate("/ai/community");
      }
    }},
  ];

  return (
    <section id="hero" className="w-full min-h-screen p-2 sm:p-4 pt-3 sm:pt-4">
      <div className="relative h-[94vh] min-h-[620px] w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl bg-zinc-950">
        
        {/* Seamless dual-buffer infinity loop background video */}
        <SeamlessVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          className="absolute inset-0 h-full w-full"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.6] mix-blend-overlay" />

        {/* Ambient Gradient Glows */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />

        {/* Floating Minimal Capsule Nav */}
        <nav className="absolute left-1/2 top-0 z-30 -translate-x-1/2">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-10 rounded-b-2xl md:rounded-b-3xl bg-black/80 backdrop-blur-xl border-x border-b border-white/10 px-5 py-2.5 shadow-2xl">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={item.onClick}
                className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide transition-colors text-[#E1E0CC]/70 hover:text-[#E1E0CC] cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero content grid */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-8 md:px-12 lg:pb-10 z-20">
          <div className="grid grid-cols-12 items-end gap-6">
            
            {/* Massive Display Title */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.82] tracking-[-0.06em] text-[24vw] sm:text-[22vw] md:text-[20vw] lg:text-[17vw] xl:text-[16vw] select-none drop-shadow-sm"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text="ZeeAI" showAsterisk />
              </h1>
            </div>

            {/* Subtitle & Dynamic CTA */}
            <div className="col-span-12 flex flex-col gap-5 pb-2 lg:col-span-4 lg:pb-6">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base text-[#E1E0CC]/80 font-light leading-relaxed max-w-md"
              >
                A unified generative workspace for articles, high-resolution imagery, object manipulation, and professional evaluation. Built for speed, clarity, and precision.
              </motion.p>

              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  onClick={handleLaunch}
                  className="group inline-flex items-center gap-3 self-start rounded-full bg-[#E1E0CC] py-1.5 pl-6 pr-1.5 text-sm font-semibold text-black transition-all hover:bg-white hover:gap-4 active:scale-95 shadow-xl cursor-pointer"
                >
                  <span>{user ? "Open Studio" : "Start Creating"}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-[#E1E0CC]" />
                  </span>
                </motion.button>

                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  href="#features"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#E1E0CC]/75 hover:text-white border border-white/10 hover:border-white/25 bg-black/40 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Explore Capabilities</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#E1E0CC]/70" />
                </motion.a>
              </div>

            </div>
          </div>

          {/* Bottom Tool Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar"
          >
            <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono flex-shrink-0 mr-2">Workspace Tools:</span>
            {toolHighlights.map((tool, idx) => (
              <button
                key={idx}
                onClick={() => user ? navigate(tool.path) : openSignIn()}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#E1E0CC]/80 text-xs flex-shrink-0 hover:bg-white/[0.1] hover:text-white transition-colors cursor-pointer"
              >
                <tool.icon className="w-3 h-3 text-[#E1E0CC]/70" />
                <span>{tool.label}</span>
              </button>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
