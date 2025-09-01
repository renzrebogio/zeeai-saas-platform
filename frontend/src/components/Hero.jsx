import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Zap,
  Sparkles,
  PenTool,
} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel data - you can customize these slides
  const slides = [
    {
      title: "Create Amazing Content",
      highlight: "AI Tools",
      description:
        "Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow",
      icon: <PenTool className="w-16 h-16 text-blue-600 mx-auto mb-4" />,
      primaryBtn: "Start Creating Now!",
      secondaryBtn: "Watch Demo",
      primaryUrl: "/ai",
    },
    {
      title: "Generate Stunning Images",
      highlight: "AI Art",
      description:
        "Create breathtaking visuals and artwork with our advanced AI image generation. Perfect for social media, marketing, and creative projects",
      icon: <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-4" />,
      primaryBtn: "Generate Images",
      secondaryBtn: "View Gallery",
      primaryUrl: "/ai/generate-images",
    },
    {
      title: "Write Like a Pro",
      highlight: "AI Writing",
      description:
        "Craft compelling articles, blog posts, and copy with AI-powered writing assistance. Beat writer's block and boost productivity",
      icon: <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4" />,
      primaryBtn: "Start Writing",
      secondaryBtn: "See Examples",
      primaryUrl: "/ai/write-article",
    },
  ];

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  const handleNavigateToAI = () => {
    // Use your original navigate function with the current slide's URL
    navigate(currentSlideData.primaryUrl);
  };

  return (
    <div
      id="hero"
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen overflow-hidden"
    >
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        style={{ cursor: "pointer" }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        style={{ cursor: "pointer" }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110 shadow-lg"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Carousel content */}
      <div className="text-center mb-6 relative">
        {/* Animated icon */}
        <div
          key={currentSlide}
          className="mb-4 animate-bounce"
          style={{
            animation: "iconPulse 0.6s ease-in-out",
          }}
        >
          {currentSlideData.icon}
        </div>

        {/* Title with smooth transition */}
        <div
          key={`title-${currentSlide}`}
          className="transition-all duration-500 ease-in-out transform"
          style={{
            animation: "fadeInUp 0.6s ease-out",
          }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
            {currentSlideData.title.split(" ").slice(0, -2).join(" ")} <br />
            with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
              {currentSlideData.highlight}
            </span>
          </h1>
        </div>

        {/* Description with fade transition */}
        <div
          key={`desc-${currentSlide}`}
          className="transition-all duration-500 ease-in-out"
          style={{
            animation: "fadeInUp 0.8s ease-out",
          }}
        >
          <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
            {currentSlideData.description}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div
        key={`buttons-${currentSlide}`}
        className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs"
        style={{
          animation: "fadeInUp 1s ease-out",
        }}
      >
        <button
          onClick={handleNavigateToAI}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700"
          style={{ cursor: "pointer" }}
        >
          {currentSlideData.primaryBtn}
        </button>
        <button
          className="bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg hover:bg-gray-50"
          style={{ cursor: "pointer" }}
        >
          {currentSlideData.secondaryBtn}
        </button>
      </div>

      {/* Carousel dots indicator */}
      <div className="flex justify-center gap-3 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{ cursor: "pointer" }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-blue-600 scale-125 shadow-md"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Trust indicator */}
      <div className="flex items-center gap-4 mt-6 mx-auto text-gray-600">
        <Users className="h-8 w-8 text-blue-600" />
        <span>Trusted by 10k+ People</span>
      </div>

      {/* Progress bar for current slide */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-75 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Floating elements for extra visual appeal */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconPulse {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
