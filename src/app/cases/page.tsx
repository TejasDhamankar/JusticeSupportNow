 
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Scale, Clock, DollarSign, CheckCircle, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllCaseTypes } from "@/lib/utils";

// Color palette from the reference CaseHero component
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

export const metadata = {
  title: "Active Mass Tort & Class Action Cases | Justice Support Now - Free Legal Review",
  description: "Explore all active mass tort and class action cases with Justice Support Now. Get your free legal evaluation today and find out if you qualify for compensation.",
  keywords: "mass tort cases, class action lawsuits, legal claims, compensation, free case review, no win no fee, Justice Support Now"
};

export default function CasesPage() {
  const caseTypes = getAllCaseTypes();

  // Separate hot and regular cases
  const hotCases = caseTypes.filter(caseType => caseType.featured);

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: colors.darkBlue, '--accent-green': colors.accentGreen } as React.CSSProperties}>
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ backgroundColor: colors.darkBlue }}>
        <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--accent-green)] rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--accent-green)] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl ml-0 text-left">
            <Badge className="mb-6 px-3 py-1 font-bold rounded-full border-transparent" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen }}>
              <Scale className="w-4 h-4 mr-2" />
              CURRENT LEGAL ACTIONS
            </Badge>

            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tighter" style={{ color: colors.whiteText }}>
              Standing for Justice
              <br />
              <span style={{ color: colors.lightGrayText }}>Empowering Individuals</span>
            </h1>

            <div className="w-24 h-1 mb-6 rounded-full" style={{ background: colors.accentGreen }} />

            <p className="text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl" style={{ color: colors.lightGrayText }}>
              Justice Support Now connects people affected by harmful products, corporate negligence, and environmental hazards with trusted legal teams.
              <span className="font-bold" style={{ color: colors.accentGreen }}> Review our current cases to see if you qualify for compensation.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
               <Button asChild size="lg" className="group relative font-bold py-4 px-8 rounded-lg shadow-lg overflow-hidden transition-all duration-300 text-lg" style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}>
                <Link href="#hot-cases" className="flex items-center justify-center">
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-20"></span>
                  <span className="relative"><TrendingUp className="mr-2 h-5 w-5 inline-block" /> Active Cases Now <ArrowRight className="ml-2 h-5 w-5 inline-block" /></span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-lg py-4 px-8 font-semibold transition-colors hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] text-lg" style={{ borderColor: colors.borderGray, color: colors.darkBlue }}>
                <Link href="#case-evaluation" className="flex items-center justify-center">
                  <CheckCircle className="mr-2 h-5 w-5" /> Get Free Legal Check
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Cases Section */}
      {hotCases.length > 0 && (
        <section id="hot-cases" className="py-20" style={{ backgroundColor: colors.cardBackground }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-6 px-3 py-1 font-bold rounded-full border-transparent" style={{ backgroundColor: colors.accentAmber + '20', color: colors.accentAmber }}>
                <Zap className="w-4 h-4 mr-2" />
                URGENT JUSTICE CASES - LIMITED TIME TO ACT
              </Badge>

              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tighter" style={{ color: colors.whiteText }}>
                Time-Critical Legal Actions
              </h2>

              <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.lightGrayText }}>
                  These cases come with <span className="font-bold" style={{ color: colors.accentAmber }}> urgent legal time limits.</span> Don’t delay—your opportunity for justice may depend on it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {hotCases.map((caseType) => (
                <Card key={caseType.id} style={{ backgroundColor: colors.darkBlue, borderColor: colors.borderGray }} className="group overflow-hidden shadow-2xl rounded-xl border h-full flex flex-col relative before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r from-transparent via-[var(--accent-green)] to-transparent transition-all duration-300 hover:border-[var(--accent-green)] hover:shadow-[0_0_20px_rgba(42,170,138,0.3)]">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="font-bold text-xs animate-pulse border-transparent" style={{ backgroundColor: colors.accentAmber + '20', color: colors.accentAmber }}>
                      PRIORITY
                    </Badge>
                  </div>

                  <div className="relative h-56 w-full overflow-hidden">
                    <Image src={caseType.imageUrl} alt={caseType.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="font-semibold text-xs border-transparent" style={{ backgroundColor: colors.borderGray, color: colors.lightGrayText }}>{caseType.category}</Badge>
                      <div className="flex items-center text-xs font-bold" style={{ color: colors.accentAmber }}>
                        <Clock className="w-3 h-3 mr-1" /> TIME-SENSITIVE
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--accent-green)] transition-colors" style={{ color: colors.whiteText }}>{caseType.title}</h3>
                    <p className="mb-6 flex-grow text-base leading-relaxed" style={{ color: colors.lightGrayText }}>{caseType.shortDescription}</p>

                    <div className="rounded-lg p-3 mb-6" style={{backgroundColor: colors.borderGray + '80'}}>
                        <div className="flex items-center text-sm font-bold mb-2" style={{color: colors.whiteText}}>
                            <DollarSign className="w-4 h-4 mr-1.5" style={{color: colors.accentGreen}} /> Possible Settlement
                        </div>
                        <p className="text-sm" style={{color: colors.lightGrayText}}>Estimated settlements starting at $15,000, depending on your case</p>
                    </div>

                    <div className="mt-auto space-y-3">
                       <Button asChild className="w-full group relative font-bold rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}>
                        <Link href={`/cases/${caseType.slug}`}>
                            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-20"></span>
                            <span className="relative">Check My Case <ArrowRight size={16} className="ml-2 inline-block" /></span>
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full rounded-lg font-semibold transition-colors hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]" style={{ borderColor: colors.borderGray, color: colors.lightGrayText }}>
                        <Link href={`/cases/${caseType.slug}`}>Case Information</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Cases Section */}
      <section className="py-20" style={{backgroundColor: colors.darkBlue}}>
          <div className="container mx-auto px-4 relative z-10">
              <div className="mb-16 max-w-4xl ml-0 text-left">
                  <Badge className="mb-6 px-3 py-1 font-bold rounded-full border-transparent" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen }}>
                      <Scale className="w-4 h-4 mr-2" /> ALL ACTIVE LEGAL CASES
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tighter" style={{ color: colors.whiteText }}>
                      Explore All Ongoing Justice Campaigns
                  </h2>
                  <div className="w-24 h-1 my-6 rounded-full" style={{ backgroundColor: colors.accentGreen }} />
                  <p className="text-lg sm:text-xl leading-relaxed max-w-3xl" style={{ color: colors.lightGrayText }}>
                      Discover every open case handled through Justice Support Now. <span className="font-bold" style={{ color: colors.whiteText }}> Each claim is a step toward accountability and fair compensation.</span>
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {caseTypes.map((caseType) => (
                      <Card key={caseType.id} style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }} className="group overflow-hidden shadow-2xl rounded-xl border h-full flex flex-col relative before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r from-transparent via-[var(--accent-green)] to-transparent transition-all duration-300 hover:border-[var(--accent-green)] hover:shadow-[0_0_20px_rgba(42,170,138,0.3)]">
                          <div className="relative h-56 w-full overflow-hidden">
                              <Image src={caseType.imageUrl} alt={caseType.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute top-4 left-4">
                                  <Badge className="font-bold text-xs" style={{ backgroundColor: colors.darkBlue, color: colors.lightGrayText }}>{caseType.category}</Badge>
                              </div>
                              {caseType.featured && (
                                  <div className="absolute top-4 right-4">
                                      <Badge className="font-bold text-xs border-transparent" style={{ backgroundColor: colors.accentAmber + '20', color: colors.accentAmber }}>FEATURED</Badge>
                                  </div>
                              )}
                          </div>
                          <CardContent className="p-6 flex-grow flex flex-col">
                              <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--accent-green)] transition-colors" style={{ color: colors.whiteText }}>{caseType.title}</h3>
                              <p className="mb-6 flex-grow text-base leading-relaxed" style={{ color: colors.lightGrayText }}>{caseType.shortDescription}</p>
                              <div className="mt-auto space-y-3">
                                  <Button asChild className="w-full group relative font-bold rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}>
                                      <Link href={`/cases/${caseType.slug}`}>
                                          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-20"></span>
                                          <span className="relative">Verify Eligibility <ArrowRight size={16} className="ml-2 inline-block" /></span>
                                      </Link>
                                  </Button>
                                  <Button asChild variant="outline" className="w-full rounded-lg font-semibold transition-colors hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]" style={{ borderColor: colors.borderGray, color: colors.darkBlue }}>
                                      <Link href={`/cases/${caseType.slug}`}>Case Information</Link>
                                  </Button>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </section>

      {/* Enhanced CTA Section */}
      <section id="case-evaluation" className="py-20" style={{backgroundColor: colors.cardBackground}}>
        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl ml-0 text-left">
                <Badge className="mb-6 px-3 py-1 font-bold rounded-full border-transparent" style={{ backgroundColor: colors.accentGreen + '20', color: colors.accentGreen }}>
                    <CheckCircle className="w-4 h-4 mr-2" /> FREE LEGAL CONSULTATION
                </Badge>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tighter" style={{ color: colors.whiteText }}>
                    Not Sure If You Qualify?
                    <br />
                    <span style={{ color: colors.lightGrayText }}>We’re Here to Help You Find Out.</span>
                </h2>
                <div className="w-24 h-1 my-6 rounded-full" style={{ backgroundColor: colors.accentGreen }} />
                <p className="text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl" style={{ color: colors.lightGrayText }}>
                    Our dedicated legal team will review your situation and help determine if you can join an active lawsuit.
                    <span className="font-bold" style={{ color: colors.accentGreen }}> No fees unless you win.</span>
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Button asChild size="lg" className="group relative font-bold py-4 px-8 rounded-lg shadow-lg overflow-hidden text-lg" style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }}>
                        <Link href="/#case-evaluation">
                             <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-20"></span>
                            <span className="relative">Get My Free Legal Review <ArrowRight className="ml-2 h-5 w-5 inline-block" /></span>
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-lg py-4 px-8 font-semibold transition-colors hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] text-lg" style={{ borderColor: colors.borderGray, color: colors.lightGrayText }}>
                        <a href="tel:9143002717">Call Now</a>
                    </Button>
                </div>
            </div>
        </div>
      </section>

    </main>
  );
}