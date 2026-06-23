import { useState } from "react";
import { projects } from "../data/portfolio";
import { SectionHeader } from "./About";
import { ArrowUpRight, Target, Crosshair, Lock } from "lucide-react";

const statusStyle = {
  ONGOING: "border-tactical-amber text-tactical-amber",
  COMPLETED: "border-hud text-hud",
  ARCHIVE: "border-graphite-400 text-muted-foreground",
};

const accentBar = {
  amber: "bg-tactical-amber",
  green: "bg-hud",
  orange: "bg-signal",
};

function ProjectCard({ p }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="four-corners relative flex flex-col border border-graphite-400 bg-graphite-900/70 text-signal transition-colors hover:border-signal"
      data-testid={`project-${p.id}`}
    >
      <span className="c tl" />
      <span className="c tr" />
      <span className="c bl" />
      <span className="c br" />

      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-graphite-400 bg-graphite-800">
        <img
          src={p.image}
          alt={p.name}
          className="absolute inset-0 h-full w-full object-cover opacity-65 grayscale transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-graphite-900/40" />
        <div className="absolute inset-0 scanlines opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-900/90 via-graphite-900/20 to-transparent" />

        {/* corner labels */}
        <div className="absolute left-3 top-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-hud">
          <Target className="h-3 w-3" /> P-{p.code.replace("TGT-", "")}
        </div>
        <div
          className={`absolute right-3 top-3 inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] ${statusStyle[p.status]}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              p.status === "ONGOING"
                ? "bg-tactical-amber animate-pulse"
                : p.status === "COMPLETED"
                ? "bg-hud"
                : "bg-graphite-400"
            }`}
          />
          {p.status}
        </div>

        {/* subtle highlight frame on hover */}
        {hover && (
          <div className="pointer-events-none absolute inset-3 border border-signal/60" />
        )}

        {p.placeholder && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 border border-graphite-400 bg-graphite-900/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <Lock className="h-3 w-3" /> Media coming soon
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {p.classification.replace(" / ", " · ")}
        </div>
        <h3 className="mt-2 font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
          {p.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          {p.summary}
        </p>

        <ul className="mt-4 space-y-1.5">
          {p.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/80"
            >
              <span className={`mt-1.5 h-1 w-3 ${accentBar[p.accent]}`} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <span
                key={t}
                className="border border-graphite-400 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-hud"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* bottom strip */}
      <div className={`h-[3px] w-full ${accentBar[p.accent]} opacity-80`} />
    </article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32"
      data-testid="projects-section"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="05"
          code="PROJECTS"
          title="Featured Projects."
          subtitle="Selected work in defense vision, real-time control and embedded robotics. Media for some projects is being prepared."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-graphite-400 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Project media will be added progressively</span>
          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-signal hover:text-tactical-amber"
            data-testid="projects-request-media-cta"
          >
            Request full details <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
