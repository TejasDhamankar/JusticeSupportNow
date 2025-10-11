"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, Shield, Clock, Scale } from "lucide-react";

// Light theme color palette
const colors = {
  background: "#FFFFFF",
  textPrimary: "#212529",
  textSecondary: "#6c757d",
  accentGreen: "#2AAA8A",
  hoverGreen: "#3BC1A0",
  accentAmber: "#DBAB09",
  border: "#E9ECEF",
  cardBackground: "#F8F9FA",
  darkBlue: "#0A0D14", // Kept for dark hero section
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Animation variants for the main container and its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, duration: 0.8 },
    },
  };

  // A more subtle floating animation
  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: colors.background, 
        color: colors.textPrimary,
        '--accent-green': colors.accentGreen,
        '--hover-green': colors.hoverGreen 
      } as React.CSSProperties}
    >
      {/* Interactive Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(42, 170, 138, 0.1), transparent 80%)`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 py-24 md:py-32">
        {/* Left Column: Content */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight tracking-tight text-[#2AAA8A] "
            
            variants={itemVariants} 
          >
            Don't Face Them Alone.
            <br />
            Expert Legal Representation
            <br />
            Is Here For You.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl mb-8 font-normal max-w-2xl leading-relaxed"
            style={{ color: colors.textSecondary }}
            variants={itemVariants}
          >
            Our dedicated team is committed to navigating the complexities of the
            law to protect your rights and achieve the best possible outcome for
            your case.
          </motion.p>
          
          {/* Value Propositions */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 mb-10 w-full max-w-2xl" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <CheckCircle size={20} style={{ color: colors.accentGreen }} />
              <span className="font-medium" style={{ color: colors.textPrimary }}>Free Consultation</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield size={20} style={{ color: colors.accentGreen }} />
              <span className="font-medium" style={{ color: colors.textPrimary }}>No Win, No Fee</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} style={{ color: colors.accentGreen }} />
              <span className="font-medium" style={{ color: colors.textPrimary }}>24/7 Support</span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
            variants={itemVariants}
          >
            {/* Primary Button - MODIFIED TEXT COLOR */}
            <a
              href="#case-evaluation"
              className="group relative w-full sm:w-auto px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center shadow-lg overflow-hidden transition-all duration-300 ease-in-out"
              style={{ backgroundColor: colors.accentGreen, color: colors.background }} // Text color changed to whiteText
            >
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-20"></span>
              <span className="relative flex items-center">
                Get a Free Case Evaluation
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>

            {/* Secondary Button */}
            <a
              href="tel:9143002717"
              className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center transition-colors duration-300 border hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]"
              style={{ borderColor: colors.border, color: colors.textSecondary, backgroundColor: 'transparent' }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Element */}
        <motion.div
          className="flex-1 relative  hidden lg:flex justify-center items-center"
          variants={floatingVariants}
          animate="animate"
        >
          <div 
            className="relative group w-[500px] h-[500px] flex items-center justify-center rounded-2xl border shadow-2xl p-4 transition-all duration-500 hover:border-accent/60 hover:shadow-accent/20 hover:shadow-2xl
                        before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] 
                        before:bg-gradient-to-r from-transparent via-[var(--accent-green)] to-transparent"
            style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
          >
          <img src="hero(6).png" alt="" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;