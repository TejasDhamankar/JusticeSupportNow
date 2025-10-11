"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCaseTypes } from "@/lib/utils";
import { CaseType } from "@/types/case";

// Color palette
const colors = {
  darkBlue: "#0A0D14",
  whiteText: "#F0F6FC",
  accentGreen: "#2AAA8A",
  lightGrayText: "#8B949E",
  borderGray: "#30363D",
  accentAmber: "#DBAB09",
  cardBackground: "#161B22",
};

const CaseCard = ({ caseType }: { caseType: CaseType }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    }}
    className="h-full"
  >
    <Link href={`/cases/${caseType.slug}`} className="block h-full group">
      <Card 
        className="h-full flex flex-col overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-accent-green"
        style={{ 
          backgroundColor: colors.cardBackground, 
          borderColor: colors.borderGray,
          // CSS variable for hover color
          '--accent-green': colors.accentGreen 
        } as React.CSSProperties}
      >
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={caseType.imageUrl}
            alt={caseType.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div 
            className="absolute inset-0 flex items-center justify-center bg-dark-blue/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: `${colors.darkBlue}b3` }}
          >
            <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: colors.accentGreen }} />
              <p className="font-bold text-lg">View Case Details</p>
            </div>
          </div>
        </div>

        <CardHeader className="pt-6 pb-3">
          <CardTitle className="text-xl font-bold" style={{ color: colors.whiteText }}>{caseType.title}</CardTitle>
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
          <div className="flex items-center text-sm font-bold" style={{ color: colors.accentGreen }}>
            Read More
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  </motion.div>
);

const CaseTypesList = () => {
  const caseTypes = getAllCaseTypes();

  // Define categories using the provided data structure from the reference Header
  const caseCategories = {
    "Popular Cases": caseTypes.slice(0, 6),
    "Product Liability": caseTypes.filter((c) =>
      [
        "VR Headset", "Surgical Robot", "Contaminated Medical Scopes", "IVC Filter",
        "Pressure Cooker", "Inclined Sleeper", "Sunscreen Benzene", "Defective Airbag", "Boeing 737 MAX",
      ].some((key) => c.title.includes(key))
    ),
    "Military & Veterans": caseTypes.filter((c) =>
      ["Body Armor", "Red Hill Water", "3m-earplugs", "camp-lejeune"].some((key) => c.slug.includes(key) || c.title.includes(key))
    ),
  };

  // Get the name of the first category to set as the default active tab
  const defaultTab = Object.keys(caseCategories)[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  return (
    <section id="case-types" className="py-20 md:py-28" style={{ backgroundColor: colors.darkBlue }}>
       <div className="w-[80%] mx-auto h-px  mb-12 opacity-70" style={{backgroundColor:colors.accentGreen}} />
      <div className="container mx-auto px-4">
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-12">
            
            {/* Left Side: Title and Tabs */}
            <div className="md:w-5/12 lg:w-4/12 mb-12 md:mb-0 md:sticky md:top-28">
              <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: colors.whiteText }}>
                Explore Our Cases
              </h2>
              <div className="w-24 h-1.5 mb-6 rounded-full" style={{ backgroundColor: colors.accentGreen }} />
              <p className="text-lg mb-8" style={{ color: colors.lightGrayText }}>
                Our firm is actively pursuing justice in these cases. If you've been affected, you may be entitled to compensation.
              </p>

              {/* Tabs Triggers */}
              <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 h-auto gap-2 p-2 rounded-xl" style={{ backgroundColor: colors.cardBackground }}>
                {Object.keys(caseCategories).map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="w-full text-base font-semibold p-4 rounded-lg transition-colors duration-200 data-[state=active]:shadow-md"
                    style={{
                      color: colors.lightGrayText,
                      backgroundColor: 'transparent'
                    }}
                    // This uses data attributes for styling the active state, which is cleaner
                    onFocus={(e) => e.currentTarget.style.backgroundColor = colors.accentGreen}
                    onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Right Side: Case Cards */}
            <div className="md:w-7/12 lg:w-8/12">
              {Object.entries(caseCategories).map(([category, cases]) => (
                <TabsContent key={category} value={category} className="mt-0 focus:outline-none">
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={category} // Add key here to re-trigger animation on tab change
                  >
                    {cases.map((caseType) => (
                      <CaseCard key={caseType.id} caseType={caseType} />
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