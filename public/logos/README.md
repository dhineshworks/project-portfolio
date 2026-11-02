# Brand & Tool Logos (`/public/logos/`)

This directory contains PNG logos and brand marks used across the portfolio, especially within the **Icon Folder** components (`@romanvasnev/icon-folder`).

## Available Logo PNGs:
- `ae.png` — Adobe After Effects
- `ps.png` — Adobe Photoshop
- `AI.png` — Adobe Illustrator
- `pr.png` — Adobe Premiere Pro
- `meta.png` — Meta / Facebook
- `instagram.png` — Instagram

## How to Add New PNG Logos:
1. Drop any square transparent PNG logo into this folder (`public/logos/your-logo.png`).
2. Reference it directly anywhere in your React code using the public URL `/logos/your-logo.png`:
   ```jsx
   {
     src: "/logos/your-logo.png",
     label: "Your App",
     background: "#18181b",
   }
   ```
3. Vite and your server will immediately serve the logo at `http://localhost:3000/logos/your-logo.png`.

