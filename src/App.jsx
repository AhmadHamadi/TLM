import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import {
  Menu, X, ArrowRight, ArrowUpRight, Phone, Mail, MapPin, Star, ChevronDown,
  CheckCircle2, XCircle, Search, Globe, Zap, Target, BarChart3, Layout,
  Sparkles, TrendingUp, Eye, ClipboardList, Rocket, Activity, RefreshCw,
  ShieldCheck, Award, Users, MousePointerClick, FileText, DollarSign,
  Clock, ThumbsUp, MessageSquare, Calendar
} from 'lucide-react';

/* ============================================================
   TRADE LEADS MARKETING — REDESIGN
   Trust-first · White + Navy · Authentic Google-styled mockups
   ============================================================ */

/* ---------- Animation primitives ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };

/* ---------- Animated counter ---------- */
function Counter({ from = 0, to = 100, suffix = '', prefix = '', duration = 1.6, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals).toLocaleString ? Number(v.toFixed(decimals)).toLocaleString() : v.toFixed(decimals)}${suffix}`);
  useEffect(() => { if (inView) animate(mv, to, { duration, ease: 'easeOut' }); }, [inView, mv, to, duration]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/* ---------- Inline SVGs: brand glyphs ---------- */
const GoogleG = ({ className = 'h-5 w-5' }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);

const GoogleAdsBadge = ({ className = 'h-6 w-6' }) => (
  <svg className={className} viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FBBC04" d="M62 24l60 104-30 52L32 76z"/>
    <path fill="#4285F4" d="M122 24l60 104-30 52L92 76z"/>
    <circle cx="46" cy="151" r="29" fill="#34A853"/>
  </svg>
);

const GoogleMyBusiness = ({ className = 'h-6 w-6' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z"/>
    <circle cx="12" cy="10" r="3" fill="#fff"/>
  </svg>
);

/* ---------- Realistic Google Maps-styled SVG (Austin, TX vibe) ---------- */
const StreetMap = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    {/* Land base */}
    <rect width="600" height="240" fill="#E9EEF3" />
    {/* Parks (green) */}
    <path d="M 0 30 Q 60 20 110 50 L 130 90 Q 90 110 30 100 Z" fill="#C5E1B5" />
    <path d="M 420 0 Q 480 15 540 0 L 540 70 Q 470 80 420 60 Z" fill="#C5E1B5" />
    <circle cx="350" cy="180" r="32" fill="#C5E1B5" />
    {/* Water (lake / river — Lady Bird Lake style) */}
    <path d="M 0 145 C 80 130, 160 165, 250 150 C 340 135, 420 175, 540 155 L 600 165 L 600 200 C 480 215, 360 195, 250 205 C 140 215, 60 195, 0 200 Z" fill="#A9C9E8" />
    {/* Major roads (yellow highways) */}
    <path d="M -10 60 L 620 90" stroke="#FBC85F" strokeWidth="6" />
    <path d="M -10 60 L 620 90" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 6" />
    <path d="M 200 -10 L 240 250" stroke="#FBC85F" strokeWidth="5" />
    <path d="M 200 -10 L 240 250" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 6" />
    {/* Secondary streets (white) */}
    <g stroke="#FFFFFF" strokeWidth="3">
      <path d="M 0 35 L 600 25" />
      <path d="M 0 110 L 600 120" />
      <path d="M 0 200 L 600 220" />
      <path d="M 80 0 L 90 240" />
      <path d="M 320 0 L 340 240" />
      <path d="M 450 0 L 470 240" />
      <path d="M 530 0 L 540 240" />
    </g>
    {/* Tertiary streets (light) */}
    <g stroke="#F4F4F4" strokeWidth="1.4">
      <path d="M 0 75 L 600 65" />
      <path d="M 0 130 L 600 138" />
      <path d="M 0 175 L 600 180" />
      <path d="M 0 215 L 600 230" />
      <path d="M 40 0 L 48 240" />
      <path d="M 140 0 L 150 240" />
      <path d="M 270 0 L 282 240" />
      <path d="M 380 0 L 392 240" />
      <path d="M 500 0 L 510 240" />
    </g>
    {/* Building blocks */}
    <g fill="#DCE3EA">
      <rect x="100" y="40" width="20" height="14" rx="1" />
      <rect x="160" y="35" width="22" height="18" rx="1" />
      <rect x="250" y="42" width="14" height="14" rx="1" />
      <rect x="290" y="45" width="20" height="12" rx="1" />
      <rect x="380" y="38" width="22" height="16" rx="1" />
      <rect x="100" y="80" width="18" height="22" rx="1" />
      <rect x="160" y="78" width="22" height="24" rx="1" />
      <rect x="280" y="75" width="20" height="22" rx="1" />
      <rect x="380" y="80" width="20" height="20" rx="1" />
      <rect x="500" y="80" width="18" height="20" rx="1" />
      <rect x="50" y="118" width="24" height="14" rx="1" />
      <rect x="100" y="115" width="22" height="18" rx="1" />
      <rect x="280" y="120" width="20" height="14" rx="1" />
      <rect x="380" y="120" width="24" height="14" rx="1" />
      <rect x="500" y="118" width="20" height="14" rx="1" />
    </g>
  </svg>
);

/* ---------- Section wrappers ---------- */
function Section({ id, children, className = '', dark = false }) {
  return (
    <section id={id} className={`relative py-20 md:py-28 px-6 md:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

