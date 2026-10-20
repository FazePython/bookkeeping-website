import { HEADSHOT_SRC } from "@/lib/site";

/**
 * TODO: add Faizan's headshot before merge.
 * This is an empty slot, not a photo. Replace client/public/images/faizan-headshot.svg
 * (or change HEADSHOT_SRC in client/src/lib/site.ts). Do not use the logo.
 */
export default function Headshot({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <img
        src={HEADSHOT_SRC}
        alt="[TODO: add Faizan's headshot]"
        width={640}
        height={800}
        className="w-full max-w-md h-auto rounded-2xl border border-dashed border-navy/40 bg-stone"
      />
      <figcaption className="mt-3 font-body text-sm text-navy leading-relaxed max-w-md">
        <span className="inline-block rounded bg-gold/30 px-1.5 py-0.5 font-semibold">
          [TODO: add Faizan's headshot]
        </span>{" "}
        Empty photo slot. Replace{" "}
        <span className="font-medium">client/public/images/faizan-headshot.svg</span>{" "}
        with a real photo. Do not use the logo.
      </figcaption>
    </figure>
  );
}
