import React from "react";
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

export default function FolderShowcase() {
  return (
    <section
      className="folders-section relative py-24 px-4 md:px-8 border-t border-neutral-900 bg-black/60 overflow-hidden"
      id="toolkit"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(56,189,248,0.06),transparent)]" />

      <div
        style={{
          width: "100%",
          maxWidth: "1360px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "680px" }}>
          <div
            className="section-tag"
            style={{ justifyContent: "center", display: "flex", marginBottom: "0.75rem" }}
          >
            <span>02. TOOLKIT &amp; EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Curated Capabilities.
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Explore the specialized environments, engineering frameworks, and production tools powering
            every software, visual design, and motion project. Hover or tap each folder to open.
          </p>
        </div>

        {/* Responsive Grid with 8 Interactive Icon Folders */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-16 sm:gap-y-20 w-full max-w-[1360px] mx-auto justify-items-center">
          {/* 1. Frontend Development */}
          <div className="w-full flex justify-center max-w-[400px]">
            <IconFolder
              title="Frontend"
              badge="FRONTEND STACK"
              tags={[
                "React.js",
                "JavaScript",
                "Tailwind CSS",
                "HTML5",
                "CSS3",
                "REST APIs",
                "Responsive Web",
              ]}
              icons={frontendIcons}
              spread={54}
              theme="dark"
            />
          </div>

          {/* 2. Backend Development */}
          <div className="w-full flex justify-center max-w-[400px]">
            <IconFolder
              title="Backend"
              badge="BACKEND STACK"
              tags={[
                "Node.js",
                "Express.js",
                "MongoDB",
                "Supabase",
                "REST APIs",
                "Auth & RBAC",
                "Databases",
              ]}
              icons={backendIcons}
              spread={64}
              theme="dark"
            />
          </div>

          {/* 3. App Development */}
          <div className="w-full flex justify-center max-w-[400px]">
            <IconFolder
              title="Mobile Apps"
              badge="MOBILE DEVELOPMENT"
              tags={[
                "Flutter",
                "Dart",
                "Android",
                "iOS",
                "Cross-Platform",
                "Material 3",
                "Mobile UI",
                "API Integration",
              ]}
              icons={mobileIcons}
              spread={72}
              theme="dark"
            />
          </div>

          {/* 4. UI/UX & Graphic Design */}
          <div className="w-full flex justify-center max-w-[400px]">
            <IconFolder
              title="UI & Visual Design"
              badge="UI & VISUAL DESIGN"
              tags={[
                "Figma",
                "Photoshop",
                "Illustrator",
                "Adobe XD",
                "UI/UX Design",
                "Web Design",
                "Mobile UI",
                "Branding",
              ]}
              icons={designIcons}
              spread={64}
              theme="dark"
            />
          </div>

          {/* 5. Motion Graphics & Video Editing */}
          <div className="w-full flex justify-center max-w-[400px]">
            <IconFolder
              title="Motion & Video"
              badge="MOTION & VIDEO"
              tags={[
                "After Effects",
                "Premiere Pro",
                "Media Encoder",
                "Motion Graphics",
                "2D Animation",
                "Video Editing",
                "Kinetic Type",
              ]}
              icons={motionIcons}
              spread={72}
              theme="dark"
            />
          </div>

          {/* 6. AI & Emerging Technologies */}
          <div className="w-full flex justify-center max-w-[400px]">
            <IconFolder
              title="AI & Automation"
              badge="AI & AUTOMATION"
              tags={[
                "Google Gemini",
                "OpenRouter",
                "OpenAI",
                "Prompt Engineering",
                "AI APIs",
                "AI Video/Image",
                "Automations",
              ]}
              icons={aiIcons}
              spread={72}
              theme="dark"
            />
          </div>

          {/* 7. Digital Marketing & Advertising */}
          <div className="w-full flex justify-center max-w-[400px]">
            <IconFolder
              title="Digital Marketing"
              badge="DIGITAL MARKETING"
              tags={[
                "Meta Ads",
                "Facebook Ads",
                "Instagram Ads",
                "Lead Generation",
                "Campaigns",
                "Ad Creatives",
                "Social Media",
              ]}
              icons={marketingIcons}
              spread={72}
              theme="dark"
            />
          </div>

          {/* 8. Product Strategy & Software Architecture */}
          <div className="w-full flex justify-center max-w-[400px]">
            <IconFolder
              title="Product & Architecture"
              badge="PRODUCT ENGINEERING"
              tags={[
                "SaaS Planning",
                "System Architecture",
                "Database Design",
                "RBAC",
                "Multi-Branch",
                "Dashboards",
                "Workflow Design",
              ]}
              icons={productArchitectureIcons}
              spread={64}
              theme="dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
