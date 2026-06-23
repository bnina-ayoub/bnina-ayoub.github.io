import { awards } from "../data/portfolio";
import { SectionHeader } from "./About";
import { Award, BadgeCheck, GraduationCap, Users, Trophy } from "lucide-react";

const typeMeta = {
  AWARD: { icon: Trophy, color: "text-signal", border: "border-signal" },
  SCHOLARSHIP: {
    icon: GraduationCap,
    color: "text-tactical-amber",
    border: "border-tactical-amber",
  },
  CERTIFICATION: {
    icon: BadgeCheck,
    color: "text-hud",
    border: "border-hud",
  },
  LEADERSHIP: {
    icon: Users,
    color: "text-foreground",
    border: "border-graphite-400",
  },
};

export default function Awards() {
  return (
    <section
      id="awards"
      className="relative py-24 sm:py-32"
      data-testid="awards-section"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="07"
          code="AWARDS"
          title="Awards & Recognition."
          subtitle="Competitions, scholarships, certifications and leadership roles."
        />

        <div className="grid gap-px bg-graphite-400 md:grid-cols-2 lg:grid-cols-3">
          {awards.map((a) => {
            const meta = typeMeta[a.type] || typeMeta.AWARD;
            const Icon = meta.icon;
            return (
              <div
                key={a.id}
                className="group relative flex bg-graphite-900/80 p-5 transition-colors hover:bg-graphite-700"
                data-testid={`award-${a.id}`}
              >
                <div
                  className={`mr-4 grid h-12 w-12 shrink-0 place-items-center border ${meta.border} ${meta.color}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <span className={meta.color}>{a.type}</span>
                    <span>{a.year}</span>
                  </div>
                  <h3 className="mt-1 text-sm font-bold leading-snug text-foreground">
                    {a.title}
                  </h3>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {a.issuer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* highlight banner */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border border-signal/60 bg-signal/[0.06] p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Award className="h-8 w-8 text-signal" strokeWidth={1.5} />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
                Headline Award
              </div>
              <div className="text-base text-foreground">
                Two-time national champion · IEEE RAS STM32F4 Embedded
                Programming (2024 &amp; 2025).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
