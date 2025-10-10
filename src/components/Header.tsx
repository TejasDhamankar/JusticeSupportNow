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
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

// Color palette
const colors = {
  darkBlue: "#0A0D14",
  whiteText: "#F0F6FC",
  accentGreen: "#2AAA8A",
  lightGrayText: "#8B949E",
  borderGray: "#30363D",
  cardBackground: "#161B22",
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
        style={{ color: open ? colors.whiteText : colors.lightGrayText }}
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
              backgroundColor: colors.cardBackground,
              borderColor: colors.borderGray,
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
                    color: colors.lightGrayText,
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1E252E";
                    e.currentTarget.style.color = colors.whiteText;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = colors.lightGrayText;
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

  const groupedCases = {
    "Popular Cases": caseTypes.slice(0, 5),
    "Product Liability": caseTypes.filter((c) =>
      [
        "VR Headset",
        "Surgical Robot",
        "Contaminated Medical Scopes",
        "IVC Filter",
        "Pressure Cooker",
        "Inclined Sleeper",
        "Sunscreen Benzene",
        "Defective Airbag",
        "Boeing 737 MAX",
      ].some((key) => c.title.includes(key))
    ),
    "Military & Veterans": caseTypes.filter((c) =>
      ["Body Armor", "Red Hill Water"].some((key) => c.title.includes(key))
    ),
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
            scrolled ? "bg-[#0A0D14]/90 border-[#30363D]" : "bg-transparent border-transparent"
          )}
        >
          <div className="container mx-auto px-5 flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span
                className="font-black text-2xl tracking-tight select-none"
                style={{ color: colors.whiteText }}
              >
                JusticeSupportNow
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-8 items-center">
              {Object.entries(groupedCases).map(([category, cases]) => (
                <NavDropdown key={category} title={category} items={cases} />
              ))}
              <Link
                href="/cases"
                className="font-semibold transition-all duration-200 hover:scale-105"
                style={{ color: colors.lightGrayText }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.accentGreen)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.lightGrayText)}
              >
                All Cases
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <a
                href="tel:9085336944"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 border hover:border-[#2AAA8A] hover:text-[#2AAA8A]"
                style={{ color: colors.lightGrayText, borderColor: colors.borderGray }}
              >
                <Phone size={18} />
                (914) 300-2717
              </a>

              <Button
                asChild
                className="hidden lg:inline-block font-bold transition-all duration-300 hover:scale-105 shadow-md p-3"
                style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}
              >
                <Link href="#case-evaluation">Free Case Review</Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    className="lg:hidden p-2 rounded-md focus:outline-none"
                    style={{ color: colors.lightGrayText }}
                    aria-label="Toggle Menu"
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full max-w-sm p-6 backdrop-blur-xl border-l"
                  style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}
                >
                  {/* Add mobile navigation items here */}
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