/* ============================================================
   1. NAVBAR — clean light nav with subtle backdrop
   ============================================================ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#results',      label: 'Results' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#process',      label: 'Process' },
    { href: '#packages',     label: 'Packages' },
    { href: '#faq',          label: 'FAQ' }
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-lg border-b border-line shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between py-3.5">
        <a href="#top" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white border border-line flex items-center justify-center shadow-soft p-1">
            <img src="/tlmlogo.png" alt="Trade Leads Marketing" className="h-full w-full object-contain" />
          </div>
          <div className="leading-tight">
            <div className={`font-extrabold tracking-tight ${scrolled ? 'text-ink' : 'text-ink'}`}>Trade Leads</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-brand font-bold -mt-0.5">Marketing</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate1 hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+12894891167" className="text-sm font-semibold text-ink hover:text-blue inline-flex items-center gap-1.5">
            <Phone className="h-4 w-4" /> (289) 489-1167
          </a>
          <a href="#audit" className="btn-primary text-sm py-2.5">
            Get More Leads <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden p-2 rounded-lg border border-line text-ink bg-white"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-line"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-ink py-2 border-b border-line">
                  {l.label}
                </a>
              ))}
              <a href="#audit" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
                Get More Leads <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ============================================================
   2. HERO — split layout with realistic Google search mockup
   ============================================================ */
function HeroSearchMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative"
    >
      {/* Soft glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-blue/15 via-brand/10 to-transparent blur-3xl rounded-[2rem]" />

      {/* Hero image (real Google search screenshot) */}
      <div className="relative rounded-2xl overflow-hidden border border-line shadow-lifted bg-white">
        <picture>
          <source srcSet="/heroimage.webp" type="image/webp" />
          <img
            src="/heroimage.png"
            alt="Google search showing Seven Stones Landscape ranked #1 for landscaping contractor near me"
            className="block w-full h-auto"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* Client attribution badge */}
        <motion.a
          href="https://sevenstoneslandscape.ca"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full pl-2 pr-3 py-1.5 shadow-soft border border-line hover:border-blue/40 transition-colors"
        >
          <span className="text-[10px] font-bold text-blue uppercase tracking-wider bg-bluesoft px-1.5 py-0.5 rounded">Client</span>
          <span className="text-[11px] font-semibold text-ink">Seven Stones Landscape</span>
        </motion.a>
      </div>

      {/* Floating callout: what we track */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
        className="hidden md:flex absolute -left-6 top-32 bg-white rounded-xl border border-line shadow-lifted px-4 py-3 items-center gap-3 animate-floaty z-10"
      >
        <div className="h-10 w-10 rounded-full bg-gGreen/10 flex items-center justify-center">
          <Phone className="h-5 w-5 text-gGreen" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-slate2 font-bold">We track</div>
          <div className="text-sm font-semibold text-ink">Phone calls from ads</div>
        </div>
      </motion.div>

      {/* Floating: lead form tracking */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        style={{ animationDelay: '1s' }}
        className="hidden md:flex absolute -right-4 -bottom-6 bg-white rounded-xl border border-line shadow-lifted px-4 py-3 items-center gap-3 animate-floaty z-10"
      >
        <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
          <FileText className="h-5 w-5 text-brand" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-slate2 font-bold">We track</div>
          <div className="text-sm font-semibold text-ink">Quote &amp; estimate requests</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-20 px-6 md:px-10 overflow-hidden bg-white">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -top-40 left-1/3 h-[500px] w-[700px] rounded-full bg-blue/10 blur-[120px]" />
      <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-brand/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div initial="hidden" animate="show" variants={stagger} className="lg:col-span-6">
            <motion.div variants={fadeUp} className="eyebrow-light">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              Built specifically for contractors
            </motion.div>

            <motion.h1 variants={fadeUp} className="h-display text-5xl md:text-7xl text-ink mt-5">
              More Contractor Leads.<br />
              <span className="text-blue">Better Jobs.</span><br />
              Less Wasted Ad Spend.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-lg text-slate1 max-w-xl leading-relaxed">
              We build high-converting websites, run Google Ads campaigns, and dominate local SEO so
              contractors book more profitable jobs, not just rack up clicks.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a href="#audit" className="btn-primary animate-pulseGlow">
                Get a Free Marketing Audit <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#packages" className="btn-ghost-light">
                View Our Packages
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div variants={fadeUp} className="mt-10 pt-8 border-t border-line">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-sm text-slate1">
                  <ShieldCheck className="h-4 w-4 text-gGreen" />
                  <span className="font-medium">Tracking included from day one</span>
                </div>
                <div className="h-4 w-px bg-line" />
                <div className="flex items-center gap-2 text-sm text-slate1">
                  <CheckCircle2 className="h-4 w-4 text-gGreen" />
                  <span className="font-medium">Month-to-month, no long contracts</span>
                </div>
                <div className="h-4 w-px bg-line" />
                <div className="flex items-center gap-2 text-sm text-slate1">
                  <Users className="h-4 w-4 text-blue" />
                  <span className="font-medium">Contractors only</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6">
            <HeroSearchMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. TRUST STRIP — industries served
   ============================================================ */
function TrustStrip() {
  const industries = ['Concrete', 'Roofing', 'Landscaping', 'Plumbing', 'HVAC', 'Electrical', 'Renovation', 'Paving', 'Builders', 'Excavation', 'Painting', 'Decking'];
  return (
    <section className="bg-soft border-y border-line py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-xs uppercase tracking-[0.3em] text-slate2 text-center font-bold mb-6">
          Trusted by contractors across North America
        </div>
        <div className="overflow-hidden relative">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...industries, ...industries].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-slate1 font-bold text-lg">
                <div className="h-2 w-2 rounded-full bg-brand" />
                {t}
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-soft to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-soft to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. BEFORE / AFTER — WEBSITE (interactive slider)
   ============================================================ */
function WebsiteBeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    let frame;
    const start = performance.now();
    const tick = (t) => {
      const elapsed = (t - start) / 1000;
      // Auto-sweep once: 50 → 15 → 85 → 50
      const wave = Math.sin(elapsed * 0.9) * 35 + 50;
      setPos(wave);
      if (elapsed < 5) frame = requestAnimationFrame(tick);
      else setPos(50);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <div ref={ref} className="relative rounded-2xl overflow-hidden border border-line shadow-lifted bg-white">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-soft border-b border-line">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <div className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 mx-3 px-3 py-1 bg-white rounded-md border border-line text-[11px] text-slate2 font-mono">
          sevenstoneslandscape.ca
        </div>
      </div>

      <div
        role="img"
        aria-label="Before and after comparison of contractor website. Drag horizontally to compare."
        className="relative aspect-[16/10] cursor-ew-resize select-none bg-white"
        style={{ touchAction: 'pan-y' }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos(((e.clientX - rect.left) / rect.width) * 100);
        }}
        onTouchMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const t = e.touches[0];
          setPos(Math.max(0, Math.min(100, ((t.clientX - rect.left) / rect.width) * 100)));
        }}
      >
        {/* AFTER (full layer underneath) */}
        <picture>
          <source srcSet="/slider2.webp" type="image/webp" />
          <img
            src="/slider2.png"
            alt="Modern, high-converting contractor website (after)"
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
          />
        </picture>

        {/* BEFORE (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <picture>
            <source srcSet="/slider1.webp" type="image/webp" />
            <img
              src="/slider1.png"
              alt="Outdated contractor website (before)"
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
            />
          </picture>
        </div>

        {/* Slider handle */}
        <div className="absolute top-0 bottom-0 w-1 bg-brand pointer-events-none" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-brand shadow-glow flex items-center justify-center text-white">
            <ArrowRight className="h-4 w-4 -ml-2" />
            <ArrowRight className="h-4 w-4 -mr-2 rotate-180" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 text-[10px] font-extrabold tracking-widest text-white bg-gRed/90 px-2 py-1 rounded shadow-soft">BEFORE</div>
        <div className="absolute top-3 right-3 text-[10px] font-extrabold tracking-widest text-white bg-blue px-2 py-1 rounded shadow-soft">AFTER</div>
      </div>
    </div>
  );
}

