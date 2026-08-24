import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import {
  FileText,
  Type,
  Image as ImageIcon,
  Layers,
  Wand2,
  FileCheck2,
  ArrowUpRight,
} from "lucide-react";

const tools = [
  {
    title: "Article Writer",
    description: "Produce long-form articles, essays, and reports structured to your preferred length and guidelines.",
    icon: FileText,
    tag: "Editorial",
    path: "/ai/write-article",
    badge: "Free Included",
  },
  {
    title: "Headline & Title Studio",
    description: "Generate targeted, high-impact titles and angles tailored for publishing and audience reach.",
    icon: Type,
    tag: "Copywriting",
    path: "/ai/blog-titles",
    badge: "Free Included",
  },
  {
    title: "Image Synthesis",
    description: "Render high-resolution visuals and artwork directly from detailed descriptive prompts.",
    icon: ImageIcon,
    tag: "Visuals",
    path: "/ai/generate-images",
    badge: "Pro Studio",
  },
  {
    title: "Background Extraction",
    description: "Isolate subjects and cleanly remove photo backdrops with edge-accurate transparency masking.",
    icon: Layers,
    tag: "Media Editing",
    path: "/ai/remove-background",
    badge: "Pro Studio",
  },
  {
    title: "Generative Object Removal",
    description: "Eliminate unwanted elements or clutter with context-aware neural inpainting.",
    icon: Wand2,
    tag: "Neural Inpainting",
    path: "/ai/remove-object",
    badge: "Pro Studio",
  },
  {
    title: "Resume Evaluation",
    description: "Upload resume PDFs for section-by-section critique on clarity, impact, and presentation.",
    icon: FileCheck2,
    tag: "Document Review",
    path: "/ai/review-resume",
    badge: "Pro Studio",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const handleToolClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      openSignIn();
    }
  };

  return (
    <section id="features" className="py-24 px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E1E0CC]/70 mb-3 block">
          Creative Tools
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
          Purpose-Built Creation Engines
        </h2>
        <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
          A focused collection of generative text, visual synthesis, and document evaluation tools.
        </p>
      </div>

      {/* Bento-style Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {tools.map((tool, index) => {
          const IconComponent = tool.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => handleToolClick(tool.path)}
              className="group relative rounded-2xl p-7 bg-zinc-900/50 border border-white/[0.08] backdrop-blur-xl hover:bg-zinc-900/80 hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon & Badges */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#E1E0CC] group-hover:bg-white/[0.08] group-hover:text-white transition-all">
                    <IconComponent className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                      {tool.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-all">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Tag & Title */}
                <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-500 mb-1.5 block">
                  {tool.tag}
                </span>
                <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-[#E1E0CC] transition-colors">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                  {tool.description}
                </p>
              </div>

              {/* Bottom Action Link */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Direct Access</span>
                <span className="text-[#E1E0CC]/80 group-hover:text-white transition-colors">
                  Launch tool →
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default AiTools;
