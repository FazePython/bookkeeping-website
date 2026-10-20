import { HEADSHOT_SRC } from "@/lib/site";

/**
 * Clearly marked headshot slot. Swap the image by replacing
 * client/public/images/faizan-headshot.svg, or change HEADSHOT_SRC.
 */
export default function Headshot({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <img
        src={HEADSHOT_SRC}
        alt="Faizan Qureshi, QuickBooks Certified ProAdvisor"
        width={640}
        height={800}
        className="w-full max-w-md h-auto rounded-2xl border border-stone-dark bg-stone"
      />
      <figcaption className="mt-3 font-body text-xs text-navy/55 leading-relaxed max-w-md">
        Headshot placeholder. Replace{" "}
        <span className="font-medium">client/public/images/faizan-headshot.svg</span>{" "}
        with a photo of Faizan. Do not use the logo.
      </figcaption>
    </figure>
  );
}
