"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { CaseType } from "@/types/case";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Scale, TrendingUp } from "lucide-react";
import { getAllCaseTypes } from "@/lib/utils"; // Assuming this utility function exists

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
  darkBlue: "#0A0D14", // Kept for button text
};

const OtherClaimsSection = () => {
    // Dynamically get all case types and select a few to feature
    const allCases = getAllCaseTypes();
    const featuredCases = allCases.slice(0, 8); // Display up to 8 cases in the carousel

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="relative py-20 sm:py-24" style={{ backgroundColor: colors.background }}>

            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2AAA8A]/50 to-transparent" />

            <div className="container mx-auto px-4">
                {/* Section Header with Carousel Navigation */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
                >
                    <div>
                        <Badge className="mb-4 px-4 py-2 font-bold text-sm border" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen, borderColor: colors.accentGreen + '50' }}>
                            <Scale className="w-4 h-4 mr-2" />
                            OTHER OPEN CLAIMS
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: colors.textPrimary }}>
                            Explore Additional Cases
                        </h2>
                        <p className="mt-2 text-lg" style={{ color: colors.textSecondary }}>
                            You may be entitled to compensation from more than one claim.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-6 sm:mt-0">
                        <Button variant="outline" size="icon" onClick={scrollPrev} disabled={prevBtnDisabled} className="rounded-full bg-transparent hover:border-accentGreen hover:text-accentGreen disabled:opacity-30" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={scrollNext} disabled={nextBtnDisabled} className="rounded-full bg-transparent hover:border-accentGreen hover:text-accentGreen disabled:opacity-30" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                </motion.div>

                {/* Carousel */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="overflow-hidden" ref={emblaRef}
                >
                    <div className="flex -ml-4">
                        {featuredCases.map((caseItem) => (
                            <div key={caseItem.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 pl-4">
                                <div className="group relative p-6 rounded-xl h-full transition-all duration-300" 
                                    style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.border}` }}
                                >
                                    <div 
                                        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ 
                                            border: `1px solid ${colors.accentGreen}`,
                                            boxShadow: `0 0 15px ${colors.accentGreen}60`
                                        }}
                                    />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-center mb-4">
                                            <TrendingUp className="w-5 h-5 mr-2" style={{ color: colors.accentGreen }} />
                                            <Badge className="text-xs border" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen, borderColor: colors.accentGreen+'40' }}>Ongoing</Badge>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>
                                            {caseItem.title}
                                        </h3>
                                        <p className="text-sm mb-6 flex-grow" style={{ color: colors.textSecondary }}>
                                            {caseItem.shortDescription}
                                        </p>
                                        <Button asChild variant="outline" size="sm" className="w-full hover:border-accentGreen hover:text-accentGreen" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                                            <Link href={`/cases/${caseItem.slug}`}>
                                                See Details
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                 {/* Final CTA Button */}
                 <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 text-center"
                 >
                     <Button
                        asChild
                        size="lg"
                        className="group relative font-bold text-lg py-6 px-8 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
                        style={{ backgroundColor: colors.accentGreen, color: colors.background }}
                    >
                        <Link href="/cases">
                            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-20"></span>
                            <span className="relative flex items-center">
                                Browse All Current Legal Actions
                                <ArrowRight className="ml-3 h-5 w-5" />
                            </span>
                        </Link>
                    </Button>
                 </motion.div>

            </div>
        </section>
    );
};

export default OtherClaimsSection;