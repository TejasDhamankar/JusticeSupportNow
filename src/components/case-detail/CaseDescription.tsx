"use client";

import { motion } from "framer-motion";
import { CaseType } from "@/types/case";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Users, Calendar, TrendingUp, Building2,
    AlertCircle, ArrowRight, BookOpen, Check, FileSignature, Gavel, Award
} from "lucide-react";

// Define the color palette to match your theme
const colors = {
    darkBlue: "#0A0D14",
    whiteText: "#F0F6FC",
    accentGreen: "#2AAA8A",
    lightGrayText: "#8B949E",
    borderGray: "#30363D",
    accentRed: "#F87171",
};

interface CaseDescriptionProps {
    caseData: CaseType;
}

const CaseDescription = ({ caseData }: CaseDescriptionProps) => {

    const keyFacts = [
        { icon: Users, label: "Individuals Impacted", value: "Thousands nationwide" },
        { icon: Building2, label: "Named Defendants", value: "Major corporations" },
        { icon: Calendar, label: "Current Legal Stage", value: "Active litigation" },
        { icon: TrendingUp, label: "Expected Payouts", value: "$10K - $500K+" }
    ];

    const legalPathway = [
        { icon: FileSignature, title: "Step 1: Free Case Assessment", description: "Submit your details through our secure form for a 100% free and confidential evaluation to determine your eligibility." },
        { icon: Gavel, title: "Step 2: Claim Filing & Litigation", description: "If you qualify, our legal partners will compile evidence, build your case, and file a formal claim on your behalf." },
        { icon: Award, title: "Step 3: Settlement & Compensation", description: "Your attorneys will negotiate for the maximum possible settlement or fight for you in court to secure your financial recovery." }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="relative py-20 sm:py-24" style={{ backgroundColor: colors.darkBlue }}>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2AAA8A]/50 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                    viewport={{ once: true, amount: 0.2 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants}>
                        <Badge className="mb-6 px-4 py-2 font-bold text-sm border" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen, borderColor: colors.accentGreen + '50' }}>
                            <BookOpen className="w-4 h-4 mr-2" />
                            CLAIM DETAILS & PROCESS
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: colors.whiteText }}>
                            Understanding the <span style={{ color: colors.accentGreen }}>{caseData.title}</span> Lawsuit
                        </h2>
                        <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: colors.lightGrayText }}>
                            {caseData.fullDescription}
                        </p>
                    </motion.div>

                    {/* Key Facts Grid */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 my-16">
                        {keyFacts.map((fact) => (
                            <div key={fact.label} className="text-center">
                                <fact.icon className="w-8 h-8 mx-auto mb-2" style={{ color: colors.accentGreen }} />
                                <p className="font-bold text-xl md:text-2xl" style={{ color: colors.whiteText }}>{fact.value}</p>
                                <p className="text-xs md:text-sm" style={{ color: colors.lightGrayText }}>{fact.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Timeline Section */}
                    <motion.div variants={itemVariants} className="relative mt-16">
                        <h3 className="text-3xl font-serif font-bold mb-12">Your Legal Recovery Pathway</h3>
                        {/* The vertical line */}
                        <div className="absolute left-1/2 top-0 h-full w-0.5" style={{ background: colors.borderGray }} />
                        
                        <div className="relative flex flex-col gap-12">
                            {legalPathway.map((step, index) => (
                                <div key={index} className="flex items-center justify-center">
                                    <div className="relative w-full lg:w-1/2 flex justify-end lg:pr-16" style={{ order: index % 2 === 0 ? 1 : 2 }}>
                                        <motion.div 
                                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6 }}
                                            className="p-6 rounded-lg text-left w-full border" 
                                            style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}
                                        >
                                            <h4 className="font-bold text-lg mb-2" style={{ color: colors.accentGreen }}>{step.title}</h4>
                                            <p className="text-sm" style={{ color: colors.lightGrayText }}>{step.description}</p>
                                        </motion.div>
                                    </div>

                                    {/* Timeline Icon */}
                                    <div className="relative flex-shrink-0" style={{ order: index % 2 === 0 ? 2 : 1 }}>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full" style={{ backgroundColor: colors.borderGray}}>
                                            <step.icon className="w-6 h-6" style={{ color: colors.accentGreen }} />
                                        </div>
                                    </div>
                                    <div className="hidden lg:block w-1/2" style={{ order: index % 2 === 0 ? 3 : 0 }}/>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                     {/* Final CTA */}
                    <motion.div variants={itemVariants} className="mt-16 pt-12 border-t" style={{ borderColor: colors.borderGray }}>
                        <div className="flex justify-center items-center gap-3 mb-6 p-3 rounded-md text-sm" style={{ backgroundColor: '#450a0a', color: colors.accentRed }}>
                             <AlertCircle className="w-5 h-5 flex-shrink-0" />
                             <p className="font-medium">Statutes of limitations apply — you must act quickly to preserve your right to file a claim.</p>
                        </div>

                        <Button
                            asChild
                            size="lg"
                            className="group relative w-full max-w-md font-bold text-lg py-6 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
                            style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}
                        >
                            <a href="#case-evaluation">
                                <span className="absolute w-0 h-0 transition-all duration-400 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-20"></span>
                                <span className="relative flex items-center">
                                    Begin Your Free Assessment
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </span>
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CaseDescription;