/* ============================================================
   5. BEFORE / AFTER — GOOGLE BUSINESS PROFILE
   ============================================================ */
function GBPBeforeAfter() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      {/* BEFORE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl border border-line shadow-soft overflow-hidden"
      >
        <div className="px-5 py-3 border-b border-line flex items-center justify-between bg-soft">
          <div className="flex items-center gap-2">
            <GoogleMyBusiness className="h-4 w-4" />
            <span className="text-xs font-bold text-slate1 uppercase tracking-widest">Before</span>
          </div>
          <span className="text-[10px] font-bold uppercase text-gRed bg-gRed/10 px-2 py-0.5 rounded">Page 2 · Low Visibility</span>
        </div>
        <div className="relative bg-soft">
          <picture>
            <source srcSet="/gbpbefore.webp" type="image/webp" />
            <img
              src="/gbpbefore.png"
              alt="Google search before: Seven Stones Landscape with low visibility, no photos, only 9 reviews"
              className="block w-full h-auto"
              loading="lazy"
            />
          </picture>
        </div>
        <div className="p-5">
          <ul className="space-y-2 text-sm text-slate1">
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-gRed shrink-0" /> No photos uploaded</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-gRed shrink-0" /> Hours &amp; service area missing</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-gRed shrink-0" /> 9 reviews · 3.4 rating</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-gRed shrink-0" /> Buried below the local map pack</li>
          </ul>
        </div>
      </motion.div>

      {/* AFTER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="bg-white rounded-2xl border-2 border-blue/30 shadow-lifted overflow-hidden relative"
      >
        <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-blue via-brand to-blue z-10" />
        <div className="px-5 py-3 border-b border-line flex items-center justify-between bg-bluesoft">
          <div className="flex items-center gap-2">
            <GoogleMyBusiness className="h-4 w-4" />
            <span className="text-xs font-bold text-blue uppercase tracking-widest">After</span>
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-[10px] font-bold uppercase text-gGreen bg-gGreen/10 px-2 py-0.5 rounded"
          >
            Map Pack · #1
          </motion.span>
        </div>
        <div className="relative bg-soft">
          <picture>
            <source srcSet="/gbpafter.webp" type="image/webp" />
            <img
              src="/gbpafter.png"
              alt="Google search after: Seven Stones Landscape ranked Map Pack #1 with 247 reviews and 80+ photos"
              className="block w-full h-auto"
              loading="lazy"
            />
          </picture>
        </div>
        <div className="p-5">
          <ul className="space-y-2 text-sm text-slate1">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gGreen shrink-0" /> 80+ professional photos uploaded</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gGreen shrink-0" /> Live hours, services &amp; offers</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gGreen shrink-0" /> 247 reviews · 5.0 rating</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gGreen shrink-0" /> Ranks #1 in the local map pack</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   6. BEFORE / AFTER — GOOGLE ADS
   ============================================================ */
function AdsBeforeAfter() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl border border-line shadow-soft overflow-hidden"
      >
        <picture>
          <source srcSet="/googlebefore.webp" type="image/webp" />
          <img
            src="/googlebefore.png"
            alt="Google Ads before: stuck at position 4, $92 per lead, 1.1% click-through rate"
            className="block w-full h-auto"
            loading="lazy"
          />
        </picture>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="bg-white rounded-2xl border-2 border-brand/30 shadow-lifted overflow-hidden relative"
      >
        <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-brand via-blue to-brand z-10" />
        <picture>
          <source srcSet="/googleafter.webp" type="image/webp" />
          <img
            src="/googleafter.png"
            alt="Google Ads after: top of page at position 1, $26 per lead, 7.8% click-through rate"
            className="block w-full h-auto"
            loading="lazy"
          />
        </picture>
      </motion.div>
    </div>
  );
}

