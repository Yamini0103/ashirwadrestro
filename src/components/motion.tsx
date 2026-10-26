import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09 });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        lenis.scrollTo((a as HTMLAnchorElement).getAttribute("href")!, { offset: -70 });
      }),
    );
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "110%", opacity: 0, rotateX: -80 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.8, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

function Word({ w, progress, range }: { w: string; progress: MotionValue<number>; range: [number, number] }) {
  const o = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity: o }} className="mr-[0.25em] inline-block">{w}</motion.span>;
}
export function ScrollWords({ text, progress }: { text: string; progress: MotionValue<number> }) {
  const words = text.split(" ");
  return <>{words.map((w, i) => <Word key={i} w={w} progress={progress} range={[i / words.length, (i + 1) / words.length]} />)}</>;
}

export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.03 }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 15 }), y = useSpring(0, { stiffness: 250, damping: 15 });
  return (
    <motion.div ref={ref} style={{ x, y }} className="inline-block"
      onPointerMove={(e) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min((t - t0) / 1600, 1); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

export function Embers({ count = 26 }: { count?: number }) {
  const [items, setItems] = useState<{ l: number; d: number; s: number; dl: number }[]>([]);
  useEffect(() => setItems(Array.from({ length: count }, () => ({ l: Math.random() * 100, d: 8 + Math.random() * 10, s: 2 + Math.random() * 4, dl: Math.random() * 10 }))), [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((e, i) => (
        <span key={i} className="animate-ember absolute bottom-0 rounded-full bg-primary-glow shadow-glow"
          style={{ left: `${e.l}%`, width: e.s, height: e.s, animationDuration: `${e.d}s`, animationDelay: `${e.dl}s` }} />
      ))}
    </div>
  );
}

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const s = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div style={{ scaleX: s }} className="bg-gradient-primary fixed inset-x-0 top-0 z-[60] h-[3px] origin-left" />;
}

export function Cursor() {
  const x = useSpring(-100, { stiffness: 500, damping: 35 }), y = useSpring(-100, { stiffness: 500, damping: 35 });
  const [big, setBig] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    const m = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); setBig(!!(e.target as HTMLElement).closest("a,button,[data-hover]")); };
    window.addEventListener("pointermove", m);
    return () => window.removeEventListener("pointermove", m);
  }, [x, y]);
  if (!on) return null;
  return (
    <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[70]">
      <motion.div animate={{ scale: big ? 2.4 : 1 }} className="-ml-4 -mt-4 h-8 w-8 rounded-full border border-primary shadow-glow" />
      <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-primary" />
    </motion.div>
  );
}
