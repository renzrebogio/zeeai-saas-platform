import React from "react";
import { PricingTable, useClerk, useUser } from "@clerk/clerk-react";
import { Check, Sparkles, Zap, Shield, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Plan = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const handleStart = () => {
    if (user) {
      navigate("/ai");
    } else {
      openSignIn();
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
          Flexible Plans for Every Creator
        </h2>
        <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
          Start experimenting on our Free tier with no credit card required, or unlock unlimited neural compute with Premium.
        </p>
      </div>

      {/* Plan Feature Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {/* Free Plan Card */}
        <div className="rounded-3xl p-8 bg-zinc-900/40 border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-mono uppercase tracking-wider text-zinc-400">Starter</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-zinc-300 border border-white/10">Free Forever</span>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-xs text-zinc-500 font-mono">/ month</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              Great for testing core writing tools and experiencing AI content generation.
            </p>

            <div className="space-y-3 pt-6 border-t border-white/[0.06] text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>10 Free AI Article & Blog Title generations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Standard Gemini 2.0 Flash speed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Dashboard history & exports</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-500">
                <span className="w-4 text-center font-bold">✕</span>
                <span>Image generation & neural editing</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="mt-8 w-full py-3 rounded-full text-xs sm:text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
          >
            {user ? "Continue Free" : "Get Started Free"}
          </button>
        </div>

        {/* Premium Plan Card */}
        <div className="relative rounded-3xl p-8 bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-purple-500/30 backdrop-blur-xl shadow-2xl shadow-purple-500/10 flex flex-col justify-between">
          <div className="absolute -top-3 right-8 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[11px] font-semibold tracking-wide uppercase shadow-md flex items-center gap-1">
            <Crown className="w-3 h-3" />
            <span>Recommended</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-mono uppercase tracking-wider text-purple-300">Pro Studio</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-500/30">Unlimited</span>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$19</span>
              <span className="text-xs text-zinc-500 font-mono">/ month</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              Full access to our entire generative pipeline with zero quota limits.
            </p>

            <div className="space-y-3 pt-6 border-t border-white/[0.06] text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-white font-medium">Unlimited Article & Headline generations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-white font-medium">ClipDrop High-Resolution Image Synthesis</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>AI Background Removal & Generative Inpainting</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>AI PDF Resume Evaluator (up to 5MB)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Publish to Public Community Showcase</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="mt-8 w-full py-3 rounded-full text-xs sm:text-sm font-semibold text-black bg-[#E1E0CC] hover:bg-white transition-all shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Upgrade to Pro</span>
          </button>
        </div>
      </div>

      {/* Embedded Clerk Pricing Table Integration */}
      <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/30 border border-white/[0.06] backdrop-blur-md max-w-4xl mx-auto overflow-hidden">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Manage Subscription via Clerk</span>
          </div>
          <span className="text-[11px] text-zinc-500">Encrypted & Secure Billing</span>
        </div>
        <div className="clerk-pricing-container">
          <PricingTable />
        </div>
      </div>
    </section>
  );
};

export default Plan;
