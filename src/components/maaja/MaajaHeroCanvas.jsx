import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Helper to create a rounded rectangle Shape for extruded phone      */
/* ------------------------------------------------------------------ */
function createRoundedRectShape(width, height, radius) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

/* ------------------------------------------------------------------ */
/*  Create a photorealistic smartphone 3D Mesh in Three.js            */
/* ------------------------------------------------------------------ */
function createPhoneMesh(texturePath, textureLoader) {
  const phoneGroup = new THREE.Group();

  const phoneW = 2.45;
  const phoneH = 5.25;
  const phoneD = 0.22;
  const cornerR = 0.38;

  // 1. Phone Body (Anodized Dark Titanium Chassis)
  const bodyShape = createRoundedRectShape(phoneW, phoneH, cornerR);
  const extrudeSettings = {
    depth: phoneD,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  };
  const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
  bodyGeo.center();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x22242a,
    metalness: 0.9,
    roughness: 0.26,
    envMapIntensity: 1.0,
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  phoneGroup.add(bodyMesh);

  // 2. Bezel Edge Ring (Machined Titanium Chamfer)
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x383a42,
    metalness: 0.95,
    roughness: 0.18,
  });
  const bezelShape = createRoundedRectShape(phoneW + 0.03, phoneH + 0.03, cornerR + 0.015);
  const bezelGeo = new THREE.ExtrudeGeometry(bezelShape, {
    depth: 0.03,
    bevelEnabled: false,
  });
  bezelGeo.center();
  const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
  bezelMesh.position.z = 0.02;
  phoneGroup.add(bezelMesh);

  // 3. Screen Face with Real Flutter App Texture
  const screenW = phoneW - 0.16;
  const screenH = phoneH - 0.16;
  const screenCornerR = cornerR - 0.08;
  const screenShape = createRoundedRectShape(screenW, screenH, screenCornerR);
  const screenGeo = new THREE.ShapeGeometry(screenShape, 24);

  // Texture UV mapping
  const pos = screenGeo.attributes.position;
  const uvs = [];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const u = (x + screenW / 2) / screenW;
    const v = (y + screenH / 2) / screenH;
    uvs.push(u, v);
  }
  screenGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  const screenTex = textureLoader.load(texturePath, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
  });

  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    roughness: 0.12,
    metalness: 0.04,
    envMapIntensity: 0.8,
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.z = phoneD / 2 + 0.05;
  screenMesh.receiveShadow = true;
  phoneGroup.add(screenMesh);

  // 4. Physical Glass Specular Reflection Overlay
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
    roughness: 0.05,
    metalness: 0.05,
    transmission: 0.9,
    ior: 1.5,
  });
  const glassMesh = new THREE.Mesh(screenGeo.clone(), glassMat);
  glassMesh.position.z = phoneD / 2 + 0.055;
  phoneGroup.add(glassMesh);

  // 5. Dynamic Island / Punch Hole Notch
  const notchShape = createRoundedRectShape(0.55, 0.16, 0.08);
  const notchGeo = new THREE.ShapeGeometry(notchShape, 12);
  const notchMat = new THREE.MeshBasicMaterial({ color: 0x050507 });
  const notchMesh = new THREE.Mesh(notchGeo, notchMat);
  notchMesh.position.set(0, screenH / 2 - 0.22, phoneD / 2 + 0.06);
  phoneGroup.add(notchMesh);

  // 6. Camera Lens Aperture Dot inside notch
  const lensGeo = new THREE.CircleGeometry(0.035, 16);
  const lensMat = new THREE.MeshBasicMaterial({ color: 0x1a1c22 });
  const lensMesh = new THREE.Mesh(lensGeo, lensMat);
  lensMesh.position.set(0.12, screenH / 2 - 0.22, phoneD / 2 + 0.063);
  phoneGroup.add(lensMesh);

  // 7. Neutral Physical Contact Drop Shadow
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const sCtx = shadowCanvas.getContext('2d');
  const grad = sCtx.createRadialGradient(64, 64, 8, 64, 64, 58);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.22)');
  grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.05)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 128, 128);

  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  const shadowGeo = new THREE.PlaneGeometry(3.6, 6.4);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.set(0, -0.2, -0.5);
  phoneGroup.add(shadowMesh);

  return phoneGroup;
}

