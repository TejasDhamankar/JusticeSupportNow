"use client";

import { motion } from "framer-motion";
import {
  HelpCircle,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Users,
  CheckCircle,
  Lightbulb,
  FileText,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const FrequentlyAskedQuestions = () => {
  // New "Cyber-Chic" Dark Color Palette
  const colors = {
    darkBlue: "#0A0D14",
    whiteText: "#2AAA8A", // Updated from #F0F6FC
    accentGreen: "#2AAA8A",
    hoverGreen: "#3BC1A0",
    lightGrayText: "#8B949E",
    borderGray: "#30363D",
    accentAmber: "#DBAB09",
    cardBackground: "#161B22",
  };

  const faqs = [
    {
      id: "qualification",
      category: "Eligibility",
      icon: CheckCircle,
      question: "Who can file a compensation claim?",
      answer:
        "Anyone who has suffered an injury, been exposed to a harmful product, or experienced damages due to corporate negligence may be eligible. A free case assessment will confirm your eligibility.",
      featured: true,
    },
    {
      id: "compensation",
      category: "Settlements",
      icon: DollarSign,
      question: "What factors determine my settlement amount?",
      answer:
        "The amount depends on injury severity, medical costs, lost income, and emotional distress. Each case is unique, and our team works to secure the highest possible compensation for your situation.",
      featured: true,
    },
    {
      id: "deadline",
      category: "Timeline",
      icon: Clock,
      question: "How soon should I file a claim?",
      answer:
        "Legal deadlines vary by case and state. Filing as early as possible ensures your claim is valid and protects your right to compensation.",
      featured: true,
    },
    {
      id: "fees",
      category: "Costs",
      icon: Shield,
      question: "Will I have to pay fees if my case is unsuccessful?",
      answer:
        "No. Our law firm works on a contingency basis. You only pay legal fees if we win your case or obtain a settlement, ensuring no financial risk upfront.",
      featured: true,
    },
    {
      id: "timeline",
      category: "Process",
      icon: Clock,
      question: "How long until I see results?",
      answer:
        "The duration depends on the complexity of your claim. Some cases resolve in a few months, while others take longer. Our team manages each case efficiently to reach the best outcome.",
      featured: false,
    },
    {
      id: "documentation",
      category: "Requirements",
      icon: FileText,
      question: "What details do I need to provide?",
      answer:
        "Typically, we need medical records, proof of injury or exposure, work history, and expense documentation. We guide you through everything needed for your case during the consultation.",
      featured: false,
    },
  ];

  const featuredFaqs = faqs.filter((faq) => faq.featured);
  const allFaqs = faqs;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="faq"
      style={{ backgroundColor: colors.darkBlue, color: colors.whiteText }}
    >
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Header - Left Aligned */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg" style={{ color: colors.lightGrayText }}>
            Find clear, straightforward answers to common legal questions to help you move forward with confidence.
          </p>
        </motion.div>

        {/* Main Content - Single Centered Column */}
        <div className="max-w-4xl mx-auto">
          {/* Featured Questions Section */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: colors.whiteText }}>
              <HelpCircle className="w-6 h-6 mr-3" style={{ color: colors.accentGreen }} />
              Top Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredFaqs.map((faq) => (
                <motion.div key={faq.id} variants={itemVariants}>
                  <div
                    className="h-full p-6 rounded-lg border transition-all duration-300 hover:border-accentGreen"
                    style={{
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.borderGray,
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <faq.icon
                        className="w-5 h-5 mr-3 flex-shrink-0"
                        style={{ color: colors.accentGreen }}
                      />
                      <h4 className="font-semibold">{faq.question}</h4>
                    </div>
                    <p className="text-sm" style={{ color: colors.lightGrayText }}>
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* All Questions Accordion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: colors.whiteText }}>
              <FileText className="w-6 h-6 mr-3" style={{ color: colors.accentGreen }} />
              More Information
            </h3>
            <Accordion
              type="single"
              collapsible
              className="w-full rounded-lg"
              style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}
            >
              {allFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-b"
                  style={{ borderColor: colors.borderGray }}
                >
                  <AccordionTrigger className="p-6 text-left font-medium text-lg hover:no-underline">
                    <span className="flex-1">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" style={{ color: colors.accentGreen }} />
                  </AccordionTrigger>
                  <AccordionContent
                    className="px-6 pb-6 text-base"
                    style={{ color: colors.lightGrayText }}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Combined CTA Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <Card
              className="mt-20 text-center rounded-lg" // Removed border-2
              style={{
                backgroundColor: colors.cardBackground, // Changed from darkBlue to cardBackground for consistency
                // Removed borderColor: colors.accentGreen,
              }}
            >
              <CardContent className="p-8 md:p-12">
                <MessageCircle
                  className="mx-auto h-12 w-12 mb-4"
                  style={{ color: colors.accentGreen }}
                />
                <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: colors.accentGreen }}>
                  Still Have Questions?
                </h3>
                <p
                  className="max-w-2xl mx-auto mb-8 text-lg font-bold text-[#F0F6FC]"
             
                >
                  Your situation is unique. Contact us for a free, no-obligation consultation to get personalized answers from our legal experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="font-bold text-base transition-all"
                    style={{
                      backgroundColor: colors.accentGreen,
                      color: '#FFFFFF', // Pure white text
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.hoverGreen)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.accentGreen)}
                  >
                    <Link href="#case-evaluation">
                      <FileText className="mr-2 h-5 w-5" />
                      Free Case Evaluation
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="font-bold text-base transition-all"
                    style={{
                      backgroundColor: colors.accentGreen, // Accent Green background
                      color: '#FFFFFF', // Pure white text
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.hoverGreen)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.accentGreen)}
                  >
                    <a href="tel:9143002717">
                      <Phone className="mr-2 h-5 w-5" /> {/* Changed icon back to Phone */}
                      Call (914) 300-2717
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;