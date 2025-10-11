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
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-of-service" },

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
    <footer style={{ backgroundColor: colors.background, color: colors.textPrimary }} className="relative overflow-hidden pt-8">
      <div className="container mx-auto px-4 relative z-10">
        {/* Top CTA Section */}
        <motion.div
          className="text-center py-12 sm:py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-6 px-4 py-2 font-bold text-sm" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen, borderColor: colors.accentAmber + '30' }}>
            <Zap className="w-4 h-4 mr-2" style={{ color: colors.accentGreen }} />
            YOUR FREE CONSULTATION AWAITS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            <span style={{ color: colors.accentGreen }}>Secure the Settlement</span>
            <span style={{ color: colors.accentGreen }}> You Deserve</span>
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
            Strict deadlines apply to most claims. Don't forfeit your rights by waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
              {/* PRIMARY BUTTON: Call Us Now */}
              <Button asChild size="lg" className="font-black px-8 py-6 text-lg shadow-xl w-full sm:w-auto" style={{ backgroundColor: colors.accentGreen, color: colors.background, '&:hover': { backgroundColor: colors.hoverGreen } }}>
                <a href="tel:9143002727" className="flex items-center justify-center">
                  <Phone className="mr-3 h-5 w-5" /> Call Us Now (24/7)
                </a>
              </Button>
            </motion.div>
            
            {/* SECONDARY BUTTON: Free Review/Evaluation */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
               <Button asChild size="lg" className="font-black px-8 py-6 text-lg shadow-xl w-full sm:w-auto" style={{ backgroundColor: colors.accentGreen, color: colors.background, '&:hover': { backgroundColor: colors.hoverGreen } }}>
                <a href="tel:9143002727" className="flex items-center justify-center">
                  <Phone className="mr-3 h-5 w-5" />  Start Your Free Review 
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>             
        
        <Separator style={{ backgroundColor: colors.border }} className="my-8" />

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
                <h3 className="text-lg font-bold mb-4 tracking-wider" style={{ color: colors.accentGreen }}>OPEN CASES</h3>
                <ul className="space-y-2">
                  {caseLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex items-center hover:text-black transition-colors group" style={{ color: colors.textSecondary }}>
                        <ArrowRight size={14} className="mr-3 transition-transform group-hover:translate-x-1" style={{ color: colors.accentGreen }} />
                        <span>{link.label}</span>
                          {link.hot && <Badge className="ml-2 border-none text-xs px-2 py-0.5" style={{ backgroundColor: colors.accentAmber + '20', color: colors.accentAmber }}>HOT</Badge>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              {/* Quick Links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-bold mb-4 tracking-wider" style={{ color: colors.accentGreen }}>QUICK ACCESS</h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="flex items-center hover:text-black transition-colors group" style={{ color: colors.textSecondary }}>
                        <ArrowRight size={14} className="mr-3 transition-transform group-hover:translate-x-1" style={{ color: colors.accentGreen }} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Newsletter Section */}
            <motion.div variants={itemVariants} className="border rounded-xl p-6 backdrop-blur-sm" style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
                <h3 className="font-bold mb-2" style={{ color: colors.accentGreen }}>Stay Updated On Your Rights</h3>
                <p className="mb-4 text-sm" style={{ color: colors.textSecondary }}>Get news and updates on important cases directly to your inbox.</p>
                <div className="flex gap-2">
                    <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-white focus:ring-accentGreen focus:border-accentGreen flex-grow"
                        style={{ borderColor: colors.border, color: colors.textPrimary }}
                    />
                    <Button className="font-bold" style={{ backgroundColor: colors.accentGreen, color: colors.background, '&:hover': { backgroundColor: colors.hoverGreen } }}>
                        <Mail size={16} className="mr-2"/> Subscribe
                    </Button>
                </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Brand and Contact */}
          <motion.div variants={itemVariants} className="border rounded-xl p-8 flex flex-col justify-between backdrop-blur-sm" style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <div>
              {/* Add new JusticSuppor Logo */}
              <img src="/JUStice support(3).png" alt="Justice Support Now Logo" className=" h-[200px] w-[200px] mb-4 mx-auto hover:scale-110 transition-all duration-300" /> 
              <p className="mb-6 leading-relaxed" style={{ color: colors.textSecondary }}>
                Trusted legal guidance for those affected by corporate wrongdoing. We fight for you.
              </p>
            </div>
            <div className="space-y-4">
               <a href="tel:9143002717" className="flex items-center p-3 rounded-lg hover:bg-white transition-colors">
                <Phone className="w-6 h-6 mr-4" style={{ color: colors.accentGreen }}/>
                <div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>24/7 Support Line</p>
                  <p className="font-bold text-lg">(914) 300 2717</p>
                </div>
              </a>
               <a href="mailto:support@justicesupportnow.com" className="flex items-center p-3 rounded-lg hover:bg-white transition-colors">
                <Mail className="w-6 h-6 mr-4" style={{ color: colors.accentGreen }}/>
                <div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Email for a Free Review</p>
                  <p className="font-bold text-lg break-all">support@justicesupportnow.com</p>
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 mt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left" style={{ borderColor: colors.border }}>
            <p className="text-sm" style={{ color: colors.textSecondary }}>© {currentYear} Justice support now. All Rights Reserved.</p>
            <div className="flex gap-x-4 gap-y-2 flex-wrap justify-center text-sm" style={{ color: colors.textSecondary }}>
                {legalLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="hover:text-black transition-colors">{link.label}</Link>
                ))}
            </div>
            <div className="flex space-x-5" style={{ color: colors.textPrimary }}>
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