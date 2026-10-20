/**
 * TODO: Faizan must confirm the January 15 sign-up deadline before merge.
 * The visible marker is intentional. Do not remove "[TODO: confirm Jan 15]"
 * until he confirms the date.
 */
export default function SignupDeadline({ onDark = false }: { onDark?: boolean }) {
  return (
    <>
      Sign up by January 15{" "}
      <span
        className={
          onDark
            ? "inline-block rounded bg-gold px-1.5 py-0.5 font-semibold text-navy"
            : "inline-block rounded bg-gold/30 px-1.5 py-0.5 font-semibold text-navy"
        }
      >
        [TODO: confirm Jan 15]
      </span>{" "}
      to be ready by Feb 15
    </>
  );
}
