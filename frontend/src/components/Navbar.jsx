import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  LayoutGrid,
  CreditCard,
  MessageSquareQuote,
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "features", "reviews", "pricing"];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-10 lg:px-16 ${
        scrolled
          ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Original ZeeAI Brand Logo Asset */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer group"
        >
          <img
            src={assets.final_logo}
            alt="ZeeAI Logo"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105 active:scale-95"
          />
        </div>

        {/* Center Pill Navigation */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-lg shadow-inner">
          {[
            { id: "hero", label: "Overview", icon: Sparkles },
            { id: "features", label: "Capabilities", icon: LayoutGrid },
            { id: "reviews", label: "Showcase", icon: MessageSquareQuote },
            { id: "pricing", label: "Pricing", icon: CreditCard },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeSection === id
                  ? "bg-white/10 text-white shadow-sm border border-white/10"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Right CTA / User Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/ai")}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all cursor-pointer"
              >
                <span>Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <button
              onClick={openSignIn}
              className="inline-flex items-center gap-2 rounded-full text-xs sm:text-sm font-medium bg-[#E1E0CC] hover:bg-white text-black px-5 py-2 transition-all shadow-lg hover:shadow-cyan-500/10 active:scale-95 cursor-pointer"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
