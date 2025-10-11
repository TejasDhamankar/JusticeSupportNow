"use client";

import React from "react";
import { motion } from "framer-motion";
import { CaseType } from "@/types/case";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, Zap, ArrowRight, Phone, Shield, Calendar, Scale } from "lucide-react";

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
  accentRed: "#DC3545", // A bootstrap-like danger red
  darkBlue: "#0A0D14", // Kept for button text
};

interface UrgencyCtaProps {
    caseData: CaseType;
}

const UrgencyCTA: React.FC<UrgencyCtaProps> = ({ caseData }) => {
    
    const urgencyPoints = [
        { icon: Calendar, title: "Statute of Limitations", description: "Strict legal deadlines govern all claims. Missing them means losing your rights forever." },
        { icon: Shield, title: "Preserve Critical Evidence", description: "Key documentation and records can be lost or become harder to obtain over time." },
        { icon: Scale, title: "Strengthen Your Case's Merit", description: "Acting promptly allows your legal team to build the strongest possible case for maximum recovery." },
    ];

    return (
        <section className="relative py-20 sm:py-24" style={{ backgroundColor: colors.background }}>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2AAA8A]/50 to-transparent" />

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column: Urgency Message */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.div 
                            className="inline-block mb-6 p-3 rounded-full" 
                            style={{ backgroundColor: colors.accentRed + '20' }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <AlertCircle className="w-8 h-8" style={{ color: colors.accentRed }} />
                        </motion.div>
                        
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: colors.textPrimary }}>
                            The Time to Act is Now
                        </h2>
                        <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                            The legal window to file a <strong style={{ color: colors.textPrimary }}>{caseData.title}</strong> claim is strictly limited. Delaying can result in the forfeiture of your right to compensation.
                        </p>
                    </motion.div>

                    {/* Right Column: Interactive Urgency Points */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="space-y-4"
                    >
                        {urgencyPoints.map((point, index) => (
                            <div key={index} className="group relative p-6 rounded-xl transition-all duration-300" 
                                style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.border}` }}
                            >
                                <div 
                                    className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ 
                                        border: `1px solid ${colors.accentGreen}`,
                                        boxShadow: `0 0 15px ${colors.accentGreen}60`
                                    }}
                                />
                                <div className="relative z-10 flex items-start gap-4">
                                    <point.icon className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: colors.accentGreen }} />
                                    <div>
                                        <h3 className="font-bold text-lg" style={{ color: colors.textPrimary }}>{point.title}</h3>
                                        <p className="text-sm" style={{ color: colors.textSecondary }}>{point.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Centered Final CTA Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                    className="mt-16 pt-12 border-t text-center"
                    style={{ borderColor: colors.border }}
                >
                    <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="group relative font-bold text-lg py-6 px-8 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
                            style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}
                        >
                            <Link href="#case-evaluation">
                                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-20"></span>
                                <span className="relative flex items-center">
                                    <Zap className="w-5 h-5 mr-2" />
                                    Begin Immediate Review
                                </span>
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="font-semibold text-lg py-6 px-8 rounded-lg transition-colors hover:border-accentGreen hover:text-accentGreen"
                            style={{ borderColor: colors.border, color: colors.textSecondary }}
                        >
                            <a href="tel:9143002717" className="flex items-center justify-center gap-2">
                                <Phone size={20} />
                                Contact an Attorney
                            </a>
                        </Button>
                    </div>
                     <p className="text-center mt-6 text-xs" style={{ color: colors.textSecondary }}>
                        Strictly confidential • No fee unless you win
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default UrgencyCTA;