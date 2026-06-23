import { education } from "../data/portfolio";
import { SectionHeader } from "./About";
import { GraduationCap, MapPin } from "lucide-react";

const statusStyle = {
  INCOMING: "text-tactical-amber border-tactical-amber",
  ACTIVE: "text-hud border-hud",
  COMPLETED: "text-muted-foreground border-graphite-400",
};

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-24 sm:py-32"
      data-testid="education-section"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="06"
          code="ACADEMIC.RECORDS"
          title="Academic Records."
          subtitle="// formation history — degrees and active research programs"
        />

        <div className="grid gap-px bg-graphite-400 md:grid-cols-3">
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className="relative bg-graphite-900/80 p-6 sm:p-7"
              data-testid={`education-${edu.id}`}
            >
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>REC-{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`inline-flex items-center gap-1.5 border px-2 py-0.5 ${statusStyle[edu.status]}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      edu.status === "ACTIVE"
                        ? "bg-hud animate-pulse"
                        : edu.status === "INCOMING"
                        ? "bg-tactical-amber"
                        : "bg-muted-foreground"
                    }`}
                  />
                  {edu.status}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-graphite-400 text-signal">
                  <GraduationCap className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-base font-bold text-foreground">
                    {edu.institution}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {edu.location}
                  </div>
                </div>
              </div>
              <div className="mt-5 border-t border-graphite-400 pt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-tactical-amber">
                  DEGREE
                </div>
                <div className="mt-1 text-sm text-foreground/90">
                  {edu.degree}
                </div>
              </div>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-hud">
                {edu.period}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {edu.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
