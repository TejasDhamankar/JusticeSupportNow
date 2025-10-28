"use client";

import { useEffect, useRef, useState } from "react";
import axios, { isAxiosError } from "axios";
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

import { getAllCaseTypes } from "@/lib/utils";
import { CaseType } from "@/types/case";

// ✅ Added from old code
declare global {
  interface Window {
    trustedFormCertIdCallback?: (id: string) => void;
    trustedFormCertUrlCallback?: (url: string) => void;
  }
}

type FormStatus = { type: string; message: string };

interface CaseEvaluationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseType: string;
  exposurePeriod: string;
  medicalCondition: string;
  additionalInfo: string;
}

interface ExtendedFormData extends CaseEvaluationFormData {
  agreeToQualification: boolean;
  agreeToTermsAndContact: boolean;
  agreeToDisclaimer: boolean;
  trustedFormCertUrl?: string;
}

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

const TRUST_POINTS = [
  { icon: Shield, text: "Strictly Confidential" },
  { icon: DollarSign, text: "Zero Upfront Cost" },
  { icon: Clock, text: "Fast 24-Hour Review" },
  { icon: Briefcase, text: "Connect with Top Firms" },
];

// CaseEvaluation component
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
    agreeToQualification: false,
    agreeToTermsAndContact: false,
    agreeToDisclaimer: false,
    trustedFormCertUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "", message: "" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ✅ Refs added from old code
  const formRef = useRef<HTMLFormElement | null>(null);
  const tfUrlRef = useRef<string>("");
  const scriptLoadedRef = useRef(false);
  const [isTrustedFormLoaded, setIsTrustedFormLoaded] = useState(false); // Optional: for debugging

  const caseTypes: CaseType[] = getAllCaseTypes();

  // Keep your existing mousemove effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // ✅ Added TrustedForm SDK Loader from old code
  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const timer = setTimeout(() => {
      console.log("Loading TrustedForm SDK...");

      window.trustedFormCertUrlCallback = (url: string) => {
        console.log("TrustedForm URL received via callback:", url);
        tfUrlRef.current = url;
        setFormData((prev) => ({ ...prev, trustedFormCertUrl: url }));
        setIsTrustedFormLoaded(true);
      };

      const scriptContent = `
        (function() {
          var tf = document.createElement('script');
          tf.type = 'text/javascript';
          tf.async = true;
          tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
            '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
            new Date().getTime() + Math.random();

          tf.onload = function() {
            console.log('TrustedForm script loaded successfully');
            setTimeout(function() {
              var hiddenField = document.querySelector('input[name="xxTrustedFormCertUrl"]');
              if (hiddenField && hiddenField.value && window.trustedFormCertUrlCallback) {
                window.trustedFormCertUrlCallback(hiddenField.value);
              }
            }, 1000);
          };

          tf.onerror = function() {
            console.error('Failed to load TrustedForm script');
          };

          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(tf, s);
        })();
      `;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = scriptContent;
      document.body.appendChild(script);

      scriptLoadedRef.current = true;

      const checkInterval = setInterval(() => {
        const hiddenField = document.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement;
        if (hiddenField && hiddenField.value) {
          console.log('TrustedForm field found via polling:', hiddenField.value);
          if (tfUrlRef.current !== hiddenField.value) {
             tfUrlRef.current = hiddenField.value;
             setFormData((prev) => ({ ...prev, trustedFormCertUrl: hiddenField.value }));
             setIsTrustedFormLoaded(true);
          }
          clearInterval(checkInterval);
        }
      }, 500);

      setTimeout(() => clearInterval(checkInterval), 10000);

    }, 100);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array

  // Handlers
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

  // ✅ Updated handleSubmit
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

    // Use robust TF URL grabbing logic from old code
    const injectedField = document.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement | null;
    const tfUrl = injectedField?.value || tfUrlRef.current || "";

    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await axios.post("/api/contact", {
        ...formData,
        trustedFormCertUrl: tfUrl, // Send the correct URL
      });

      // Check for 201 status (used in both route options)
      if (response.status === 201) {
        setFormStatus({
          type: "success",
          message:
            "Success! Your free case evaluation has been submitted. A legal expert will contact you within 24 hours.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          caseType: "",
          exposurePeriod: "",
          medicalCondition: "",
          additionalInfo: "",
          agreeToQualification: false,
          agreeToTermsAndContact: false,
          agreeToDisclaimer: false,
          trustedFormCertUrl: "",
        });
      } else {
        setFormStatus({
          type: "error",
          message: response.data.message || "Submission failed. Please check your connection or contact us directly.",
        });
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setFormStatus({
          type: "error",
          message: error.response.data.message || "An API error occurred. Please try again.",
        });
      } else {
        setFormStatus({
          type: "error",
          message: "Submission failed. Please check your connection or contact us directly.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="case-evaluation"
      style={{
        backgroundColor: colors.background,
        "--accent-green": colors.accentGreen,
        "--border-gray": colors.border,
        "--card-background": colors.cardBackground,
        "--light-gray-text": colors.textSecondary,
      } as React.CSSProperties}
      className="py-16 sm:py-24"
    >
      <div className="w-[80%] mx-auto h-px mb-12 opacity-70" style={{ backgroundColor: colors.accentGreen }} />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(42, 170, 138, 0.1), transparent 80%)`,
        }}
      />
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto rounded-xl border overflow-hidden md:grid md:grid-cols-5"
          style={{ borderColor: colors.border, backgroundColor: colors.cardBackground }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          {/* LEFT PANEL */}
          <div
            className="col-span-2 p-8 sm:p-12 flex flex-col justify-between"
            style={{
              backgroundColor: colors.accentGreen,
              color: colors.background,
            }}
          >
            <div>
              <Scale className="w-10 h-10 mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-4 leading-tight text-white">
                Start Your Free
                <br />
                Case Assessment
              </h2>
              <p className="mb-8 text-lg text-white">
                Your path to justice begins here. Fill out the form and a dedicated legal specialist will evaluate your
                claim immediately.
              </p>
              <div className="space-y-4 text-white">
                {TRUST_POINTS.map((point, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <point.icon className="w-5 h-5 mr-3 flex-shrink-0 text-white" />
                    <span className="font-semibold text-white">{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-white/50">
              <p className="text-sm italic text-white">
                "No matter how complex your case, we connect you with experienced counsel to fight for the compensation
                you deserve."
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: Form */}
          <div
            className="col-span-3 p-8 sm:p-12"
            style={{ backgroundColor: colors.background, color: colors.textPrimary }}
          >
            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.accentGreen }}>
              Qualify in 60 Seconds
            </h3>
            <p className="mb-8" style={{ color: colors.textSecondary }}>
              All information is kept private and secure.
            </p>
            {/* ✅ Added ref and data-tf-element from old code */}
            <form onSubmit={handleSubmit} method="POST" ref={formRef} data-tf-element="form">
              {/* Note: the id here is "xxTrustedFormCertUrl" to match the SDK script */}
              <input type="hidden" id="xxTrustedFormCertUrl" name="xxTrustedFormCertUrl" />
              
              {/* Contact Info */}
              <fieldset className="p-4 border rounded-lg" style={{ borderColor: colors.border }}>
                <legend className="px-2 text-sm font-bold" style={{ color: colors.accentGreen }}>
                  <User className="inline-block w-4 h-4 mr-1 mb-0.5" /> Contact Information
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    placeholder="First Name*"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="h-12 bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors"
                    required
                    data-tf-element-role="first-name" // ✅ Added from old code
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name*"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="h-12 bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors"
                    required
                    data-tf-element-role="last-name" // ✅ Added from old code
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors"
                    required
                    data-tf-element-role="email" // ✅ Added from old code
                  />
                  <Input
                    name="phone"
                    placeholder="Phone (Best Contact)*"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-12 bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors"
                    required
                    data-tf-element-role="phone" // ✅ Added from old code
                  />
                </div>
              </fieldset>

              {/* Case Details */}
              <fieldset className="p-4 border rounded-lg mt-4" style={{ borderColor: colors.border }}>
                <legend className="px-2 text-sm font-bold" style={{ color: colors.accentGreen }}>
                  <Scale className="inline-block w-4 h-4 mr-1 mb-0.5" /> Case Details
                </legend>
                <div className="space-y-4">
                  <Select onValueChange={(val) => handleSelectChange("caseType", val)} value={formData.caseType}>
                    <SelectTrigger className="h-12 bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors">
                      <SelectValue placeholder="Choose your case type*" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
                      {caseTypes.map((c) => (
                        <SelectItem key={c.id} value={c.slug}>
                          {c.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">Other / Unsure</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    name="additionalInfo"
                    placeholder="Provide details about your injury..."
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="min-h-[100px] bg-transparent border-[var(--border-gray)] focus:border-[var(--accent-green)] transition-colors"
                  />
                </div>
              </fieldset>

              {/* Agreements */}
              <div
                style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
                className="border rounded-lg p-4 space-y-4 mt-4"
              >
                <h4 className="font-bold text-base" style={{ color: colors.accentGreen }}>
                  Required Agreements
                </h4>
                {[
                  { id: "agreeToQualification", label: "I want to see if I may qualify for compensation." },
                  {
                    id: "agreeToTermsAndContact",
                    label:
                      "I agree to be contacted... I acknowledge reading the Terms of Service and Privacy Policy.",
                  },
                  {
                    id: "agreeToDisclaimer",
                    label:
                      "I understand this is not a law firm and does not create an attorney-client relationship.",
                  },
                ].map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={item.id}
                      checked={formData[item.id as keyof ExtendedFormData] as boolean}
                      onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                      className="mt-0.5 border-[var(--border-gray)] data-[state=checked]:bg-[var(--accent-green)] data-[state=checked]:border-[var(--accent-green)] flex-shrink-0"
                      data-tf-element-role="consent-opt-in" // ✅ Added from old code
                    />
                    <label
                      htmlFor={item.id}
                      className="text-xs text-[var(--light-gray-text)] cursor-pointer leading-relaxed"
                      data-tf-element-role="consent-language" // ✅ Added from old code
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-lg border mt-4"
                    style={{
                      borderColor: formStatus.type === "success" ? colors.accentGreen : colors.accentAmber,
                      backgroundColor:
                        formStatus.type === "success"
                          ? "rgba(42, 170, 138, 0.1)"
                          : "rgba(219, 171, 9, 0.1)",
                    }}
                  >
                    <div className="flex items-start">
                      <div
                        style={{
                          color: formStatus.type === "success" ? colors.accentGreen : colors.accentAmber,
                        }}
                      >
                        {formStatus.type === "success" ? (
                          <CheckCircle2 className="mr-3 mt-0.5 flex-shrink-0 w-5 h-5" />
                        ) : (
                          <AlertCircle className="mr-3 mt-0.5 flex-shrink-0 w-5 h-5" />
                        )}
                      </div>
                      <p
                        className="font-medium text-sm"
                        style={{
                          color:
                            formStatus.type === "success" ? colors.textPrimary : colors.accentAmber,
                        }}
                      >
                        {formStatus.message}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  name="submit" // ✅ Added from old code
                  data-tf-element-role="submit" // ✅ Added from old code
                  size="lg"
                  disabled={isSubmitting}
                  className="group relative w-full text-lg font-bold px-10 py-7 transition-all duration-300 shadow-lg overflow-hidden"
                  style={{ backgroundColor: colors.accentGreen, color: colors.background }}
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-20"></span>
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2 w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        {/* ✅ Added span from old code */}
                        <span data-tf-element-role="submit-text">Get My Free Assessment</span>
                        <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseEvaluation;