"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Phone,
  CheckCircle,
  Zap,
  Scale,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// New color palette with a more sophisticated, matte green
const colors = {
  darkBlue: "#0A0D14",
  whiteText: "#F0F6FC",
  accentGreen: "#2AAA8A",   // A sophisticated, matte-like teal/green
  hoverGreen: "#3BC1A0",    // A slightly lighter version for hovers
  lightGrayText: "#8B949E",
  borderGray: "#30363D",
  accentAmber: "#DBAB09",
  cardBackground: "#161B22",
};

interface CaseType {
  title: string;
  imageUrl: string;
  shortDescription: string;
  featured: boolean;
}

interface CaseHeroProps {
  caseData: CaseType;
}

const CaseHero = ({ caseData }: CaseHeroProps) => {
  const router = useRouter();
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
    const element = document.getElementById("case-evaluation");
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const caseStats = {
    potentialCompensation: "$15,000 - $1,000,000+",
    casesWon: "3,200+",
    avgSettlement: "$180,000",
    timeLimit: caseData.featured ? "ACT FAST" : "OPEN",
  };

  const statItems = [
    { icon: DollarSign, label: "Expected Settlement Range", value: caseStats.potentialCompensation },
    { icon: TrendingUp, label: "Typical Recovery Amount", value: caseStats.avgSettlement },
    { icon: Users, label: "Successful Claims", value: caseStats.casesWon },
    { icon: Clock, label: "Current Claim Window", value: caseStats.timeLimit },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (

<section
      className="pt-32 pb-20 relative overflow-hidden min-h-[100vh] flex items-center"
      style={{ backgroundColor: colors.darkBlue, color: colors.whiteText, '--accent-green': colors.accentGreen, '--hover-green': colors.hoverGreen } as React.CSSProperties}
    >
      
      {/* Interactive Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(42, 170, 138, 0.1), transparent 80%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
        >
          <div className="lg:col-span-3">
            <motion.div variants={itemVariants}>
              <Breadcrumb className="mb-8">
                <BreadcrumbList className="text-sm">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" style={{ color: colors.lightGrayText }} className="hover:text-white transition-colors">Homepage</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator style={{ color: colors.accentGreen }} />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/cases" style={{ color: colors.lightGrayText }} className="hover:text-white transition-colors">View All Claims</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator style={{ color: colors.accentGreen }} />
                  <BreadcrumbItem>
                    <BreadcrumbLink className="font-semibold cursor-default" style={{ color: colors.whiteText }}>{caseData.title}</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
              <Badge className="font-bold px-3 py-1 rounded-full border-transparent" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen }}>
                <CheckCircle size={16} className="mr-1.5" /> CURRENTLY FILING
              </Badge>
              {caseData.featured && (
                <Badge className="font-bold px-3 py-1 rounded-full border-transparent animate-pulse" style={{ backgroundColor: colors.accentAmber + '20', color: colors.accentAmber }}>
                  <Zap size={16} className="mr-1.5" /> TIME-SENSITIVE
                </Badge>
              )}
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-serif font-bold mb-6 tracking-tighter" style={{ color: colors.whiteText, textShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
              {caseData.title} Claim
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl mb-10 max-w-2xl leading-relaxed" style={{ color: colors.lightGrayText }}>
              {caseData.shortDescription}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <Button
                size="lg"
                className="group relative flex-1 font-bold py-4 rounded-lg shadow-lg overflow-hidden transition-all duration-300 text-lg"
                style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}
                onClick={scrollToCaseEvaluation}
              >
                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-20"></span>
                <span className="relative">Start Free Claim Review</span>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                style={{ borderColor: colors.borderGray, color: colors.lightGrayText }}
                className="flex-1 rounded-lg py-4 font-semibold transition-colors hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]"
              >
                <a href="tel:9143002717" className="flex items-center justify-center gap-2">
                  <Phone size={20} />
                  Speak to an Attorney
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="lg:col-span-2 w-full max-w-md mx-auto lg:mx-0 lg:justify-self-end">
            <Card
              style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}
              className="p-6 shadow-2xl rounded-xl border relative before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r from-transparent via-[var(--accent-green)] to-transparent"
            >
              <h3 className="text-xl font-bold mb-4 border-b pb-4" style={{ color: colors.whiteText, borderColor: colors.borderGray }}>
                Vital Claim Statistics
              </h3>
              <div className="space-y-5">
                {statItems.map((item) => (
                  <div key={item.label} className="flex gap-4 items-center">
                    <div style={{ backgroundColor: colors.borderGray }} className="p-3 rounded-lg flex-shrink-0">
                      <item.icon className="w-6 h-6" style={{ color: colors.accentGreen }} />
                    </div>
                    <div>
                      <p className="uppercase font-semibold text-xs tracking-wider" style={{ color: colors.lightGrayText }}>{item.label}</p>
                      <p className="text-xl font-bold" style={{ color: colors.whiteText }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* <div className="w-[80%] mx-auto h-px  mb-12 opacity-70" style={{backgroundColor:colors.accentGreen}} />  */}
    </section>
   
  );
};

export default CaseHero;