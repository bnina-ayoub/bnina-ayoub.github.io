import { useEffect, useRef, useState } from "react";

/**
 * FloatingScene
 * Decorative interactive background — drifting PCBs, UAVs, circuit traces,
 * scrolling PWM signals and rising binary digits. Reacts to mouse parallax.
 * Pointer-events disabled so it never blocks the UI.
 */

// ---------- ATOMS ----------

const PCB = ({ x, y, scale = 1, rot = 0, dur = "16s", delay = "0s", tone = "hud" }) => {
  const stroke = tone === "hud" ? "#00FF41" : tone === "amber" ? "#FFB000" : "#FF5722";
  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px)`,
        animation: `floatPCB ${dur} ease-in-out ${delay} infinite alternate`,
      }}
    >
      <g
        style={{
          transform: `scale(${scale}) rotate(${rot}deg)`,
          transformOrigin: "center",
        }}
      >
        {/* board */}
        <rect x="-46" y="-30" width="92" height="60" fill="none" stroke={stroke} strokeWidth="1" />
        {/* mounting holes */}
        <circle cx="-40" cy="-24" r="1.6" stroke={stroke} fill="none" />
        <circle cx="40" cy="-24" r="1.6" stroke={stroke} fill="none" />
        <circle cx="-40" cy="24" r="1.6" stroke={stroke} fill="none" />
        <circle cx="40" cy="24" r="1.6" stroke={stroke} fill="none" />
        {/* IC chip */}
        <rect x="-28" y="-14" width="22" height="22" fill="none" stroke={stroke} strokeWidth="0.8" />
        <text x="-17" y="0" textAnchor="middle" fontSize="6" fill={stroke} fontFamily="JetBrains Mono">
          STM32
        </text>
        {/* IC pins */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`l${i}`} x1={-30} y1={-12 + i * 4} x2={-34} y2={-12 + i * 4} stroke={stroke} strokeWidth="0.6" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`r${i}`} x1={-6} y1={-12 + i * 4} x2={-2} y2={-12 + i * 4} stroke={stroke} strokeWidth="0.6" />
        ))}
        {/* secondary chip */}
        <rect x="4" y="-10" width="28" height="14" fill="none" stroke={stroke} strokeWidth="0.6" />
        <text x="18" y="0" textAnchor="middle" fontSize="5" fill={stroke} fontFamily="JetBrains Mono">
          NXP
        </text>
        {/* caps + resistors */}
        <circle cx="0" cy="18" r="2.5" stroke={stroke} fill="none" strokeWidth="0.6" />
        <circle cx="10" cy="18" r="2.5" stroke={stroke} fill="none" strokeWidth="0.6" />
        <rect x="20" y="14" width="10" height="3" fill="none" stroke={stroke} strokeWidth="0.5" />
        <rect x="-30" y="14" width="10" height="3" fill="none" stroke={stroke} strokeWidth="0.5" />
        {/* traces */}
        <path d="M-46 0 L-34 0 L-34 -8 L-30 -8" stroke={stroke} strokeWidth="0.6" fill="none" />
        <path d="M-2 -8 L4 -8" stroke={stroke} strokeWidth="0.6" fill="none" />
        <path d="M32 0 L46 0" stroke={stroke} strokeWidth="0.6" fill="none" />
        {/* edge pads */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`b${i}`} x1={-40 + i * 10} y1={30} x2={-40 + i * 10} y2={34} stroke={stroke} strokeWidth="0.6" />
        ))}
      </g>
    </g>
  );
};

const Drone = ({ x, y, scale = 1, dur = "26s", delay = "0s", direction = "lr" }) => {
  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px)`,
        animation: `${direction === "lr" ? "droneCrossLR" : "droneCrossRL"} ${dur} linear ${delay} infinite`,
      }}
    >
      <g
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      >
        {/* body */}
        <rect x="-5" y="-3" width="10" height="6" fill="none" stroke="#FFB000" strokeWidth="0.8" />
        {/* arms */}
        <line x1="-5" y1="-3" x2="-18" y2="-12" stroke="#FFB000" strokeWidth="0.8" />
        <line x1="5" y1="-3" x2="18" y2="-12" stroke="#FFB000" strokeWidth="0.8" />
        <line x1="-5" y1="3" x2="-18" y2="12" stroke="#FFB000" strokeWidth="0.8" />
        <line x1="5" y1="3" x2="18" y2="12" stroke="#FFB000" strokeWidth="0.8" />
        {/* rotors (animated) */}
        <g style={{ animation: "rotorSpin 0.18s linear infinite", transformOrigin: "-18px -12px" }}>
          <ellipse cx="-18" cy="-12" rx="7" ry="1" fill="#FFB000" opacity="0.55" />
        </g>
        <g style={{ animation: "rotorSpin 0.18s linear infinite", transformOrigin: "18px -12px" }}>
          <ellipse cx="18" cy="-12" rx="7" ry="1" fill="#FFB000" opacity="0.55" />
        </g>
        <g style={{ animation: "rotorSpin 0.18s linear infinite", transformOrigin: "-18px 12px" }}>
          <ellipse cx="-18" cy="12" rx="7" ry="1" fill="#FFB000" opacity="0.55" />
        </g>
        <g style={{ animation: "rotorSpin 0.18s linear infinite", transformOrigin: "18px 12px" }}>
          <ellipse cx="18" cy="12" rx="7" ry="1" fill="#FFB000" opacity="0.55" />
        </g>
        {/* signal ping */}
        <circle cx="0" cy="0" r="3" fill="none" stroke="#00FF41" strokeWidth="0.6">
          <animate attributeName="r" from="3" to="22" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.9" to="0" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
    </g>
  );
};

