"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  Mail,
  Phone,
  Scale,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseEvaluationFormData, FormStatus } from "@/types/form";
import { getAllCaseTypes } from "@/lib/utils";


// --- Re-declare the color palette for consistency ---
const colors = {
  darkBlue: "#0A0D14",
  whiteText: "#F0F6FC",
  accentGreen: "#2AAA8A",
  lightGrayText: "#8B949E",
  borderGray: "#30363D",
  cardBackground: "#161B22",
};

declare global {
  interface Window {
    trustedFormCertUrlCallback?: (id: string) => void;
  }
}

interface ExtendedFormData extends CaseEvaluationFormData {
  agreeToQualification: boolean;
  agreeToTermsAndContact: boolean;
  agreeToDisclaimer: boolean;
  trustedFormCertUrl?: string;
}

const CaseEvaluation = () => {
  const [formData, setFormData] = useState<ExtendedFormData>({
    firstName: "", lastName: "", email: "", phone: "", caseType: "",
    additionalInfo: "", agreeToQualification: false, agreeToTermsAndContact: false,
    agreeToDisclaimer: false, trustedFormCertUrl: "",
    // Unused fields from interface for completeness
    exposurePeriod: "", medicalCondition: "", agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "", message: "" });
  const [isTrustedFormLoaded, setIsTrustedFormLoaded] = useState(false);
  const tfUrlRef = useRef<string>("");
  const scriptLoadedRef = useRef(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const caseTypes = getAllCaseTypes();

  useEffect(() => {
    // --- Mousemove effect for spotlight ---
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- TrustedForm Script Injection ---
    if (scriptLoadedRef.current) return;
    window.trustedFormCertUrlCallback = (url: string) => {
      tfUrlRef.current = url;
      setFormData((prev) => ({ ...prev, trustedFormCertUrl: url }));
      setIsTrustedFormLoaded(true);
    };
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `(function() { var tf = document.createElement('script'); tf.type = 'text/javascript'; tf.async = true; tf.src = ("https:" == document.location.protocol ? 'https' : 'http') + '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&l=' + new Date().getTime() + Math.random(); var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s); })();`;
    document.body.appendChild(script);
    scriptLoadedRef.current = true;

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- Form Handlers (Unchanged) ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSelectChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));
  const handleCheckboxChange = (field: string, checked: boolean) => setFormData((prev) => ({ ...prev, [field]: checked }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setFormStatus({ type: "error", message: "Please fill out all required fields." });
      return;
    }
    if (!formData.agreeToQualification || !formData.agreeToTermsAndContact || !formData.agreeToDisclaimer) {
      setFormStatus({ type: "error", message: "You must agree to all terms to proceed." });
      return;
    }
    const injectedField = document.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement | null;
    const tfUrl = injectedField?.value || tfUrlRef.current || "";

    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });
    try {
      await axios.post("/api/contact", { ...formData, trustedFormCertUrl: tfUrl });
      setFormStatus({ type: "success", message: "Thank you! Your evaluation is submitted. An expert will contact you shortly." });
      // Reset form logic...
    } catch (error) {
      setFormStatus({ type: "error", message: "Submission failed. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section id="case-evaluation" className="py-24 relative overflow-hidden" style={{ backgroundColor: colors.darkBlue }}>
    <div className="w-[80%] mx-auto h-px  mb-12 opacity-70" style={{backgroundColor:colors.accentGreen}} /> 
      
      <motion.div
        className="pointer-events-none absolute -inset-px"
        style={{ background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(42, 170, 138, 0.1), transparent 80%)` }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* --- Left Column: Information & Trust Builders --- */}
          <motion.div variants={itemVariants} className="text-white">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tighter" style={{ textShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
              See If You Qualify for a <span style={{ color: colors.accentGreen }}>Significant Settlement</span>
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: colors.lightGrayText }}>
              The law limits the time you have to file a claim. Use our secure and confidential form to get a 100% free evaluation from our legal partners and find out what you may be owed.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <ShieldCheck size={28} style={{ color: colors.accentGreen }} />
                <div>
                  <h3 className="font-bold">100% Free & Confidential</h3>
                  <p className="text-sm" style={{ color: colors.lightGrayText }}>Your information is secure and the evaluation costs nothing.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Scale size={28} style={{ color: colors.accentGreen }} />
                <div>
                  <h3 className="font-bold">No Obligation, No Fees</h3>
                  <p className="text-sm" style={{ color: colors.lightGrayText }}>You only pay if our partners win your case. There are no upfront costs.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Zap size={28} style={{ color: colors.accentGreen }} />
                <div>
                  <h3 className="font-bold">Fast & Simple Process</h3>
                  <p className="text-sm" style={{ color: colors.lightGrayText }}>Finding out if you qualify takes just a few moments.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- Right Column: The Form --- */}
          <motion.div variants={itemVariants}>
            <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }} className="shadow-2xl rounded-xl border">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold" style={{ color: colors.whiteText }}>
                  Complimentary Case Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <noscript><img src='https://api.trustedform.com/ns.gif' alt="TrustedForm" style={{display: 'none'}} /></noscript>
                <form onSubmit={handleSubmit} data-tf-element="form" id="case-evaluation-form">
                  <input type="hidden" name="xxTrustedFormCertUrl" id="xxTrustedFormCertUrl" />
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" style={{ color: colors.lightGrayText }}>First Name*</Label>
                        <Input id="firstName" name="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} required className="h-12 bg-[#0A0D14] border-[#30363D] text-white focus:ring-1 focus:ring-[#2AAA8A]" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" style={{ color: colors.lightGrayText }}>Last Name*</Label>
                        <Input id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} required className="h-12 bg-[#0A0D14] border-[#30363D] text-white focus:ring-1 focus:ring-[#2AAA8A]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" style={{ color: colors.lightGrayText }}>Email*</Label>
                      <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required className="h-12 bg-[#0A0D14] border-[#30363D] text-white focus:ring-1 focus:ring-[#2AAA8A]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" style={{ color: colors.lightGrayText }}>Phone*</Label>
                      <Input id="phone" name="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={handleInputChange} required className="h-12 bg-[#0A0D14] border-[#30363D] text-white focus:ring-1 focus:ring-[#2AAA8A]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="caseType" style={{ color: colors.lightGrayText }}>Type of Case*</Label>
                      <Select onValueChange={(value) => handleSelectChange("caseType", value)} value={formData.caseType}>
                        <SelectTrigger className="h-12 bg-[#0A0D14] border-[#30363D] text-white focus:ring-1 focus:ring-[#2AAA8A]"><SelectValue placeholder="Select your case type" /></SelectTrigger>
                        <SelectContent style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray, color: colors.whiteText }}>
                          {caseTypes.map((caseType) => (<SelectItem key={caseType.id} value={caseType.slug}>{caseType.title}</SelectItem>))}
                          <SelectItem value="other">Other / Unsure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo" style={{ color: colors.lightGrayText }}>Additional Details</Label>
                      <Textarea id="additionalInfo" name="additionalInfo" placeholder="Briefly describe what happened..." value={formData.additionalInfo} onChange={handleInputChange} className="bg-[#0A0D14] border-[#30363D] text-white focus:ring-1 focus:ring-[#2AAA8A]" />
                    </div>

                    <div className="bg-black/20 p-4 rounded-lg space-y-4">
                      {[
                        { id: "agreeToQualification", label: "I want to see if I may qualify for compensation." },
                        { id: "agreeToTermsAndContact", label: "I agree to be contacted via phone, email, or messages, and acknowledge the Terms of Service & Privacy Policy." },
                        { id: "agreeToDisclaimer", label: "I understand this is not a law firm and submitting this form does not create an attorney-client relationship." }
                      ].map(item => (
                        <div key={item.id} className="flex items-start space-x-3">
                          <Checkbox id={item.id} checked={formData[item.id as keyof ExtendedFormData] as boolean} onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)} className="mt-0.5" />
                          <label htmlFor={item.id} className="text-xs cursor-pointer" style={{ color: colors.lightGrayText }}>{item.label}</label>
                        </div>
                      ))}
                    </div>

                    <AnimatePresence>
                      {formStatus.message && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className={`p-3 rounded-md text-sm font-medium border ${formStatus.type === 'success' ? 'bg-[#2AAA8A]/10 text-[#2AAA8A] border-[#2AAA8A]/30' : 'bg-red-900/20 text-red-400 border-red-500/30'}`}
                        >
                          <div className="flex items-center gap-2">
                            {formStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            <p>{formStatus.message}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button type="submit" name="submit" className="w-full font-bold text-lg py-6 group relative overflow-hidden" style={{ backgroundColor: colors.accentGreen, color: colors.darkBlue }} disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." :
                        <>
                          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-20"></span>
                          <span className="relative flex items-center">Get My Free Assessment <ArrowRight className="ml-2 w-5 h-5" /></span>
                        </>
                      }
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
      </div>
      
    </section>
  );
};

export default CaseEvaluation;