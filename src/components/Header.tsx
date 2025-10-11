// Header.tsx
"use client";

import React, { useState, useEffect, FC } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getAllCaseTypes } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


// Color palette
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
};

interface CaseType {
  id: string;
  slug: string;
  title: string;
}

// --- Hover Dropdown ---
const NavDropdown: FC<{ title: string; items: CaseType[] }> = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 font-semibold transition-colors duration-300"
        style={{ color: open ? colors.textPrimary : colors.textSecondary }}
      >
        {title}
        <ChevronDown
          size={16}
          className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-3 w-72 rounded-xl shadow-2xl z-50 border p-3"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
            }}
          >
            <h4 className="text-sm font-semibold mb-2 px-2" style={{ color: colors.accentGreen }}>
              {title}
            </h4>
            <div className="space-y-1">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/cases/${item.slug}`}
                  className="flex justify-between items-center px-3 py-2 rounded-lg transition-colors duration-200 group"
                  style={{
                    color: colors.textSecondary,
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBackground;
                    e.currentTarget.style.color = colors.textPrimary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = colors.textSecondary;
                  }}
                >
                  {item.title}
                  <ArrowRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: colors.accentGreen }}
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Header ---
const Header: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const caseTypes = getAllCaseTypes();

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setShowHeader(current < lastScrollY || current < 150);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const groupedCaseTypes = () => {
    const popularCases = caseTypes.slice(0, 4);
    const medicalCases = caseTypes.filter(c =>
      c.title.includes("CPAP") ||
      c.title.includes("Hernia") ||
      c.title.includes("Exactech") ||
      c.title.includes("NEC")
    );
    const environmentalCases = caseTypes.filter(c =>
      c.title.includes("Camp Lejeune") ||
      c.title.includes("Roundup") ||
      c.title.includes("PFAS") ||
      c.title.includes("Paraquat")
    );

    return { popularCases, medicalCases, environmentalCases };
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "fixed top-0 left-0 w-full z-50 backdrop-blur-lg transition-colors duration-300 border-b",
            scrolled ? `bg-white/90 border-[${colors.border}]` : "bg-transparent border-transparent"
          )}
        >
          <div className="container mx-auto px-5 flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center justify-baseline gap-2 ">
            <img src="/JUSticeCrop(3).png" alt="Justice Support Now Logo" className="mt-4 h-[70px] object-cover w-auto mb-4  hover:scale-110 transition-all duration-300" />
             
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-8 items-center">
              {Object.entries(groupedCaseTypes()).map(([category, cases]) => (
                <NavDropdown key={category} title={category} items={cases} />
              ))}
              <Link
                href="/cases"
                className="font-semibold transition-all duration-200 hover:scale-105"
                style={{ color: colors.textSecondary }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.accentGreen)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSecondary)}
              >
                All Cases
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <a
                href="tel:9085336944"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 border hover:border-accentGreen hover:text-accentGreen"
                style={{ color: colors.textSecondary, borderColor: colors.border }}
              >
                <Phone size={18} />
                (914) 300-2717
              </a>

              <Button
                asChild
                className="hidden lg:inline-block font-bold transition-all duration-300 hover:scale-105 shadow-md p-3"
                style={{ backgroundColor: colors.accentGreen, color: colors.background }}
              >
                <Link href="#case-evaluation">Free Case Review</Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    className="lg:hidden p-2 rounded-md focus:outline-none"
                    style={{ color: colors.textSecondary }}
                    aria-label="Toggle Menu"
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full max-w-sm p-6 backdrop-blur-xl border-l"
                  style={{ backgroundColor: `${colors.background}F2`, borderColor: colors.border }}
                >
                  <div className="flex flex-col h-full">
                    <div className="pb-6 border-b" style={{ borderColor: colors.border }}>
                      <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <img src="/JUStice support(3).png" alt="Justice Support Now Logo" className="h-[150px] w-[150px]" />
                      </Link>
                    </div>
                    <nav className="flex-grow mt-6 space-y-2">
                      <Accordion type="multiple" className="w-full">
                        {Object.entries(groupedCaseTypes()).map(([category, cases]) => (
                          <AccordionItem key={category} value={category} className="border-b-0">
                            <AccordionTrigger className="font-semibold text-lg hover:no-underline py-3" style={{ color: colors.textPrimary }}>
                              {category}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-4 space-y-2">
                                {cases.map((item) => (
                                  <Link
                                    key={item.id}
                                    href={`/cases/${item.slug}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-2 text-md"
                                    style={{ color: colors.textSecondary }}
                                  >
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      <Link
                        href="/cases"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block font-semibold text-lg py-3"
                        style={{ color: colors.textPrimary }}
                      >
                        All Cases
                      </Link>
                    </nav>
                    <div className="mt-auto pt-6 border-t space-y-4" style={{ borderColor: colors.border }}>
                      <Button asChild size="lg" className="w-full font-bold" style={{ backgroundColor: colors.accentGreen, color: colors.background }}>
                        <Link href="#case-evaluation" onClick={() => setMobileMenuOpen(false)}>Free Case Review</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="w-full font-semibold" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                        <a href="tel:9143002717">Call (914) 300-2717</a>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
