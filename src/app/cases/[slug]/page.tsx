import { notFound } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import CaseHero from "@/components/case-detail/CaseHero";
import CaseDescription from "@/components/case-detail/CaseDescription";
import EligibilityCriteria from "@/components/case-detail/EligibilityCriteria";
import CompensationInfo from "@/components/case-detail/CompensationInfo";
import RelatedConditions from "@/components/case-detail/RelatedConditions";
import CaseFAQ from "@/components/case-detail/CaseFAQ";
import CaseEvaluation from "@/components/sections/CaseEvaluation";
import Link from "next/link";
import { getCaseBySlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Clock,
    Phone,
    Shield,
    ArrowRight,
    AlertCircle,
    Zap,
    TrendingUp,
    Scale,
    CheckCircle
} from "lucide-react";
import UrgencyCTA from "@/components/case-detail/Urgency";
import OtherClaimsSection from "@/components/case-detail/OtherClaimsSection";

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

export async function generateMetadata({
    params
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const caseData = await getCaseBySlug(params.slug);

    if (!caseData) {
        return {
            title: "Case Not Found | JusticeLink",
            // Changed: We couldn’t locate the case details you’re looking for.
            description: "The specific case information you requested is unavailable."
        };
    }

    return {
        title: `${caseData.title} Compensation & Legal Review | JusticeLink`,
        // Changed: Get your free legal consultation today — no hidden costs.
        description: `${caseData.shortDescription} Secure your complimentary legal assessment now—absolutely no concealed charges.`,
        keywords: `${caseData.title.toLowerCase()}, lawsuit help, legal support, case review, no win no fee, ${caseData.slug?.toLowerCase()}`,
        openGraph: {
            title: `${caseData.title} Legal Help | Free Consultation`,
            description: caseData.shortDescription,
            images: [caseData.imageUrl]
        }
    };
}

export default async function CaseDetailPage({
    params
}: {
    params: { slug: string };
}) {
    const caseData = await getCaseBySlug(params.slug);

    if (!caseData) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col" style={{ backgroundColor: colors.background, color: colors.textPrimary }}>
            <Header />

            {/* Case Hero Section */}
            
            <CaseHero caseData={caseData} />

            <section id="#casereview">
                <CaseEvaluation />
            </section>


            {/* Trust Section */}
            <section
                className="relative py-16 overflow-hidden"
                style={{ backgroundColor: colors.cardBackground }}
            >
                {/* Horizontal Line */}
                <div className="w-[80%] mx-auto h-px mb-12 opacity-70" style={{backgroundColor:colors.accentGreen}} />
                {/* Decorative Background Circles */}
                <div className="absolute -top-40 -left-40 w-72 h-72 rounded-full bg-[#2AAA8A]/20 blur-3xl animate-blob"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#2AAA8A]/10 blur-3xl animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
                    {/* Headline */}
                    <h2
                        className="text-4xl sm:text-5xl font-extrabold mb-8 leading-tight"
                        style={{
                            // Gradient text clipped (if you want pure solid, remove below)
                            background:
                                `linear-gradient(90deg, ${colors.accentGreen} 0%, ${colors.textSecondary} 50%, ${colors.accentGreen} 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Why Choose Justice Support Now for Your{" "}
                        <span style={{ color: colors.accentGreen }}>{caseData.title}</span> Case?
                    </h2>

                    {/* Description */}
                    <p className="text-lg sm:text-xl leading-relaxed mb-12 max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
                        At JusticeLink, our experienced legal team has helped countless clients
                        navigate complex legal challenges. We prioritize your case, providing
                        expert guidance and unwavering support to ensure you receive the justice
                        and compensation you deserve.
                    </p>

                    {/* Call to Action Button with hover & shadow */}
                    <a
                        href="#case-evaluation"
                        className="inline-flex items-center font-bold px-10 py-5 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 text-xl transform hover:-translate-y-1" style={{ backgroundColor: colors.accentGreen, color: colors.background, '&:hover': { backgroundColor: colors.hoverGreen } }}
                    >
                        Get Free Case Evaluation
                        <ArrowRight className="ml-4 w-6 h-6" />
                    </a>
                </div>
            </section>


            {/* Main Case Sections */}
            <CaseDescription caseData={caseData} />
            <RelatedConditions caseData={caseData} />
            <EligibilityCriteria caseData={caseData} />
            <CompensationInfo caseData={caseData} />

            {/* Urgency Section  green theme done*/}
            <UrgencyCTA caseData={caseData} />


            {/* FAQ Section */}
            <CaseFAQ caseData={caseData} />

            {/* Case Evaluation */}
            <div
                id="case-evaluation"
                style={{ backgroundColor: colors.background }}
                className="pt-20" // Added padding to the top of the wrapper
            >
                {/* Separator line for visual distinction */}
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div
                        className="h-px w-full"
                        style={{
                            background: `linear-gradient(to right, transparent, ${colors.accentGreen}33, transparent)`,
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-8 max-w-3xl mx-auto">
                        <Badge
                            className="mb-6 px-4 py-2 font-bold text-sm border"
                            style={{
                                backgroundColor: colors.accentGreen + '20',
                                color: colors.accentGreen,
                                borderColor: colors.accentGreen + '50',
                            }}
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            PERSONALIZED & CONFIDENTIAL
                        </Badge>
                        <h2
                            className="text-4xl md:text-5xl font-serif font-bold mb-4"
                            style={{ color: colors.textPrimary }}
                        >
                            Free <span style={{ color: colors.accentGreen }}>{caseData.title}</span> Case Assessment
                        </h2>
                        <p className="text-lg" style={{ color: colors.textSecondary }}>
                            A member of our team will examine your situation to confirm your eligibility for financial recovery. Begin with a straightforward, commitment-free evaluation.
                        </p>
                    </div>
                </div>

                {/* The CaseEvaluation component you already have will follow, fitting perfectly below this header. */}
                {/* <div className="w-[80%] mx-auto h-px  mb-12 opacity-70" style={{backgroundColor:colors.accentGreen}} /> */}
                <CaseEvaluation />
            </div>
            
           

            {/* Related Cases */}
            <OtherClaimsSection></OtherClaimsSection>


        </main>
    );
}