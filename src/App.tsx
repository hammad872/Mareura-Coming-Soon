import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
/* ── CONFIG ─────────────────────────────────────────────── */
// Change this to your real launch date.
const LAUNCH_DATE = new Date('2026-08-T00:00:00Z');
const COMMANDS = [
  'Add 20 units to every blue shirt',
  'Write SEO for all new arrivals',
  'Build a summer collection',
  'Drop clearance prices by 15%',
];

/* ── motion ─────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.6, 0.2, 1] } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ── Logo ───────────────────────────────────────────────── */
function Logo() {
  return (
    <img src="/logo.png" alt="Mareura" className="h-14 w-14 object-contain" />
  );
}

/* ── countdown hook ─────────────────────────────────────── */
function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    mins: Math.floor((diff / 60000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

/* ── typed-command hook ─────────────────────────────────── */
function useTypedCommand(commands: string[], enabled: boolean) {
  const [text, setText] = useState(enabled ? '' : commands[0]);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      let ci = 0;
      while (!cancelled) {
        const t = commands[ci];
        for (let i = 0; i <= t.length && !cancelled; i++) { setText(t.slice(0, i)); await sleep(45); }
        await sleep(1600);
        for (let i = t.length; i >= 0 && !cancelled; i--) { setText(t.slice(0, i)); await sleep(22); }
        await sleep(300);
        ci = (ci + 1) % commands.length;
      }
    })();
    return () => { cancelled = true; };
  }, [commands, enabled]);
  return text;
}

/* ── particles ──────────────────────────────────────────── */
function Particles() {
  const colors = ['#2563EB', '#06B6D4', '#22C55E'];
  const dots = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({
      left: Math.random() * 100,
      bg: colors[i % 3],
      dur: 12 + Math.random() * 16,
      delay: Math.random() * 12,
      op: 0.25 + Math.random() * 0.4,
    })),
    []
  );
  return (
    <>
      {dots.map((d, i) => (
        <span key={i} className="dot" style={{ left: `${d.left}vw`, bottom: -10, background: d.bg, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s`, opacity: d.op }} />
      ))}
    </>
  );
}

/* ── countdown unit ─────────────────────────────────────── */
function Unit({ value, label, grad = false }: { value: number; label: string; grad?: boolean }) {
  return (
    <div className="cd ring-grad rounded-2xl bg-navy/50 px-4 py-3 sm:px-6 sm:py-4">
      <div className={`font-display text-3xl font-bold sm:text-4xl ${grad ? 'text-grad' : ''}`}>{String(value).padStart(2, '0')}</div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-mist/45">{label}</div>
    </div>
  );
}

/* ── App ────────────────────────────────────────────────── */
export default function App() {
  const reduce = useReducedMotion();
  const { days, hours, mins, secs } = useCountdown(LAUNCH_DATE);
  const typed = useTypedCommand(COMMANDS, !reduce);

  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) return;
    // TODO: POST `email` to your backend / Mailchimp / Resend here.
    setDone(true);
  }

  return (
    <>
      <div className="aurora" style={{ top: '-8rem', left: '8%', width: '26rem', height: '26rem', background: '#2563EB' }} />
      <div className="aurora" style={{ bottom: '-10rem', right: '6%', width: '30rem', height: '30rem', background: '#22C55E', animationDelay: '5s' }} />
      <div className="aurora" style={{ top: '30%', left: '55%', width: '22rem', height: '22rem', background: '#06B6D4', animationDelay: '9s' }} />
      <div className="grid-bg" />
      {!reduce && <Particles />}

      <motion.main
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center font-sans"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-2xl font-bold tracking-tight">Mareura</span>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-mist/80">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
          </span>
          Launching soon
        </motion.div>

        <motion.h1 variants={fadeUp} className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          The AI command center<br />for Shopify is <span className="text-grad">almost here.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg text-mist/65">
          Tell your store what to do in plain English. Mareura proposes a plan, you approve, and it&rsquo;s done. We&rsquo;re putting on the finishing touches.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-2.5">
          <span className="font-mono text-teal">$</span>
          <span className="cursor font-mono text-sm text-mist/85">{typed}</span>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 flex items-center gap-3 sm:gap-5">
          <Unit value={days} label="Days" />
          <Unit value={hours} label="Hours" />
          <Unit value={mins} label="Mins" />
          <Unit value={secs} label="Secs" grad />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 w-full max-w-md">
          {done ? (
            <p className="text-sm text-green">✦ You&rsquo;re on the list. We&rsquo;ll email you the moment Mareura opens.</p>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourstore.com"
                className="flex-1 rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-mist outline-none placeholder:text-mist/40 focus:border-teal/60"
              />
              <button type="submit" className="bg-grad rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue/25 transition hover:brightness-110">
                Notify me
              </button>
            </form>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-mist/50">
          <span>💬 Plain English</span>
          <span>🛡️ Approve before it runs</span>
          <span>⚡ Fast execution</span>
          <span>🛍️ Built for Shopify</span>
        </motion.div>
      </motion.main>

      <footer className="relative z-10 pb-8 text-center">
        <div className="flex items-center justify-center gap-5 text-mist/40">
          <a href="https://www.linkedin.com/company/135234232" className="text-sm hover:text-mist">LinkedIn</a>
          <a href="mailto:hammadsiddiq98@gmail.com" className="text-sm hover:text-mist">hammadsiddiq98@gmail.com</a>
        </div>
        <p className="mt-4 text-xs text-mist/25">© 2026 Mareura. Not affiliated with or endorsed by Shopify Inc.</p>
      </footer>
    </>
  );
}
