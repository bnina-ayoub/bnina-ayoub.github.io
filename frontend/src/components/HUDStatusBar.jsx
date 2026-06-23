import { useEffect, useState } from "react";

export default function HUDStatusBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = (n) => String(n).padStart(2, "0");
  const utc = `${fmt(time.getUTCHours())}:${fmt(time.getUTCMinutes())}:${fmt(time.getUTCSeconds())}Z`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden border-t border-graphite-400 bg-graphite-900/70 backdrop-blur md:block">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-hud animate-pulse" />
          OP-STATUS: NOMINAL
        </span>
        <span className="hidden md:inline">// THEME: TACTICAL HUD · GRID 24px</span>
        <span className="text-tactical-amber">UTC {utc}</span>
      </div>
    </div>
  );
}
