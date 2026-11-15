import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconFolder from "./icon-folder";

/* ------------------------------------------------------------- */
/*  1. Frontend Development Icons                                */
/* ------------------------------------------------------------- */
const frontendIcons = [
  {
    src: "/logos/html5.svg",
    label: "HTML5",
    background: "#1c1410",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/css3.svg",
    label: "CSS3",
    background: "#0e1a26",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/javascript.svg",
    label: "JavaScript",
    background: "#1f1d0b",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/react.svg",
    label: "React",
    background: "#0b151f",
    imgStyle: { padding: "16px" },
  },
  {
    src: "/logos/tailwindcss.svg",
    label: "Tailwind CSS",
    background: "#081c22",
    imgStyle: { padding: "18px" },
  },
];

/* ------------------------------------------------------------- */
/*  2. Backend Development Icons                                 */
/* ------------------------------------------------------------- */
const backendIcons = [
  {
    src: "/logos/nodedotjs.svg",
    label: "Node.js",
    background: "#0e1c12",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/express.svg",
    label: "Express",
    background: "#18181b",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/mongodb.svg",
    label: "MongoDB",
    background: "#0c1d12",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/supabase.svg",
    label: "Supabase",
    background: "#0d2019",
    imgStyle: { padding: "18px" },
  },
];

/* ------------------------------------------------------------- */
/*  3. App / Mobile Development Icons                            */
/* ------------------------------------------------------------- */
const mobileIcons = [
  {
    src: "/logos/flutter.svg",
    label: "Flutter",
    background: "#0c1c2e",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/dart.svg",
    label: "Dart",
    background: "#09192b",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/android.svg",
    label: "Android",
    background: "#0e2318",
    imgStyle: { padding: "18px" },
  },
];

/* ------------------------------------------------------------- */
/*  4. UI/UX & Graphic Design Icons                              */
/* ------------------------------------------------------------- */
const designIcons = [
  {
    src: "/logos/figma.svg",
    label: "Figma",
    background: "#1e1416",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/ps.png",
    label: "Photoshop",
    background: "#001e36",
  },
  {
    src: "/logos/AI.png",
    label: "Illustrator",
    background: "#330000",
  },
  {
    src: "/logos/adobexd.svg",
    label: "Adobe XD",
    background: "#2e0b24",
    imgStyle: { padding: "18px" },
  },
];

/* ------------------------------------------------------------- */
/*  5. Motion Graphics & Video Editing Icons                     */
/* ------------------------------------------------------------- */
const motionIcons = [
  {
    src: "/logos/ae.png",
    label: "After Effects",
    background: "#00005b",
  },
  {
    src: "/logos/pr.png",
    label: "Premiere Pro",
    background: "#00005b",
  },
  {
    src: "/logos/adobemediaencoder.svg",
    label: "Media Encoder",
    background: "#1a1630",
    imgStyle: { padding: "14px" },
  },
];

/* ------------------------------------------------------------- */
/*  6. AI & Emerging Technologies Icons                          */
/* ------------------------------------------------------------- */
const aiIcons = [
  {
    src: "/logos/googlegemini.svg",
    label: "Google Gemini",
    background: "#1b1429",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/openrouter.svg",
    label: "OpenRouter",
    background: "#12142d",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/openai.svg",
    label: "OpenAI",
    background: "#18181b",
    imgStyle: { padding: "18px" },
  },
];

/* ------------------------------------------------------------- */
/*  7. Digital Marketing & Advertising Icons                     */
/* ------------------------------------------------------------- */
const marketingIcons = [
  {
    src: "/logos/meta.svg",
    label: "Meta",
    background: "#0b192e",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/facebook.svg",
    label: "Facebook",
    background: "#0b1a30",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/instagram.svg",
    label: "Instagram",
    background: "#260e1b",
    imgStyle: { padding: "18px" },
  },
];

/* ------------------------------------------------------------- */
/*  8. Product Strategy & Software Architecture Icons            */
/* ------------------------------------------------------------- */
const productArchitectureIcons = [
  {
    src: "/logos/supabase.svg",
    label: "Supabase",
    background: "#0d2019",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/figma.svg",
    label: "Figma",
    background: "#1e1416",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/github.svg",
    label: "GitHub",
    background: "#18181b",
    imgStyle: { padding: "18px" },
  },
  {
    src: "/logos/postgresql.svg",
    label: "PostgreSQL",
    background: "#0e1828",
    imgStyle: { padding: "18px" },
  },
];

