import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ScanLine,
  Wallet,
  TrendingUp,
  Calendar,
  Fingerprint,
} from 'lucide-react';
import MaajaHeroCanvas from '../components/maaja/MaajaHeroCanvas';
import MaajaDeviceFrame from '../components/maaja/MaajaDeviceFrame';

/* ------------------------------------------------------------------ */
/*  8 Authentic Production App Modules                                */
/* ------------------------------------------------------------------ */
const showcaseScreens = [
  {
    id: 'dashboard',
    label: 'Home Dashboard',
    category: 'Core System',
    src: '/projects/maaja/home_dashboard.jpg',
    title: 'Productivity Pulse & System Overview',
    desc: 'Central command screen integrating real-time offline status, voice prompt dispatching, productivity score gauges, daily expense tracking, and pending task notifications.',
    metrics: ['Offline-first sync', 'Voice action dispatcher', 'Daily productivity pulse'],
  },
  {
    id: 'doc_intel',
    label: 'Document AI',
    category: 'Computer Vision',
    src: '/projects/maaja/document_intelligence.jpg',
    title: 'Document Intelligence & Bill OCR',
    desc: 'On-device vision model extracting merchant name, tax/GST identifier, line items, and total expenditure with 85% confidence score and mathematical discrepancy verification.',
    metrics: ['85% OCR confidence', 'Automatic ledger extraction', 'Math discrepancy check'],
  },
  {
    id: 'wallet',
    label: 'Smart Wallet',
    category: 'Finance',
    src: '/projects/maaja/money_wallet.jpg',
    title: 'Personal Vault & Expense Ledger',
    desc: 'Encrypted smart wallet displaying net balance, categorized spending buckets (Food, Shopping, Transport, Bills), and budget limit alerts with real-time percentage gauges.',
    metrics: ['Category budgeting', 'Spending velocity curve', 'Encrypted local ledger'],
  },
  {
    id: 'habits',
    label: 'Habits & Planner',
    category: 'Behavioral Systems',
    src: '/projects/maaja/planner_habits.jpg',
    title: 'Daily Momentum & Habit Compounding',
    desc: 'Micro-habit tracker structured around atomic compounding principles, categorized across workouts, mindfulness, reading, and programming routines.',
    metrics: ['Micro-habit loops', 'Frictionless logging', 'Streak persistence'],
  },
  {
    id: 'calendar',
    label: 'Calendar & Shifts',
    category: 'Time Sync',
    src: '/projects/maaja/planner_calendar.jpg',
    title: 'Shift Calendar & Attendance Synchronization',
    desc: 'Time management module linking office shift schedules (9:00 AM - 7:00 PM), automated dual alarms, and one-tap integration with external attendance services.',
    metrics: ['Office shift sync', 'Dual automated alarms', 'Monthly attendance grid'],
  },
  {
    id: 'insights',
    label: 'Insights & Signals',
    category: 'Analytics',
    src: '/projects/maaja/insights_analytics.jpg',
    title: 'Predictive Signals & Activity Matrices',
    desc: 'Statistical engine correlating completed tasks, habit consistency, and focused time to compute weekly velocity metrics and activity heatmaps.',
    metrics: ['Task velocity curve', 'Consistency matrix', 'Weekly focus metrics'],
  },
  {
    id: 'security',
    label: 'Biometric Vault',
    category: 'Security',
    src: '/projects/maaja/profile_settings.jpg',
    title: 'Biometric Authentication & System Vault',
    desc: 'Hardware-backed biometric verification, 4-digit master PIN protection for financial ledgers, and dual Light/Obsidian theme engine.',
    metrics: ['BiometricPrompt / LocalAuth', 'Master security PIN', 'Hardware keystore integration'],
  },
  {
    id: 'reminders',
    label: 'Smart Reminders',
    category: 'Automation',
    src: '/projects/maaja/planner_reminders.jpg',
    title: 'Spoken Alert Reminders & Alarms',
    desc: 'High-priority voice-synthesized notifications for scheduled daily routines, office shift shifts, and automated snooze/reschedule cycles.',
    metrics: ['Voice alert synthesis', 'Recurring alert logic', 'Deep notification channel'],
  },
];

