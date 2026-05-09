/* =============================================================
   Contact Page – SteadyBooks
   Design: Warm Precision – welcoming, clear form, trust signals
   ============================================================= */
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Mail,
  Phone,
  Clock,
  Shield,
  Lock,
  CalendarCheck,
  CheckCircle2,
  MessageCircle,
  Loader2,
} from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx5LWeh3QLYzAAPf-w_VCsFDCFcnYtr5mw3tSjiSn2e2quhLY1Jcs6be5NK7RSLWuCg/exec";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    message: "",
    interests: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    setIsSending(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          message: formData.message,
          interests: formData.interests,
        }),
      });

      toast.success("Thank you! Your message has been sent.");
      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        message: "",
        interests: [],
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(option)
        ? prev.interests.filter((i) => i !== option)
        : [...prev.interests, option],
    }));
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-sage-pale flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-sage" />
        </div>
        <h3 className="font-display font-bold text-2xl text-navy mb-3">
          Message Sent!
        </h3>
        <p className="font-body text-base text-navy/65 leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. I'll get back to you within one business day to discuss your bookkeeping needs.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-medium text-navy mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors placeholder:text-navy/30"
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium text-navy mb-1.5">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            required
            type="email"
            placeholder="jane@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors placeholder:text-navy/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-medium text-navy mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="(555) 000-0000"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors placeholder:text-navy/30"
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium text-navy mb-1.5">
            Business Name
          </label>
          <input
            type="text"
            placeholder="Your Business LLC"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors placeholder:text-navy/30"
          />
        </div>
      </div>

      <div>
        <label className="block font-body text-sm font-medium text-navy mb-1.5">
          How Can I Help? <span className="text-red-400">*</span>
        </label>
        <textarea
          required
          rows={5}
          placeholder="Tell me a little about your bookkeeping situation and what you need help with..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors resize-none placeholder:text-navy/30"
        />
      </div>

      <div>
        <label className="block font-body text-sm font-medium text-navy mb-2">
          I'm interested in: (optional)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Monthly Bookkeeping",
            "Bookkeeping Cleanup",
            "Catch-Up Bookkeeping",
            "QuickBooks Setup",
            "Financial Reports",
            "Free Consultation",
          ].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={formData.interests.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="w-4 h-4 rounded border-stone-dark text-navy accent-navy"
              />
              <span className="font-body text-sm text-navy/65 group-hover:text-navy transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="w-full font-body font-semibold text-sm bg-navy text-white py-4 rounded-lg hover:bg-navy-dark transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSending && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSending ? "Sending..." : "Send Message"}
      </button>

      <p className="font-body text-xs text-navy/40 text-center">
        Your information is kept completely confidential. I'll respond within 1 business day.
      </p>
    </form>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-stone">
        <div className="container">
          <Reveal>
            <div className="max-w-3xl">
              <span className="section-rule" />
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-navy leading-tight mb-5">
                Let's Get Your Books Organized
              </h1>
              <p className="font-body text-lg text-navy/65 leading-relaxed">
                Ready to take the stress out of your bookkeeping? Fill out the form below or reach out directly — I'd love to hear about your business.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: Info */}
            <div className="lg:col-span-2">
              <Reveal>
                <div>
                  <span className="section-rule" />
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy leading-tight mb-5">
                    Get in Touch
                  </h2>
                  <p className="font-body text-sm text-navy/65 leading-relaxed mb-8">
                    Whether you have a quick question or are ready to get started, I'm here to help. Reach out and I'll get back to you within one business day.
                  </p>

                  {/* Contact details */}
                  <div className="space-y-4 mb-8">
                    <a
                      href="mailto:team@steadybooks.com"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-sage-pale flex items-center justify-center shrink-0 group-hover:bg-sage/20 transition-colors">
                        <Mail className="w-4.5 h-4.5 text-sage" />
                      </div>
                      <div>
                        <p className="font-body text-xs text-navy/50 mb-0.5">
                          Email
                        </p>
                        <p className="font-body text-sm font-medium text-navy group-hover:text-sage transition-colors">
                          team@steadybooks.com
                        </p>
                      </div>
                    </a>

                  

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sage-pale flex items-center justify-center shrink-0">
                        <Clock className="w-4.5 h-4.5 text-sage" />
                      </div>
                      <div>
                        <p className="font-body text-xs text-navy/50 mb-0.5">
                          Response Time
                        </p>
                        <p className="font-body text-sm font-medium text-navy">
                          Within 1 business day
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Trust signals */}
                  <div className="bg-stone rounded-2xl p-5 space-y-3">
                    <h3 className="font-display font-semibold text-sm text-navy mb-3">
                      What to Expect
                    </h3>
                    {[
                      { icon: CalendarCheck, text: "Free 30-minute consultation" },
                      { icon: MessageCircle, text: "No pressure or hard selling" },
                      { icon: Shield, text: "No commitment required" },
                      { icon: Lock, text: "Complete confidentiality" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2.5">
                        <item.icon className="w-4 h-4 text-sage shrink-0" />
                        <span className="font-body text-sm text-navy/65">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <Reveal delay={100}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-dark">
                  <h2 className="font-display font-semibold text-xl text-navy mb-6">
                    Send a Message
                  </h2>
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}