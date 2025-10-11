"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Scale,
  Shield,
  Clock,
  Briefcase,
  DollarSign,
} from "lucide-react";

// Dummy Types/Utils
type FormStatus = { type: string; message: string };
type CaseEvaluationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseType: string;
  exposurePeriod: string;
  medicalCondition: string;
  additionalInfo: string;
  agreeToTerms: boolean;
};
const getAllCaseTypes = () => [
  { id: 1, title: "Mass Tort Litigation", slug: "mass-tort" },
  { id: 2, title: "Dangerous Drug Lawsuit", slug: "drug-lawsuit" },
  { id: 3, title: "Personal Injury Claim", slug: "personal-injury" },
  { id: 4, title: "Environmental Claim", slug: "environmental" },
];

// Global Window for TrustedForm
declare global {
  interface Window {
    trustedFormCertIdCallback?: (id: string) => void;
    trustedFormCertUrlCallback?: (url: string) => void;
  }
}

interface ExtendedFormData extends CaseEvaluationFormData {
  agreeToQualification: boolean;
  agreeToTermsAndContact: boolean;
  agreeToDisclaimer: boolean;
  trustedFormCertUrl?: string;
}

// *** COLOR PALETTE from the first CaseHero component ***
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

const TRUST_POINTS = [
  { icon: Shield, text: "Strictly Confidential" },
  { icon: DollarSign, text: "Zero Upfront Cost" },
  { icon: Clock, text: "Fast 24-Hour Review" },
  { icon: Briefcase, text: "Connect with Top Firms" },
];

