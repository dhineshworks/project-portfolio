import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. FRONT CARD SVG (1024 x 1440)
const frontSvg = `
<svg width="1024" height="1440" viewBox="0 0 1024 1440" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0f19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#070a13" />
    </linearGradient>

    <linearGradient id="primaryAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="50%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>

    <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="40%" stop-color="#d97706" />
      <stop offset="70%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>

    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="50%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>

    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1.5" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1440" fill="url(#bgGrad)" />
  <rect width="1024" height="1440" fill="url(#grid)" />

  <!-- Outer metallic border frame -->
  <rect x="24" y="24" width="976" height="1392" rx="36" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="4" />
  <rect x="36" y="36" width="952" height="1368" rx="28" fill="none" stroke="url(#primaryAccent)" stroke-width="2" stroke-opacity="0.4" />

  <!-- Top lanyard punch hole reference buffer -->
  <rect x="362" y="55" width="300" height="60" rx="30" fill="none" stroke="rgba(255,255,255,0.15)" stroke-dasharray="8 6" stroke-width="3" />
  <text x="512" y="93" fill="rgba(255,255,255,0.4)" font-family="system-ui, sans-serif" font-size="16" font-weight="600" text-anchor="middle" letter-spacing="4">LANYARD ATTACHMENT</text>

  <!-- Header section -->
  <g transform="translate(70, 160)">
    <text x="0" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="22" font-weight="700" letter-spacing="6">ALL-ACCESS DEVELOPER PASS</text>
    <text x="0" y="60" fill="rgba(255,255,255,0.5)" font-family="system-ui, sans-serif" font-size="16" letter-spacing="2">SECURITY LEVEL: VERIFIED</text>
    <text x="884" y="30" fill="#94a3b8" font-family="monospace" font-size="20" font-weight="700" text-anchor="end">ID #DK-2026-DEV</text>
    
    <!-- Header underline -->
    <rect x="0" y="80" width="884" height="3" fill="url(#primaryAccent)" />
  </g>

  <!-- Smart Chip + NFC Graphic -->
  <g transform="translate(100, 290)">
    <!-- Golden Chip -->
    <rect width="130" height="100" rx="14" fill="url(#chipGrad)" stroke="#78350f" stroke-width="3" />
    <!-- Chip contacts -->
    <path d="M 0 50 L 130 50 M 45 0 L 45 100 M 85 0 L 85 100 M 45 25 L 85 25 M 45 75 L 85 75" fill="none" stroke="#78350f" stroke-width="3" opacity="0.85" />
    <circle cx="65" cy="50" r="14" fill="url(#chipGrad)" stroke="#78350f" stroke-width="2.5" />
    
    <!-- NFC Contactless Symbol -->
    <g transform="translate(740, 15)">
      <path d="M 20 15 A 25 25 0 0 1 20 65" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" />
      <path d="M 35 5 A 40 40 0 0 1 35 75" fill="none" stroke="#6366f1" stroke-width="5" stroke-linecap="round" />
      <path d="M 50 -5 A 55 55 0 0 1 50 85" fill="none" stroke="#a855f7" stroke-width="5" stroke-linecap="round" />
    </g>
  </g>

  <!-- Profile Card Container -->
  <g transform="translate(512, 490)">
    <!-- Avatar Glowing Ring -->
    <circle cx="0" cy="0" r="115" fill="none" stroke="url(#primaryAccent)" stroke-width="6" />
    <circle cx="0" cy="0" r="102" fill="url(#avatarGrad)" />
    
    <!-- Avatar Initials / Silhouette -->
    <text x="0" y="28" fill="#ffffff" font-family="system-ui, sans-serif" font-size="78" font-weight="900" text-anchor="middle" letter-spacing="4">DK</text>

    <!-- Name & Subtitles -->
    <text x="0" y="180" fill="#ffffff" font-family="system-ui, sans-serif" font-size="48" font-weight="800" text-anchor="middle" letter-spacing="2">DHINESH KUMAR R</text>
    
    <rect x="-240" y="206" width="480" height="42" rx="21" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" stroke-width="1.5" />
    <text x="0" y="234" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="20" font-weight="700" text-anchor="middle" letter-spacing="3">FULLSTACK DEVELOPER</text>

    <text x="0" y="285" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="22" font-weight="500" text-anchor="middle">Multimedia Specialist • UI/UX Designer</text>
  </g>

  <!-- Status indicator badge -->
  <g transform="translate(512, 840)">
    <rect x="-170" y="-22" width="340" height="44" rx="22" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2" />
    <circle cx="-130" cy="0" r="7" fill="#10b981" />
    <text x="-105" y="7" fill="#34d399" font-family="system-ui, sans-serif" font-size="18" font-weight="700" letter-spacing="1.5">AVAILABLE FOR WORK</text>
  </g>

  <!-- Tech tags grid -->
  <g transform="translate(100, 930)">
    <g transform="translate(0, 0)">
      <rect width="180" height="52" rx="12" fill="rgba(56, 189, 248, 0.1)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1.5" />
      <text x="90" y="33" fill="#e0f2fe" font-family="system-ui, sans-serif" font-size="20" font-weight="600" text-anchor="middle">React.js</text>
    </g>
    <g transform="translate(210, 0)">
      <rect width="180" height="52" rx="12" fill="rgba(99, 102, 241, 0.1)" stroke="rgba(99, 102, 241, 0.3)" stroke-width="1.5" />
      <text x="90" y="33" fill="#ede9fe" font-family="system-ui, sans-serif" font-size="20" font-weight="600" text-anchor="middle">Node.js</text>
    </g>
    <g transform="translate(420, 0)">
      <rect width="190" height="52" rx="12" fill="rgba(236, 72, 153, 0.1)" stroke="rgba(236, 72, 153, 0.3)" stroke-width="1.5" />
      <text x="95" y="33" fill="#fce7f3" font-family="system-ui, sans-serif" font-size="20" font-weight="600" text-anchor="middle">MongoDB</text>
    </g>
    <g transform="translate(640, 0)">
      <rect width="184" height="52" rx="12" fill="rgba(6, 182, 212, 0.1)" stroke="rgba(6, 182, 212, 0.3)" stroke-width="1.5" />
      <text x="92" y="33" fill="#cffafe" font-family="system-ui, sans-serif" font-size="20" font-weight="600" text-anchor="middle">UI / UX</text>
    </g>
  </g>

  <!-- Divider line -->
  <line x1="80" y1="1040" x2="944" y2="1040" stroke="rgba(255,255,255,0.12)" stroke-width="2" />

  <!-- Barcode & Serial Bottom Area -->
  <g transform="translate(100, 1090)">
    <!-- Barcode lines -->
    <g fill="#f8fafc">
      <rect x="0" y="0" width="8" height="90" />
      <rect x="14" y="0" width="4" height="90" />
      <rect x="24" y="0" width="12" height="90" />
      <rect x="42" y="0" width="6" height="90" />
      <rect x="54" y="0" width="16" height="90" />
      <rect x="76" y="0" width="6" height="90" />
      <rect x="88" y="0" width="10" height="90" />
      <rect x="104" y="0" width="4" height="90" />
      <rect x="114" y="0" width="14" height="90" />
      <rect x="134" y="0" width="6" height="90" />
      <rect x="146" y="0" width="18" height="90" />
      <rect x="170" y="0" width="4" height="90" />
      <rect x="180" y="0" width="10" height="90" />
      <rect x="196" y="0" width="14" height="90" />
      <rect x="216" y="0" width="8" height="90" />
      <rect x="230" y="0" width="4" height="90" />
      <rect x="240" y="0" width="16" height="90" />
      <rect x="262" y="0" width="6" height="90" />
      <rect x="274" y="0" width="10" height="90" />
      <rect x="290" y="0" width="14" height="90" />
      <rect x="310" y="0" width="8" height="90" />
      <rect x="324" y="0" width="4" height="90" />
      <rect x="334" y="0" width="12" height="90" />
      <rect x="352" y="0" width="18" height="90" />
      <rect x="376" y="0" width="6" height="90" />
      <rect x="388" y="0" width="14" height="90" />
      <rect x="408" y="0" width="6" height="90" />
      <rect x="420" y="0" width="10" height="90" />
      <rect x="436" y="0" width="16" height="90" />
      <rect x="458" y="0" width="4" height="90" />
      <rect x="468" y="0" width="12" height="90" />
      <rect x="486" y="0" width="16" height="90" />
      <rect x="508" y="0" width="8" height="90" />
    </g>

    <text x="0" y="125" fill="#64748b" font-family="monospace" font-size="20" letter-spacing="10">88294 77102 99014</text>

    <!-- Holographic badge emblem -->
    <g transform="translate(710, 45)">
      <circle cx="45" cy="15" r="55" fill="none" stroke="url(#primaryAccent)" stroke-width="4" stroke-dasharray="10 5" />
      <polygon points="45,-25 75,35 15,35" fill="none" stroke="#fbbf24" stroke-width="3" />
      <text x="45" y="23" fill="#ffffff" font-family="system-ui, sans-serif" font-size="16" font-weight="900" text-anchor="middle">OFFICIAL</text>
    </g>
  </g>

  <!-- Footer security text -->
  <text x="512" y="1340" fill="rgba(255,255,255,0.35)" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle" letter-spacing="3">DHINESH KUMAR R • CREATIVE ENGINEER PORTFOLIO PASS</text>
</svg>
`;

