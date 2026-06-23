import { useEffect, useState } from "react";
import { Crosshair, Menu, X } from "lucide-react";
import { navLinks, profile } from "../data/portfolio";

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => document.getElementById(l.id));
      const pos = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= pos) {
          setActive(navLinks[i].id);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-graphite-400 bg-graphite-900/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
      data-testid="main-nav"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
        <button
          onClick={() => go("hero")}
          className="flex items-center gap-3 text-left"
          data-testid="nav-logo"
        >
          <span className="grid h-9 w-9 place-items-center border border-signal text-signal">
            <Crosshair className="h-4 w-4" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              CALLSIGN
            </span>
            <span className="font-mono text-sm font-bold text-foreground">
              {profile.callsign}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              data-testid={`nav-${l.id}`}
              className={`group relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                active === l.id
                  ? "text-signal"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="relative">
                {active === l.id && (
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-signal">
                    [
                  </span>
                )}
                {l.label}
                {active === l.id && (
                  <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-signal">
                    ]
                  </span>
                )}
              </span>
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-hud">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hud opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-hud" />
            </span>
            ONLINE
          </span>
          <button
            onClick={() => go("contact")}
            className="border border-signal bg-signal/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal transition-all hover:bg-signal hover:text-graphite-900"
            data-testid="nav-contact-cta"
          >
            [ ESTABLISH COMMS ]
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center border border-graphite-400 text-foreground lg:hidden"
          aria-label="Toggle menu"
          data-testid="nav-toggle"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-graphite-400 bg-graphite-900/95 backdrop-blur-md lg:hidden">
          <div className="mx-auto max-w-[1440px] px-5 py-4">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`block w-full border-l-2 px-3 py-2 text-left font-mono text-xs uppercase tracking-[0.18em] ${
                  active === l.id
                    ? "border-signal text-signal"
                    : "border-transparent text-muted-foreground"
                }`}
                data-testid={`nav-mobile-${l.id}`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("contact")}
              className="mt-3 w-full border border-signal bg-signal/10 px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal"
              data-testid="nav-mobile-contact-cta"
            >
              [ ESTABLISH COMMS ]
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
