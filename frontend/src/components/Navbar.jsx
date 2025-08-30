import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Home,
  Sparkles,
  Star,
  CreditCard,
  Users,
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "reviews", "pricing", "about"];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      // Special case for hero section - if we're at the top
      if (scrollPosition < 200) {
        setActiveSection("hero");
        return;
      }

      for (const sectionId of sections.slice(1)) {
        // Skip hero for normal scroll detection
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
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed z-50 w-full backdrop-blur-2xl flex items-center py-3 px-4 sm:px-20 xl:px-32">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          src={assets.final_logo}
          alt="logo"
          className="w-32 sm:w-50 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Navigation Links - Centered */}
      <nav className="hidden md:flex flex-1 justify-center">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => scrollToSection("hero")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer group ${
              activeSection === "hero"
                ? "text-primary bg-primary/10"
                : "text-gray-600 hover:text-primary hover:bg-primary/5"
            }`}
          >
            <Home
              className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                activeSection === "hero" ? "scale-110" : "group-hover:scale-110"
              }`}
            />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => scrollToSection("features")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer group ${
              activeSection === "features"
                ? "text-primary bg-primary/10"
                : "text-gray-600 hover:text-primary hover:bg-primary/5"
            }`}
          >
            <Sparkles
              className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                activeSection === "features"
                  ? "scale-110"
                  : "group-hover:scale-110"
              }`}
            />
            <span className="text-xs font-medium">Features</span>
          </button>

          <button
            onClick={() => scrollToSection("reviews")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer group ${
              activeSection === "reviews"
                ? "text-primary bg-primary/10"
                : "text-gray-600 hover:text-primary hover:bg-primary/5"
            }`}
          >
            <Star
              className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                activeSection === "reviews"
                  ? "scale-110"
                  : "group-hover:scale-110"
              }`}
            />
            <span className="text-xs font-medium">Reviews</span>
          </button>

          <button
            onClick={() => scrollToSection("pricing")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer group ${
              activeSection === "pricing"
                ? "text-primary bg-primary/10"
                : "text-gray-600 hover:text-primary hover:bg-primary/5"
            }`}
          >
            <CreditCard
              className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                activeSection === "pricing"
                  ? "scale-110"
                  : "group-hover:scale-110"
              }`}
            />
            <span className="text-xs font-medium">Pricing</span>
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer group ${
              activeSection === "about"
                ? "text-primary bg-primary/10"
                : "text-gray-600 hover:text-primary hover:bg-primary/5"
            }`}
          >
            <Users
              className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                activeSection === "about"
                  ? "scale-110"
                  : "group-hover:scale-110"
              }`}
            />
            <span className="text-xs font-medium">About Us</span>
          </button>
        </div>
      </nav>

      {/* User Section */}
      <div className="flex-shrink-0">
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
