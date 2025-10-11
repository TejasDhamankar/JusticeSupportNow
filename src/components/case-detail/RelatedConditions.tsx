"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaseType } from "@/types/case";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    AlertCircle, Heart, Brain, Activity, Stethoscope, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// The dark theme color palette
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
};

interface RelatedConditionsProps {
    caseData: CaseType;
}

type Condition = {
    name: string;
    category: "severe" | "moderate" | "mild";
    icon: React.ElementType;
};

const RelatedConditions = ({ caseData }: RelatedConditionsProps) => {
    const getConditionIcon = (condition: string) => {
        const c = condition.toLowerCase();
        if (c.includes("heart") || c.includes("cardiac")) return Heart;
        if (c.includes("brain") || c.includes("neuro")) return Brain;
        if (c.includes("lung") || c.includes("respiratory")) return Activity;
        return Stethoscope;
    };

    const allConditions: Condition[] = (caseData.relatedConditions || []).map(condition => {
        const c = condition.toLowerCase();
        let category: "severe" | "moderate" | "mild" = "mild";
        if (c.includes("cancer") || c.includes("death") || c.includes("failure") || c.includes("mesothelioma")) {
            category = "severe";
        } else if (c.includes("disease") || c.includes("disorder") || c.includes("syndrome")) {
            category = "moderate";
        }
        return { name: condition, category, icon: getConditionIcon(condition) };
    });

    const [hoveredCondition, setHoveredCondition] = useState<Condition | null>(allConditions[0] || null);

    const categoryStyles = {
        severe: { color: colors.accentRed, text: "High-Impact" },
        moderate: { color: colors.accentAmber, text: "Systemic" },
        mild: { color: colors.accentGreen, text: "Secondary" },
    };

    return (
        <section className="relative py-20 sm:py-24" style={{ backgroundColor: colors.background }}>
            {/* Horizontal line */}
            <div className="w-[80%] mx-auto h-px mb-12 opacity-70" style={{backgroundColor:colors.accentGreen}} />
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
                >
                    <Badge className="mb-6 px-4 py-2 font-bold text-sm border" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen, borderColor: colors.accentGreen + '50' }}>
                        <Stethoscope className="w-4 h-4 mr-2" />
                        QUALIFYING DIAGNOSES
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: colors.textPrimary }}>
                        Medical Conditions Linked to the <span style={{ color: colors.accentGreen }}>{caseData.title}</span> Lawsuit
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Interactive List */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-2"
                    >
                        {allConditions.map((condition) => (
                            <button
                                key={condition.name}
                                onMouseEnter={() => setHoveredCondition(condition)}
                                className={cn(
                                    "text-left p-4 rounded-md text-lg font-semibold transition-all duration-200 border border-transparent",
                                    hoveredCondition?.name === condition.name
                                        ? "bg-cardBackground border-border text-textPrimary"
                                        : "text-textSecondary hover:text-textPrimary"
                                )}
                            >
                                {condition.name}
                            </button>
                        ))}
                    </motion.div>

                    {/* Right Column: Display Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 sticky top-28 h-fit"
                    >
                        <div className="p-8 rounded-xl border" style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
                            <AnimatePresence mode="wait">
                                {hoveredCondition && (
                                    <motion.div
                                        key={hoveredCondition.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Badge
                                            className="font-bold border-transparent mb-4"
                                            style={{
                                                backgroundColor: categoryStyles[hoveredCondition.category].color + '20',
                                                color: categoryStyles[hoveredCondition.category].color,
                                            }}
                                        >
                                            {categoryStyles[hoveredCondition.category].text} Condition
                                        </Badge>

                                        <div className="flex items-start gap-4">
                                             <hoveredCondition.icon className="w-12 h-12 flex-shrink-0 mt-1" style={{ color: categoryStyles[hoveredCondition.category].color }} />
                                            <div>
                                                 <h3 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>{hoveredCondition.name}</h3>
                                                 <p className="mt-2 text-md" style={{ color: colors.textSecondary }}>This diagnosis is frequently cited in successful claims and is a key indicator for eligibility.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-8 pt-8 border-t" style={{ borderColor: colors.border }}>
                                <div className="flex items-center gap-3 mb-6 p-3 rounded-md text-sm" style={{ backgroundColor: colors.accentRed + '15', color: colors.accentRed }}>
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="font-medium">Time is limited. You must act quickly to preserve your right to file a claim.</p>
                                </div>
                                <Button
                                    asChild
                                    size="lg"
                                    className="group relative w-full font-bold text-lg py-6 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
                                    style={{ backgroundColor: colors.accentGreen, color: colors.background }}
                                >
                                    <a href="#case-evaluation">
                                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-20"></span>
                                        <span className="relative flex items-center">
                                            Start My Free Review
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
    </section>
    );
};

export default RelatedConditions;