export default function MaajaHeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth <= 768;

    // Scene & Camera
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 720;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 12 : 9.6);

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = !isMobile;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed, fallback will show', e);
      return;
    }

    // Studio Photographic Lighting
    const ambientLight = new THREE.AmbientLight(0xf5f7fa, 1.4);
    scene.add(ambientLight);

    // Key Light (Top-Right Studio Light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 7, 7);
    keyLight.castShadow = !isMobile;
    if (!isMobile) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    // Left Chamfer Rim Light
    const rimLightLeft = new THREE.DirectionalLight(0xf0f3fa, 1.8);
    rimLightLeft.position.set(-6, 5, 3);
    scene.add(rimLightLeft);

    // Subtle Under Fill Bounce
    const floorFill = new THREE.DirectionalLight(0xe5e8f0, 0.9);
    floorFill.position.set(0, -6, 4);
    scene.add(floorFill);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // ─────────────────────────────────────────────────────────────
    // Grounded Three-Phone Architectural Assembly
    // ─────────────────────────────────────────────────────────────
    // 1. Center Phone: Home Dashboard
    const phoneCenter = createPhoneMesh('/projects/maaja/home_dashboard.jpg', textureLoader);
    phoneCenter.position.set(0, 0, 0.35);
    phoneCenter.rotation.set(0.02, 0, 0);
    scene.add(phoneCenter);

    // 2. Left Phone: Welcome & Biometric Auth
    const phoneLeft = createPhoneMesh('/projects/maaja/welcome_auth.jpg', textureLoader);
    phoneLeft.position.set(isMobile ? -1.55 : -2.75, isMobile ? -0.25 : -0.12, isMobile ? -0.7 : -0.5);
    phoneLeft.rotation.set(0.04, 0.22, -0.04);
    scene.add(phoneLeft);

    // 3. Right Phone: Document Intelligence & OCR Extraction
    const phoneRight = createPhoneMesh('/projects/maaja/document_intelligence.jpg', textureLoader);
    phoneRight.position.set(isMobile ? 1.55 : 2.75, isMobile ? -0.25 : -0.12, isMobile ? -0.7 : -0.5);
    phoneRight.rotation.set(0.04, -0.22, 0.04);
    scene.add(phoneRight);

    // Mouse Parallax Interaction (Subtle, tactile, non-bobbing)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.3;
      targetMouseY = y * 0.2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Touch Interaction
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetMouseX = x * 0.2;
        targetMouseY = y * 0.15;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Clock & Render Loop (Smooth 3D Floating Levitation & Cursor Track)
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth cursor lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.045;
      currentMouseY += (targetMouseY - currentMouseY) * 0.045;

      // Subtle sinusoidal floating breathing
      const floatCenter = Math.sin(elapsedTime * 1.1) * 0.08;
      const floatLeft = Math.sin(elapsedTime * 1.05 + 1.2) * 0.09;
      const floatRight = Math.sin(elapsedTime * 1.08 + 2.4) * 0.09;

      // Center Phone: Resting stance with cursor orientation & floating
      phoneCenter.position.set(0, floatCenter, 0.35);
      phoneCenter.rotation.y = currentMouseX * 0.25;
      phoneCenter.rotation.x = 0.02 - currentMouseY * 0.2;

      // Left Phone: Grounded angled stance with floating
      phoneLeft.position.set(
        isMobile ? -1.55 : -2.75,
        (isMobile ? -0.25 : -0.12) + floatLeft,
        isMobile ? -0.7 : -0.5
      );
      phoneLeft.rotation.y = 0.22 + currentMouseX * 0.2;
      phoneLeft.rotation.x = 0.04 - currentMouseY * 0.16;

      // Right Phone: Grounded angled stance with floating
      phoneRight.position.set(
        isMobile ? 1.55 : 2.75,
        (isMobile ? -0.25 : -0.12) + floatRight,
        isMobile ? -0.7 : -0.5
      );
      phoneRight.rotation.y = -0.22 + currentMouseX * 0.2;
      phoneRight.rotation.x = 0.04 - currentMouseY * 0.16;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 720;
      camera.aspect = w / h;
      camera.position.z = w <= 768 ? 12 : 9.6;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[560px] lg:min-h-[680px] overflow-hidden select-none">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Clean Subtle Studio Ground Horizon */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/[0.04] to-transparent z-0" />

      {/* Monospace System Telemetry Chips (Quiet, Non-Pulsing) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-between items-center px-6 text-[11px] font-mono text-neutral-500">
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/80 border border-neutral-200/80 backdrop-blur-sm shadow-xs">
          Interactive 3D viewport • Cursor parallax active
        </span>
        <span className="px-2.5 py-1 rounded bg-white/80 border border-neutral-200/80 backdrop-blur-sm shadow-xs">
          Retina 20:9 • 462×1024 native textures
        </span>
      </div>
    </div>
  );
}
