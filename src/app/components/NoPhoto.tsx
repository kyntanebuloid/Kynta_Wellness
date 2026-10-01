/**
 * Shown in place of a card photo that hasn't been uploaded yet: the card's
 * name on a deep teal panel with soft light and fine rings. Fills its
 * (relatively positioned) parent like a `fill` image would.
 */
export function NoPhoto({ title, label }: { title: string; label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-kynta-teal-dark px-6 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.14), transparent 60%), radial-gradient(90% 70% at 50% 115%, rgba(198,127,59,0.32), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square h-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square h-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
      />
      <p className="relative max-w-[20ch] font-serif text-xl leading-snug text-white">
        {title}
      </p>
      <span
        aria-hidden="true"
        className="relative my-3 h-px w-10 bg-kynta-gold/80"
      />
      <span className="relative text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
        {label}
      </span>
    </div>
  );
}
