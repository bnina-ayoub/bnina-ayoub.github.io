import { profile } from "../data/portfolio";
import { Github, Linkedin, Mail, Crosshair } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative border-t border-graphite-400 bg-graphite-900/70 pb-8 pt-12"
      data-testid="footer"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center border border-signal text-signal">
                <Crosshair className="h-4 w-4" />
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  CALLSIGN
                </div>
                <div className="font-mono text-sm font-bold text-foreground">
                  {profile.callsign}
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Built from first principles — bare-metal C, real-time control,
              and one too many coffees. Static deployment ready for GitHub
              Pages.
            </p>
          </div>

          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <div className="text-hud">// COORDINATES</div>
            <div className="mt-2 text-foreground">{profile.location}</div>
            <div>{profile.coords}</div>
            <div className="mt-2">{profile.phone}</div>
            <div>{profile.email}</div>
          </div>

          <div className="flex items-start justify-start gap-3 lg:justify-end">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-11 w-11 place-items-center border border-graphite-400 text-foreground transition-colors hover:border-signal hover:text-signal"
              aria-label="GitHub"
              data-testid="footer-github"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-11 w-11 place-items-center border border-graphite-400 text-foreground transition-colors hover:border-hud hover:text-hud"
              aria-label="LinkedIn"
              data-testid="footer-linkedin"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="grid h-11 w-11 place-items-center border border-graphite-400 text-foreground transition-colors hover:border-tactical-amber hover:text-tactical-amber"
              aria-label="Email"
              data-testid="footer-email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-graphite-400 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {profile.name} · ALL TRANSMISSIONS LOGGED
          </span>
          <span className="flex items-center gap-3">
            <span>BUILD: STATIC · v1.0</span>
            <span className="h-1 w-1 rounded-full bg-graphite-400" />
            <span className="text-hud">SYS: NOMINAL</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