/* ============================================================
   RESULTS WRAPPER — three before/after sections
   ============================================================ */
function Results() {
  return (
    <Section id="results" className="bg-navy text-white">
      <div className="absolute inset-0 grid-bg-dark opacity-40" />
      <div className="relative">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span variants={fadeUp} className="eyebrow-dark">Real Transformations</motion.span>
          <motion.h2 variants={fadeUp} className="h-display text-4xl md:text-6xl mt-4">
            Before &amp; After:<br />
            <span className="text-brand">What Better Marketing Should Look Like</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-white/70 text-lg">
            Three things every contractor needs working together: your website, your Google Business Profile, and your Google Ads.
          </motion.p>
        </motion.div>

        {/* 1. Website */}
        <div className="mb-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-8 max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-lg bg-blue/20 border border-blue/30 flex items-center justify-center">
                <Globe className="h-4 w-4 text-blue" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue">01 · Website</span>
            </motion.div>
            <motion.h3 variants={fadeUp} className="h-display text-2xl md:text-3xl">
              From a 2008-era site no one trusts → a high-converting contractor landing page
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-2 text-white/65">Drag the slider to compare. Auto-plays on first view.</motion.p>
          </motion.div>
          <WebsiteBeforeAfter />
        </div>

        {/* 2. GBP */}
        <div className="mb-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-8 max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-lg bg-gGreen/20 border border-gGreen/30 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-gGreen" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gGreen">02 · Google Business Profile</span>
            </motion.div>
            <motion.h3 variants={fadeUp} className="h-display text-2xl md:text-3xl">
              From buried on page 2 → owning the local map pack
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-2 text-white/65">More photos, more reviews, optimized categories. All the things competitors ignore.</motion.p>
          </motion.div>
          <GBPBeforeAfter />
        </div>

        {/* 3. Google Ads */}
        <div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-8 max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-lg bg-brand/20 border border-brand/30 flex items-center justify-center">
                <Target className="h-4 w-4 text-brand" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand">03 · Google Ads</span>
            </motion.div>
            <motion.h3 variants={fadeUp} className="h-display text-2xl md:text-3xl">
              From wasted spend at position 4 → top-of-page with a fraction of the cost
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-2 text-white/65">Better quality score, better ad copy, better targeting, built around homeowners who buy.</motion.p>
          </motion.div>
          <AdsBeforeAfter />
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="text-center text-[10px] uppercase tracking-[0.3em] text-white/45 font-bold mb-4">
            Sample improvements from a real contractor campaign
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: 312, s: '%',     l: 'Lead growth (case study)',  c: 'text-brand' },
              { v: 47,  s: '%',     l: 'Cost-per-lead reduction',   c: 'text-blue'  },
              { v: 4.8, s: 'x',     l: 'Site conversion improvement', c: 'text-brand', d: 1 },
              { v: 90,  s: ' days', l: 'Typical timeline to traction', c: 'text-blue' }
            ].map((stat) => (
              <div key={stat.l} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur">
                <div className={`text-3xl md:text-4xl font-black ${stat.c}`}>
                  <Counter to={stat.v} suffix={stat.s} decimals={stat.d || 0} />
                </div>
                <div className="text-xs uppercase tracking-wider text-white/55 mt-1">{stat.l}</div>
              </div>
            ))}
          </div>
          <div className="text-center text-[11px] text-white/45 mt-4 max-w-2xl mx-auto">
            Results vary by market, budget, seasonality, and competition. Numbers shown reflect specific past contractor campaigns and should not be interpreted as a guarantee of future results. Speak with us directly to discuss what is realistic for your business.
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ============================================================
   7. TESTIMONIALS — Google review-styled
   ============================================================ */
