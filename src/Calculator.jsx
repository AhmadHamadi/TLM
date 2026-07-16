import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, DollarSign, Users, Phone, RotateCcw,
  Wallet, Sparkles, Scale
} from 'lucide-react';

/* ============================================================
   TRADE LEADS MARKETING — BREAK-EVEN CALCULATOR
   Standalone page (/calculator). Dead simple, on purpose.

   The whole idea, in plain English:
     jobsToBreakEven = monthly spend  ÷  what one job is worth
   "We bring you the leads. Close this many and you've made your
    money back. Everything after that is extra."
   No margins, no close rate, no jargon.
   ============================================================ */

/* ---------- Formatting helpers ---------- */
const money = (v) => '$' + Math.round(Math.max(0, v)).toLocaleString('en-US');
const whole = (v) => Math.round(Math.max(0, v)).toLocaleString('en-US');
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/* ---------- Animated number (re-animates whenever value changes) ---------- */
function AnimatedValue({ value, format }) {
  const mv = useMotionValue(value);
  const out = useTransform(mv, (v) => format(v));
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [value, mv]);
  return <motion.span>{out}</motion.span>;
}

/* ---------- Number input — value sits centered, never "jumps" while typing ---------- */
function NumberField({ value, onChange, min, max, prefix }) {
  const fmt = (v) => String(Math.round(v));
  const [text, setText] = useState(fmt(value));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setText(fmt(value));
  }, [value]);

  const commit = (raw) => {
    const n = parseFloat(String(raw).replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(clamp(n, min, max));
  };

  return (
    <div className="inline-flex items-center h-11 w-32 rounded-lg border border-line bg-white overflow-hidden focus-within:border-blue focus-within:ring-4 focus-within:ring-blue/10 transition-all">
      {prefix && <span className="pl-3 text-slate2 font-semibold select-none">{prefix}</span>}
      <input
        type="text"
        inputMode="numeric"
        value={text}
        onFocus={() => { focused.current = true; }}
        onBlur={() => {
          focused.current = false;
          commit(text);
          setText(fmt(clamp(parseFloat(text.replace(/[^0-9.]/g, '')) || min, min, max)));
        }}
        onChange={(e) => { setText(e.target.value); commit(e.target.value); }}
        className="w-full h-full px-2 bg-transparent text-ink font-black text-center focus:outline-none"
        aria-label="value"
      />
    </div>
  );
}

/* ---------- One input row: label + centered value + slider ---------- */
function InputRow({ icon: Icon, label, hint, value, onChange, min, max, step, prefix }) {
  return (
    <div className="py-5 first:pt-0 last:pb-0 border-b border-line last:border-0">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 shrink-0 rounded-lg bg-bluesoft flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue" />
          </div>
          <div>
            <div className="font-bold text-ink leading-tight text-[15px]">{label}</div>
            {hint && <div className="text-xs text-slate2 mt-0.5">{hint}</div>}
          </div>
        </div>
        <NumberField value={value} onChange={onChange} min={min} max={max} prefix={prefix} />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer accent-brand bg-line"
        aria-label={label}
      />
      <div className="flex justify-between text-[11px] text-slate3 font-semibold mt-1.5">
        <span>{prefix}{whole(min)}</span>
        <span>{prefix}{whole(max)}</span>
      </div>
    </div>
  );
}

