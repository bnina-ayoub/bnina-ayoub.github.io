import { useState } from "react";
import { profile } from "../data/portfolio";
import { SectionHeader } from "./About";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Copy,
  CheckCircle2,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("All required fields must be filled.");
      return;
    }
    const subject = encodeURIComponent(
      form.subject || `[CONTACT] Transmission from ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}\n\n— sent via portfolio.bnina //`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast.success("Mail client opened. Transmission ready to send.");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success(`Copied: ${profile.email}`);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy email.");
    }
  };

  const channels = [
    { icon: Mail, label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "VOICE", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "BASE", value: profile.location, href: null },
    { icon: Linkedin, label: "LINKEDIN", value: "ayoub-bnina", href: profile.linkedin },
    { icon: Github, label: "GITHUB", value: "bnina-ayoub", href: profile.github },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32"
      data-testid="contact-section"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="08"
          code="COMMS.CHANNEL"
          title="Establish Comms."
          subtitle="// open a secure transmission channel — encrypted via your local mail client"
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Channels */}
          <aside className="space-y-4 lg:col-span-5">
            <div className="four-corners relative border border-graphite-400 bg-graphite-900/70 p-6 text-signal">
              <span className="c tl" />
              <span className="c tr" />
              <span className="c bl" />
              <span className="c br" />

              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-tactical-amber">
                AVAILABLE CHANNELS
              </div>
              <ul className="mt-4 space-y-3">
                {channels.map(({ icon: Icon, label, value, href }) => {
                  const inner = (
                    <div className="flex items-center gap-4 border border-graphite-400 bg-graphite-800/60 p-3 transition-colors hover:border-signal">
                      <span className="grid h-9 w-9 place-items-center border border-graphite-400 text-signal">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          {label}
                        </div>
                        <div className="truncate font-mono text-sm text-foreground">
                          {value}
                        </div>
                      </div>
                      {label === "EMAIL" && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            copyEmail();
                          }}
                          className="shrink-0 border border-graphite-400 p-2 text-muted-foreground transition-colors hover:border-hud hover:text-hud"
                          aria-label="Copy email"
                          data-testid="contact-copy-email"
                        >
                          {copied ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer noopener"
                          data-testid={`contact-channel-${label.toLowerCase()}`}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div data-testid={`contact-channel-${label.toLowerCase()}`}>
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border border-graphite-400 bg-graphite-900/70 p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <div className="text-hud">// STATUS</div>
              <div className="mt-2">
                Currently in Türkiye (UTC+3). Reply latency typically &lt; 24h on weekdays. Open to embedded firmware, robotics, defense-tech and applied research collaborations.
              </div>
            </div>
          </aside>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="four-corners relative border border-graphite-400 bg-graphite-900/70 p-6 text-signal sm:p-8 lg:col-span-7"
            data-testid="contact-form"
          >
            <span className="c tl" />
            <span className="c tr" />
            <span className="c bl" />
            <span className="c br" />

            <div className="mb-6 flex items-center justify-between border-b border-graphite-400 pb-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-tactical-amber">
                /channel/secure-tx
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-hud">
                <span className="h-2 w-2 rounded-full bg-hud animate-pulse" />
                READY
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="OPERATOR NAME"
                id="name"
                required
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="e.g. Cmdr. Vance"
                testId="contact-input-name"
              />
              <Field
                label="RETURN ADDRESS"
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="ops@example.com"
                testId="contact-input-email"
              />
            </div>
            <div className="mt-5">
              <Field
                label="SUBJECT LINE"
                id="subject"
                value={form.subject}
                onChange={(v) => setForm({ ...form, subject: v })}
                placeholder="[INQUIRY] STM32 firmware collaboration"
                testId="contact-input-subject"
              />
            </div>
            <div className="mt-5">
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                MESSAGE PAYLOAD *
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={6}
                required
                placeholder="Describe the mission..."
                className="mt-1.5 block w-full resize-y border border-graphite-400 bg-graphite-800/80 px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-tactical-amber focus:outline-none focus:ring-1 focus:ring-tactical-amber/40"
                data-testid="contact-input-message"
              />
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                * transmission opens local mail client · payload signed
              </p>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 border border-signal bg-signal px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-graphite-900 transition-all hover:bg-signal/90"
                data-testid="contact-submit-button"
              >
                <Send className="h-4 w-4" />
                [ TRANSMIT ]
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, type = "text", required, value, onChange, placeholder, testId }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
      >
        {label} {required && "*"}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 block w-full border border-graphite-400 bg-graphite-800/80 px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-tactical-amber focus:outline-none focus:ring-1 focus:ring-tactical-amber/40"
        data-testid={testId}
      />
    </div>
  );
}