function Testimonials() {
  const items = [
    {
      quote: 'Trade Leads Marketing rebuilt our landing page, cleaned up our Google Business Profile, and our quote requests jumped within weeks. We can finally see exactly which jobs came from which campaign.',
      name:  'John Scime',
      role:  'Owner, Seven Stones Landscape',
      where: 'sevenstoneslandscape.ca',
      site:  'https://sevenstoneslandscape.ca',
      initials: 'JS',
      bg:    'bg-blue'
    },
    {
      quote: 'These guys actually understand contractors. Our Google Ads were bleeding money before. Now we are booking high-ticket HVAC jobs at a fraction of the cost per lead. Straight shooters.',
      name:  'Saif Sabeeh',
      role:  'Owner, Ikad Mechanical HVAC',
      where: 'ikad.ca',
      site:  'https://ikad.ca/',
      initials: 'SS',
      bg:    'bg-brand'
    },
    {
      quote: 'I was getting reports from my old agency that meant nothing. Trade Leads Marketing showed me the booked jobs and the revenue, not just clicks. The phone is ringing for the right kind of work now.',
      name:  'Danny',
      role:  'General Contractor',
      where: 'Renovations & Custom Builds',
      initials: 'D',
      bg:    'bg-gGreen'
    }
  ];

  return (
    <Section id="testimonials" className="bg-soft">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
        <motion.span variants={fadeUp} className="eyebrow-light">Contractor-Approved</motion.span>
        <motion.h2 variants={fadeUp} className="h-display text-4xl md:text-5xl text-ink mt-4">
          What Contractors Say
        </motion.h2>
        <motion.div variants={fadeUp} className="text-slate1 mt-3 max-w-2xl mx-auto">
          Real contractors. Real campaigns. Reach out to any of them directly if you want to verify.
        </motion.div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="bg-white rounded-2xl border border-line shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-300 p-7 relative"
          >
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-gReview text-gReview" />)}
            </div>
            <p className="text-ink leading-relaxed">"{t.quote}"</p>
            <div className="mt-6 pt-6 border-t border-line flex items-center gap-3">
              <div className={`h-12 w-12 rounded-full ${t.bg} flex items-center justify-center text-white font-extrabold shadow-soft`}>
                {t.initials}
              </div>
              <div>
                <div className="font-bold text-ink">{t.name}</div>
                <div className="text-xs text-slate2">{t.role}</div>
                {t.site ? (
                  <a href={t.site} target="_blank" rel="noreferrer" className="text-xs text-blue hover:underline flex items-center gap-1 mt-0.5 font-medium">
                    <Globe className="h-3 w-3" /> {t.where}
                  </a>
                ) : (
                  <div className="text-xs text-slate3 flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {t.where}</div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   WHY US — split, white background
   ============================================================ */
function WhyUs() {
  const points = [
    { icon: Users,         t: 'Built specifically for contractors',     d: 'Not law firms, not e-commerce. Just trades.' },
    { icon: Target,        t: 'We chase booked jobs',                   d: 'Calls, forms, estimates, and revenue. That\'s the scorecard.' },
    { icon: Layout,        t: 'Buyer-intent landing pages',             d: 'Pages designed for homeowners who are ready to spend.' },
    { icon: BarChart3,     t: 'Reduced ad waste',                       d: 'Negative keywords, geo-targeting, and quality-score tuning.' },
    { icon: MapPin,        t: 'Local SEO that ranks',                   d: 'Service area pages, citations, and review velocity.' },
    { icon: ShieldCheck,   t: 'Tracking installed before launch',       d: 'Calls, forms, conversions. Everything attributed.' },
    { icon: ClipboardList, t: 'Reporting tied to revenue',              d: 'No vanity metrics. Just the numbers that pay for trucks.' }
  ];

  return (
    <Section id="why" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:sticky lg:top-32">
          <span className="eyebrow-light">Why Trade Leads Marketing</span>
          <h2 className="h-display text-4xl md:text-5xl mt-4 text-ink">
            We Don't Chase <span className="line-through text-slate3">Vanity Metrics.</span><br />
            <span className="text-blue">We Chase Jobs.</span>
          </h2>
          <p className="mt-5 text-slate1 leading-relaxed text-lg max-w-lg">
            Impressions don't pour concrete. Clicks don't replace a roof. We measure what actually puts trucks on driveways: qualified leads, booked estimates, and the data behind them. We don't guarantee specific results, but we do guarantee a real strategy, real tracking, and straight answers.
          </p>
          <a href="#audit" className="btn-primary mt-8">
            Get a Free Audit <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="space-y-3">
          {points.map((p) => {
            const Icon = p.icon;
            return (
              <motion.li key={p.t} variants={fadeUp} className="flex items-start gap-4 bg-white border border-line rounded-xl p-5 hover:border-blue/40 hover:shadow-soft transition-all duration-300">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-bluesoft flex items-center justify-center">
                  <Icon className="h-5 w-5 text-blue" />
                </div>
                <div>
                  <div className="font-bold text-ink">{p.t}</div>
                  <div className="text-slate1 text-sm mt-0.5">{p.d}</div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </Section>
  );
}

/* ============================================================
   11. PROCESS — animated timeline (dark)
   ============================================================ */
function Process() {
  const steps = [
    { icon: Eye,           title: 'Audit',   desc: 'We review your website, ads, SEO, competitors, and tracking. No fluff.' },
    { icon: ClipboardList, title: 'Build',   desc: 'We create or rebuild the pages, campaigns, and local SEO foundation.' },
    { icon: Rocket,        title: 'Launch',  desc: 'We launch campaigns and optimize for real quote requests, not vanity clicks.' },
    { icon: Activity,      title: 'Track',   desc: 'We track calls, forms, lead quality, booked estimates, and sold jobs.' },
    { icon: RefreshCw,     title: 'Improve', desc: 'We keep improving based on actual data, not guesses or gut feel.' }
  ];

  return (
    <Section id="process" className="bg-navy text-white">
      <div className="absolute inset-0 grid-bg-dark opacity-40" />
      <div className="relative">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span variants={fadeUp} className="eyebrow-dark">Our Process</motion.span>
          <motion.h2 variants={fadeUp} className="h-display text-4xl md:text-5xl mt-4">
            A Simple System for <span className="text-brand">More Qualified Leads</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-white/70 text-lg">
            Five steps. Every contractor we work with goes through them. Every step ties to job revenue.
          </motion.p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue/0 via-blue to-brand"
          />

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isBlue = i % 2 === 0;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative text-center"
                >
                  <div className="relative mx-auto h-24 w-24 mb-5">
                    <div className={`absolute inset-0 rounded-full ${isBlue ? 'bg-blue/20' : 'bg-brand/20'} blur-xl`} />
                    <div className={`relative h-24 w-24 rounded-full bg-charcoal border-2 ${isBlue ? 'border-blue/50 shadow-glowBlue' : 'border-brand/50 shadow-glow'} flex items-center justify-center`}>
                      <Icon className={`h-8 w-8 ${isBlue ? 'text-blue' : 'text-brand'}`} />
                      <div className={`absolute -top-2 -right-2 h-8 w-8 rounded-full ${isBlue ? 'bg-blue' : 'bg-brand'} text-white font-extrabold flex items-center justify-center text-sm shadow-lg`}>
                        {i + 1}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed px-2">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   PACKAGES — 3 service tiers, no public pricing, middle is featured
   ============================================================ */
function Packages() {
  const packages = [
    {
      name: 'Google Ads Lead Launch',
      tag: 'Fastest path to leads',
      icon: Target,
      tone: 'blue',
      desc: 'For contractors who want to start generating quote requests quickly with Google Ads and a dedicated landing page.',
      features: [
        '1 conversion-focused landing page',
        'Google Ads campaign setup',
        'Monthly Google Ads management',
        'Ongoing campaign optimization based on lead and conversion data',
        'Keyword research',
        'Negative keyword optimization',
        'Ad copywriting',
        'Call and form tracking',
        'Monthly lead report'
      ],
      excluded: [
        'Full website rebuild',
        'SEO management',
        'Google Business Profile management'
      ],
      cta: 'Learn More'
    },
    {
      name: 'Google Growth System',
      tag: 'Everything in one · Best value',
      icon: Sparkles,
      tone: 'brand',
      featured: true,
      desc: 'The complete Google lead system. Combines everything from the other two packages plus blogs, content updates, and full performance tracking. Website, Google Ads, SEO, Google Business Profile, content, and ongoing optimization, all under one roof.',
      features: [
        'Full contractor website build',
        'Conversion-focused landing pages',
        'Google Ads campaign setup',
        'Monthly Google Ads management',
        'Ongoing Google Ads optimization based on lead and conversion data',
        'Keyword research',
        'Negative keyword optimization',
        'Ad copywriting',
        'SEO setup and monthly SEO management',
        'Google Business Profile setup and optimization',
        'Monthly GBP updates',
        'Review strategy',
        'Blog, FAQ, and content updates',
        'Search Console and Analytics setup',
        'Call and form tracking',
        'Lead quality review',
        'Monthly performance reporting'
      ],
      excluded: [],
      cta: 'Request Package Details'
    },
    {
      name: 'SEO Website Growth',
      tag: 'Long-term organic growth',
      icon: Search,
      tone: 'blue',
      desc: 'For contractors who want a better website and stronger organic/local Google visibility without paid ads.',
      features: [
        'Full website rebuild',
        'SEO setup',
        'Monthly SEO management',
        'Google Business Profile optimization',
        'Monthly GBP updates',
        'Blog, FAQ, and content updates',
        'Search Console and Analytics setup',
        'Call and form tracking',
        'Monthly SEO report'
      ],
      excluded: [
        'Google Ads setup',
        'Google Ads management',
        'Paid campaign tracking'
      ],
      cta: 'Learn More'
    }
  ];

  return (
    <Section id="packages" className="bg-soft">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14 max-w-3xl mx-auto">
        <motion.span variants={fadeUp} className="eyebrow-light">Service Packages</motion.span>
        <motion.h2 variants={fadeUp} className="h-display text-4xl md:text-5xl text-ink mt-4">
          Choose the Right Growth System for<br className="hidden md:block" />
          <span className="text-blue">Your Contracting Business</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 text-slate1 text-lg leading-relaxed">
          Whether you need fast Google Ads leads, long-term SEO growth, or the full system, we build packages around quote requests, booked estimates, and real contractor growth.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="grid lg:grid-cols-3 gap-6 lg:gap-5 items-stretch"
      >
        {packages.map((p) => {
          const Icon = p.icon;
          const featured = p.featured;
          return (
            <motion.div
              key={p.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
                featured
                  ? 'bg-gradient-to-br from-navy via-charcoal to-navydeep text-white border-2 border-brand shadow-glow lg:-mt-4 lg:mb-0 lg:scale-[1.02] z-10'
                  : 'bg-white border border-line shadow-soft hover:shadow-lifted hover:border-blue/30'
              }`}
            >
              {featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-brand text-white text-[10px] font-extrabold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-glow flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" /> Recommended
                  </div>
                </div>
              )}

              <div className="p-7 md:p-8 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                    featured
                      ? 'bg-brand/20 border border-brand/40'
                      : p.tone === 'blue'
                        ? 'bg-bluesoft border border-blue/20'
                        : 'bg-brand/10 border border-brand/20'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      featured ? 'text-brand' : p.tone === 'blue' ? 'text-blue' : 'text-brand'
                    }`} />
                  </div>
                  <div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${
                      featured ? 'text-brand' : 'text-slate2'
                    }`}>
                      {p.tag}
                    </div>
                    <h3 className={`font-display font-extrabold text-xl mt-0.5 ${featured ? 'text-white' : 'text-ink'}`}>
                      {p.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className={`mt-5 leading-relaxed ${featured ? 'text-white/75' : 'text-slate1'}`}>
                  {p.desc}
                </p>

                {/* Divider */}
                <div className={`my-6 h-px ${featured ? 'bg-white/15' : 'bg-line'}`} />

                {/* Features */}
                <ul className="space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${featured ? 'text-white/90' : 'text-ink'}`}>
                      <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${featured ? 'text-brand' : 'text-gGreen'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Excluded */}
                {p.excluded.length > 0 && (
                  <>
                    <div className={`mt-6 mb-3 text-[10px] font-bold uppercase tracking-widest ${featured ? 'text-white/40' : 'text-slate3'}`}>
                      Not included
                    </div>
                    <ul className="space-y-2">
                      {p.excluded.map((e) => (
                        <li key={e} className={`flex items-start gap-2.5 text-xs ${featured ? 'text-white/45' : 'text-slate3'}`}>
                          <XCircle className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${featured ? 'text-white/30' : 'text-slate3'}`} />
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* CTA */}
                <a
                  href="#audit"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all duration-200 ${
                    featured
                      ? 'bg-brand text-white shadow-glow hover:bg-branddeep hover:scale-[1.02] animate-pulseGlow'
                      : 'border border-line bg-white text-ink hover:border-blue/40 hover:text-blue'
                  }`}
                >
                  {p.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <p className="text-slate1">
          Not sure which package fits?{' '}
          <a href="#audit" className="text-blue font-semibold hover:underline">
            Tell us about your business
          </a>{' '}
          and we'll recommend the right starting point.
        </p>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   CONTACT FORM — sends via /api/lead → SMTP → info@tradeleadsmarketing.com
   ============================================================ */
function ContactForm() {
  const [data, setData] = useState({
    name: '', business: '', email: '', phone: '', city: '', service: '', message: '', website: ''
  });
  const [status, setStatus] = useState({ state: 'idle', error: null });

  const update = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (data.website) return; // honeypot
    if (!data.name.trim() || !data.email.trim() || !data.city.trim()) {
      setStatus({ state: 'error', error: 'Please add your name, email, and city.' });
      return;
    }
    setStatus({ state: 'sending', error: null });
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Submission failed. Please email info@tradeleadsmarketing.com directly.');
      }
      setStatus({ state: 'sent', error: null });
      setData({ name: '', business: '', email: '', phone: '', city: '', service: '', message: '', website: '' });
    } catch (err) {
      setStatus({ state: 'error', error: err.message });
    }
  };

  const services = [
    'Not sure yet, just exploring',
    'Google Ads management',
    'Website design / rebuild',
    'Local SEO',
    'Google Business Profile',
    'Lead tracking setup',
    'Full audit & strategy'
  ];

  return (
    <Section id="audit" className="bg-white">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-5">
          <motion.span variants={fadeUp} className="eyebrow-light">Get Your Free Audit</motion.span>
          <motion.h2 variants={fadeUp} className="h-display text-4xl md:text-5xl text-ink mt-4">
            Tell us about your business.<br />
            <span className="text-blue">We'll show you what's working.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-slate1 leading-relaxed">
            Send the form and we'll review your website, Google Business Profile, ad presence, and tracking. Then we'll walk you through what's helping, what's wasting money, and what to fix first. No obligation.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 space-y-3">
            <a href="tel:+12894891167" className="flex items-center gap-3 text-ink font-semibold hover:text-blue">
              <div className="h-10 w-10 rounded-lg bg-bluesoft flex items-center justify-center">
                <Phone className="h-4 w-4 text-blue" />
              </div>
              (289) 489-1167
            </a>
            <a href="mailto:info@tradeleadsmarketing.com" className="flex items-center gap-3 text-ink font-semibold hover:text-blue">
              <div className="h-10 w-10 rounded-lg bg-bluesoft flex items-center justify-center">
                <Mail className="h-4 w-4 text-blue" />
              </div>
              info@tradeleadsmarketing.com
            </a>
            <div className="flex items-center gap-3 text-slate1">
              <div className="h-10 w-10 rounded-lg bg-bluesoft flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue" />
              </div>
              <span>Same-day reply during business hours</span>
            </div>
            <div className="flex items-center gap-3 text-slate1">
              <div className="h-10 w-10 rounded-lg bg-bluesoft flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-blue" />
              </div>
              <span>Your info stays private. Never sold or shared.</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={submit}
          className="lg:col-span-7 bg-white rounded-2xl border border-line shadow-lifted p-7 md:p-9"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={data.website}
            onChange={update('website')}
            tabIndex="-1"
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Your name *" htmlFor="name">
              <input id="name" type="text" required value={data.name} onChange={update('name')} placeholder="John Smith" className="form-input" />
            </FormField>
            <FormField label="Business name" htmlFor="business">
              <input id="business" type="text" value={data.business} onChange={update('business')} placeholder="Smith Concrete Co." className="form-input" />
            </FormField>
            <FormField label="Email *" htmlFor="email">
              <input id="email" type="email" required value={data.email} onChange={update('email')} placeholder="you@yourcompany.com" className="form-input" />
            </FormField>
            <FormField label="Phone" htmlFor="phone">
              <input id="phone" type="tel" value={data.phone} onChange={update('phone')} placeholder="(555) 123-4567" className="form-input" />
            </FormField>
          </div>

          <div className="mt-5">
            <FormField label="City / location *" htmlFor="city">
              <input
                id="city"
                type="text"
                required
                value={data.city}
                onChange={update('city')}
                placeholder="e.g. Austin, TX or Hamilton, ON"
                className="form-input"
              />
            </FormField>
          </div>

          <div className="mt-5">
            <FormField label="What are you most interested in?" htmlFor="service">
              <select id="service" value={data.service} onChange={update('service')} className="form-input">
                <option value="">Select an option…</option>
                {services.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
          </div>

          <div className="mt-5">
            <FormField label="Tell us a bit about your business" htmlFor="message">
              <textarea
                id="message"
                rows="4"
                value={data.message}
                onChange={update('message')}
                placeholder="Trade, location, current marketing spend, biggest pain point…"
                className="form-input resize-none"
              />
            </FormField>
          </div>

          {status.state === 'error' && (
            <div className="mt-5 rounded-lg border border-gRed/30 bg-gRed/5 px-4 py-3 text-sm text-gRed flex items-start gap-2">
              <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{status.error}</span>
            </div>
          )}
          {status.state === 'sent' && (
            <div className="mt-5 rounded-lg border border-gGreen/30 bg-gGreen/5 px-4 py-3 text-sm text-gGreen flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              <span><strong>Thanks, we got it.</strong> We'll reach out within one business day.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status.state === 'sending'}
            className="btn-primary w-full md:w-auto mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status.state === 'sending' ? (
              <>Sending…</>
            ) : (
              <>Get My Free Audit <ArrowRight className="h-4 w-4" /></>
            )}
          </button>

          <div className="mt-4 text-xs text-slate2">
            By submitting, you agree we may contact you about your audit. We will never sell or share your information.
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function FormField({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-xs font-semibold text-ink uppercase tracking-wider">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

/* ============================================================
   13. FAQ — light, accordion
   ============================================================ */
function FAQ() {
  const faqs = [
    { q: 'Do you only work with contractors?', a: 'Yes. We work only with contractors and local trade businesses: landscaping, concrete, roofing, plumbing, electrical, HVAC, paving, builders, and renovation companies. That focus is why our campaigns convert.' },
    { q: 'How long does it take to see results?', a: 'It depends on your market, budget, and starting point. We don\'t make blanket guarantees. In our experience, Google Ads can start producing qualified leads within the first 1-2 weeks once tracking is set up correctly. SEO and Google Business Profile improvements typically take 60-90+ days to gain traction. We track everything from day one, so even when results take time to compound, you see exactly what\'s happening week by week.' },
    { q: 'Do I need a new website?', a: 'Not always. We audit your current site first. If it converts, we leave it. If it leaks leads, we rebuild key pages or the whole site, whichever gets you the highest ROI fastest.' },
    { q: 'Do you manage Google Ads?', a: 'Yes, and it\'s a core service. We structure campaigns by service type, exclude wasteful keywords, write contractor-specific ad copy, and tie every click back to booked jobs.' },
    { q: 'Do you help with SEO and Google Business Profile?', a: 'Yes. Local SEO and Google Business Profile optimization are non-negotiable for contractors. We handle citations, reviews strategy, photos, posts, and on-page service content together.' },
    { q: 'Can you track calls and form submissions?', a: 'Always. We install call tracking, form tracking, and conversion tracking before we spend a dollar on ads. You will know exactly which campaign, ad, and keyword booked the job.' },
    { q: 'What makes you different from other marketing agencies?', a: 'We only work with contractors. We focus on the metrics that map to booked jobs, not just clicks. And we give you straight answers about what\'s working and what isn\'t, without pretty reports that hide bad performance. No 6-month lock-ins, no jargon, no inflated promises.' }
  ];

  const [open, setOpen] = useState(0);

  return (
    <Section id="faq" className="bg-white">
      <div className="grid lg:grid-cols-12 gap-12">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-4">
          <motion.span variants={fadeUp} className="eyebrow-light">FAQ</motion.span>
          <motion.h2 variants={fadeUp} className="h-display text-4xl md:text-5xl text-ink mt-4">
            Straight Answers
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-slate1 leading-relaxed">
            Still have questions? Send us a message and we'll get back the same day. No auto-responses.
          </motion.p>
          <motion.a variants={fadeUp} href="mailto:info@tradeleadsmarketing.com" className="btn-blue mt-6">
            <Mail className="h-4 w-4" /> Email us
          </motion.a>
        </motion.div>

        <div className="lg:col-span-8 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`bg-white rounded-xl border transition-all overflow-hidden ${isOpen ? 'border-blue/40 shadow-soft' : 'border-line'}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-q-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 rounded-xl"
                >
                  <span className="font-semibold text-ink">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 text-blue transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate1 leading-relaxed border-t border-line pt-4">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   14. FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="relative bg-navy text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white p-1.5 flex items-center justify-center">
                <img src="/tlmlogo.png" alt="Trade Leads Marketing" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="font-extrabold tracking-tight">Trade Leads Marketing</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-brand font-bold -mt-0.5">tradeleadsmarketing.ca</div>
              </div>
            </div>
            <p className="mt-5 text-white/70 max-w-sm leading-relaxed">
              Digital marketing for contractors who want more qualified leads, not vanity metrics.
            </p>
            <a href="#audit" className="btn-primary mt-6 text-sm">
              Get a Free Audit <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white/45 mb-4">Sitemap</div>
            <ul className="space-y-2">
              {[['Packages','#packages'], ['Results','#results'], ['Process','#process'], ['FAQ','#faq'], ['Get Audit','#audit']].map(([l, h]) => (
                <li key={l}><a href={h} className="text-white/70 hover:text-brand transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white/45 mb-4">Industries</div>
            <ul className="space-y-2 text-white/70">
              <li>Concrete</li><li>Roofing</li><li>Landscaping</li><li>HVAC</li><li>Plumbing</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest text-white/45 mb-4">Contact</div>
            <a href="tel:+12894891167" className="text-white/85 hover:text-brand transition-colors flex items-center gap-2">
              <Phone className="h-4 w-4" /> (289) 489-1167
            </a>
            <a href="mailto:info@tradeleadsmarketing.com" className="mt-2 text-white/85 hover:text-brand transition-colors flex items-center gap-2">
              <Mail className="h-4 w-4" /> info@tradeleadsmarketing.com
            </a>
            <div className="mt-3 text-white/55 text-sm">Serving contractors across North America.</div>
            <div className="mt-4 text-xs text-white/55">
              Built specifically for contractors. Not generic agencies.
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 space-y-3 text-xs text-white/50">
          <p className="leading-relaxed max-w-4xl">
            <span className="font-bold text-white/70">Disclaimer:</span> Trade Leads Marketing does not guarantee specific lead volume, ranking position, or revenue outcomes. Results depend on factors including market competition, budget, service area, seasonality, and the contractor's own sales process. Examples and case studies on this site reflect outcomes from specific past campaigns and are not predictive of future performance. Google&trade;, Google Ads&trade;, and Google Business Profile&trade; are trademarks of Google LLC, used here for descriptive purposes; Trade Leads Marketing is not affiliated with or endorsed by Google.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
            <div>© {new Date().getFullYear()} Trade Leads Marketing. All rights reserved.</div>
            <div>Built for contractors. Built to convert.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP — section order
   ============================================================ */
export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink antialiased overflow-x-hidden">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <Results />
        <Testimonials />
        <WhyUs />
        <Process />
        <Packages />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