// 2. BACK CARD SVG (1024 x 1440)
const backSvg = `
<svg width="1024" height="1440" viewBox="0 0 1024 1440" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070a13" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <linearGradient id="accentBack" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>

    <linearGradient id="magStripe" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <pattern id="backGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1.5" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1440" fill="url(#bgBackGrad)" />
  <rect width="1024" height="1440" fill="url(#backGrid)" />

  <!-- Outer frame -->
  <rect x="24" y="24" width="976" height="1392" rx="36" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="4" />

  <!-- Top Magnetic Stripe -->
  <rect x="36" y="150" width="952" height="160" fill="url(#magStripe)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2" />
  <line x1="36" y1="230" x2="988" y2="230" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1.5" />
  <text x="80" y="245" fill="rgba(255,255,255,0.2)" font-family="monospace" font-size="14" letter-spacing="12">TRACK 1 / TRACK 2 ENCRYPTED MAGNETICS // AUTH: DK-2026</text>

  <!-- Signature Strip -->
  <g transform="translate(80, 360)">
    <rect width="864" height="90" rx="8" fill="#e2e8f0" />
    <line x1="20" y1="45" x2="844" y2="45" stroke="#cbd5e1" stroke-dasharray="6 4" stroke-width="1.5" />
    <!-- Handwritten faux signature -->
    <path d="M 60 55 Q 110 15 150 48 T 230 40 T 320 52 T 400 35 T 480 50" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />
    <text x="80" y="75" fill="#475569" font-family="'Brush Script MT', cursive, sans-serif" font-size="34" font-weight="bold">Dhinesh Kumar R</text>
    <text x="830" y="55" fill="#64748b" font-family="monospace" font-size="18" font-weight="bold" text-anchor="end">CVC: 489</text>
  </g>

  <!-- Certifications and Verification section -->
  <g transform="translate(80, 520)">
    <text x="0" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="24" font-weight="800" letter-spacing="4">VERIFIED CERTIFICATIONS</text>
    <rect x="0" y="48" width="864" height="2" fill="url(#accentBack)" />

    <!-- Cert 1 -->
    <g transform="translate(0, 80)">
      <rect width="864" height="74" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
      <circle cx="45" cy="37" r="18" fill="#6366f1" />
      <text x="45" y="44" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" text-anchor="middle">✓</text>
      <text x="85" y="36" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="20" font-weight="700">Full Stack Development</text>
      <text x="85" y="58" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="16">ACTE Certified Professional</text>
      <rect x="730" y="22" width="110" height="30" rx="15" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" />
      <text x="785" y="43" fill="#a5b4fc" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">VERIFIED</text>
    </g>

    <!-- Cert 2 -->
    <g transform="translate(0, 175)">
      <rect width="864" height="74" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
      <circle cx="45" cy="37" r="18" fill="#38bdf8" />
      <text x="45" y="44" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" text-anchor="middle">✓</text>
      <text x="85" y="36" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="20" font-weight="700">Digital Marketing Certification</text>
      <text x="85" y="58" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="16">Udemy Certified Specialist</text>
      <rect x="730" y="22" width="110" height="30" rx="15" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" />
      <text x="785" y="43" fill="#7dd3fc" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">VERIFIED</text>
    </g>

    <!-- Cert 3 -->
    <g transform="translate(0, 270)">
      <rect width="864" height="74" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
      <circle cx="45" cy="37" r="18" fill="#ec4899" />
      <text x="45" y="44" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" text-anchor="middle">✓</text>
      <text x="85" y="36" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="20" font-weight="700">Graphic Design, Motion &amp; Multimedia</text>
      <text x="85" y="58" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="16">Udemy Certified Specialist</text>
      <rect x="730" y="22" width="110" height="30" rx="15" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" />
      <text x="785" y="43" fill="#f472b6" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">VERIFIED</text>
    </g>
  </g>

  <!-- QR Code + Socials Bottom Section -->
  <g transform="translate(80, 930)">
    <!-- QR Code Block -->
    <rect width="260" height="260" rx="18" fill="#ffffff" stroke="rgba(255,255,255,0.2)" stroke-width="4" />
    
    <!-- Stylized QR matrix -->
    <g fill="#0f172a" transform="translate(20, 20)">
      <!-- Corner Markers -->
      <rect x="0" y="0" width="60" height="60" rx="6" />
      <rect x="10" y="10" width="40" height="40" rx="3" fill="#ffffff" />
      <rect x="18" y="18" width="24" height="24" rx="2" fill="#0f172a" />

      <rect x="160" y="0" width="60" height="60" rx="6" />
      <rect x="170" y="10" width="40" height="40" rx="3" fill="#ffffff" />
      <rect x="178" y="18" width="24" height="24" rx="2" fill="#0f172a" />

      <rect x="0" y="160" width="60" height="60" rx="6" />
      <rect x="10" y="170" width="40" height="40" rx="3" fill="#ffffff" />
      <rect x="18" y="178" width="24" height="24" rx="2" fill="#0f172a" />

      <!-- Center pattern dots -->
      <rect x="80" y="10" width="20" height="40" />
      <rect x="120" y="25" width="25" height="20" />
      <rect x="75" y="75" width="70" height="70" rx="8" fill="#6366f1" />
      <text x="110" y="118" fill="#ffffff" font-family="system-ui, sans-serif" font-size="22" font-weight="900" text-anchor="middle">DK</text>
      <rect x="25" y="80" width="30" height="20" />
      <rect x="30" y="120" width="25" height="25" />
      <rect x="165" y="85" width="40" height="20" />
      <rect x="180" y="125" width="30" height="30" />
      <rect x="80" y="165" width="20" height="45" />
      <rect x="120" y="170" width="45" height="20" />
      <rect x="185" y="185" width="25" height="25" />
    </g>

    <!-- Social info next to QR -->
    <g transform="translate(300, 20)">
      <text x="0" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-size="26" font-weight="800">CONNECT &amp; EXPLORE</text>
      <text x="0" y="65" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="18">Scan QR for GitHub &amp; Live Portfolio</text>

      <g transform="translate(0, 105)">
        <text x="0" y="0" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="20" font-weight="700">GitHub:</text>
        <text x="100" y="0" fill="#e2e8f0" font-family="monospace" font-size="18">github.com/dhineshworks</text>

        <text x="0" y="45" fill="#6366f1" font-family="system-ui, sans-serif" font-size="20" font-weight="700">LinkedIn:</text>
        <text x="100" y="45" fill="#e2e8f0" font-family="monospace" font-size="18">in/dhineshkumar-r-43baa8253</text>

        <text x="0" y="90" fill="#10b981" font-family="system-ui, sans-serif" font-size="20" font-weight="700">Featured:</text>
        <text x="100" y="90" fill="#e2e8f0" font-family="monospace" font-size="18">SoftSync E-Commerce Platform</text>
      </g>
    </g>
  </g>

  <!-- Legal / Footer disclaimer -->
  <text x="512" y="1330" fill="rgba(255,255,255,0.4)" font-family="system-ui, sans-serif" font-size="15" text-anchor="middle" letter-spacing="2">PROPERTY OF DHINESH KUMAR R • CREATIVE &amp; TECH LAB</text>
  <text x="512" y="1360" fill="rgba(255,255,255,0.2)" font-family="monospace" font-size="13" text-anchor="middle">ISSUED: JUNE 2026 • REVISION 2.4.0 • STATUS: ACTIVE</text>
</svg>
`;

