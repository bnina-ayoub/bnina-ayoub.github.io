import { skills } from "../data/portfolio";
import { SectionHeader } from "./About";
import { Cpu, Code2, Cable, Languages } from "lucide-react";

const categoryMeta = {
  Hardware: {
    icon: Cpu,
    code: "HW.NODE",
    accent: "text-signal",
    bar: "bg-signal",
  },
  "Software & RTOS": {
    icon: Code2,
    code: "SW.RTOS",
    accent: "text-hud",
    bar: "bg-hud",
  },
  "Protocols & Tools": {
    icon: Cable,
    code: "BUS.LINK",
    accent: "text-tactical-amber",
    bar: "bg-tactical-amber",
  },
  Languages: {
    icon: Languages,
    code: "LANG.PKT",
    accent: "text-foreground",
    bar: "bg-foreground",
  },
};

function SkillBar({ name, level, bar }) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between font-mono text-xs">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="mt-2 h-[3px] w-full bg-graphite-500">
        <div
          className={`h-full ${bar} transition-all duration-1000`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const cats = Object.keys(skills);
  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32"
      data-testid="skills-section"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="03"
          code="SYSTEMS.LOADOUT"
          title="Systems & Loadout."
          subtitle="// engineering stack — hardware, RTOS, protocols, languages"
        />

        <div className="grid gap-px bg-graphite-400 lg:grid-cols-2">
          {cats.map((cat) => {
            const meta = categoryMeta[cat];
            const Icon = meta.icon;
            return (
              <div
                key={cat}
                className="relative bg-graphite-900/80 p-6 sm:p-8"
                data-testid={`skills-${cat.toLowerCase().replace(/[^a-z]/g, "-")}`}
              >
                <div className="mb-6 flex items-center justify-between border-b border-graphite-400 pb-4">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center border border-graphite-400 ${meta.accent}`}>
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {meta.code}
                      </div>
                      <div className="font-display text-xl font-bold text-foreground">
                        {cat}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {skills[cat].length} ENTRIES
                  </span>
                </div>
                <div className="space-y-5">
                  {skills[cat].map((s) => (
                    <SkillBar key={s.name} {...s} bar={meta.bar} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* tech chips ribbon */}
        <div className="mt-10 flex flex-wrap gap-2">
          {["FreeRTOS", "ThreadX", "Micro-ROS", "ROS 2", "DDS", "PWM", "PID", "STM32F4", "STM32H7", "STM32U5", "NXP", "Jetson", "YOLOX", "Bare-metal C", "TouchGFX", "Git"].map((t) => (
            <span
              key={t}
              className="border border-graphite-400 bg-graphite-900 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-hud transition-colors hover:border-hud"
              data-testid={`skill-chip-${t.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
