import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { BlurText, Counter, Embers, Magnetic, Reveal, SplitText } from "./motion";
import { menu } from "@/data/menu";
import hero from "@/assets/hero.jpg";
import tikka from "@/assets/tikka.jpg";
import thali from "@/assets/thali.jpg";
import jamun from "@/assets/jamun.jpg";
import story from "@/assets/story.jpg";
import kajuMakhana from "@/assets/kaju-makhana.jpg";
import haraBhara from "@/assets/hara-bhara.jpg";
import tandoor from "@/assets/tandoor.jpg";
import spices from "@/assets/spices.jpg";
import naan from "@/assets/naan.jpg";
import desserts from "@/assets/desserts.jpg";
import interior1 from "@/assets/img5137.jpg.asset.json";
import interior2 from "@/assets/img5138.jpg.asset.json";
import exterior from "@/assets/img5141.jpg.asset.json";
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from "@/data/restaurant";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRight, Phone } from "lucide-react";

const MAP_Q = "ASHIRWAD Restaurant, 8 Navlakha Rd, Janki Nagar, Indore 452001";

const btn = "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all";
const btnPrimary = `${btn} bg-gradient-primary text-primary-foreground shadow-glow hover:brightness-110`;
const btnGhost = `${btn} border border-primary/60 text-foreground hover:bg-primary/10`;
const h2 = "font-display text-5xl font-semibold leading-[0.95] md:text-7xl";
const eyebrow = "mb-4 text-xs font-bold uppercase tracking-[0.35em] text-primary";

/* ---------- Preloader: palace doors ---------- */
export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 2200); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[100] flex" exit={{ pointerEvents: "none" }}>
          {[0, 1].map((i) => (
            <motion.div key={i} className="h-full w-1/2 bg-background border-primary/40"
              style={{ borderRightWidth: i === 0 ? 1 : 0 }}
              exit={{ x: i === 0 ? "-100%" : "100%" }} transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }} />
          ))}
          <motion.svg exit={{ opacity: 0, scale: 0.8 }} viewBox="0 0 100 100" className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 text-primary">
            <motion.path d="M50 8 L88 92 H12 Z M30 64 H70" fill="none" stroke="currentColor" strokeWidth="3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: "easeInOut" }} />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Theme toggle with ripple reveal ---------- */
function ThemeToggle() {
  const [day, setDay] = useState(false);
  useEffect(() => { const d = localStorage.getItem("theme") === "day"; setDay(d); document.documentElement.classList.toggle("day", d); }, []);
  const flip = (e: React.MouseEvent) => {
    const next = !day;
    const apply = () => { document.documentElement.classList.toggle("day", next); setDay(next); localStorage.setItem("theme", next ? "day" : "night"); };
    const d = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!d.startViewTransition) return apply();
    const r = Math.hypot(Math.max(e.clientX, innerWidth - e.clientX), Math.max(e.clientY, innerHeight - e.clientY));
    d.startViewTransition(apply).ready.then(() =>
      document.documentElement.animate({ clipPath: [`circle(0 at ${e.clientX}px ${e.clientY}px)`, `circle(${r}px at ${e.clientX}px ${e.clientY}px)`] },
        { duration: 700, easing: "cubic-bezier(.7,0,.3,1)", pseudoElement: "::view-transition-new(root)" }));
  };
  return (
    <button onClick={flip} aria-label="Toggle day / night" className="relative grid h-10 w-10 place-items-center rounded-full border border-primary/50 text-primary">
      <motion.span key={String(day)} initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} className="text-lg">{day ? "☀" : "☾"}</motion.span>
    </button>
  );
}

