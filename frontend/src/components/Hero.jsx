import { useEffect, useState } from "react";
import { profile, stats } from "../data/portfolio";
import { ArrowDownRight, Cpu, Radar, Target, Activity } from "lucide-react";

const bootLines = [
  "> initializing portfolio interface ...",
  "> loading project archive ...",
  "> compiling firmware showcase ...",
  "> linking embedded systems ...",
  "> ready.",
];

function Typewriter({ lines }) {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (idx >= lines.length) {
      setDone(true);
      return;
    }
    const current = lines[idx];
    if (chars < current.length) {
      const t = setTimeout(() => setChars(chars + 1), 18);
      return () => clearTimeout(t);
    }
    const t2 = setTimeout(() => {
      setIdx(idx + 1);
      setChars(0);
    }, 250);
    return () => clearTimeout(t2);
  }, [chars, idx, lines, done]);

  return (
    <div className="space-y-1 font-mono text-[12px] leading-relaxed">
      {lines.slice(0, idx).map((l, i) => (
        <div key={i} className="text-hud">
          {l}
        </div>
      ))}
      {idx < lines.length && (
        <div className="text-hud">
          {lines[idx].slice(0, chars)}
          <span className="ml-0.5 inline-block h-3 w-2 -translate-y-[1px] bg-hud animate-blink" />
        </div>
      )}
      {done && (
        <div className="text-signal">
          {">"} ready_
          <span className="ml-0.5 inline-block h-3 w-2 -translate-y-[1px] bg-signal animate-blink" />
        </div>
      )}
    </div>
  );
}

function RadarVisual() {
  return (
    <div
      className="relative aspect-square w-full max-w-[460px]"
      data-testid="radar-visual"
    >
      <div className="absolute inset-0 rounded-full border border-graphite-400" />
      <div className="absolute inset-[6%] rounded-full border border-graphite-400/80" />
      <div className="absolute inset-[18%] rounded-full border border-graphite-400/70" />
      <div className="absolute inset-[32%] rounded-full border border-graphite-400/60" />
      <div className="absolute inset-[48%] rounded-full border border-graphite-400/50" />
      {/* Crosshair */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-graphite-400/60" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-graphite-400/60" />
      {/* Sweep */}
      <div className="absolute inset-0 animate-radar-sweep origin-center rounded-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(0,255,65,0.55) 0deg, rgba(0,255,65,0) 60deg, transparent 360deg)",
          }}
        />
      </div>
      {/* Blips */}
      {[
        { top: "22%", left: "60%", delay: "0s", c: "amber" },
        { top: "70%", left: "30%", delay: "1.2s", c: "orange" },
        { top: "40%", left: "78%", delay: "2.4s", c: "hud" },
        { top: "55%", left: "55%", delay: "0.6s", c: "hud" },
      ].map((b, i) => (
        <span
          key={i}
          className={`absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            b.c === "amber"
              ? "bg-tactical-amber shadow-[0_0_14px_3px_rgba(255,176,0,0.7)]"
              : b.c === "orange"
              ? "bg-signal shadow-[0_0_14px_3px_rgba(255,87,34,0.7)]"
              : "bg-hud shadow-[0_0_14px_3px_rgba(0,255,65,0.6)]"
          } animate-pulse`}
          style={{ top: b.top, left: b.left, animationDelay: b.delay }}
        />
      ))}
      {/* Center reticle */}
      <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rotate-45 border border-signal" />
        <div className="absolute inset-2 rounded-full border border-signal/80" />
      </div>
      {/* Cardinals */}
      {["N", "E", "S", "W"].map((c, i) => (
        <span
          key={c}
          className="absolute font-mono text-[10px] tracking-[0.2em] text-muted-foreground"
          style={
            i === 0
              ? { top: "-18px", left: "50%", transform: "translateX(-50%)" }
              : i === 1
              ? { top: "50%", right: "-18px", transform: "translateY(-50%)" }
              : i === 2
              ? { bottom: "-18px", left: "50%", transform: "translateX(-50%)" }
              : { top: "50%", left: "-18px", transform: "translateY(-50%)" }
          }
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-screen pt-28 pb-16 sm:pt-32"
      data-testid="hero-section"
    >
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent" />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        {/* LEFT — text */}
        <div className="lg:col-span-7">
          {/* meta strip */}
          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 bg-hud" /> Available for opportunities
            </span>
            <span>YTB Scholar · 2026</span>
            <span className="text-tactical-amber">2× IEEE RAS Champion</span>
          </div>

          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-signal">
            // Embedded Firmware & Robotics Engineer
          </p>

          <h1
            className="font-display text-5xl font-black leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            data-testid="hero-name"
          >
            {profile.name.split(" ")[0]}
            <span className="block text-signal signal-glow">
              {profile.name.split(" ").slice(1).join(" ")}.
            </span>
          </h1>

          <p className="mt-5 max-w-xl font-mono text-sm uppercase tracking-[0.22em] text-tactical-amber">
            {profile.title}
          </p>
          <p className="mt-2 max-w-xl font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {profile.subtitle}
          </p>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              data-testid="hero-cta-projects"
              className="group inline-flex items-center gap-2 border border-signal bg-signal px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-graphite-900 transition-all hover:bg-signal/90"
            >
              <Target className="h-4 w-4" />
              View Projects
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              data-testid="hero-cta-contact"
              className="inline-flex items-center gap-2 border border-graphite-400 bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:border-hud hover:text-hud"
            >
              <Radar className="h-4 w-4" />
              Get in Touch
            </a>
          </div>

          {/* Terminal */}
          <div className="mt-10 max-w-xl border border-graphite-400 bg-graphite-900/80 four-corners text-signal">
            <span className="c tl" />
            <span className="c tr" />
            <span className="c bl" />
            <span className="c br" />
            <div className="flex items-center justify-between border-b border-graphite-400 px-3 py-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                /dev/tty.sys — boot.log
              </span>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-graphite-400" />
                <span className="h-2 w-2 rounded-full bg-tactical-amber" />
                <span className="h-2 w-2 rounded-full bg-hud" />
              </div>
            </div>
            <div className="p-4">
              <Typewriter lines={bootLines} />
            </div>
          </div>
        </div>

        {/* RIGHT — radar + stats */}
        <div className="relative lg:col-span-5">
          <div className="relative">
            <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center border border-graphite-400 bg-graphite-900/40 p-6 four-corners text-signal">
              <span className="c tl" />
              <span className="c tr" />
              <span className="c bl" />
              <span className="c br" />
              <RadarVisual />
              <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                RDR-7 · LIVE
              </div>
              <div className="absolute right-3 top-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-hud">
                <Activity className="h-3 w-3" /> SWEEP
              </div>
              <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                FREQ: 9.41 GHz
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                GAIN: +27 dB
              </div>
            </div>
          </div>

          {/* stats grid */}
          <div className="mt-6 grid grid-cols-2 gap-px bg-graphite-400">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-graphite-900/80 p-4"
                data-testid={`hero-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {s.label}
                  </span>
                  <Cpu className="h-3 w-3 text-signal" />
                </div>
                <div className="mt-2 font-display text-lg font-bold leading-none text-foreground">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-tactical-amber">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>SCROLL</span>
          <span className="h-8 w-px animate-pulse bg-signal" />
        </div>
      </div>
    </section>
  );
}
