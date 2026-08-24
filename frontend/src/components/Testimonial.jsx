import React from "react";
import { motion } from "framer-motion";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    name: "Elena Rostova",
    title: "Lead Content Strategist at Synthetix",
    content:
      "The combination of lightning-fast article drafts and generative inpainting cuts our weekly production cycle in half. The output quality is consistently sharp.",
    rating: 5,
    role: "Verified Creator",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    name: "Marcus Vance",
    title: "Creative Director at StudioForm",
    content:
      "Having background removal, ClipDrop image generation, and quick headline brainstorming in one clean studio saves us jumping across five different subscriptions.",
    rating: 5,
    role: "Verified Pro",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    name: "Amina Al-Mansoor",
    title: "Technical Writer & Consultant",
    content:
      "The resume evaluator pointed out structural gaps I had missed for months. The tone analysis and actionable feedback are genuine game-changers.",
    rating: 5,
    role: "Verified Member",
  },
];

const Testimonial = () => {
  return (
    <section id="reviews" className="py-24 px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium mb-4">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>Creator Feedback</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
          Trusted Across Studios and Workflows
        </h2>
        <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
          See how designers, copywriters, and founders integrate ZeeAI into their daily creative operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="rounded-2xl p-7 bg-zinc-900/50 border border-white/[0.08] backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Star rating + verification */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  {t.role}
                </span>
              </div>

              {/* Quote */}
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                "{t.content}"
              </p>
            </div>

            {/* Author */}
            <div className="pt-5 border-t border-white/[0.06] flex items-center gap-3.5">
              <img
                src={t.image}
                alt={t.name}
                className="w-11 h-11 rounded-full object-cover border border-white/10"
              />
              <div>
                <h4 className="text-sm font-semibold text-white tracking-tight">{t.name}</h4>
                <p className="text-xs text-zinc-500">{t.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