// PWM square-wave path generator
const pwmPath = (cycles = 60, hi = 0, lo = 14, period = 30) => {
  let d = `M0 ${lo}`;
  for (let i = 0; i < cycles; i++) {
    const x0 = i * period;
    const xm = x0 + period / 2;
    const x1 = x0 + period;
    d += ` L${x0} ${lo} L${x0} ${hi} L${xm} ${hi} L${xm} ${lo} L${x1} ${lo}`;
  }
  return d;
};

const PWMTrack = ({ top, color, dur, label }) => (
  <div className="absolute left-0 right-0" style={{ top }}>
    <div className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color, opacity: 0.6 }}>
      {label}
    </div>
    <svg viewBox="0 0 1800 24" className="block h-6 w-[200%]" preserveAspectRatio="none">
      <g style={{ animation: `pwmScroll ${dur} linear infinite` }}>
        <path d={pwmPath(60, 2, 14, 30)} fill="none" stroke={color} strokeWidth="1.2" />
      </g>
    </svg>
  </div>
);

// circuit trace bundle
const Traces = () => (
  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="traceGrad" x1="0" x2="1">
        <stop offset="0%" stopColor="#FF5722" stopOpacity="0" />
        <stop offset="50%" stopColor="#FF5722" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="traceGrad2" x1="0" x2="1">
        <stop offset="0%" stopColor="#00FF41" stopOpacity="0" />
        <stop offset="50%" stopColor="#00FF41" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#00FF41" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* horizontal traces */}
    <path d="M0 120 L300 120 L320 140 L600 140 L620 120 L1200 120" stroke="#30363D" strokeWidth="0.6" fill="none" />
    <path d="M0 120 L300 120 L320 140 L600 140 L620 120 L1200 120"
      stroke="url(#traceGrad)" strokeWidth="1.6" fill="none" strokeDasharray="60 940"
      style={{ animation: "traceSignal 5s linear infinite" }}
    />

    <path d="M0 360 L240 360 L260 380 L500 380 L520 360 L900 360 L920 380 L1200 380" stroke="#30363D" strokeWidth="0.6" fill="none" />
    <path d="M0 360 L240 360 L260 380 L500 380 L520 360 L900 360 L920 380 L1200 380"
      stroke="url(#traceGrad2)" strokeWidth="1.6" fill="none" strokeDasharray="80 1120"
      style={{ animation: "traceSignal 7s linear infinite" }}
    />

    <path d="M0 600 L200 600 L220 620 L460 620 L480 600 L1200 600" stroke="#30363D" strokeWidth="0.6" fill="none" />
    <path d="M0 600 L200 600 L220 620 L460 620 L480 600 L1200 600"
      stroke="url(#traceGrad)" strokeWidth="1.6" fill="none" strokeDasharray="50 1150"
      style={{ animation: "traceSignal 6s linear infinite" }}
    />

    {/* solder nodes */}
    {[
      [300, 120], [320, 140], [600, 140], [620, 120],
      [240, 360], [260, 380], [500, 380], [520, 360], [900, 360], [920, 380],
      [200, 600], [220, 620], [460, 620], [480, 600],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2" fill="#30363D" />
    ))}
  </svg>
);