/* ---------- Navbar ---------- */
const links = ["About", "Specials", "Menu", "Gallery", "Reviews", "Contact"];
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setScrolled(scrollY > 40); addEventListener("scroll", f); return () => removeEventListener("scroll", f); }, []);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b py-3" : "py-6"}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5">
          <a href="#home" className="font-display text-2xl font-bold"><span className="text-gradient">ASHIRWAD</span></a>
          <div className="hidden gap-8 text-sm lg:flex">
            {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="text-muted-foreground transition hover:text-primary">{l}</a>)}
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="hidden md:block"><a href={`tel:${PHONE}`} className={`${btnPrimary} !py-2.5`}>Call Now</a></span>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="grid h-10 w-10 place-items-center lg:hidden">
              <span className={`block h-0.5 w-6 bg-foreground transition ${open ? "translate-y-[3px] rotate-45" : "-translate-y-1"}`} />
              <span className={`block h-0.5 w-6 bg-foreground transition ${open ? "-translate-y-[3px] -rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "circle(0% at 90% 4%)" }} animate={{ clipPath: "circle(150% at 90% 4%)" }} exit={{ clipPath: "circle(0% at 90% 4%)" }}
            transition={{ duration: 0.6 }} className="fixed inset-0 z-40 flex flex-col justify-center gap-4 bg-background px-8">
            {links.map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06 }} className="font-display text-5xl font-semibold hover:text-primary">{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Hero ---------- */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.4]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const px = useMotionValue(50), py = useMotionValue(50);
  const spot = useMotionTemplate`radial-gradient(500px circle at ${px}% ${py}%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)`;
  const mx = useSpring(useTransform(px, [0, 100], [-25, 25]), { stiffness: 80, damping: 20 });
  const my = useSpring(useTransform(py, [0, 100], [-25, 25]), { stiffness: 80, damping: 20 });
  return (
    <section id="home" ref={ref} onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); px.set(((e.clientX - r.left) / r.width) * 100); py.set(((e.clientY - r.top) / r.height) * 100); }} className="relative flex min-h-[100svh] items-end overflow-hidden pb-24">
      <motion.img src={hero} alt="Shahi paneer in a brass handi over glowing embers" width={1536} height={1024}
        style={{ scale, rotate }} className="animate-kenburns absolute inset-0 h-full w-full object-cover" />
      <div className="bg-overlay absolute inset-0" />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spot }} />
      <Embers />
      <motion.div aria-hidden initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ delay: 2, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 origin-top bg-background" />
      <div aria-hidden className="pointer-events-none absolute right-[6%] top-[18%] hidden h-[420px] w-[420px] lg:block">
        <motion.svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-primary" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
          <defs><path id="circ" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
          <text fontSize="11" letterSpacing="5" fill="currentColor"><textPath href="#circ">PURE VEG • ROYAL TASTE • SINCE INDORE • ASHIRWAD • </textPath></text>
        </motion.svg>
        {[{ img: tikka, c: "left-[30%] top-[30%] h-40 w-40", d: 2.6 }, { img: kajuMakhana, c: "left-0 top-[60%] h-28 w-28", d: 2.8 }, { img: jamun, c: "right-0 top-[8%] h-24 w-24", d: 3 }].map((o, i) => (
          <motion.img key={i} src={o.img} alt="" initial={{ scale: 0, rotate: -90, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: o.d, type: "spring", stiffness: 90, damping: 12 }}
            style={{ x: mx, y: my, animationDelay: `${i * 0.8}s` }}
            className={`animate-floaty absolute rounded-full border-2 border-primary object-cover shadow-glow ${o.c}`} />
        ))}
      </div>
      <motion.div style={{ y, opacity: op }} className="relative mx-auto w-full max-w-7xl px-5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} className="mb-6 flex flex-wrap gap-3 text-xs">
          <span className="glass flex items-center gap-2 rounded-full border px-4 py-2"><span className="h-2 w-2 animate-pulse rounded-full bg-success" />Open Now</span>
          <span className="glass rounded-full border px-4 py-2">★ 4.2 · 407 reviews</span>
        </motion.div>
        <h1 className="font-display text-[15vw] font-bold leading-[0.85] md:text-[9vw]" style={{ perspective: 600 }}>
          <SplitText text="ASHIRWAD" className="block drop-shadow-[0_0_40px_color-mix(in_oklab,var(--primary)_45%,transparent)]" delay={2.2} />
          <SplitText text="Restaurant" className="block" delay={2.5} />
        </h1>
        <Reveal delay={2.9}>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Pure Veg • North Indian • Indore<br /><em className="text-shine font-display text-2xl">“Swaad Jo Dil Ko Chhu Jaaye”</em></p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Magnetic><a href="#menu" className={btnPrimary}>Explore Menu →</a></Magnetic>
            <Magnetic><a href={`tel:${PHONE}`} className={btnGhost}>Call Now</a></Magnetic>
          </div>
        </Reveal>
      </motion.div>
      <div className="absolute bottom-6 left-1/2 hidden h-10 w-6 -translate-x-1/2 rounded-full border-2 border-muted-foreground md:block">
        <motion.span animate={{ y: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 1.6 }} className="mx-auto mt-1 block h-2 w-1 rounded-full bg-primary" />
      </div>
    </section>
  );
}

export function Marquee() {
  const names = "Paneer Tikka · Shahi Paneer · Kaju Curry · Hara Bhara Kabab · Gulab Jamun · Crispy Corn · Chola Batura · Dal Thali · ";
  return (
    <div className="overflow-hidden border-y py-6">
      <div className="animate-marquee flex w-max whitespace-nowrap font-display text-4xl italic md:text-6xl">
        <span className="pr-8">{names.repeat(2)}</span><span className="text-outline pr-8">{names.repeat(2)}</span>
      </div>
    </div>
  );
}

/* ---------- About (pinned) ---------- */
function Story3D() {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [16, -16]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), { stiffness: 150, damping: 18 });
  const gx = useTransform(x, [-0.5, 0.5], ["0%", "100%"]), gy = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, color-mix(in oklab, var(--foreground) 35%, transparent), transparent 55%)`;
  return (
    <div style={{ perspective: 1100 }} className="relative">
      <motion.div data-hover style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
        onPointerLeave={() => { x.set(0); y.set(0); }}
        className="relative aspect-[4/5] rounded-[2rem]">
        <div className="absolute inset-0 rounded-[2rem] border border-primary/50" style={{ transform: "translateZ(-60px) scale(1.06)" }} />
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-glow" style={{ transform: "translateZ(0)" }}>
          <img src={story} alt="Chef serving paneer curries and naan at ASHIRWAD" className="h-full w-full object-cover" />
          <motion.div className="absolute inset-0 mix-blend-overlay" style={{ background: glare }} />
        </div>
        <img src={interior2} alt="" aria-hidden className="absolute -left-10 bottom-10 h-32 w-44 rounded-2xl border-2 border-primary object-cover shadow-glow md:h-40 md:w-56" style={{ transform: "translateZ(90px)" }} />
        <div className="glass absolute -right-4 top-8 rounded-2xl border px-5 py-3 text-center" style={{ transform: "translateZ(120px)" }}>
          <div className="text-gradient font-display text-4xl font-bold">4.2★</div>
          <div className="text-xs text-muted-foreground">407 reviews</div>
        </div>
        <div className="glass absolute bottom-6 right-6 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest text-success" style={{ transform: "translateZ(70px)" }}>100% Pure Veg</div>
      </motion.div>
    </div>
  );
}
function ScrollLetters({ text, progress }: { text: string; progress: MotionValue<number> }) {
  return <>{text.split(" ").map((w, i, arr) => <ScrollWord key={i} w={w} progress={progress} range={[0.05 + (i / arr.length) * 0.6, 0.05 + ((i + 1) / arr.length) * 0.6]} />)}</>;
}
function ScrollWord({ w, progress, range }: { w: string; progress: MotionValue<number>; range: [number, number] }) {
  return (
    <span className="mr-[0.25em] inline-block whitespace-nowrap">
      {w.split("").map((c, j) => <ScrollChar key={j} c={c} progress={progress} range={[range[0] + ((range[1] - range[0]) * j) / w.length, range[0] + ((range[1] - range[0]) * (j + 1)) / w.length]} />)}
    </span>
  );
}
function ScrollChar({ c, progress, range }: { c: string; progress: MotionValue<number>; range: [number, number] }) {
  const o = useTransform(progress, range, [0.12, 1]);
  const yy = useTransform(progress, range, [18, 0]);
  const b = useTransform(progress, range, ["blur(6px)", "blur(0px)"]);
  const col = useTransform(progress, [range[0], range[1], range[1] + 0.06], ["var(--foreground)", "var(--primary)", "var(--foreground)"]);
  return <motion.span style={{ opacity: o, y: yy, filter: b, color: col }} className="inline-block">{c}</motion.span>;
}
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  return (
    <section id="about">
      <div ref={ref} className="relative h-[250vh]">
        <div className="sticky top-0 flex min-h-screen items-center">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2">
            <div>
              <p className={eyebrow}><SplitText text="Our Story" /></p>
              <h3 className="mb-6 font-display text-6xl font-bold italic md:text-8xl" style={{ perspective: 600 }}>
                <motion.span className="text-shine inline-block" initial={{ rotateX: -90, opacity: 0 }} whileInView={{ rotateX: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>Since day one</motion.span>
              </h3>
              <p className="font-display text-3xl leading-tight md:text-4xl">
                <ScrollLetters progress={scrollYProgress} text="On Navlakha Road, ASHIRWAD serves Indore royal North Indian vegetarian food — slow-cooked gravies, tandoor-kissed paneer and soft butter chapatis, in a dining hall of blue velvet, warm wood and green leaves." />
              </p>
            </div>
            <motion.div style={{ scale: imgScale, y: imgY }}><Story3D /></motion.div>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-20 md:grid-cols-4">
        {[[407, "+", "Reviews"], [100, "%", "Pure Veg"], [150, "+", "Dishes"], [4.2, "★", "Rating"]].map(([n, s, l], i) => (
          <Reveal key={l as string} delay={i * 0.1} className="rounded-3xl border bg-card p-6 text-center">
            <div className="text-gradient font-display text-5xl font-bold md:text-6xl"><Counter to={n as number} suffix={s as string} decimals={n === 4.2 ? 1 : 0} /></div>
            <div className="mt-2 text-sm text-muted-foreground">{l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Specials ---------- */
const specials = [
  { n: "Paneer Tikka Dry", p: "₹180", img: tikka },
  { n: "Shahi Paneer", p: "₹170", img: hero },
  { n: "Kaju Paneer Makhana", p: "₹220", img: kajuMakhana },
  { n: "Dal-Rice-Chapati Thali", p: "Ask at restaurant", img: thali },
  { n: "Hara Bhara Kabab", p: "₹140", img: haraBhara },
  { n: "Gulab Jamun", p: "₹45 · 2pcs", img: jamun },
];
function SpecialTilt({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  const gx = useTransform(x, [-0.5, 0.5], ["0%", "100%"]), gy = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, color-mix(in oklab, var(--primary) 30%, transparent), transparent 60%)`;
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} whileHover={{ y: -8 }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
      onPointerLeave={() => { x.set(0); y.set(0); }} className="group/t relative rounded-lg hover:shadow-glow">
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover/t:opacity-100" style={{ background: glare }} />
    </motion.div>
  );
}
export function Specials() {
  return (
    <section id="specials" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10">
          <p className={eyebrow}>Signature Specials</p>
          <h2 className={h2}><BlurText text="Plates worth" /> <span className="text-shine italic">a pilgrimage.</span></h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specials.map((s, idx) => (
            <Dialog key={s.n}>
              <motion.div initial={{ opacity: 0, y: 60, rotateX: -25 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: (idx % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }} style={{ perspective: 900 }}>
              <SpecialTilt>
              <DialogTrigger asChild>
                <Button variant="ghost" aria-label={`Open ${s.n}`} className="group h-auto w-full flex-col items-stretch gap-0 overflow-hidden whitespace-normal rounded-lg border bg-card p-0 text-left text-foreground transition hover:border-primary focus-visible:ring-primary">
                  <span className="block aspect-[4/3] w-full overflow-hidden">
                    <img src={s.img} alt={s.n} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
                  </span>
                  <span className="flex w-full items-start justify-between gap-3 p-5">
                    <span className="min-w-0">
                      <span className="mb-2 block text-xs font-bold uppercase text-success">Pure Veg</span>
                      <span className="block font-display text-3xl font-semibold leading-tight">{s.n}</span>
                      <span className="mt-2 block text-sm font-semibold text-primary">{s.p}</span>
                    </span>
                    <ArrowUpRight className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                  </span>
                </Button>
              </DialogTrigger>
              </SpecialTilt>
              </motion.div>
              <DialogContent data-lenis-prevent className="max-h-[85svh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg border-primary/40 p-5">
                <DialogTitle className="pr-8 font-display text-3xl leading-tight">{s.n}</DialogTitle>
                <DialogDescription>Signature Special · Pure Veg</DialogDescription>
                <img src={s.img} alt={s.n} className="aspect-[4/3] w-full rounded-lg object-cover" />
                <p className="text-lg font-semibold text-primary">{s.p}</p>
                <Button asChild><a href={`tel:${PHONE}`}><Phone aria-hidden="true" />{PHONE_DISPLAY}</a></Button>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Menu ---------- */
export function Menu() {
  const [cat, setCat] = useState(menu[0]?.id ?? "");
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    if (q.trim()) return menu.flatMap((c) => c.items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase())));
    return (menu.find((c) => c.id === cat)?.items ?? []);
  }, [cat, q]);
  return (
    <section id="menu" className="mx-auto max-w-7xl px-5 py-28">
      <Reveal>
        <p className={eyebrow}>The Menu</p>
        <h2 className={h2}><BlurText text="Every dish," /> <span className="text-shine italic">100% veg.</span></h2>
      </Reveal>
      <div className="glass sticky top-16 z-30 -mx-5 mt-10 border-b px-5 py-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes…"
          className="mb-4 w-full rounded-full border bg-card px-5 py-3 text-sm outline-none focus:border-primary md:w-80" />
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {menu.map((c) => (
            <button key={c.id} onClick={() => { setCat(c.id); setQ(""); }} className="relative shrink-0 rounded-full px-4 py-2 text-sm">
              {cat === c.id && !q && <motion.span layoutId="tab" className="bg-gradient-primary absolute inset-0 rounded-full" />}
              <span className={`relative ${cat === c.id && !q ? "text-primary-foreground font-semibold" : "text-muted-foreground"}`}>{c.title}</span>
            </button>
          ))}
        </div>
      </div>
      <motion.div layout className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((it, i) => (
            <motion.div key={it.name} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.02 } }} exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-glow">
              <div>
                <div className="flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded-sm border border-success"><span className="h-2 w-2 rounded-full bg-success" /></span><span className="font-semibold">{it.name}</span></div>
                {it.note && <span className="mt-2 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{it.note}</span>}
              </div>
              <span className="shrink-0 font-display text-2xl font-bold text-primary">{it.price}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {!items.length && <p className="mt-8 text-muted-foreground">No dishes found.</p>}
    </section>
  );
}

/* ---------- Thali exploded view ---------- */
const thaliItems = ["Sabzi", "Paneer Sabzi", "Raita", "Dal", "Rice", "4 Butter Chapati", "Sweet Dish", "Namkeen", "Papad", "Pickle", "Salad"];
function Orbit({ label, i, p }: { label: string; i: number; p: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const a = (i / thaliItems.length) * Math.PI * 2;
  const x = useTransform(p, [0.1, 0.6], [0, Math.cos(a) * 42]);
  const y = useTransform(p, [0.1, 0.6], [0, Math.sin(a) * 42]);
  const o = useTransform(p, [0.1, 0.4], [0, 1]);
  return (
    <motion.span style={{ left: useTransform(x, (v) => `calc(50% + ${v}%)`), top: useTransform(y, (v) => `calc(50% + ${v}%)`), opacity: o }}
      className="glass absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold md:text-sm">{label}</motion.span>
  );
}
export function Thali() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rot = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sc = useTransform(scrollYProgress, [0, 0.6], [1, 0.62]);
  return (
    <section ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <div className="mb-6 text-center">
          <p className={eyebrow}>Family Thali</p>
          <h2 className="font-display text-4xl font-semibold md:text-6xl">One plate. <span className="text-gradient italic">Eleven joys.</span></h2>
        </div>
        <div className="relative aspect-square w-[min(88vw,70vh)]">
          <motion.img src={thali} alt="Family thali" loading="lazy" style={{ rotate: rot, scale: sc }} className="absolute inset-0 h-full w-full rounded-full object-cover shadow-glow" />
          {thaliItems.map((t, i) => <Orbit key={t} label={t} i={i} p={scrollYProgress} />)}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">Lunch Pack: 1 Sez. Veg, Dal, Rice, 3 Chapati · Prices — ask at restaurant</p>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */
export function Gallery() {
  const photos = [
    { src: exterior.url, alt: "ASHIRWAD Restaurant storefront on Navlakha Road" },
    { src: interior1.url, alt: "Dining hall with blue sofas" },
    { src: thali, alt: "Thali" },
    { src: interior2.url, alt: "Dining hall with hanging plants" },
    { src: tikka, alt: "Paneer tikka" },
    { src: jamun, alt: "Gulab jamun" },
    { src: tandoor, alt: "Paneer tikka from the tandoor" },
    { src: desserts, alt: "Rasmalai, kheer and jalebi" },
    { src: spices, alt: "Fresh Indian spices" },
  ];
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-28">
      <Reveal><p className={eyebrow}>Ambience</p><h2 className={h2}><BlurText text="Step inside" /> <span className="text-shine italic">the palace.</span></h2></Reveal>
      <div className="mt-12 columns-2 gap-4 md:columns-3">
        {photos.map((p, i) => (
          <motion.button key={i} onClick={() => setOpen(p.src)} data-hover
            initial={{ clipPath: "inset(100% 0 0 0)" }} whileInView={{ clipPath: "inset(0% 0 0 0)" }} viewport={{ once: true }}
            transition={{ duration: 1, delay: (i % 3) * 0.12, ease: [0.76, 0, 0.24, 1] }}
            className="mb-4 block w-full overflow-hidden rounded-3xl">
            <motion.img layoutId={p.src} src={p.src} alt={p.alt} loading="lazy" className={`w-full object-cover transition duration-700 hover:scale-105 ${i % 2 ? "aspect-square" : "aspect-[3/4]"}`} />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}
            className="glass fixed inset-0 z-[80] grid place-items-center p-5">
            <motion.img layoutId={open} src={open} alt="" className="max-h-[85vh] max-w-full rounded-3xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Reviews ---------- */
const reviews = [
  ["Rahul S.", "Shahi paneer was rich and perfectly balanced. Great family place."],
  ["Priya M.", "Lovely blue interiors and quick service. Thali is value for money."],
  ["Ankit J.", "Paneer tikka straight from the tandoor — smoky and soft."],
  ["Neha K.", "Pure veg, clean and calm. Gulab jamun is a must."],
  ["Vikas T.", "Budget friendly with generous portions. Will come again."],
]; // Placeholder reviews — edit freely
export function Reviews() {
  return (
    <section id="reviews" className="overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-5 text-center">
        <Reveal>
          <p className={eyebrow}>Reviews</p>
          <div className="text-gradient font-display text-8xl font-bold md:text-9xl"><Counter to={4.2} decimals={1} /></div>
          <div className="mt-2 flex justify-center gap-1 text-3xl">
            {[0, 1, 2, 3, 4].map((i) => <motion.span key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.12, type: "spring" }} className={i < 4 ? "text-primary" : "text-muted-foreground"}>★</motion.span>)}
          </div>
          <p className="mt-2 text-muted-foreground">from 407 Google reviews</p>
        </Reveal>
      </div>
      <div className="mt-12 flex w-max gap-5 animate-marquee [animation-duration:50s]">
        {[...reviews, ...reviews].map(([n, t], i) => (
          <div key={i} className="glass w-80 shrink-0 rounded-3xl border p-6 text-left">
            <div className="text-primary">★★★★★</div><p className="mt-3">“{t}”</p><p className="mt-4 text-sm text-muted-foreground">— {n}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center"><a href={`https://www.google.com/maps/search/${encodeURIComponent(MAP_Q)}`} target="_blank" rel="noreferrer" className={btnGhost}>Review us on Google</a></div>
    </section>
  );
}

/* ---------- Why ---------- */
export function Why() {
  const items = [["🌿", "100% Pure Veg", "No egg, no meat — ever."], ["🔥", "Fresh Ingredients", "Cooked to order, every time."], ["👨‍👩‍👧", "Family Friendly", "Spacious, calm, comfortable."], ["₹", "Budget Friendly", "Feasts from ₹1–1,000."]];
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-28 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([i, t, d], k) => (
        <Reveal key={t} delay={k * 0.1}>
          <Tilt className="h-full rounded-3xl border bg-card p-8 transition hover:border-primary hover:shadow-glow">
            <motion.div whileHover={{ rotate: 12, scale: 1.2 }} className="animate-floaty bg-gradient-primary grid h-14 w-14 place-items-center rounded-2xl text-2xl text-primary-foreground">{i}</motion.div>
            <h3 className="mt-6 font-display text-3xl font-semibold"><BlurText text={t ?? ""} delay={k * 0.1} /></h3><p className="mt-2 text-muted-foreground">{d}</p>
          </Tilt>
        </Reveal>
      ))}
    </section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  const [sent, setSent] = useState(false);
  const cards = [
    ["Address", "8, Navlakha Rd, near Dena Bank Navlakha Branch, Janki Nagar, Indore, MP 452001"],
    ["Phone", PHONE_DISPLAY],
    ["Email", "sharmabhanu517@gmail.com"],
    ["Hours", "Open daily · 11 AM – 11 PM"],
  ];
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-28">
      <Reveal><p className={eyebrow}>Visit Us</p><h2 className={h2}><BlurText text="Your table" /> <span className="text-shine italic">awaits.</span></h2></Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {cards.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="rounded-3xl border bg-card p-6"><p className="text-xs font-bold uppercase tracking-widest text-primary">{t}</p><p className="mt-2">{d}</p></Reveal>
          ))}
          <div className="flex flex-wrap gap-3">
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_Q)}`} target="_blank" rel="noreferrer" className={btnPrimary}>Get Directions</a>
            <a href={`tel:${PHONE}`} className={btnGhost}>Call</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={btnGhost}>WhatsApp</a>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3 rounded-3xl border bg-card p-6">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-10 text-center">
                  <div className="bg-gradient-primary mx-auto grid h-16 w-16 place-items-center rounded-full text-2xl text-primary-foreground">✓</div>
                  <p className="mt-4 font-display text-2xl">Thank you! We'll call you soon.</p>
                </motion.div>
              ) : (
                <motion.div key="f" exit={{ opacity: 0 }} className="space-y-3">
                  {["Name", "Phone"].map((p) => <input key={p} required placeholder={p} className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary" />)}
                  <textarea placeholder="Message" rows={3} className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary" />
                  <button className={btnPrimary}>Send Message</button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
        <Reveal className="min-h-[420px] overflow-hidden rounded-3xl border">
          <iframe title="Map" loading="lazy" className="h-full min-h-[420px] w-full" src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_Q)}&z=16&output=embed`} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return (
    <footer ref={ref} className="border-t px-5 pb-28 pt-16 md:pb-10">
      <div className="relative mx-auto max-w-7xl select-none font-display text-[17vw] font-bold leading-none">
        <span className="text-outline">ASHIRWAD</span>
        <motion.span style={{ clipPath: fill }} className="text-gradient absolute inset-0">ASHIRWAD</motion.span>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-between gap-6 text-sm text-muted-foreground">
        <p>Pure Veg. Pure Royal. Pure ASHIRWAD.</p>
        <div className="flex gap-5">{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-primary">{l}</a>)}</div>
        <p>Made with ❤️ in Indore</p>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="glass fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full border p-2 md:hidden">
      <a href={`tel:${PHONE}`} className={`${btnPrimary} flex-1 justify-center !py-3`}>Call Now</a>
      <a href={WHATSAPP_URL} className={`${btnGhost} flex-1 justify-center !py-3`}>WhatsApp</a>
    </div>
  );
}

