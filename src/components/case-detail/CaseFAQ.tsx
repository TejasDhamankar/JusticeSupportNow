"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CaseType } from "@/types/case";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    HelpCircle, Plus, Phone, Clock, Users,
    CheckCircle, Lightbulb, FileText, DollarSign, ArrowRight
} from "lucide-react";

// The dark theme color palette
const colors = {
    darkBlue: "#0A0D14",
    whiteText: "#F0F6FC",
    accentGreen: "#2AAA8A",
    lightGrayText: "#8B949E",
    borderGray: "#30363D",
    cardBackground: "#161B22",
};

interface CaseFAQProps {
    caseData: CaseType;
}

const CaseFAQ = ({ caseData }: CaseFAQProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);
    
    // --- Data processing logic remains the same ---
    const commonFAQs = [
        { question: "How much does it cost?", answer: "Nothing upfront. We work on a contingency fee basis, meaning you only pay if we win your case.", icon: DollarSign },
        { question: "How long will my case take?", answer: "Case timelines vary, but most resolve within 6 to 24 months. We work to expedite your case while building the strongest claim.", icon: Clock },
        { question: "Do I qualify?", answer: "Our free case evaluations will determine if you have a valid claim. There's no obligation and the consultation is completely confidential.", icon: CheckCircle },
    ];
    const allFAQs = [...caseData.faqs.map((faq) => ({ ...faq, icon: HelpCircle })), ...commonFAQs];

    return (
        <section className="relative py-20 sm:py-24 overflow-hidden" style={{ backgroundColor: colors.darkBlue }}>
            {/* Interactive Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(42, 170, 138, 0.1), transparent 80%)`,
                }}
            />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2AAA8A]/50 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Left Column: Header and Accordion */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-12"
                        >
                            <Badge className="mb-6 px-4 py-2 font-bold text-sm border" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen, borderColor: colors.accentGreen + '50' }}>
                                <Lightbulb className="w-4 h-4 mr-2" />
                                FREQUENTLY ASKED QUESTIONS
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: colors.whiteText }}>
                                Answers About the <span style={{ color: colors.accentGreen }}>{caseData.title}</span> Lawsuit
                            </h2>
                            <p className="text-lg" style={{ color: colors.lightGrayText }}>
                                Find clear answers to common questions about the legal process and what to expect.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Accordion type="multiple" className="w-full space-y-4">
                                {allFAQs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`faq-${index}`}
                                        className="border rounded-lg data-[state=open]:border-[#2AAA8A]/50 transition-all"
                                        style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}
                                    >
                                        <AccordionTrigger className="text-left font-semibold text-lg p-6 hover:no-underline" style={{ color: colors.whiteText }}>
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.borderGray }}>
                                                    <faq.icon className="w-5 h-5" style={{ color: colors.accentGreen }} />
                                                </div>
                                                <span className="block text-left">{faq.question}</span>
                                            </div>
                                            <Plus className="h-5 w-5 shrink-0 transition-transform duration-300 data-[state=open]:rotate-45" style={{ color: colors.lightGrayText }} />
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6 px-6 text-base" style={{ color: colors.lightGrayText }}>
                                            <div className="pl-16">{faq.answer}</div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    </div>

                    {/* Right Column: Sticky CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="lg:sticky top-28">
                            <Card className="shadow-2xl rounded-xl border p-8" style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.whiteText }}>Still Have Questions?</h3>
                                <p className="mb-6" style={{ color: colors.lightGrayText }}>
                                    Our partners are ready to provide a free, confidential consultation to address your specific concerns.
                                </p>
                                <div className="space-y-4 mb-8">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="group relative w-full font-bold text-lg py-6 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
                                        style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}
                                    >
                                        <a href="#case-evaluation">
                                            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-20"></span>
                                            <span className="relative flex items-center">
                                                <FileText className="mr-2 w-5 h-5" />
                                                Get a Free Case Review
                                            </span>
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="w-full font-semibold text-lg py-6 rounded-lg transition-colors hover:border-white hover:text-white"
                                        style={{ borderColor: colors.borderGray, color: colors.lightGrayText }}
                                    >
                                        <a href="tel:9143002717" className="flex items-center justify-center gap-2">
                                            <Phone size={20} />
                                            Call Us Now
                                        </a>
                                    </Button>
                                </div>
                                <div className="border-t pt-6" style={{ borderColor: colors.borderGray }}>
                                    <h4 className="font-bold mb-4 text-center" style={{ color: colors.whiteText }}>Case Statistics</h4>
                                    <div className="space-y-3 text-sm" style={{ color: colors.lightGrayText }}>
                                        <div className="flex justify-between"><span>Cases Filed:</span> <span className="font-semibold" style={{ color: colors.whiteText }}>2,500+</span></div>
                                        <div className="flex justify-between"><span>Average Settlement:</span> <span className="font-semibold" style={{ color: colors.whiteText }}>$125K</span></div>
                                        <div className="flex justify-between"><span>Our Response Time:</span> <span className="font-semibold" style={{ color: colors.whiteText }}>Under 24 Hrs</span></div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CaseFAQ;