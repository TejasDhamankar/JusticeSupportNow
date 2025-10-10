"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Scale, Heart, Leaf, Shield, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Data Import: This is where you get all the card data directly from utils.
import { getAllCaseTypes } from "@/lib/utils";
import { CaseType } from "@/types/case";

// Color palette
const colors = {
  darkBlue: "#0A0D14",
  whiteText: "#F0F6FC",
  accentGreen: "#2AAA8A",
  hoverGreen: "#3BC1A0",
  lightGrayText: "#8B949E",
  borderGray: "#30363D",
  accentAmber: "#DBAB09",
  cardBackground: "#161B22",
};

const CaseTypesList = () => {
  const caseTypes = getAllCaseTypes();
  const [activeTab, setActiveTab] = useState("all");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  };

  // Centralized slug lists for robust filtering
  const medicalSlugs = ["cpap", "hernia-mesh", "talcum-powder", "exactech", "depo-provera", "zantac", "infant-formula-nec"];
  const environmentalSlugs = ["camp-lejeune", "roundup", "paraquat", "pfas-water-contamination", "firefighting-foam"];
  const militarySlugs = ["3m-earplugs", "camp-lejeune", "firefighting-foam"];

  const caseCategories = {
    all: {
      cases: caseTypes,
      icon: Scale,
      title: "All Cases",
    },
    medical: {
      cases: caseTypes.filter(c => medicalSlugs.includes(c.slug)),
      icon: Heart,
      title: "Medical & Pharma",
    },
    environmental: {
      cases: caseTypes.filter(c => environmentalSlugs.includes(c.slug)),
      icon: Leaf,
      title: "Environmental",
    },
    military: {
      cases: caseTypes.filter(c => militarySlugs.includes(c.slug)),
      icon: Shield,
      title: "Military & Veterans",
    },
  };

  const CaseCard = ({ caseType }: { caseType: CaseType }) => (
    <motion.div key={caseType.id} variants={itemVariants} className="h-full">
      <Link href={`/cases/${caseType.slug}`} className="block h-full group">
        {/* NOTE: Inline style variable for accent-green to use with hover */}
        <Card className="h-full flex flex-col overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-[var(--accent-green)]" 
              style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray, '--accent-green': colors.accentGreen }}>
          
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={caseType.imageUrl}
              alt={caseType.title}
              fill
              className="object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ backgroundColor: `${colors.darkBlue}b3` }}
            >
              <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: colors.accentGreen }} />
                <p className="font-bold text-lg mb-2">View Case Details</p>
                <p className="text-sm opacity-90">Learn about compensation</p>
              </div>
            </div>
          </div>

          <CardHeader className="pt-6 pb-3">
            <CardTitle className="text-xl font-bold" style={{ color: colors.accentGreen }}>{caseType.title}</CardTitle>
          </CardHeader>

          <CardContent className="pt-0 pb-4 flex-grow">
            <CardDescription className="line-clamp-3 leading-relaxed" style={{ color: colors.lightGrayText }}>{caseType.shortDescription}</CardDescription>
            <div className="flex items-center mt-4 space-x-4 text-sm" style={{ color: colors.lightGrayText }}>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5" style={{ color: colors.accentAmber }} />
                <span>Free Consult</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1.5" style={{ color: colors.accentGreen }} />
                <span>No Win, No Fee</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-0 pb-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center text-sm font-bold" style={{ color: colors.whiteText }}>
                Read More
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );

  return (
    <section id="case-types" className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: colors.darkBlue }}>
      <div className="container mx-auto px-4 relative z-10">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row md:space-x-12">
            {/* Left Side: Title and Tabs */}
            <div className="md:w-5/12 mb-12 md:mb-0 flex flex-col justify-center">

              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight" style={{ color: colors.accentGreen }}>
                Mass Tort & <br /> Class Action Cases
              </h2>
              <div className="w-24 h-1 mb-6 rounded-full" style={{ backgroundColor: colors.accentGreen }} />
              <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: colors.lightGrayText }}>
                <span className="font-bold" style={{ color: colors.lightGrayText }}>Our firm is actively handling these significant cases. If you've been affected, you may be entitled to substantial compensation.</span>
              </p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href="/contact" 
                  className="inline-flex items-center justify-center text-center px-8 py-4 mb-8 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-[1.03] shadow-xl"
                  style={{
                    backgroundColor: colors.accentGreen, 
                    color: colors.whiteText, 
                  }}
                >
                  Get a Free, Confidential Case Review
                  <ArrowRight size={20} className="ml-3" />
                </Link>
              </motion.div>

              {/* Tabs Triggers */}
              <TabsList className="grid h-auto grid-cols-2 gap-2 w-full max-w-md p-2 rounded-2xl" style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}>
                {Object.entries(caseCategories).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="flex flex-col items-center justify-center gap-1 text-center p-2 h-24 w-full rounded-xl font-bold transition-all duration-300 data-[state=active]:shadow-lg"
                      style={{
                        backgroundColor: activeTab === key ? colors.accentGreen : "transparent",
                        color: colors.whiteText 
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{category.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Right Side: Case Cards */}
            <div className="md:w-7/12 h-[48rem] overflow-y-auto pr-4 custom-scrollbar">
              {Object.entries(caseCategories).map(([category, data]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    // Ensures re-animation when tab changes
                    key={category} 
                  >
                    {data.cases.map((caseType) => (
                      <CaseCard key={`${category}-${caseType.id}`} caseType={caseType} />
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default CaseTypesList;