export default function MaajaCaseStudy({ onBack }) {
  const [activeTab, setActiveTab] = useState(showcaseScreens[0].id);

  const activeScreenData =
    showcaseScreens.find((s) => s.id === activeTab) || showcaseScreens[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToPortfolio = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '';
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#f8f9fb] text-[#12141a] font-sans antialiased selection:bg-neutral-900 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. RESTRAINED EDITORIAL NAVIGATION BAR (Single Theme)
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-neutral-200/80 text-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={handleBackToPortfolio}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100/80 border border-neutral-200/90 hover:bg-neutral-200/70 hover:border-neutral-300 text-xs sm:text-sm font-medium text-neutral-800 transition-all active:scale-[0.98] cursor-pointer"
          >
            <ArrowLeft
              size={14}
              className="text-neutral-500 group-hover:-translate-x-0.5 transition-transform"
            />
            <span>Back to portfolio</span>
          </button>

          {/* Project Title and Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xs">
              <img
                src="/projects/maaja/maaja_logo.png"
                alt="Maaja Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-sm tracking-tight text-neutral-900">
              Maaja
            </span>
            <span className="text-neutral-400 text-xs">•</span>
            <span className="text-xs font-mono text-neutral-500">
              Case study 01
            </span>
          </div>

          {/* Quick Anchor Jumps */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="#showcase"
              className="hidden md:inline-block text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Modules
            </a>
            <a
              href="#architecture"
              className="hidden md:inline-block text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Architecture
            </a>
            <a
              href="#specifications"
              className="hidden md:inline-block text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Specifications
            </a>
            <button
              onClick={handleBackToPortfolio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-medium transition-all active:scale-[0.98] cursor-pointer shadow-xs"
            >
              <span>Return</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. ASYMMETRIC SPLIT HERO SECTION (Initial Viewport Fit)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-neutral-200 bg-gradient-to-b from-[#ffffff] to-[#f4f6f9] flex items-center min-h-[calc(100dvh-64px)] py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
              {/* Single Eyebrow (Hero counts as 1) */}
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span>CASE STUDY 01</span>
                <span>•</span>
                <span>FLUTTER &amp; DART</span>
              </div>

              {/* Headline: max 2 lines, <= 8 words */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.1]">
                Maaja: Personal AI &amp; Life OS
              </h1>

              {/* Subtext: <= 20 words */}
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                Offline-first Flutter application featuring on-device computer vision,
                encrypted SQLite ledgers, and biometric authentication.
              </p>

              {/* CTAs: 1 primary + max 1 secondary */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#showcase"
                  className="px-4 py-2.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium transition-all active:scale-[0.98] shadow-xs inline-flex items-center gap-2"
                >
                  <span>Inspect Core Modules</span>
                  <ArrowUpRight size={14} />
                </a>
                <button
                  onClick={handleBackToPortfolio}
                  className="px-4 py-2.5 rounded-lg bg-white border border-neutral-200/90 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 text-xs sm:text-sm font-medium transition-all active:scale-[0.98] shadow-xs cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </div>

              {/* Architecture specification pills */}
              <div className="pt-2 flex flex-wrap gap-1.5 text-xs font-mono text-neutral-600">
                <span className="px-2.5 py-1 rounded-md bg-white border border-neutral-200/80 shadow-xs">
                  Flutter 3.x
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-neutral-200/80 shadow-xs">
                  Dart Null Safety
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-neutral-200/80 shadow-xs">
                  On-Device OCR
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-neutral-200/80 shadow-xs">
                  SQLCipher AES-256
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-neutral-200/80 shadow-xs">
                  Biometrics
                </span>
              </div>
            </div>

            {/* Right 3D Stage Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative w-full rounded-2xl border border-neutral-200/90 bg-gradient-to-b from-[#fbfcfd] to-[#edf0f5] shadow-xs overflow-hidden">
                {/* 3D Stage Subtle Hardware Stamp */}
                <div className="absolute top-3.5 left-5 z-20 hidden sm:flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                  <span>Interactive 3D Stage</span>
                </div>
                <div className="absolute top-3.5 right-5 z-20 hidden sm:flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                  <span>Anodized titanium chassis</span>
                </div>

                {/* Three.js Interactive Hero Canvas */}
                <MaajaHeroCanvas />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ARCHITECTURAL METRICS STRIP (High Contrast, font-mono)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-8 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-xl bg-[#f8f9fb] border border-neutral-200/80 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-semibold font-mono text-neutral-900 tabular-nums">
                100%
              </span>
              <span className="text-xs text-neutral-500 mt-1 block">
                Offline data sovereignty
              </span>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-[#f8f9fb] border border-neutral-200/80 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-semibold font-mono text-neutral-900 tabular-nums">
                85%+
              </span>
              <span className="text-xs text-neutral-500 mt-1 block">
                OCR receipt parsing precision
              </span>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-[#f8f9fb] border border-neutral-200/80 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-semibold font-mono text-neutral-900 tabular-nums">
                &lt;16ms
              </span>
              <span className="text-xs text-neutral-500 mt-1 block">
                60fps UI rasterization budget
              </span>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-[#f8f9fb] border border-neutral-200/80 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-semibold font-mono text-neutral-900 tabular-nums">
                AES-256
              </span>
              <span className="text-xs text-neutral-500 mt-1 block">
                Hardware keystore encryption
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PRODUCTION SCREEN INSPECTION STUDIO (#showcase)
      ───────────────────────────────────────────────────────────── */}
      <section id="showcase" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-4xl font-semibold text-neutral-900 tracking-tight">
            Inspect Core Application Modules
          </h2>
          <p className="mt-2 text-neutral-600 text-sm sm:text-base leading-relaxed">
            Eight production Flutter screens rendered inside a physical titanium frame
            with realistic specular sheen and interactive tilt.
          </p>

          {/* Module Selector Button Rack */}
          <div className="mt-6 flex flex-wrap gap-1.5 sm:gap-2">
            {showcaseScreens.map((item) => {
              const isSelected = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all active:scale-[0.98] cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200/90'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Split View: Left Module Details + Right 3D Device */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
          {/* Left Details Column */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreenData.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wide text-neutral-600 bg-neutral-100 border border-neutral-200 mb-2">
                    {activeScreenData.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight">
                    {activeScreenData.title}
                  </h3>
                </div>

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {activeScreenData.desc}
                </p>

                {/* Engineering Highlights */}
                <div className="space-y-2.5 pt-2 border-t border-neutral-100">
                  <div className="text-xs font-mono text-neutral-500">
                    Engineering highlights
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeScreenData.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/70 flex items-center gap-2 text-xs text-neutral-700"
                      >
                        <CheckCircle2 size={13} className="text-neutral-900 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interaction Note */}
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-500 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                  <span>
                    Move your cursor over the device frame to inspect perspective tilt.
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right 3D Device Viewport */}
          <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreenData.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="w-full flex justify-center"
              >
                <MaajaDeviceFrame
                  src={activeScreenData.src}
                  alt={activeScreenData.title}
                  badge={activeScreenData.category}
                  title={activeScreenData.label}
                  subtitle="Authentic Flutter capture"
                  interactive={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. ASYMMETRIC BENTO GRID ARCHITECTURE (#architecture)
      ───────────────────────────────────────────────────────────── */}
      <section id="architecture" className="py-16 lg:py-24 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-4xl font-semibold text-neutral-900 tracking-tight">
              Decoupled Subsystem Architecture
            </h2>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base leading-relaxed">
              Engineered as isolated reactive domain services to guarantee sub-16ms render
              budgets and zero cloud telemetry.
            </p>
          </div>

          {/* 5-Cell Asymmetric Bento Grid (Exact cell count, diverse surfaces) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Cell 1: Hero Tile - Document Intelligence & Vision (8 cols) */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#f8f9fc] to-[#eef1f8] border border-neutral-200/90 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-xs">
                    <ScanLine size={20} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-neutral-600 bg-white border border-neutral-200 shadow-xs">
                    Computer Vision
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2">
                  On-Device Computer Vision &amp; Document Intelligence
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl mb-6">
                  Edge optical character recognition processes scanned receipt photos
                  without network transmission. Extracts vendor name, tax/GST identifier,
                  and expense totals with 85% confidence score and automated math
                  discrepancy validation.
                </p>
              </div>

              {/* Verified Feature Bar */}
              <div className="pt-4 border-t border-neutral-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-neutral-600">
                <div className="p-2.5 rounded-lg bg-white/80 border border-neutral-200/80">
                  <span className="text-neutral-400 block text-[10px]">MODEL</span>
                  <span className="font-semibold text-neutral-900">On-Device ML Kit</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/80 border border-neutral-200/80">
                  <span className="text-neutral-400 block text-[10px]">CONFIDENCE</span>
                  <span className="font-semibold text-neutral-900">85% Verification</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/80 border border-neutral-200/80">
                  <span className="text-neutral-400 block text-[10px]">PRIVACY</span>
                  <span className="font-semibold text-neutral-900">Zero Cloud Upload</span>
                </div>
              </div>
            </div>

            {/* Cell 2: Smart Financial Ledger (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/90 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-xs">
                    <Wallet size={20} />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-500 bg-neutral-100 border border-neutral-200">
                    Encrypted SQL
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                  Smart Wallet &amp; Ledger
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                  Multi-category bookkeeping with custom spending limits, income versus
                  expense velocity metrics, and automated percentage gauge alerts
                  persisted locally.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Storage</span>
                <span className="text-neutral-900 font-medium">SQLCipher AES-256</span>
              </div>
            </div>

            {/* Cell 3: Daily Momentum & Habits (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/90 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-xs">
                    <TrendingUp size={20} />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-500 bg-neutral-100 border border-neutral-200">
                    State Machine
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                  Habits &amp; Momentum
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                  Atomic compounding tracker structured with deterministic state
                  machines for routines across programming, reading, workouts, and
                  mindfulness.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Persistence</span>
                <span className="text-neutral-900 font-medium">Local SQLite</span>
              </div>
            </div>

            {/* Cell 4: Biometric Vault Security (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/90 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-xs">
                    <Fingerprint size={20} />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-500 bg-neutral-100 border border-neutral-200">
                    Biometrics
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                  Biometric Vault Security
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                  Android BiometricPrompt and iOS LocalAuthentication with cryptographic
                  keys protecting sensitive ledger items and personal notes.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Key Storage</span>
                <span className="text-neutral-900 font-medium">Hardware Keystore</span>
              </div>
            </div>

            {/* Cell 5: Shift Attendance & Alarms (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#f4f6fa] border border-neutral-200/90 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-xs">
                    <Calendar size={20} />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-500 bg-white border border-neutral-200 shadow-xs">
                    Time Engine
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                  Shift Attendance &amp; Alarms
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                  Synchronizes office schedules (9:00 AM - 7:00 PM), manages automated
                  background alarms, and deep-links to clock-in services.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Scheduler</span>
                <span className="text-neutral-900 font-medium">Platform Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. SYSTEM ENGINEERING MATRIX (#specifications)
      ───────────────────────────────────────────────────────────── */}
      <section id="specifications" className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
              System Engineering Matrix
            </h3>
            <p className="mt-1 text-neutral-600 text-sm sm:text-base">
              Strict separation between presentation, domain logic, and encrypted
              repository layers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-neutral-100">
            <div className="p-4 rounded-xl bg-[#f8f9fb] border border-neutral-200/70 space-y-1">
              <span className="text-[11px] font-mono text-neutral-500 uppercase block">Framework</span>
              <p className="text-sm font-semibold text-neutral-900">Flutter 3.x Native</p>
              <p className="text-xs text-neutral-500 font-mono">Dart 3 null safety</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8f9fb] border border-neutral-200/70 space-y-1">
              <span className="text-[11px] font-mono text-neutral-500 uppercase block">State Management</span>
              <p className="text-sm font-semibold text-neutral-900">BLoC / Reactive Streams</p>
              <p className="text-xs text-neutral-500 font-mono">Unidirectional data flow</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8f9fb] border border-neutral-200/70 space-y-1">
              <span className="text-[11px] font-mono text-neutral-500 uppercase block">Local Database</span>
              <p className="text-sm font-semibold text-neutral-900">Encrypted SQLite</p>
              <p className="text-xs text-neutral-500 font-mono">Zero cloud telemetry</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8f9fb] border border-neutral-200/70 space-y-1">
              <span className="text-[11px] font-mono text-neutral-500 uppercase block">Vision &amp; OCR</span>
              <p className="text-sm font-semibold text-neutral-900">On-Device ML Kit</p>
              <p className="text-xs text-neutral-500 font-mono">Edge invoice extraction</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. EDITORIAL FOOTER (Light Studio Theme)
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-neutral-200 bg-white text-neutral-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 p-1 mb-5 shadow-xs">
            <img
              src="/projects/maaja/maaja_logo.png"
              alt="Maaja App"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2">
            Explore Developer Portfolio
          </h3>
          <p className="text-neutral-500 text-sm max-w-md mb-6">
            Return to the main portfolio to view 3D graphics experiments, full-stack
            architectures, and web tools.
          </p>

          <button
            onClick={handleBackToPortfolio}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 font-medium text-xs sm:text-sm transition-all active:scale-[0.98] shadow-xs cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Return to portfolio</span>
          </button>

          <p className="mt-10 text-[11px] font-mono text-neutral-400">
            © {new Date().getFullYear()} Dhinesh Kumar R. All screenshots are authentic Flutter app captures.
          </p>
        </div>
      </footer>
    </div>
  );
}
