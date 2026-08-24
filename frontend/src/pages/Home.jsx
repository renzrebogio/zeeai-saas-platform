import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Testimonial from "../components/Testimonial";
import Plan from "../components/Plan";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-indigo-500/30 selection:text-white relative overflow-hidden">
      {/* Global Background Ambient Glows */}
      <div className="pointer-events-none fixed top-0 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none fixed top-1/2 right-0 translate-x-1/3 w-[600px] h-[600px] bg-cyan-600/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 w-[800px] h-[500px] bg-purple-600/10 blur-[180px] rounded-full" />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <AiTools />
        <Testimonial />
        <Plan />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
