import React from "react";
import { assets } from "../assets/assets";
import { Github, Twitter, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-white/[0.08] bg-zinc-950/80 backdrop-blur-2xl text-zinc-400 py-16 px-4 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div
                onClick={() => navigate("/")}
                className="flex items-center cursor-pointer mb-4 group"
              >
                <img
                  src={assets.final_logo}
                  alt="ZeeAI Logo"
                  className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm font-light">
                A unified generative workspace designed for writers, designers, and creative professionals.
              </p>
            </div>
          </div>

          {/* Creative Tools */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-4">
              Creative Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Article Writer
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Title & Headline Studio
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Image Synthesis
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Background Extraction
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Object Inpainting
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Resume Evaluation
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Showcase
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing Matrix
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
              >
                <Twitter className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
              >
                <Linkedin className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} ZeeAI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
