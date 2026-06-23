import { profile } from "../data/portfolio";
import { ShieldCheck, MapPin, GraduationCap, Languages } from "lucide-react";

function SectionHeader({ index, code, title, subtitle, meta }) {
  return (
    <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          <span className="text-tactical-amber">{index}</span>
          <span className="h-px w-10 bg-signal" />
          <span>{code}</span>
        </div>
        <h2 className="mt-2 font-display text-4xl font-black leading-none tracking-tight text-foreground sm:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      {meta && (
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {meta}
        </div>
      )}
    </div>
  );
}

export { SectionHeader };

const dossier = [
  { label: "Location", value: profile.location, icon: MapPin },
  { label: "Education", value: "M.Sc. — OMU 2026", icon: GraduationCap },
  { label: "Focus", value: "Embedded · RTOS · Vision", icon: ShieldCheck },
  { label: "Languages", value: "AR / EN / FR / TR", icon: Languages },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32"
      data-testid="about-section"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="02"
          code="ABOUT"
          title="About me."
          subtitle="Engineering doctrine, background and current focus areas."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="four-corners relative border border-graphite-400 bg-graphite-900/60 p-6 text-signal sm:p-10">
              <span className="c tl" />
              <span className="c tr" />
              <span className="c bl" />
              <span className="c br" />

              <p className="font-mono text-xs uppercase tracking-[0.22em] text-tactical-amber">
                Bio
              </p>
              <p className="mt-5 text-lg leading-relaxed text-foreground/90">
                I build the firmware that thinks under pressure. My work lives
                where milliseconds matter — quadrupeds that need to stay
                upright, underwater nodes that can&apos;t drop a packet, and{" "}
                <span className="text-signal signal-glow">
                  anti-UAV vision pipelines
                </span>{" "}
                that must lock a target before it disappears.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Two-time IEEE RAS national embedded programming champion.
                Currently a{" "}
                <span className="text-tactical-amber">
                  Türkiye Scholarships (YTB)
                </span>{" "}
                awardee preparing for an M.Sc. in Computer Engineering at
                Ondokuz Mayıs University, while finishing M2 Research in Smart
                Systems at ENSI (Tunisia). I write bare-metal C with the same
                discipline other engineers reserve for production deploys.
              </p>

              <div className="mt-8 grid gap-px bg-graphite-400 sm:grid-cols-2">
                {dossier.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 bg-graphite-900/80 p-4"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center border border-graphite-400 text-signal">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {label}
                      </div>
                      <div className="font-mono text-sm text-foreground">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-full">
              <div className="four-corners relative aspect-[4/5] w-full overflow-hidden border border-graphite-400 bg-graphite-900 text-signal">
                <span className="c tl" />
                <span className="c tr" />
                <span className="c bl" />
                <span className="c br" />
                <img
                  src="https://images.pexels.com/photos/8439064/pexels-photo-8439064.jpeg?auto=compress&w=900&q=70"
                  alt="Engineer operating a robotic arm"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-graphite-900/40" />
                <div className="absolute inset-0 scanlines opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-900 via-graphite-900/40 to-transparent" />
                <div className="absolute inset-x-0 top-3 flex justify-between px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-hud">
                  <span>Camera Feed</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-alert animate-pulse" />
                    LIVE
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-4 px-4 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/80">
                  <div>Ayoub Bnina · Samsun, Türkiye</div>
                  <div className="text-tactical-amber">
                    Embedded · Robotics · Defense Tech
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
