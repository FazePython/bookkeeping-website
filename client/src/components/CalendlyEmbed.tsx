import { useEffect } from "react";
import { CALENDLY_URL } from "@/lib/site";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

export default function CalendlyEmbed() {
  useEffect(() => {
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <p className="font-body text-sm text-navy/75 leading-relaxed mb-4">
        Pick a time below, or{" "}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-navy underline decoration-gold underline-offset-4"
        >
          open the scheduler in a new tab
        </a>
        .
      </p>
      <div
        className="calendly-inline-widget w-full overflow-hidden rounded-2xl border border-stone-dark bg-white"
        data-url={CALENDLY_URL}
        style={{ minWidth: "280px", height: "700px" }}
      />
    </div>
  );
}
