"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  CheckCircle, // Added CheckCircle for suggested secondary CTA
  Zap,
} from "lucide-react";

// Import UI components (assuming standard Next/Tailwind project setup)
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// 1. Import the utility function to fetch case data
import { getAllCaseTypes } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Color palette definition (used directly in JSX via hex codes)
  const colors = {
    darkBlue: "#0A0D14", // Main Background
    whiteText: "#F0F6FC", // Main Text
    accentGreen: "#2AAA8A", // Primary Action/Highlight
    hoverGreen: "#3BC1A0", // Hover State for Primary
    lightGrayText: "#8B949E", // Secondary/Muted Text
    borderGray: "#30363D", // Separators/Borders
    accentAmber: "#DBAB09", // Secondary Accent (e.g., "HOT" badge)
    cardBackground: "#161B22", // Card/Section Background
  };

  const socialLinks = [
    { icon: <Facebook size={20} className="hover:opacity-80 transition-opacity" />, label: "Facebook", href: "#" },
    { icon: <Twitter size={20} className="hover:opacity-80 transition-opacity" />, label: "Twitter", href: "#" },
    { icon: <Linkedin size={20} className="hover:opacity-80 transition-opacity" />, label: "LinkedIn", href: "#" },
    { icon: <Instagram size={20} className="hover:opacity-80 transition-opacity" />, label: "Instagram", href: "#" },
  ];

  // 2. DYNAMICALLY GENERATE CASE LINKS
  const allCases = getAllCaseTypes();

  // Select the first 4 cases and map them to the required structure
  const caseLinks = allCases.slice(0, 4).map((c, index) => ({
    label: c.title,
    href: `/cases/${c.slug}`,
    // Temporary 'hot' logic for demonstration (customize this)
    hot: index % 2 === 0, 
  }));

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Our Process", href: "#claim-process" },
    { label: "QUICK ANSWERS", href: "#faq" },
    { label: "Get a Review", href: "#case-evaluation" },
  ];

  const legalLinks = [
    { label: "Data Protection", href: "/privacy-policy" },
    { label: "User Agreement", href: "/terms-of-service" },
    { label: "Attorney Notice", href: "/disclaimer" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-[#0A0D14] text-[#F0F6FC] relative overflow-hidden pt-8">
      <div className="container mx-auto px-4 relative z-10">
        {/* Top CTA Section */}
        <motion.div
          className="text-center py-12 sm:py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-6 px-4 py-2 bg-[#2AAA8A]/20 text-[#F0F6FC] border-[#DBAB09]/30 font-bold text-sm">
            <Zap className="w-4 h-4 mr-2 text-[#F0F6FC]" />
            YOUR FREE CONSULTATION AWAITS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            <span className="text-[#2AAA8A]">Secure the Settlement</span>
            <span className="text-[#2AAA8A]"> You Deserve</span>
          </h2>
          <p className="text-lg text-[#F0F6FC]/70 mb-8 max-w-2xl mx-auto">
            Strict deadlines apply to most claims. Don't forfeit your rights by waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
              {/* PRIMARY BUTTON: Call Us Now */}
              <Button asChild size="lg" className="bg-[#2AAA8A] hover:bg-[#3BC1A0] text-[#F0F6FC] font-black px-8 py-6 text-lg shadow-xl w-full sm:w-auto">
                <a href="tel:9143002727" className="flex items-center justify-center">
                  <Phone className="mr-3 h-5 w-5" /> Call Us Now (24/7)
                </a>
              </Button>
            </motion.div>
            
            {/* SECONDARY BUTTON: Free Review/Evaluation */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
               <Button asChild size="lg" className="bg-[#2AAA8A] hover:bg-[#3BC1A0] text-[#F0F6FC] font-black px-8 py-6 text-lg shadow-xl w-full sm:w-auto">
                <a href="tel:9143002727" className="flex items-center justify-center">
                  <Phone className="mr-3 h-5 w-5" />  Start Your Free Review 
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>             
        
        <Separator className="bg-[#30363D] my-8" />

        {/* Main Content Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 py-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* LEFT SIDE: Links and Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Case Types (DYNAMICALLY POPULATED) */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-bold mb-4 tracking-wider text-[#2AAA8A]">OPEN CASES</h3>
                <ul className="space-y-2">
                  {caseLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex items-center text-[#8B949E] hover:text-[#F0F6FC] transition-colors group">
                        <ArrowRight size={14} className="mr-3 text-[#2AAA8A] transition-transform group-hover:translate-x-1" />
                        <span>{link.label}</span>
                          {link.hot && <Badge className="ml-2 bg-[#DBAB09]/20 text-[#DBAB09] border-none text-xs px-2 py-0.5">HOT</Badge>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              {/* Quick Links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-bold mb-4 tracking-wider text-[#2AAA8A]">QUICK ACCESS</h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="flex items-center text-[#8B949E] hover:text-[#F0F6FC] transition-colors group">
                        <ArrowRight size={14} className="mr-3 text-[#2AAA8A] transition-transform group-hover:translate-x-1" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Newsletter Section */}
            <motion.div variants={itemVariants} className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-[#2AAA8A] mb-2">Stay Updated On Your Rights</h3>
                <p className="text-[#8B949E] mb-4 text-sm">Get news and updates on important cases directly to your inbox.</p>
                <div className="flex gap-2">
                    <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-[#0A0D14] border-[#30363D] focus:ring-[#2AAA8A] focus:border-[#2AAA8A] text-[#F0F6FC] flex-grow"
                    />
                    <Button className="bg-[#2AAA8A] hover:bg-[#3BC1A0] text-[#F0F6FC] font-bold">
                        <Mail size={16} className="mr-2"/> Subscribe
                    </Button>
                </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Brand and Contact */}
          <motion.div variants={itemVariants} className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 flex flex-col justify-between backdrop-blur-sm">
            <div>
              <img src="/logo.png" alt="Justice Support Now Logo" className="w-auto h-20 mb-4" />
              <p className="text-[#8B949E] mb-6 leading-relaxed">
                Trusted legal guidance for those affected by corporate wrongdoing. We fight for you.
              </p>
            </div>
            <div className="space-y-4">
               <a href="tel:9143002717" className="flex items-center p-3 rounded-lg hover:bg-[#0A0D14] transition-colors">
                <Phone className="w-6 h-6 mr-4 text-[#2AAA8A]"/>
                <div>
                  <p className="text-[#8B949E] text-sm">24/7 Support Line</p>
                  <p className="font-bold text-lg">(914) 300 2717</p>
                </div>
              </a>
               <a href="mailto:support@justicesupportnow.com" className="flex items-center p-3 rounded-lg hover:bg-[#0A0D14] transition-colors">
                <Mail className="w-6 h-6 mr-4 text-[#2AAA8A]"/>
                <div>
                  <p className="text-[#8B949E] text-sm">Email for a Free Review</p>
                  <p className="font-bold text-lg break-all">support@justicesupportnow.com</p>
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 mt-8 border-t border-[#30363D] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-[#8B949E]">© {currentYear} Justice support now. All Rights Reserved.</p>
            <div className="flex gap-x-4 gap-y-2 flex-wrap justify-center text-sm text-[#8B949E]">
                {legalLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="hover:text-[#F0F6FC] transition-colors">{link.label}</Link>
                ))}
            </div>
            <div className="flex space-x-5 text-[#F0F6FC]">
                {socialLinks.map((link) => (
                    <a key={link.label} href={link.href} aria-label={link.label}>{link.icon}</a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;