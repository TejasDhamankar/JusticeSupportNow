"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { CaseType } from "@/types/case";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlusCircle, AlertCircle, Users, ArrowRight, Target } from "lucide-react";

// --- Animated Counter Component ---
const AnimatedCounter = ({ value }: { value: number }) => {
    const ref = React.useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() =>
        springValue.on("change", (latest) => {
            if (ref.current) {
                (ref.current as HTMLElement).textContent = `${Math.round(latest).toLocaleString()}%`;
            }
        }),
        [springValue]
    );

    return <span ref={ref} />;
};

// --- Main Component ---

const colors = {
    darkBlue: "#0A0D14",
    whiteText: "#F0F6FC",
    accentGreen: "#2AAA8A",
    lightGrayText: "#8B949E",
    borderGray: "#30363D",
    cardBackground: "#161B22",
    accentRed: "#F87171",
};

interface EligibilityCriteriaProps {
    caseData: CaseType;
}

const EligibilityCriteria: React.FC<EligibilityCriteriaProps> = ({ caseData }) => {
    const { eligibilityCriteria } = caseData;
    const midpoint = Math.ceil(eligibilityCriteria.length / 2);
    const essential = eligibilityCriteria.slice(0, midpoint);
    const additional = eligibilityCriteria.slice(midpoint);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const scrollToCaseEvaluation = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById("case-evaluation")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="relative py-20 sm:py-24 overflow-hidden" style={{ backgroundColor: colors.darkBlue }}>
            {/* Horizontal line */}
            <div className="w-[80%] mx-auto h-px  mb-12 opacity-70" style={{backgroundColor:colors.accentGreen}} />
            {/* Interactive Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(42, 170, 138, 0.08), transparent 80%)`,
                }}
            />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2AAA8A]/50 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge className="mb-6 px-4 py-2 font-bold text-sm border" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen, borderColor: colors.accentGreen + '50' }}>
                            <Target className="w-4 h-4 mr-2" />
                            QUALIFICATION BENCHMARKS
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: colors.whiteText }}>
                            Do You Qualify for <span style={{ color: colors.accentGreen }}>Financial Recovery?</span>
                        </h2>
                        <p className="text-lg sm:text-xl" style={{ color: colors.lightGrayText }}>
                            Review the criteria below. If these points describe your situation, you may be eligible to file a claim for the <strong>{caseData.title}</strong> lawsuit.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="my-12 p-8 rounded-xl border"
                        style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}
                    >
                        <Users className="w-10 h-10 mx-auto" style={{ color: colors.accentGreen }} />
                        <div className="text-6xl md:text-7xl font-bold my-2" style={{ color: colors.whiteText }}>
                            <AnimatedCounter value={92} />
                        </div>
                        <p style={{ color: colors.lightGrayText }}>Of Applicants Meet the Criteria for a Successful Claim</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="p-8 rounded-xl border text-left"
                        style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}
                    >
                        <h3 className="text-2xl font-bold mb-6" style={{ color: colors.whiteText }}>Qualification Checklist</h3>
                        <div className="space-y-4">
                            {essential.map((criterion, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 rounded-md" style={{ backgroundColor: colors.darkBlue }}>
                                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: colors.accentGreen }} />
                                    <p style={{ color: colors.lightGrayText }}>{criterion}</p>
                                </div>
                            ))}
                            {additional.length > 0 && (
                                <>
                                    <h4 className="text-lg font-bold pt-4" style={{ color: colors.whiteText }}>Additional Factors</h4>
                                    {additional.map((criterion, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 rounded-md" style={{ backgroundColor: colors.darkBlue }}>
                                            <PlusCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: colors.lightGrayText }} />
                                            <p style={{ color: colors.lightGrayText }}>{criterion}</p>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-16"
                    >
                        <div className="flex justify-center items-center gap-3 mb-6 p-3 rounded-md text-sm" style={{ backgroundColor: '#450a0a', color: colors.accentRed }}>
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="font-medium">Due to legal deadlines, your time to file a claim is limited. Act now.</p>
                        </div>
                        <Button
                            asChild
                            size="lg"
                            className="group relative w-full max-w-md font-bold text-lg py-6 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
                            style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}
                            onClick={scrollToCaseEvaluation}
                        >
                            <a href="#case-evaluation">
                                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-20"></span>
                                <span className="relative flex items-center">
                                    Start My Free Evaluation
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </span>
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EligibilityCriteria;