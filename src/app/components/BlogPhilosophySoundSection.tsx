import { type BlogPageContent, blogPageDefaults } from "@/content/blog";
import { list, text } from "@/content/types";

interface BlogPhilosophySoundSectionProps {
  data?: BlogPageContent["philosophySection"];
}

export function BlogPhilosophySoundSection({
  data,
}: BlogPhilosophySoundSectionProps) {
  const d = blogPageDefaults.philosophySection;
  const notes = list(data?.fieldNotes, d.fieldNotes).map((n) => ({
    author: n.author ?? "",
    location: n.location ?? "",
    title: n.title,
    quote: n.quote,
  }));
  const tracks = list(data?.audioTracks, d.audioTracks).map((t, i) => ({
    title: t.title,
    subtitle: t.subtitle ?? "",
    duration: t.duration ?? "",
    accent: t.color ?? d.audioTracks[i % d.audioTracks.length].color,
  }));

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden border-t border-kynta-border/30"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start">
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="section-label text-kynta-rust mb-2">
                {text(data?.eyebrow, d.eyebrow)}
              </p>
              <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal font-normal mb-3">
                {text(data?.heading, d.heading)}
              </h2>
              <p className="text-[15px] leading-[1.7] text-kynta-warm-gray">
                {text(data?.description, d.description)}
              </p>
            </div>

            <div className="space-y-4">
              {notes.map((note, index) => (
                <div
                  key={`${note.title}-${index}`}
                  className="rounded-[12px] p-5 sm:p-5.5 border border-kynta-border/20 transition-all duration-200 hover:border-kynta-border/50"
                  style={{ backgroundColor: "#f1f4f2" }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold tracking-wide uppercase text-kynta-charcoal">
                      {note.author}
                    </span>
                    <span className="text-xs text-kynta-warm-gray">
                      {note.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg leading-snug font-normal text-kynta-charcoal mb-2">
                    {note.title}
                  </h3>

                  <p className="text-[13px] leading-[1.65] text-kynta-warm-gray">
                    {note.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <p className="section-label text-kynta-rust mb-2">
                {text(data?.soundEyebrow, d.soundEyebrow)}
              </p>
              <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal font-normal mb-3">
                {text(data?.soundHeading, d.soundHeading)}
              </h2>
              <p className="text-[15px] leading-[1.7] text-kynta-warm-gray">
                {text(data?.soundDescription, d.soundDescription)}
              </p>
            </div>

            <div className="space-y-4 mb-5">
              {tracks.map((track, index) => {
                const isRust = track.accent === "rust";
                const playBg = isRust ? "#9b5440" : "#004349";

                return (
                  <div
                    key={`${track.title}-${index}`}
                    className="bg-white rounded-[12px] p-4 sm:p-4.5 border border-kynta-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4 transition-all duration-200 hover:shadow-[0_4px_18px_rgba(0,0,0,0.04)]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <button
                        type="button"
                        aria-label={`Play ${track.title}`}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] flex items-center justify-center flex-shrink-0 text-white shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95"
                        style={{ backgroundColor: playBg }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="ml-0.5"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </button>

                      <div className="min-w-0">
                        <h3 className="font-serif text-base sm:text-lg leading-snug font-normal text-kynta-charcoal truncate mb-0.5">
                          {track.title}
                        </h3>
                        <p className="text-[13px] text-kynta-warm-gray truncate">
                          <span>{track.subtitle}</span>
                          <span className="mx-1.5">•</span>
                          <span className="text-kynta-rust font-medium">
                            {track.duration}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-1 flex-shrink-0 pr-2"
                      aria-hidden="true"
                    >
                      <span
                        className="w-[2.5px] h-3 rounded-full"
                        style={{
                          backgroundColor: isRust ? "#9b5440" : "#004349",
                        }}
                      />
                      <span
                        className="w-[2.5px] h-5 rounded-full"
                        style={{
                          backgroundColor: isRust ? "#9b5440" : "#004349",
                        }}
                      />
                      <span
                        className="w-[2.5px] h-3.5 rounded-full"
                        style={{
                          backgroundColor: isRust ? "#9b5440" : "#004349",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="rounded-[10px] p-4 sm:p-4.5 flex items-center gap-3.5 border border-kynta-border/30"
              style={{ backgroundColor: "#ebf0ed" }}
            >
              <div className="text-kynta-teal-dark flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <p className="text-[11px] leading-[1.6] text-kynta-warm-gray">
                {text(data?.soundNote, d.soundNote)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