/* ---------- A big stat tile ---------- */
function Tile({ icon: Icon, label, value, format, tone = 'blue' }) {
  const toneMap = {
    blue: 'bg-bluesoft text-blue',
    brand: 'bg-brand/10 text-brand',
    green: 'bg-gGreen/10 text-gGreen'
  };
  return (
    <div className="bg-white rounded-2xl border border-line shadow-soft p-5 text-center sm:text-left">
      <div className="flex items-center gap-2 justify-center sm:justify-start">
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${toneMap[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate2">{label}</div>
      </div>
      <div className="mt-3 text-4xl font-black text-ink">
        <AnimatedValue value={value} format={format} />
      </div>
    </div>
  );
}

export default function Calculator() {
  const [spend, setSpend] = useState(3000);
  const [jobValue, setJobValue] = useState(8000);
  const [leads, setLeads] = useState(50);

  const reset = () => { setSpend(3000); setJobValue(8000); setLeads(50); };

  /* ---- The whole calculation ---- */
  const breakEvenExact = jobValue > 0 ? spend / jobValue : 0;
  // You close whole jobs, so round up to the next whole job.
  const jobsToBreakEven = breakEvenExact > 0 ? Math.ceil(breakEvenExact) : 0;
  const feasible = leads > 0 && jobsToBreakEven <= leads;
  const extraJobs = Math.max(0, leads - jobsToBreakEven);

  // Leads bar proportions
  const bePct = leads > 0 ? clamp((jobsToBreakEven / leads) * 100, 0, 100) : 0;
  const extraPct = 100 - bePct;

  return (
    <div className="min-h-screen bg-soft text-ink antialiased">
      {/* ---- Top bar ---- */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-6xl px-5 md:px-8 flex items-center justify-between py-3">
          <a href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white border border-line flex items-center justify-center shadow-soft p-1">
              <img src="/tlmlogo.png" alt="Trade Leads Marketing" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight text-ink">Trade Leads</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-brand font-bold -mt-0.5">Break-Even Calculator</div>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <a href="tel:+12894891167" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-blue">
              <Phone className="h-4 w-4" /> (289) 489-1167
            </a>
            <a href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate1 hover:text-ink border border-line rounded-lg px-3 py-2 bg-white">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 md:px-8 py-10 md:py-14">
        {/* ---- Heading ---- */}
        <div className="max-w-2xl">
          <span className="eyebrow-light">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" /> The math is simple
          </span>
          <h1 className="h-display text-4xl md:text-5xl text-ink mt-4">
            How many jobs to <span className="text-blue">make your money back?</span>
          </h1>
          <p className="mt-4 text-slate1 text-lg leading-relaxed">
            Enter what you spend and what one job is worth. We'll show how many of the leads we bring
            you need to close to break even — <span className="font-semibold text-ink">everything after that is extra</span>.
          </p>
        </div>

        {/* ---- Grid: inputs + result ---- */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mt-10 items-start">
          {/* INPUTS */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-line shadow-lifted p-6 md:p-8 lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-extrabold text-xl text-ink">Your numbers</h2>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate2 hover:text-blue border border-line rounded-lg px-2.5 py-1.5 bg-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>

            <InputRow
              icon={Wallet} label="What you spend a month" hint="Your total monthly marketing budget"
              value={spend} onChange={setSpend} min={500} max={25000} step={100} prefix="$"
            />
            <InputRow
              icon={DollarSign} label="What one job is worth" hint="Your average job value"
              value={jobValue} onChange={setJobValue} min={500} max={60000} step={250} prefix="$"
            />
            <InputRow
              icon={Users} label="Leads we bring you a month" hint="Roughly how many leads you get"
              value={leads} onChange={setLeads} min={1} max={500} step={1}
            />
          </div>

          {/* RESULT */}
          <div className="lg:col-span-7 space-y-6">
            {/* Headline */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-navy via-charcoal to-navydeep text-white shadow-glow p-7 md:p-10">
              <div className="absolute inset-0 grid-bg-dark opacity-40" />
              <div className="relative">
                <div className="text-xs font-bold uppercase tracking-widest text-white/60">Close just</div>
                <div className="flex items-end gap-3 mt-1">
                  <div className="text-7xl md:text-8xl font-black text-brand leading-none">
                    <AnimatedValue value={jobsToBreakEven} format={whole} />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-1.5">
                    {jobsToBreakEven === 1 ? 'job' : 'jobs'}
                  </div>
                </div>
                <div className="text-white/75 mt-4 text-lg leading-relaxed max-w-xl">
                  and you've made your <span className="font-bold text-white">{money(spend)}</span> back.
                  {feasible && (
                    <> That's just <span className="font-bold text-brand">{whole(jobsToBreakEven)}</span> of
                    the <span className="font-bold text-white">{whole(leads)}</span> leads we bring you every month.</>
                  )}
                </div>

                {/* Leads bar */}
                <div className="mt-8">
                  <div className="flex justify-between text-[11px] font-semibold text-white/55 mb-2">
                    <span>Your {whole(leads)} leads this month</span>
                    <span>{feasible ? `${whole(extraJobs)} left over` : 'need more leads'}</span>
                  </div>
                  <div className="h-5 rounded-full bg-white/10 overflow-hidden flex">
                    <motion.div className="h-full bg-white/35"
                      animate={{ width: `${bePct}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
                    <motion.div className="h-full bg-gradient-to-r from-brand to-branddeep"
                      animate={{ width: `${extraPct}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
                  </div>
                  <div className="flex justify-between text-[11px] mt-2">
                    <span className="text-white/55">■ Pays back your spend</span>
                    <span className="text-brand font-semibold">■ Every extra job = more money</span>
                  </div>
                </div>

                {/* Punch line */}
                <div className="mt-7 flex items-start gap-2.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3.5">
                  <Sparkles className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                  <p className="text-white/85 leading-snug">
                    Every job you close after that is another{' '}
                    <span className="font-black text-white">{money(jobValue)}</span> in your pocket.
                  </p>
                </div>
              </div>
            </div>

            {/* Simple stat tiles */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <Tile icon={Scale} tone="brand" label="Jobs to break even" value={jobsToBreakEven} format={whole} />
              <Tile icon={Users} tone="blue" label="Leads a month" value={leads} format={whole} />
              <Tile icon={DollarSign} tone="green" label="Each job worth" value={jobValue} format={money} />
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-white border border-line shadow-soft p-6 md:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-display font-extrabold text-lg text-ink flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand" /> Want us to bring you those leads?
                </div>
                <p className="text-slate1 text-sm mt-1">Start with a free audit — no obligation, no pressure.</p>
              </div>
              <a href="/#audit" className="btn-primary shrink-0">
                Get a Free Audit <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-xs text-slate2 leading-relaxed max-w-3xl">
          <span className="font-bold text-slate1">Estimate only.</span> Break-even here means what you spend ÷ what one
          job is worth, rounded up to a whole job. We deliver the leads; whether they turn into jobs depends on your
          pricing, sales process, and market. These numbers illustrate the idea — they're not a promise of a specific
          result.
        </p>
      </main>
    </div>
  );
}
