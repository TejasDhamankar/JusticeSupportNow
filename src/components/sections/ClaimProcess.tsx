"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  UserCheck,
  FileText,
  Scale,
  Coins,
  ArrowRight,
  Phone,
  Shield,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const colors = {
  background: "#FFFFFF",
  textPrimary: "#212529",
  textSecondary: "#6c757d",
  accentGreen: "#2AAA8A",
  hoverGreen: "#3BC1A0",
  accentAmber: "#DBAB09",
  border: "#E9ECEF",
  cardBackground: "#F8F9FA",
};

const ClaimProcess = () => {
  const steps = [
    {
      icon: <ClipboardCheck className="h-8 w-8 text-white" />,
      title: "Complimentary Case Evaluation",
      shortTitle: "Evaluation",
      description:
        "Fill out our secure form or call us for a free, no-obligation review of your potential claim by our legal team.",
      duration: "5 Minutes",
      features: ["No commitment required", "Completely private", "Professional review"],
    },
    {
      icon: <UserCheck className="h-8 w-8 text-white" />,
      title: "Eligibility Assessment",
      shortTitle: "Assess",
      description:
        "Our experts carefully review your information to confirm eligibility and estimate possible compensation.",
      duration: "1-2 Days",
      features: ["Thorough evaluation", "Preliminary settlement estimate", "Risk analysis"],
    },
    {
      icon: <FileText className="h-8 w-8 text-white" />,
      title: "Gathering Documentation",
      shortTitle: "Document",
      description:
        "We help collect all necessary medical records, exposure documents, and supporting evidence to strengthen your case.",
      duration: "1-2 Weeks",
      features: ["Medical records collection", "Expert testimony", "Evidence preparation"],
    },
    {
      icon: <Scale className="h-8 w-8 text-white" />,
      title: "Professional Legal Support",
      shortTitle: "Support",
      description:
        "Our experienced attorneys file your claim and actively represent you to achieve the maximum possible compensation.",
      duration: "Ongoing",
      features: ["Experienced lawyers", "Strategic representation", "Maximized settlement"],
    },
    {
      icon: <Coins className="h-8 w-8 text-white" />,
      title: "Receive Compensation",
      shortTitle: "Receive",
      description:
        "Obtain the settlement you are entitled to, covering medical costs, lost wages, and other damages.",
      duration: "After Settlement",
      features: ["Medical expense coverage", "Lost income compensation", "Pain & suffering recovery"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="claim-process" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle background glow element 1 (was pinkLeaf, now accentGreen/10) */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-accentGreen/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        {/* Subtle background glow element 2 (was coralPink, now accentAmber/10) */}
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-accentAmber/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >


        <h2 className="text-4xl md:text-6xl font-black text-textPrimary mb-6 leading-tight">
            {/* Changed from gradient to a single, solid accentGreen color */}
            <span className="text-accentGreen"> 
              Clear. Efficient.
       
            <br />
            Focused on Results.
             </span>
          </h2>
         

          <motion.div
            className="w-24 h-1 bg-accentGreen mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          <p className="font-bold text-textPrimary">
            Our legal approach is designed to reduce stress and
            <span className="font-bold text-textPrimary"> secure the best possible outcome for you.</span>
            <br />
            <span className="font-bold text-textPrimary">No upfront charges. No hidden fees. Just dedicated results.</span>
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 mt-8 text-textSecondary">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-textPrimary" />
              <span className="font-bold text-textPrimary">No Fees Unless You Win</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-textPrimary" />
              <span className="font-bold text-textPrimary">Complimentary Consultation</span>
            </div>
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="hidden lg:block relative">
            {/* Timeline Line */}
            <div className="absolute top-32 left-0 right-0 h-1 bg-border rounded-full opacity-50" />
            <div className="grid grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <motion.div key={index} variants={itemVariants} className="relative group">
                  <motion.div
                    className="absolute top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {/* Step Icon Circle (was coralPink, now accentGreen) */}
                    <div
                      className="w-16 h-16 bg-accentGreen rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110"
                    >
                      <div className="text-white">{step.icon}</div>
                    </div>
                    {/* Step Number Badge (was sleutheYellow, now accentAmber) */}
                    <div
                      className="absolute -top-3 -right-3 w-8 h-8 bg-accentAmber rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    >
                      {index + 1}
                    </div>
                  </motion.div>

                  <Card
                    // Card Background
                    className="mt-48 border shadow-lg hover:shadow-2xl transition-all duration-500 bg-cardBackground/80 backdrop-blur-sm group-hover:bg-cardBackground group-hover:scale-105"
                    style={{ borderColor: colors.border }}
                  >
                    <CardHeader className="text-center pb-4">
                      {/* Duration Badge (was coralPink/20, now accentGreen/20) */}
                      <Badge className="mx-auto mb-3 bg-accentGreen/20 text-accentGreen hover:bg-accentGreen/30 border-none">
                        {step.duration}
                      </Badge>
                      {/* Title (was blackText, now whiteText/hover accentGreen) */}
                      <CardTitle className="text-lg font-bold text-accentGreen group-hover:text-accentGreen transition-colors">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      {/* Description (was blackText/80, now lightGrayText) */}
                      <CardDescription className="text-textSecondary mb-4 leading-relaxed">
                        {step.description}
                      </CardDescription>
                      <div className="space-y-2">              
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center justify-center text-sm text-textSecondary">
                            {/* Feature Check Icon (was sleutheYellow, now accentAmber) */}
                            <CheckCircle className="w-3 h-3 text-accentAmber mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
       <motion.div
  className="text-center mt-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.6 }}
>
  {/* CTA Container (was coralPink, now accentGreen) */}
  <div
    className="bg-accentGreen rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
  >
    <div className="relative z-10">
      {/* CTA Badge (was pinkLeaf/20, now whiteText/20) */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="inline-flex items-center bg-white/20 rounded-full px-6 py-2 mb-6"
      >
        <Star className="w-5 h-5 text-white mr-2" />
        <span className="font-bold text-white" style={{ color: colors.accentGreen}}>Take the First Step Today</span>
      </motion.div>
      <h3 className="text-3xl md:text-4xl font-black mb-4" style={{ color: colors.accentGreen}}>Your Case Evaluation is Completely Free</h3>
      <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed text-black">
        Act now – deadlines can be strict. Schedule your complimentary consultation today to understand your legal options.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
          <Button
            asChild
            size="lg"
            // PRIMARY CTA BUTTON: 
            // Background: accentGreen
            // Text Color: whiteText
            // Border Color: white/30
            className="bg-white hover:bg-gray-100 text-accentGreen font-black px-8 py-6 text-lg shadow-xl hover:shadow-2xl"
          >
            <Link href="#case-evaluation" className="flex items-center">
              <CheckCircle className="mr-3 h-5 w-5 "  style={{ color: colors.accentGreen}}/>
              <span className="text-black">
              Begin Your Free Case Evaluation

              </span>
              <motion.div className="ml-3" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
        <Button
          asChild
          variant="outline"
          size="lg"
          // Secondary CTA Button
          className="bg-transparent hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 font-bold px-8 py-6 text-lg backdrop-blur-sm" style={{ color: colors.accentGreen}}
        >
          <a href="tel:9085336944" className="flex items-center" >
            <Phone className="mr-3 h-5 w-5 group-hover:animate-pulse"  style={{ color: colors.accentGreen}} />
            Call (914) 300 2717 Now
          </a>
        </Button>
      </div>
      <div className="flex items-center justify-center space-x-8 mt-8 pt-6 border-t border-white/20">
        <div className="text-center">
          {/* Trust Numbers (was sleutheYellow, now accentAmber) */}
          <div className="font-black text-2xl text-accentAmber">$0</div>
          <div className="text-sm opacity-80">No Upfront Charges</div>
        </div>
        <div className="text-center">
          {/* Trust Numbers (was sleutheYellow, now accentAmber) */}
          <div className="font-black text-2xl text-accentAmber">24/7</div>
          <div className="text-sm opacity-80">Support Available</div>
        </div>
      </div>
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default ClaimProcess;