// 3. LANYARD STRAP / BAND SVG (1024 x 256)
// Horizontal ribbon: text runs left to right, stitched edges along top and bottom
const bandSvg = `
<svg width="1024" height="256" viewBox="0 0 1024 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#18181b" />
      <stop offset="50%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#18181b" />
    </linearGradient>

    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#818cf8" />
    </linearGradient>

    <pattern id="weavePattern" width="16" height="16" patternUnits="userSpaceOnUse">
      <path d="M 0 8 L 8 0 L 16 8 L 8 16 Z" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" />
    </pattern>
  </defs>

  <!-- Strap base background -->
  <rect width="1024" height="256" fill="url(#bandGrad)" />
  <rect width="1024" height="256" fill="url(#weavePattern)" />

  <!-- Stitched top and bottom borders -->
  <line x1="0" y1="20" x2="1024" y2="20" stroke="#6366f1" stroke-dasharray="14 8" stroke-width="5" />
  <line x1="0" y1="36" x2="1024" y2="36" stroke="rgba(255,255,255,0.2)" stroke-dasharray="8 6" stroke-width="2" />
  
  <line x1="0" y1="236" x2="1024" y2="236" stroke="#38bdf8" stroke-dasharray="14 8" stroke-width="5" />
  <line x1="0" y1="220" x2="1024" y2="220" stroke="rgba(255,255,255,0.2)" stroke-dasharray="8 6" stroke-width="2" />

  <!-- Center Text -->
  <g transform="translate(512, 142)">
    <text x="0" y="0" fill="url(#textGrad)" font-family="system-ui, sans-serif" font-size="46" font-weight="900" text-anchor="middle" letter-spacing="10">✦ DHINESH KUMAR R • FULLSTACK DEVELOPER ✦</text>
  </g>
</svg>
`;

async function run() {
  console.log('Generating card textures...');

  await sharp(Buffer.from(frontSvg))
    .png()
    .toFile(path.join(publicDir, 'card-front.png'));
  console.log('Created public/card-front.png');

  await sharp(Buffer.from(backSvg))
    .png()
    .toFile(path.join(publicDir, 'card-back.png'));
  console.log('Created public/card-back.png');

  await sharp(Buffer.from(bandSvg))
    .png()
    .toFile(path.join(publicDir, 'band.png'));
  console.log('Created public/band.png');

  console.log('All textures generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
