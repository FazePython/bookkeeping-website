import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

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

/** Empty until the GitHub Actions variable is set. The form then keeps the mailto flow. */
const WEB3FORMS_KEY = String(import.meta.env.VITE_WEB3FORMS_KEY ?? "").trim();

const SUCCESS_NOTICE = "Thanks, your message was sent. Faizan will reply within one business day.";
const FAILURE_NOTICE = `Your message was not sent. Please email ${CONTACT_EMAIL} directly.`;

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

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [honey, setHoney] = useState("");
  const [notice, setNotice] = useState("");
  const [showMailto, setShowMailto] = useState(false);
  const [mailto, setMailto] = useState(`mailto:${CONTACT_EMAIL}`);
  const [sending, setSending] = useState(false);

  const update = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!WEB3FORMS_KEY) {
      if (honey.trim()) {
        setNotice(`Your message was not sent. Email ${CONTACT_EMAIL} directly.`);
        setMailto(`mailto:${CONTACT_EMAIL}`);
        setShowMailto(true);
        return;
      }
      const href = mailtoHref(fields);
      setMailto(href);
      setShowMailto(true);
      setNotice(
        `Your email app should open with this message to ${CONTACT_EMAIL}. It is not sent until you send it from that app.`,
      );
      window.location.href = href;
      return;
    }

    setSending(true);
    setNotice("");
    setShowMailto(false);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "SteadyBooks inquiry",
          from_name: "SteadyBooks website",
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          businessName: fields.businessName,
          botcheck: honey,
        }),
      });
      const data = (await response.json().catch(() => null)) as { success?: unknown } | null;
      if (response.ok && data?.success === true) {
        setNotice(SUCCESS_NOTICE);
        setShowMailto(false);
        setFields(emptyFields);
        setHoney("");
        return;
      }
      setMailto(mailtoHref(fields));
      setShowMailto(true);
      setNotice(FAILURE_NOTICE);
    } catch {
      setMailto(mailtoHref(fields));
      setShowMailto(true);
      setNotice(FAILURE_NOTICE);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Leave this blank
          <input
            type="text"
            name="botcheck"
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
            name="name"
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
            name="email"
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
            name="phone"
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
            name="businessName"
            type="text"
            autoComplete="organization"
            placeholder="Your Business LLC"
            value={fields.businessName}
            onChange={update("businessName")}
            className="w-full font-body text-sm px-4 py-3 rounded-lg border border-stone-dark bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
          />
        </div>
      </div>

      {notice && (
        <div role="status" className="rounded-lg border border-stone-dark bg-stone px-4 py-3">
          <p className="font-body text-sm text-navy leading-relaxed">{notice}</p>
          {showMailto && (
            <a className="mt-2 inline-block font-body text-sm font-medium text-navy underline" href={mailto}>
              Open the email to {CONTACT_EMAIL}
            </a>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full font-body font-semibold text-sm bg-navy text-white py-4 rounded-lg hover:bg-navy-dark transition-colors shadow-sm disabled:opacity-60"
      >
        {sending ? "Sending…" : WEB3FORMS_KEY ? "Send message" : "Email Faizan"}
      </button>

      {!WEB3FORMS_KEY && (
        <p className="font-body text-xs text-navy/50 text-center leading-relaxed">
          This opens your email app. The site does not send the message for you. You can also write to{" "}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