const CaseEvaluation = () => {
  const [formData, setFormData] = useState<ExtendedFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    caseType: "",
    exposurePeriod: "",
    medicalCondition: "",
    additionalInfo: "",
    agreeToTerms: false,
    agreeToQualification: false,
    agreeToTermsAndContact: false,
    agreeToDisclaimer: false,
    trustedFormCertUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "", message: "" });
  const [isTrustedFormLoaded, setIsTrustedFormLoaded] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const tfUrlRef = useRef<string>("");
  const scriptLoadedRef = useRef(false);

  const caseTypes = getAllCaseTypes();

  // TrustedForm Script (No changes here)
  useEffect(() => {
    if (scriptLoadedRef.current) return;
    const timer = setTimeout(() => {
      window.trustedFormCertUrlCallback = (url: string) => {
        tfUrlRef.current = url;
        setFormData((prev) => ({ ...prev, trustedFormCertUrl: url }));
        setIsTrustedFormLoaded(true);
      };
      const scriptContent = `(function() { var tf = document.createElement('script'); tf.type = 'text/javascript'; tf.async = true; tf.src = 'https://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&l=' + new Date().getTime() + Math.random(); var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s); })();`;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = scriptContent;
      document.body.appendChild(script);
      scriptLoadedRef.current = true;
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handlers (No changes here)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.caseType) {
      setFormStatus({ type: "error", message: "Please fill in all required contact and case type fields." });
      return;
    }
    if (!formData.agreeToQualification || !formData.agreeToTermsAndContact || !formData.agreeToDisclaimer) {
      setFormStatus({ type: "error", message: "You must consent to all three agreements to proceed." });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus({ type: "success", message: "Success! Your free case evaluation has been submitted. A legal expert will contact you within 24 hours." });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", caseType: "", exposurePeriod: "", medicalCondition: "", additionalInfo: "", agreeToTerms: false, agreeToQualification: false, agreeToTermsAndContact: false, agreeToDisclaimer: false, trustedFormCertUrl: "" });
    } catch (error) {
      setFormStatus({ type: "error", message: "Submission failed. Please check your connection or contact us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="case-evaluation"
      style={{
        backgroundColor: colors.darkBlue,
        '--accent-green': colors.accentGreen,
        '--border-gray': colors.borderGray,
        '--card-background': colors.cardBackground,
        '--light-gray-text': colors.lightGrayText,
      } as React.CSSProperties}
      className="py-16 sm:py-24"
    >
       <div className="w-[80%] mx-auto h-px  mb-12 opacity-70" style={{backgroundColor:colors.accentGreen}} />
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto rounded-xl border overflow-hidden md:grid md:grid-cols-5"
          style={{ borderColor: colors.borderGray, backgroundColor: colors.cardBackground }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          {/* LEFT PANEL */}
          <div
            className="col-span-2 p-8 sm:p-12 flex flex-col justify-between"
            style={{
              backgroundColor: colors.accentGreen, // Changed background to accentGreen
              color: colors.whiteText, // Ensures all default text in this div is white
            }}
          >
            <div>
              <Scale className="w-10 h-10 mb-6" style={{ color: colors.whiteText }} /> {/* Icon color also to white for contrast */}
              <h2 className="text-3xl font-bold mb-4 leading-tight " style={{ color: colors.whiteText }}> {/* Changed h2 text color to white */}
                Start Your Free<br />Case Assessment
              </h2>
              <p style={{ color: colors.whiteText }} className="mb-8 text-lg" > {/* Changed paragraph text color to white for better contrast */}
                Your path to justice begins here. Fill out the form and a dedicated legal specialist will evaluate your claim immediately.
              </p>
              <div className="space-y-4">
                {TRUST_POINTS.map((point, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <point.icon className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: colors.whiteText }} /> {/* Icon color also to white for contrast */}
                    <span className="font-semibold" style={{ color: colors.whiteText }}>{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-10 pt-6 border-t" style={{ borderColor: colors.whiteText }}> {/* Changed border color to white */}
              <p style={{ color: colors.whiteText }} className="text-sm italic"> {/* Changed text color to white */}
                "No matter how complex your case, we connect you with experienced counsel to fight for the compensation you deserve."
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: Form */}
          <div className="col-span-3 p-8 sm:p-12" style={{ backgroundColor: colors.darkBlue }}>
            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.accentGreen }}>Qualify in 60 Seconds</h3>
            <p className="mb-8" style={{ color: colors.lightGrayText }}>All information is kept private and secure.</p>
            <form ref={formRef} onSubmit={handleSubmit} method="POST">
              <div className="space-y-6">
                {/* Contact Info */}
                <fieldset className="p-4 border rounded-lg" style={{ borderColor: colors.borderGray }}>
                  <legend className="px-2 text-sm font-bold" style={{ color: colors.accentGreen }}>
                    <User className="inline-block w-4 h-4 mr-1 mb-0.5" /> Contact Information
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleInputChange} className="h-12 bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors" required />
                    <Input name="lastName" placeholder="Last Name*" value={formData.lastName} onChange={handleInputChange} className="h-12 bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors" required />
                    <Input name="email" type="email" placeholder="Email*" value={formData.email} onChange={handleInputChange} className="h-12 bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors" required />
                    <Input name="phone" placeholder="Phone (Best Contact)*" value={formData.phone} onChange={handleInputChange} className="h-12 bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors" required />
                  </div>
                </fieldset>

                {/* Case Details */}
                <fieldset className="p-4 border rounded-lg" style={{ borderColor: colors.borderGray }}>
                  <legend className="px-2 text-sm font-bold" style={{ color: colors.accentGreen }}>
                    <Scale className="inline-block w-4 h-4 mr-1 mb-0.5" /> Case Details
                  </legend>
                  <div className="space-y-4">
                    <Select onValueChange={(val) => handleSelectChange("caseType", val)} value={formData.caseType}>
                      <SelectTrigger className="h-12 bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors">
                        <SelectValue placeholder="Choose your case type*" />
                      </SelectTrigger>
                      <SelectContent style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }}>
                        {caseTypes.map((c) => (<SelectItem key={c.id} value={c.slug}>{c.title}</SelectItem>))}
                        <SelectItem value="other">Other / Unsure</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea name="additionalInfo" placeholder="Provide details about your injury..." value={formData.additionalInfo} onChange={handleInputChange} className="min-h-[100px] bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors" />
                  </div>
                </fieldset>

                {/* Agreements */}
                <div style={{ backgroundColor: colors.cardBackground, borderColor: colors.borderGray }} className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-bold text-base"  style={{ color: colors.accentGreen }} >Required Agreements</h4>
                  {[
                    { id: "agreeToQualification", label: "I want to see if I may qualify for compensation." },
                    { id: "agreeToTermsAndContact", label: "I agree to be contacted... I acknowledge reading the Terms of Service and Privacy Policy." },
                    { id: "agreeToDisclaimer", label: "I understand this is not a law firm and does not create an attorney-client relationship." }
                  ].map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={item.id}
                        checked={formData[item.id as keyof ExtendedFormData] as boolean}
                        onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                        className="mt-0.5 border-[var(--border-gray)] data-[state=checked]:bg-[var(--accent-green)] data-[state=checked]:border-[var(--accent-green)] flex-shrink-0"
                      />
                      <label htmlFor={item.id} className="text-xs text-[var(--light-gray-text)] cursor-pointer leading-relaxed">{item.label}</label>
                    </div>
                  ))}
                </div>

                {/* Status Message */}
                <AnimatePresence>
                  {formStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-lg border"
                      style={{
                        borderColor: formStatus.type === "success" ? colors.accentGreen : colors.accentAmber,
                        backgroundColor: formStatus.type === 'success' ? 'rgba(42, 170, 138, 0.1)' : 'rgba(219, 171, 9, 0.1)'
                      }}
                    >
                      <div className="flex items-start">
                        <div style={{ color: formStatus.type === 'success' ? colors.accentGreen : colors.accentAmber }}>
                          {formStatus.type === "success" ? (<CheckCircle2 className="mr-3 mt-0.5 flex-shrink-0 w-5 h-5" />) : (<AlertCircle className="mr-3 mt-0.5 flex-shrink-0 w-5 h-5" />)}
                        </div>
                        <p className="font-medium text-sm" style={{ color: formStatus.type === 'success' ? colors.whiteText : colors.accentAmber }}>{formStatus.message}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit" size="lg" disabled={isSubmitting}
                    className="group relative w-full text-lg font-bold px-10 py-7 transition-all duration-300 shadow-lg overflow-hidden"
                    style={{ backgroundColor: colors.accentGreen, color: colors.whiteText }}
                  >
                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-20"></span>
                    <span className="relative flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mr-2 w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get My Free Assessment
                          <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseEvaluation;