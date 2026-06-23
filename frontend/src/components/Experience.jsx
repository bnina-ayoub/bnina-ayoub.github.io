import { experience } from "../data/portfolio";
import { SectionHeader } from "./About";
import { Briefcase, MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32"
      data-testid="experience-section"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="04"
          code="EXPERIENCE"
          title="Experience."
          subtitle="Internships and applied engineering work across robotics labs in Tunisia."
        />

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-graphite-400 sm:block" />
          <div className="space-y-10">
            {experience.map((exp, i) => (
              <div
                key={exp.id}
                className="relative grid gap-6 sm:grid-cols-[40px_1fr]"
                data-testid={`experience-${exp.id}`}
              >
                <div className="relative">
                  <div className="hidden h-9 w-9 -translate-x-px items-center justify-center border border-signal bg-graphite-900 text-signal sm:flex">
                    <Briefcase className="h-4 w-4" />
                  </div>
                </div>
                <div className="four-corners relative border border-graphite-400 bg-graphite-900/70 p-5 text-signal sm:p-7">
                  <span className="c tl" />
                  <span className="c tr" />
                  <span className="c bl" />
                  <span className="c br" />

                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    <span className="text-tactical-amber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-graphite-400" />
                    <span>
                      {exp.start} — {exp.end}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
                    {exp.role}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-sm">
                    <span className="text-signal">{exp.company}</span>
                    <span className="text-graphite-400">|</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {exp.location}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {exp.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.stack.map((t) => (
                      <span
                        key={t}
                        className="border border-graphite-400 bg-graphite-800 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-hud"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
