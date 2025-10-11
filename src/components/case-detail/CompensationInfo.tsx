"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { CaseType } from "@/types/case";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calculator, Heart, Shield, TrendingUp, Award,
    Banknote, ArrowRight, CheckCircle, AlertCircle
} from "lucide-react";

// --- Color Palette ---
const colors = {
    darkBlue: "#0A0D14",
    whiteText: "#F0F6FC",
    accentGreen: "#2AAA8A",
    lightGrayText: "#8B949E",
    borderGray: "#30363D",
    cardBackground: "#161B22",
};

// --- Helper component for styled progress bar ---
const ProgressBar = ({ progress, color }: { progress: number; color: string; }) => (
    <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.borderGray }}>
        <motion.div
            className="h-2 rounded-full"
            style={{ background: `linear-gradient(to right, ${colors.accentGreen}, #63D4B5)` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
        />
    </div>
);

// --- Main Component ---
interface CompensationInfoProps {
    caseData: CaseType & { compensationInfo: string };
}

const CompensationInfo = ({ caseData }: CompensationInfoProps) => {

    const compensationRanges = [
        { type: "Economic Damages", description: "Covers medical bills, lost wages, and other direct financial losses.", icon: Calculator },
        { type: "Non-Economic Damages", description: "For physical pain, emotional trauma, and diminished quality of life.", icon: Heart },
        { type: "Punitive Damages", description: "Awarded to punish defendants for extreme negligence or misconduct.", icon: Shield },
    ];

    const compensationFactors = [
        { factor: "Severity of Illness or Injury", impact: "Critical" },
        { factor: "Supporting Medical Records", impact: "Critical" },
        { factor: "Loss of Income / Earning Capacity", impact: "High" },
        { factor: "Duration of Exposure or Use", impact: "High" },
        { factor: "Claimant's Age at Time of Injury", impact: "Medium" },
    ];

    const settlementExamples = [
        { amount: "$485,000", description: "For irreversible organ damage" },
        { amount: "$275,000", description: "For family affected by a harmful product" },
        { amount: "$125,000", description: "For clearly documented personal injuries" },
        { amount: "$350,000", description: "For multiple victims in a single household" },
    ];

    return (
        <section className="relative py-20 sm:py-24" style={{ backgroundColor: colors.darkBlue }}>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2AAA8A]/50 to-transparent" />

            <div className="container mx-auto px-4 relative max-w-5xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <Badge className="mb-6 px-4 py-2 font-bold text-sm border" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen, borderColor: colors.accentGreen + '50' }}>
                            <Banknote className="w-4 h-4 mr-2" />
                            RECOVERY ASSESSMENT
                        </Badge>
                        <h2 className="font-serif font-bold text-4xl md:text-5xl" style={{ color: colors.whiteText }}>
                            Understanding Your Potential <span style={{ color: colors.accentGreen }}>Claim Value</span>
                        </h2>
                        <p className="mt-4 text-lg" style={{ color: colors.lightGrayText }}>
                            {caseData.compensationInfo} Our legal partners analyze multiple factors to build the strongest possible case for your financial recovery.
                        </p>
                    </div>

                    {/* Tabbed Interface */}
                    <Tabs.Root defaultValue="tab1">
                        <Tabs.List className="flex items-center justify-center gap-4 mb-8" aria-label="Compensation Information">
                            <Tabs.Trigger value="tab1" className="data-[state=active]:text-white data-[state=inactive]:text-[#8B949E] data-[state=active]:bg-[#161B22] font-semibold py-2 px-5 rounded-full transition-colors">Damages Explained</Tabs.Trigger>
                            <Tabs.Trigger value="tab2" className="data-[state=active]:text-white data-[state=inactive]:text-[#8B949E] data-[state=active]:bg-[#161B22] font-semibold py-2 px-5 rounded-full transition-colors">Payout Factors</Tabs.Trigger>
                            <Tabs.Trigger value="tab3" className="data-[state=active]:text-white data-[state=inactive]:text-[#8B949E] data-[state=active]:bg-[#161B22] font-semibold py-2 px-5 rounded-full transition-colors">Past Results</Tabs.Trigger>
                        </Tabs.List>
                        
                        <div className="p-8 rounded-xl border" style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}>
                            <Tabs.Content value="tab1" className="space-y-6">
                                {compensationRanges.map((item) => (
                                    <div key={item.type} className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg mt-1" style={{ backgroundColor: colors.borderGray }}><item.icon className="w-6 h-6" style={{ color: colors.accentGreen }} /></div>
                                        <div>
                                            <h4 className="font-bold text-lg" style={{ color: colors.whiteText }}>{item.type}</h4>
                                            <p style={{ color: colors.lightGrayText }}>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </Tabs.Content>
                            <Tabs.Content value="tab2" className="space-y-6">
                                {compensationFactors.map((item) => (
                                    <div key={item.factor}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold" style={{ color: colors.whiteText }}>{item.factor}</span>
                                            <Badge variant="outline" className="border text-xs" style={{ color: item.impact === 'Critical' ? colors.accentGreen : colors.accentGreen, borderColor: item.impact === 'Critical' ? colors.accentGreen+'50' : colors.accentGreen+'50' }}>{item.impact} Impact</Badge>
                                        </div>
                                        <ProgressBar progress={100} color={colors.accentGreen} />
                                    </div>
                                ))}
                            </Tabs.Content>
                            <Tabs.Content value="tab3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {settlementExamples.map((item) => (
                                    <div key={item.amount} className="p-4 rounded-lg text-center border" style={{ backgroundColor: colors.darkBlue, borderColor: colors.borderGray }}>
                                        <p className="text-3xl font-bold mb-1" style={{ color: colors.accentGreen }}>{item.amount}</p>
                                        <p className="text-sm" style={{ color: colors.lightGrayText }}>{item.description}</p>
                                    </div>
                                ))}
                                </div>
                                <p className="text-xs text-center mt-4" style={{ color: colors.lightGrayText }}>
                                    <AlertCircle className="inline w-3 h-3 mr-1" />Prior results do not guarantee future outcomes.
                                </p>
                            </Tabs.Content>
                        </div>
                    </Tabs.Root>

                    {/* Final CTA */}
                    <div className="mt-16 text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4" style={{ color: colors.whiteText }}>Ready to Determine Your Claim's Value?</h3>
                        <p className="mb-8" style={{ color: colors.lightGrayText }}>
                            Our partners can provide a detailed and confidential assessment of what your case may be worth. Start your free, no-obligation review now.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="group relative w-full max-w-xs font-bold text-lg py-6 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
                            style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}
                        >
                            <a href="#case-evaluation">
                                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-20"></span>
                                <span className="relative flex items-center">
                                    Assess My Claim
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </span>
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CompensationInfo;