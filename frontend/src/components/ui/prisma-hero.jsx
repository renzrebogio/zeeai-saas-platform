import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

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
          activeVideo === 1 ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={video2Ref}
        muted
        playsInline
        src={src}
        className={`absolute inset-0 h-full w-full object-cover scale-105 transition-opacity duration-1000 ease-in-out ${
          activeVideo === 2 ? "opacity-100" : "opacity-0"
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
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-[#a78bfa]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
export const WordsPullUpMultiStyle = ({ segments, className = "", style }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const words = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
const navItems = ["Our story", "Collective", "Workshops", "Programs", "Inquiries"];

const PrismaHero = ({
  title = "Prisma",
  description = "Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.",
  ctaText = "Join the lab",
  onCtaClick,
  navLinks = navItems,
  videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
}) => {
  return (
    <section className="h-screen w-full p-2 sm:p-4">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 shadow-2xl">
        
        {/* Seamless dual-buffer background video */}
        <SeamlessVideo
          src={videoSrc}
          className="absolute inset-0 h-full w-full"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/85" />

        {/* Floating Navbar */}
        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black/80 backdrop-blur-xl border-x border-b border-white/10 px-4 py-2 sm:gap-6 md:gap-10 md:rounded-b-3xl md:px-8 shadow-lg">
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                href={typeof item === "string" ? `#${item.toLowerCase()}` : item.href || "#"}
                onClick={typeof item === "object" && item.onClick ? item.onClick : undefined}
                className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors text-[#E1E0CC]/75 hover:text-[#E1E0CC]"
              >
                {typeof item === "string" ? item : item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-8 md:px-12 lg:pb-8">
          <div className="grid grid-cols-12 items-end gap-6">
            
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-semibold leading-[0.82] tracking-[-0.06em] text-[24vw] sm:text-[22vw] md:text-[20vw] lg:text-[18vw] xl:text-[17vw] select-none"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text={title} showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-4 lg:col-span-4 lg:pb-8">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base text-[#E1E0CC]/80 font-light leading-relaxed max-w-md"
              >
                {description}
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onClick={onCtaClick}
                className="group inline-flex items-center gap-3 self-start rounded-full bg-[#E1E0CC] py-1.5 pl-6 pr-1.5 text-sm font-medium text-black transition-all hover:bg-white hover:gap-4 active:scale-95 shadow-xl cursor-pointer"
              >
                <span>{ctaText}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-[#E1E0CC]" />
                </span>
              </motion.button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
export default PrismaHero;