/* ---------- Journey: horizontal scroll through the kitchen ---------- */
const journey = [
  { img: spices, t: "Hand-picked Spices", d: "Saffron, cardamom and fresh-ground masalas every morning." },
  { img: tandoor, t: "Fire of the Tandoor", d: "Paneer tikka kissed by real clay-oven flames." },
  { img: naan, t: "Butter Naan & Dal", d: "Torn warm, dripping ghee, with slow-cooked dal makhani." },
  { img: desserts, t: "Royal Sweet Endings", d: "Rasmalai, kheer and jalebi to finish like royalty." },
];
function JourneyCard({ j, i }: { j: (typeof journey)[number]; i: number }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9, y: 80 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[60vh] overflow-hidden rounded-[2rem] shadow-glow">
      <img src={j.img} alt={j.t} loading="lazy" width={1280} height={1600}
        className="animate-kenburns absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
      <div className="bg-overlay absolute inset-0" />
      <div className="absolute bottom-0 p-8">
        <span className="font-display text-6xl text-outline">0{i + 1}</span>
        <h3 className="mt-2 font-display text-4xl font-semibold"><BlurText text={j.t} /></h3>
        <p className="mt-2 max-w-xs text-muted-foreground">{j.d}</p>
      </div>
    </motion.div>
  );
}
export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], [120, -160]);
  const down = useTransform(scrollYProgress, [0, 1], [-160, 120]);
  return (
    <section ref={ref} className="relative overflow-hidden py-28">
      <div className="mx-auto mb-14 w-full max-w-7xl px-5">
        <p className={eyebrow}>From Our Kitchen</p>
        <h2 className={h2}><BlurText text="A journey of" /> <span className="text-shine italic">flavour.</span></h2>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
        <motion.div style={{ y: up }} className="flex flex-col gap-6">
          {[0, 2].map((k) => <JourneyCard key={k} j={journey[k]!} i={k} />)}
        </motion.div>
        <motion.div style={{ y: down }} className="flex flex-col gap-6 md:pt-32">
          {[1, 3].map((k) => <JourneyCard key={k} j={journey[k]!} i={k} />)}
        </motion.div>
      </div>
    </section>
  );
}