/* ------------------------------------------------------------- */
/*  All 8 Curated Folders Metadata                               */
/* ------------------------------------------------------------- */
const allFolders = [
  {
    id: "frontend",
    category: "dev",
    title: "Frontend",
    badge: "FRONTEND STACK",
    tags: ["React.js", "JavaScript", "Tailwind CSS", "HTML5 / CSS3", "REST APIs"],
    icons: frontendIcons,
    spread: 52,
  },
  {
    id: "backend",
    category: "dev",
    title: "Backend",
    badge: "BACKEND STACK",
    tags: ["Node.js", "Express.js", "MongoDB", "Supabase", "REST APIs"],
    icons: backendIcons,
    spread: 60,
  },
  {
    id: "mobile",
    category: "dev",
    title: "Mobile Apps",
    badge: "MOBILE DEV",
    tags: ["Flutter", "Dart", "Android", "iOS", "Cross-Platform"],
    icons: mobileIcons,
    spread: 68,
  },
  {
    id: "design",
    category: "design",
    title: "UI/UX Design",
    badge: "UI & VISUAL",
    tags: ["Figma", "Photoshop", "Illustrator", "Adobe XD", "UI/UX"],
    icons: designIcons,
    spread: 60,
  },
  {
    id: "motion",
    category: "design",
    title: "Motion & Video",
    badge: "MOTION & VIDEO",
    tags: ["After Effects", "Premiere Pro", "Media Encoder", "2D Motion"],
    icons: motionIcons,
    spread: 68,
  },
  {
    id: "ai",
    category: "strategy",
    title: "AI & Automation",
    badge: "AI & AUTOMATION",
    tags: ["Google Gemini", "OpenRouter", "OpenAI", "Prompt Eng", "Automations"],
    icons: aiIcons,
    spread: 68,
  },
  {
    id: "marketing",
    category: "strategy",
    title: "Digital Marketing",
    badge: "MARKETING",
    tags: ["Meta Ads", "Facebook Ads", "Instagram Ads", "Lead Gen", "Campaigns"],
    icons: marketingIcons,
    spread: 68,
  },
  {
    id: "product",
    category: "strategy",
    title: "Product Strategy",
    badge: "ARCHITECTURE",
    tags: ["SaaS Planning", "Architecture", "Database Design", "RBAC", "Dashboards"],
    icons: productArchitectureIcons,
    spread: 60,
  },
];

/* ------------------------------------------------------------- */
/*  Category Filter Tabs                                         */
/* ------------------------------------------------------------- */
const filterTabs = [
  { id: "all", label: "All Capabilities", count: 8 },
  { id: "dev", label: "Engineering", count: 3 },
  { id: "design", label: "Design & Motion", count: 2 },
  { id: "strategy", label: "AI & Strategy", count: 3 },
];

export default function FolderShowcase() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredFolders =
    activeFilter === "all"
      ? allFolders
      : allFolders.filter((f) => f.category === activeFilter);

  return (
    <section
      className="folders-section relative py-24 sm:py-32 px-4 md:px-8 border-t border-neutral-900 bg-black/60 overflow-hidden"
      id="toolkit"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(56,189,248,0.06),transparent)]" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-2xl">
          <div className="section-tag justify-center flex mb-3">
            <span>02. TOOLKIT &amp; EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Curated Capabilities.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Explore the specialized environments, engineering frameworks, and creative suites powering
            every digital experience. Hover or tap each folder to inspect.
          </p>
        </div>

        {/* Clean Interactive Category Filter Switcher */}
        <div className="mb-14 sm:mb-16 flex flex-wrap justify-center gap-2 sm:gap-2.5 p-1.5 rounded-full bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-md shadow-inner">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-white font-semibold shadow-xs"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full bg-neutral-800 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-sky-400/20 text-sky-300"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Spacious, Balanced Responsive Layout (Auto-Centered Rows) */}
        <motion.div
          layout
          className="flex flex-wrap justify-center items-center gap-x-10 sm:gap-x-12 gap-y-16 sm:gap-y-20 w-full max-w-[1280px] mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredFolders.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex justify-center w-full sm:w-[380px] max-w-[390px]"
              >
                <IconFolder
                  title={item.title}
                  badge={item.badge}
                  tags={item.tags}
                  icons={item.icons}
                  spread={item.spread}
                  theme="dark"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
