import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

type Fields = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
};

const emptyNotice = "";

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
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
  });
  const [honey, setHoney] = useState("");
  const [notice, setNotice] = useState(emptyNotice);
  const [mailto, setMailto] = useState(`mailto:${CONTACT_EMAIL}`);

  const update = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (honey.trim()) {
      setNotice(`Your message was not sent. Email ${CONTACT_EMAIL} directly.`);
      setMailto(`mailto:${CONTACT_EMAIL}`);
      return;
    }
    const href = mailtoHref(fields);
    setMailto(href);
    setNotice(
      `Your email app should open with this message to ${CONTACT_EMAIL}. It is not sent until you send it from that app.`,
    );
    window.location.href = href;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      {notice && (
        <div role="status" className="rounded-lg border border-stone-dark bg-stone px-4 py-3">
          <p className="font-body text-sm text-navy leading-relaxed">{notice}</p>
          <a className="mt-2 inline-block font-body text-sm font-medium text-navy underline" href={mailto}>
            Open the email to {CONTACT_EMAIL}
          </a>
        </div>
      )}

      <button
        type="submit"
        className="w-full font-body font-semibold text-sm bg-navy text-white py-4 rounded-lg hover:bg-navy-dark transition-colors shadow-sm"
      >
        Email Faizan
      </button>

      <p className="font-body text-xs text-navy/50 text-center leading-relaxed">
        This opens your email app. The site does not send the message for you. You can also write to{" "}
        <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}