// rising bits
const BitStream = () => {
  const bits = Array.from({ length: 14 }).map((_, i) => ({
    left: `${(i * 7) + (i % 3) * 4}%`,
    delay: `${(i * 0.7) % 8}s`,
    dur: `${10 + (i % 5) * 1.5}s`,
    v: i % 2,
  }));
  return (
    <>
      {bits.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-0 font-mono text-[10px] text-hud opacity-70"
          style={{
            left: b.left,
            animation: `bitRise ${b.dur} linear ${b.delay} infinite`,
          }}
        >
          {b.v ? "1" : "0"}
        </span>
      ))}
    </>
  );
};

// ---------- COMPONENT ----------

export default function FloatingScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setMouse({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
      data-testid="floating-scene"
    >
      {/* layer 1 — deep traces (slow parallax) */}
      <div
        className="absolute inset-0 opacity-[0.10] transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${mouse.x * 10}px, ${mouse.y * 10}px, 0)` }}
      >
        <Traces />
      </div>

      {/* layer 2 — PCBs (mid parallax) */}
      <div
        className="absolute inset-0 opacity-[0.14] transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${mouse.x * -22}px, ${mouse.y * -18}px, 0)` }}
      >
        <svg className="absolute h-full w-full" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
          <PCB x={140} y={180} scale={1} rot={-8} dur="18s" delay="0s" tone="hud" />
          <PCB x={980} y={260} scale={0.85} rot={12} dur="22s" delay="-4s" tone="amber" />
          <PCB x={220} y={680} scale={0.7} rot={-22} dur="16s" delay="-6s" tone="hud" />
          <PCB x={920} y={720} scale={0.9} rot={6} dur="20s" delay="-3s" tone="orange" />
          <PCB x={560} y={440} scale={0.55} rot={28} dur="14s" delay="-8s" tone="amber" />
        </svg>
      </div>

      {/* layer 3 — drones (fast parallax) */}
      <div
        className="absolute inset-0 opacity-[0.22] transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${mouse.x * -38}px, ${mouse.y * -30}px, 0)` }}
      >
        <svg className="absolute h-full w-full" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
          <Drone x={0} y={140} scale={0.9} dur="28s" delay="0s" direction="lr" />
          <Drone x={0} y={420} scale={1.1} dur="36s" delay="-12s" direction="lr" />
          <Drone x={0} y={620} scale={0.7} dur="24s" delay="-6s" direction="rl" />
          <Drone x={0} y={300} scale={0.6} dur="40s" delay="-18s" direction="rl" />
        </svg>
      </div>

      {/* PWM tracks (no parallax — feel like instrument readouts pinned to viewport) */}
      <div className="absolute inset-0 opacity-[0.22]">
        <PWMTrack top="14%" color="#00FF41" dur="12s" label="// CH1 · PWM · TIM3 · 50Hz" />
        <PWMTrack top="68%" color="#FFB000" dur="9s" label="// CH2 · UART · 115200 8N1" />
        <PWMTrack top="88%" color="#FF5722" dur="14s" label="// CH3 · SPI · 10MHz" />
      </div>

      {/* rising binary bits */}
      <div className="absolute inset-0 opacity-40">
        <BitStream />
      </div>

      {/* subtle vignette so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(14,16,20,0) 0%, rgba(14,16,20,0.55) 70%, rgba(14,16,20,0.85) 100%)",
        }}
      />
    </div>
  );
}
