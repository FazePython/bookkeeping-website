import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { CONTACT_EMAIL, FORM_SUBMIT_URL } from "@/lib/site";

type Fields = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
};

const emptyFields: Fields = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
};

function mailtoHref(fields: Fields) {
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Business name: ${fields.businessName}`,
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "SteadyBooks inquiry",
  )}&body=${encodeURIComponent(body)}`;
}

function isFormSuccess(value: unknown) {
  return value === true || value === "true";
}

function readableError(message: unknown) {
  if (typeof message !== "string") return "Nothing was sent.";
  const clean = message.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!clean || clean.length > 320) return "Nothing was sent.";
  if (/activat/i.test(clean)) return "The form mailbox is not active yet.";
  return clean;
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const update = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorDetail("");

    if (honey.trim()) {
      setStatus("error");
      setErrorDetail("Nothing was sent.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(FORM_SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          businessName: fields.businessName,
          _replyto: fields.email,
          _subject: "New inquiry from steady-books.com",
          _template: "table",
          _captcha: "false",
        }),
      });

      let payload: { success?: unknown; message?: unknown } | null = null;
      try {
        payload = (await response.json()) as { success?: unknown; message?: unknown };
      } catch {
        payload = null;
      }

      if (!response.ok || !isFormSuccess(payload?.success)) {
        setStatus("error");
        setErrorDetail(readableError(payload?.message));
        return;
      }

      setStatus("success");
      setFields(emptyFields);
    } catch {
      setStatus("error");
      setErrorDetail("Nothing was sent.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8" role="status">
        <div className="w-16 h-16 rounded-full bg-sage-pale flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-sage" />
        </div>
        <h3 className="font-display font-bold text-2xl text-navy mb-3">Message sent</h3>
        <p className="font-body text-base text-navy/65 leading-relaxed">
          Your message was delivered. I will reply to the email address you entered.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Leave this blank
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honey}
            onChange={(event) => setHoney(event.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block font-body text-sm font-medium text-navy mb-1.5">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            required
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={fields.name}
            onChange={update("name")}
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block font-body text-sm font-medium text-navy mb-1.5">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            required
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            value={fields.email}
            onChange={update("email")}
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block font-body text-sm font-medium text-navy mb-1.5">
            Phone number
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 000-0000"
            value={fields.phone}
            onChange={update("phone")}
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
          />
        </div>
        <div>
          <label htmlFor="contact-business" className="block font-body text-sm font-medium text-navy mb-1.5">
            Business name
          </label>
          <input
            id="contact-business"
            type="text"
            autoComplete="organization"
            placeholder="Your Business LLC"
            value={fields.businessName}
            onChange={update("businessName")}
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
          />
        </div>
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="font-body text-sm text-red-800 leading-relaxed">
            Your message was not sent. {errorDetail} Email{" "}
            <a className="underline font-medium" href={mailtoHref(fields)}>
              {CONTACT_EMAIL}
            </a>{" "}
            and I will get back to you.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full font-body font-semibold text-sm bg-navy text-white py-4 rounded-lg hover:bg-navy-dark transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      <p className="font-body text-xs text-navy/50 text-center leading-relaxed">
        Or email{" "}
        <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        directly.
      </p>
    </form>
  );
}
