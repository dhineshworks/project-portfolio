import React, { useRef, useEffect, forwardRef, useImperativeHandle, useSyncExternalStore } from 'react';
import * as THREE from 'three';

const TWO_PI = 2 * Math.PI;

const VERTEX_SHADER = `
attribute float aLane;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
varying float vLane;
void main() {
  vUv = uv;
  vLane = aLane;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const FRAGMENT_SHADER = `
uniform sampler2D uText;
uniform vec3 uBand;
uniform vec3 uInk;
uniform float uBandOn;
uniform float uShading;
uniform float uSheen;
uniform float uOpacity;
uniform vec3 uLight;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
varying float vLane;
void main() {
  vec3 n = normalize(vNormal);
  bool front = gl_FrontFacing;
  if (!front) n = -n;
  vec3 view = normalize(cameraPosition - vWorld);
  float facing = dot(n, uLight);
  float wrap = facing * 0.5 + 0.5;
  float light = mix(1.0, 0.3 + 0.62 * wrap * wrap + 0.2 * max(facing, 0.0), uShading);
  vec3 halfway = normalize(uLight + view);
  float spec = pow(max(dot(n, halfway), 0.0), 56.0) * uSheen * 0.55;
  float rim = pow(1.0 - abs(dot(n, view)), 4.0) * uSheen * 0.22;
  float glyph = texture2D(uText, vUv).a;
  bool swapped = mod(vLane, 2.0) > 0.5;
  vec3 band = swapped ? uInk : uBand;
  vec3 ink = swapped ? uBand : uInk;
  vec3 color;
  float alpha = 1.0;
  if (uBandOn > 0.5) {
    vec3 surface = front ? mix(band, ink, glyph) : band * 0.6;
    color = surface * light + vec3(spec + rim);
  } else {
    color = ink * light * (front ? 1.0 : 0.55) + vec3(spec * glyph);
    alpha = glyph;
    if (alpha < 0.01) discard;
  }
  gl_FragColor = vec4(color, alpha * uOpacity);
  #include <colorspace_fragment>
}
`;

const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
const finite = (val, fallback) => (Number.isFinite(val) ? val : fallback);
const smoothstep = (t) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

let helperCanvas = null;
let helperCtx = null;
const resolveColor = (colorStr, fallback) => {
  if (typeof document === 'undefined' || !colorStr) return fallback;
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && !CSS.supports('color', colorStr)) return fallback;
  if (!helperCtx) {
    helperCanvas = document.createElement('canvas');
    helperCanvas.width = 1;
    helperCanvas.height = 1;
    helperCtx = helperCanvas.getContext('2d', { willReadFrequently: true });
  }
  if (!helperCtx) return fallback;
  helperCtx.clearRect(0, 0, 1, 1);
  helperCtx.fillStyle = '#000000';
  helperCtx.fillStyle = colorStr;
  helperCtx.fillRect(0, 0, 1, 1);
  const data = helperCtx.getImageData(0, 0, 1, 1).data;
  return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
};

const subscribeReducedMotion = (cb) => {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * RibbonType - Reverse Engineered from React Bits Pro (https://pro.reactbits.dev/docs/components/ribbon-type)
 *
 * 3D Satin Ribbon Type animation where custom typography is rendered onto
 * dynamic flowing ribbons with real-time sheen, perspective, interaction, and ripple twists.
 */
const RibbonType = forwardRef(function RibbonType(
  {
    text = "MAKE SPACE FOR IDEAS",
    separator = "  ·  ",
    colors = ["#5227FF", "#FFFFFF"],
    band = true,
    path = "wave",
    ribbons = 1,
    gap = 120,
    ribbonWidth = 76,
    textScale = 0.5,
    fontFamily = "inherit",
    fontWeight = 700,
    letterSpacing = 0.06,
    amplitude = 70,
    frequency = 1.1,
    depth = 120,
    twist = 0.12,
    twistSpeed = 0.12,
    speed = 90,
    direction = "right", // left to right
    flow = 0.35,
    tilt = -6,
    perspective = 32,
    shading = 0.6,
    sheen = 0.4,
    hoverSpeed = 0.3,
    draggable = true,
    clickTwist = true,
    autoTwist = 0,
    intro = true,
    paused = false,
    quality = 1,
    className = "",
    style = {},
    children
  },
  ref
) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);

  const settings = {
    text,
    separator,
    colors,
    band,
    path,
    ribbons,
    gap,
    ribbonWidth,
    textScale,
    fontFamily,
    fontWeight,
    letterSpacing,
    amplitude,
    frequency,
    depth,
    twist,
    twistSpeed,
    speed,
    direction,
    flow,
    tilt,
    perspective,
    shading,
    sheen,
    hoverSpeed,
    draggable,
    clickTwist,
    autoTwist,
    intro,
    paused,
    quality,
    reduced: reducedMotion
  };

  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
    engineRef.current?.sync();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const doc = container.ownerDocument;
    const win = doc.defaultView ?? window;
    const canvas = doc.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y';
    container.insertBefore(canvas, container.firstChild);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        premultipliedAlpha: true
      });
    } catch {
      canvas.remove();
      return;
    }
    renderer.setClearColor(0, 0);

    const getSettings = () => settingsRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 1, 20000);
    const geometry = new THREE.BufferGeometry();
    const textCanvas = doc.createElement('canvas');
    const textTexture = new THREE.CanvasTexture(textCanvas);
    textTexture.wrapS = THREE.RepeatWrapping;
    textTexture.wrapT = THREE.RepeatWrapping;
    textTexture.minFilter = THREE.LinearMipmapLinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
    textTexture.generateMipmaps = true;
    textTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const bandColor = new THREE.Color("#5227FF");
    const inkColor = new THREE.Color("#FFFFFF");

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uText: { value: textTexture },
        uBand: { value: bandColor },
        uInk: { value: inkColor },
        uBandOn: { value: 1 },
        uShading: { value: 0.6 },
        uSheen: { value: 0.4 },
        uOpacity: { value: 0 },
        uLight: { value: new THREE.Vector3(-0.35, 0.55, 0.76).normalize() }
      },
      side: THREE.DoubleSide,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    let rafId = 0;
    let lastTime = 0;
    let destroyed = false;
    let isVisible = true;
    let hasAnimated = false;
    let width = 1;
    let height = 1;
    let curSegments = 0;
    let curLanes = 0;
    let textCacheKey = "";
    let colorCacheKey = "";
    let textAspect = 1;
    let animPhase = 0;
    let scrollPos = 0;
    let speedFactor = 1;
    let dragVelocity = 0;
    let introStartTime = 0;
    let nextAutoTwistTime = 0;

    let posBuf = new Float32Array(0);
    let normBuf = new Float32Array(0);
    let uvBuf = new Float32Array(0);
    let lanesData = [];
    let activeTwists = [];

    const pointerState = {
      inside: false,
      down: false,
      id: -1,
      startX: 0,
      startY: 0,
      startAt: 0,
      lastX: 0,
      lastAt: 0,
      moved: false
    };

    const tempVec = new THREE.Vector3();

    const updateMeshBuffers = () => {
      const s = getSettings();
      const segs = Math.round(520 * clamp(finite(s.quality, 1), 0.4, 1));
      const laneCount = Math.round(clamp(finite(s.ribbons, 1), 1, 3));
      if (segs === curSegments && laneCount === curLanes) return;

      curSegments = segs;
      curLanes = laneCount;
      const vertexCount = (curSegments + 1) * 2 * curLanes;

      posBuf = new Float32Array(3 * vertexCount);
      normBuf = new Float32Array(3 * vertexCount);
      uvBuf = new Float32Array(2 * vertexCount);
      const laneBuf = new Float32Array(vertexCount);
      const indices = [];

      for (let l = 0; l < curLanes; l++) {
        const base = l * (curSegments + 1) * 2;
        for (let i = 0; i <= curSegments; i++) {
          laneBuf[base + 2 * i] = l;
          laneBuf[base + 2 * i + 1] = l;
        }
        for (let i = 0; i < curSegments; i++) {
          const idx = base + 2 * i;
          indices.push(idx, idx + 2, idx + 1, idx + 1, idx + 2, idx + 3);
        }
      }

      lanesData.length = 0;
      for (let l = 0; l < curLanes; l++) {
        lanesData.push({
          points: new Float32Array((curSegments + 1) * 3),
          lengths: new Float32Array(curSegments + 1),
          total: 1
        });
      }

      geometry.dispose();
      geometry.setAttribute('position', new THREE.BufferAttribute(posBuf, 3).setUsage(THREE.DynamicDrawUsage));
      geometry.setAttribute('normal', new THREE.BufferAttribute(normBuf, 3).setUsage(THREE.DynamicDrawUsage));
      geometry.setAttribute('uv', new THREE.BufferAttribute(uvBuf, 2).setUsage(THREE.DynamicDrawUsage));
      geometry.setAttribute('aLane', new THREE.BufferAttribute(laneBuf, 1));
      geometry.setIndex(indices);
    };

    const updateTextTexture = () => {
      const s = getSettings();
      const fontFam = s.fontFamily && s.fontFamily !== 'inherit' ? s.fontFamily : win.getComputedStyle(container).fontFamily;
      const weight = Math.round(clamp(finite(s.fontWeight, 700), 100, 900));
      const spacing = clamp(finite(s.letterSpacing, 0.06), -0.2, 1);
      const textScale = clamp(finite(s.textScale, 0.5), 0.15, 0.95);
      const fullText = `${s.text ?? ''}${s.separator ?? ''}`;
      const cacheKey = `${fullText}|${fontFam}|${weight}|${spacing}|${textScale}`;
      if (cacheKey === textCacheKey) return;
      textCacheKey = cacheKey;

      const ctx = textCanvas.getContext('2d');
      if (!ctx) return;

      const raw = fullText.length > 0 ? fullText : ' ';
      const graphemes = typeof Intl !== 'undefined' && 'Segmenter' in Intl
        ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(raw), x => x.segment)
        : Array.from(raw);

      let fontSize = 120;
      const getFontStr = (px) => `${weight} ${px}px ${fontFam}`;
      ctx.font = getFontStr(120);

      const measure = (size) => {
        ctx.font = getFontStr(size);
        return graphemes.reduce((acc, ch) => acc + ctx.measureText(ch).width + spacing * size, 0);
      };

      let totalWidth = measure(fontSize);
      if (totalWidth > 8000) {
        fontSize = Math.max(24, Math.floor(8000 * fontSize / totalWidth));
        totalWidth = measure(fontSize);
      }

      const ribbonHeightPx = Math.round(fontSize / textScale);
      textCanvas.width = Math.max(2, Math.ceil(totalWidth));
      textCanvas.height = Math.max(2, ribbonHeightPx);

      ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      ctx.font = getFontStr(fontSize);
      ctx.fillStyle = '#ffffff';
      ctx.textBaseline = 'alphabetic';

      const metrics = ctx.measureText('H');
      const baselineY = ribbonHeightPx / 2 + (metrics.actualBoundingBoxAscent || 0.7 * fontSize) / 2;
      let cursorX = (spacing * fontSize) / 2;

      for (const ch of graphemes) {
        ctx.fillText(ch, cursorX, baselineY);
        cursorX += ctx.measureText(ch).width + spacing * fontSize;
      }

      textAspect = textCanvas.width / textCanvas.height;
      textTexture.dispose();
      textTexture.needsUpdate = true;
    };

    const updateColors = () => {
      const s = getSettings();
      const colArr = Array.isArray(s.colors) ? s.colors : [];
      let parentColor = '';
      const getCol = (col, fallback) => {
        const str = (col ?? '').trim();
        if (str && str.toLowerCase() !== 'currentcolor') return resolveColor(str, fallback);
        if (!parentColor) parentColor = win.getComputedStyle(container).color;
        return resolveColor(parentColor, fallback);
      };

      const c0 = getCol(colArr[0], '#5227FF');
      const c1 = getCol(colArr[1], '#FFFFFF');
      const cacheKey = `${c0}|${c1}`;
      if (cacheKey !== colorCacheKey) {
        colorCacheKey = cacheKey;
        bandColor.setStyle(c0);
        inkColor.setStyle(c1);
      }
    };

    const updateSize = () => {
      const s = getSettings();
      const rect = container.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const pr = Math.min(win.devicePixelRatio || 1, 2) * clamp(finite(s.quality, 1), 0.5, 1);
      renderer.setPixelRatio(pr);
      renderer.setSize(width, height, false);

      const fov = clamp(finite(s.perspective, 32), 10, 80);
      camera.fov = fov;
      camera.aspect = width / height;
      camera.position.set(0, 0, height / 2 / Math.tan(fov * Math.PI / 360));
      camera.near = 1;
      camera.far = 6 * camera.position.z;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    const computePathPoint = (lane, t, out, idx) => {
      const s = getSettings();
      const amp = finite(s.amplitude, 70);
      const freq = clamp(finite(s.frequency, 1.1), 0, 6);
      const depth = finite(s.depth, 120);
      const flowPhase = animPhase * clamp(finite(s.flow, 0.35), -4, 4) + 1.9 * lane;
      const gap = finite(s.gap, 120);
      const laneOffset = (lane - (curLanes - 1) / 2) * gap;

      if (s.path === 'loop') {
        const radius = Math.min(0.34 * width, 0.95 * height);
        const ang = -TWO_PI * t;
        out[idx] = radius * Math.cos(ang);
        out[idx + 1] = laneOffset + 0.35 * amp * Math.sin(2 * ang + flowPhase);
        out[idx + 2] = radius * Math.sin(ang) + 0.15 * depth * Math.sin(3 * ang - flowPhase);
        return;
      }

      const span = 1.3 * width;
      const param = (t - 0.5) * span / width;

      if (s.path === 'helix') {
        const ang = TWO_PI * freq * param + flowPhase;
        const rad = 0.9 * Math.abs(amp) + 1;
        out[idx] = (t - 0.5) * span;
        out[idx + 1] = laneOffset + rad * Math.cos(ang);
        out[idx + 2] = rad * Math.sin(ang);
        return;
      }

      // Default: "wave"
      out[idx] = (t - 0.5) * span;
      out[idx + 1] = laneOffset + amp * Math.sin(TWO_PI * freq * param + flowPhase);
      out[idx + 2] = depth * Math.sin(TWO_PI * freq * 0.5 * param + 0.6 * flowPhase + 1.3 + lane);
    };

    const computeTwistAngle = (lane, arcLen, totalLen, isLoop, nowSec) => {
      const s = getSettings();
      const basePhase = animPhase * clamp(finite(s.twistSpeed, 0.12), -4, 4) * TWO_PI + 1.7 * lane;
      const normS = isLoop ? (TWO_PI * arcLen / totalLen) : ((arcLen / Math.max(1, width)) * Math.PI);
      let twistAngle = TWO_PI * clamp(finite(s.twist, 0.12), 0, 2) * Math.sin(normS + basePhase);

      for (const tw of activeTwists) {
        if (tw.lane !== lane) continue;
        const waveDist = (nowSec - tw.start) * 760;
        let dist = Math.abs(arcLen - tw.origin);
        if (isLoop) dist = Math.min(dist, totalLen - dist);
        twistAngle += TWO_PI * smoothstep((waveDist - dist) / 460);
      }
      return twistAngle;
    };

    const triggerRippleTwist = (lane, origin, nowSec) => {
      if (getSettings().reduced) return;
      if (activeTwists.length > 6) activeTwists.shift();
      activeTwists.push({ lane, origin, start: nowSec });
    };

    const renderRibbons = (nowSec) => {
      const s = getSettings();
      const halfWidth = clamp(finite(s.ribbonWidth, 76), 8, 400) / 2;
      const isLoop = s.path === 'loop';

      for (let l = 0; l < curLanes; l++) {
        const laneData = lanesData[l];
        const points = laneData.points;

        for (let i = 0; i <= curSegments; i++) {
          computePathPoint(l, i / curSegments, points, 3 * i);
        }

        let totalLen = 0;
        laneData.lengths[0] = 0;
        for (let i = 1; i <= curSegments; i++) {
          totalLen += Math.hypot(
            points[3 * i] - points[3 * i - 3],
            points[3 * i + 1] - points[3 * i - 2],
            points[3 * i + 2] - points[3 * i - 1]
          );
          laneData.lengths[i] = totalLen;
        }
        laneData.total = Math.max(1, totalLen);

        const tileLen = 2 * halfWidth * textAspect;
        const repCount = isLoop ? Math.max(1, Math.round(laneData.total / tileLen)) : 0;
        const effectiveTileLen = isLoop ? (laneData.total / repCount) : tileLen;
        const baseOffset = l * (curSegments + 1) * 2;

        for (let i = 0; i <= curSegments; i++) {
          const prevIdx = isLoop ? (i === 0 ? curSegments - 1 : i - 1) : Math.max(0, i - 1);
          const nextIdx = isLoop ? (i === curSegments ? 1 : i + 1) : Math.min(curSegments, i + 1);

          let tx = points[3 * nextIdx] - points[3 * prevIdx];
          let ty = points[3 * nextIdx + 1] - points[3 * prevIdx + 1];
          let tz = points[3 * nextIdx + 2] - points[3 * prevIdx + 2];
          const tLen = Math.hypot(tx, ty, tz) || 1;
          tx /= tLen;
          ty /= tLen;
          tz /= tLen;

          let bx = 0, by = 0, bz = 1;
          if (s.path === 'loop') {
            const ang = -TWO_PI * i / curSegments;
            bx = Math.cos(ang);
            by = 0;
            bz = Math.sin(ang);
          } else if (s.path === 'helix') {
            bx = 0;
            const hGap = finite(s.gap, 120);
            by = points[3 * i + 1] - (l - (curLanes - 1) / 2) * hGap;
            bz = points[3 * i + 2];
            const bLen = Math.hypot(by, bz) || 1;
            by /= bLen;
            bz /= bLen;
          }

          const dot = bx * tx + by * ty + bz * tz;
          let nx = bx - dot * tx;
          let ny = by - dot * ty;
          let nz = bz - dot * tz;
          const nLen = Math.hypot(nx, ny, nz) || 1;
          nx /= nLen;
          ny /= nLen;
          nz /= nLen;

          const cx = ny * tz - nz * ty;
          const cy = nz * tx - nx * tz;
          const cz = nx * ty - ny * tx;

          const twistAngle = computeTwistAngle(l, laneData.lengths[i], laneData.total, isLoop, nowSec);
          const cosTwist = Math.cos(twistAngle);
          const sinTwist = Math.sin(twistAngle);

          const rX = cosTwist * cx + sinTwist * nx;
          const rY = cosTwist * cy + sinTwist * ny;
          const rZ = cosTwist * cz + sinTwist * nz;

          const normX = ty * rZ - tz * rY;
          const normY = tz * rX - tx * rZ;
          const normZ = tx * rY - ty * rX;

          const posIdx = (baseOffset + 2 * i) * 3;
          const px = points[3 * i];
          const py = points[3 * i + 1];
          const pz = points[3 * i + 2];

          posBuf[posIdx] = px - rX * halfWidth;
          posBuf[posIdx + 1] = py - rY * halfWidth;
          posBuf[posIdx + 2] = pz - rZ * halfWidth;

          posBuf[posIdx + 3] = px + rX * halfWidth;
          posBuf[posIdx + 4] = py + rY * halfWidth;
          posBuf[posIdx + 5] = pz + rZ * halfWidth;

          normBuf[posIdx] = normX;
          normBuf[posIdx + 1] = normY;
          normBuf[posIdx + 2] = normZ;

          normBuf[posIdx + 3] = normX;
          normBuf[posIdx + 4] = normY;
          normBuf[posIdx + 5] = normZ;

          const u = (laneData.lengths[i] - scrollPos * (l % 2 === 1 ? -1 : 1)) / effectiveTileLen;
          const uvIdx = (baseOffset + 2 * i) * 2;

          uvBuf[uvIdx] = u;
          uvBuf[uvIdx + 1] = 0;
          uvBuf[uvIdx + 2] = u;
          uvBuf[uvIdx + 3] = 1;
        }
      }

      geometry.getAttribute('position').needsUpdate = true;
      geometry.getAttribute('normal').needsUpdate = true;
      geometry.getAttribute('uv').needsUpdate = true;
    };

    const requestNextFrame = () => {
      if (destroyed || !isVisible || rafId) return;
      rafId = win.requestAnimationFrame(tick);
    };

    function tick(timestamp) {
      rafId = 0;
      if (destroyed) return;

      const s = getSettings();
      const dt = lastTime ? clamp((timestamp - lastTime) / 1000, 1 / 240, 0.05) : 1 / 60;
      lastTime = timestamp;

      const nowSec = performance.now() / 1000;
      const isPaused = s.reduced || s.paused;

      if (!hasAnimated) {
        hasAnimated = true;
        introStartTime = nowSec;
        nextAutoTwistTime = nowSec + Math.max(1.5, finite(s.autoTwist, 0));
        if (s.intro && !s.reduced) {
          for (let l = 0; l < curLanes; l++) {
            triggerRippleTwist(l, 0, nowSec + 0.12 * l);
          }
        }
      }

      if (!isPaused) animPhase += dt;

      const targetHover = pointerState.inside && !pointerState.down ? clamp(finite(s.hoverSpeed, 0.3), 0, 1) : 1;
      speedFactor += (targetHover - speedFactor) * (1 - Math.exp(-4 * dt));

      // Direction: "right" means left to right, "left" means right to left
      const dirSign = s.direction === 'right' ? -1 : 1;
      const forwardSpeed = isPaused ? 0 : clamp(finite(s.speed, 90), -2000, 2000) * dirSign * speedFactor;

      if (!pointerState.down) {
        dragVelocity *= Math.exp(-dt / 0.55);
      }
      scrollPos += (forwardSpeed + dragVelocity) * dt;

      const autoTwistInterval = finite(s.autoTwist, 0);
      if (autoTwistInterval > 0 && !isPaused && nowSec >= nextAutoTwistTime) {
        nextAutoTwistTime = nowSec + Math.max(0.5, autoTwistInterval);
        const randLane = Math.floor(Math.random() * curLanes);
        const lData = lanesData[randLane];
        if (lData) {
          triggerRippleTwist(randLane, lData.total * (0.2 + 0.6 * Math.random()), nowSec);
        }
      }

      for (let i = activeTwists.length - 1; i >= 0; i--) {
        const tw = activeTwists[i];
        const lData = lanesData[tw.lane];
        const maxDist = lData ? (s.path === 'loop' ? lData.total / 2 : Math.max(tw.origin, lData.total - tw.origin)) : 0;
        if ((nowSec - tw.start) * 760 - maxDist > 460) {
          activeTwists.splice(i, 1);
        }
      }

      const introOpacity = s.intro && !s.reduced ? smoothstep((nowSec - introStartTime) / 0.6) : 1;
      material.uniforms.uOpacity.value = introOpacity;
      material.uniforms.uBandOn.value = s.band ? 1 : 0;
      material.uniforms.uShading.value = clamp(finite(s.shading, 0.6), 0, 1);
      material.uniforms.uSheen.value = clamp(finite(s.sheen, 0.4), 0, 1);
      material.depthWrite = !!s.band;
      mesh.rotation.x = clamp(finite(s.tilt, -6), -80, 80) * Math.PI / 180;

      renderRibbons(nowSec);
      renderer.render(scene, camera);

      if (!isPaused || Math.abs(dragVelocity) > 1 || activeTwists.length > 0 || introOpacity < 1) {
        requestNextFrame();
      }
    }

    const onPointerEnter = () => {
      pointerState.inside = true;
      requestNextFrame();
    };

    const onPointerLeave = () => {
      pointerState.inside = false;
      requestNextFrame();
    };

    const onPointerDown = (e) => {
      if (e.button !== 0 || pointerState.down) return;
      if (e.target !== canvas && e.target !== container) return;
      pointerState.down = true;
      pointerState.id = e.pointerId;
      pointerState.startX = e.clientX;
      pointerState.startY = e.clientY;
      pointerState.lastX = e.clientX;
      pointerState.startAt = performance.now() / 1000;
      pointerState.lastAt = pointerState.startAt;
      pointerState.moved = false;
      requestNextFrame();
    };

    const onPointerMove = (e) => {
      if (!pointerState.down || e.pointerId !== pointerState.id) return;
      const s = getSettings();
      const dx = e.clientX - pointerState.lastX;
      const nowSec = performance.now() / 1000;

      if (Math.hypot(e.clientX - pointerState.startX, e.clientY - pointerState.startY) > 6) {
        pointerState.moved = true;
      }

      if (s.draggable && pointerState.moved && e.pointerType !== 'touch') {
        const dirSign = s.direction === 'right' ? -1 : 1;
        scrollPos -= dx * dirSign;
        const dt = Math.max(0.008, nowSec - pointerState.lastAt);
        dragVelocity = 0.6 * dragVelocity + (-dx / dt) * dirSign * 0.4;
        container.style.cursor = 'grabbing';
      }

      pointerState.lastX = e.clientX;
      pointerState.lastAt = nowSec;
      requestNextFrame();
    };

    const onPointerUp = (e) => {
      if (!pointerState.down || e.pointerId !== pointerState.id) return;
      const s = getSettings();
      pointerState.down = false;
      container.style.cursor = '';

      const nowSec = performance.now() / 1000;
      if (nowSec - pointerState.lastAt > 0.12) {
        dragVelocity = 0;
      }

      if (!pointerState.moved && nowSec - pointerState.startAt < 0.4 && s.clickTwist) {
        const rect = container.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;

        mesh.updateMatrixWorld();
        let closestDist = Infinity;
        let hitLane = 0;
        let hitOrigin = 0;

        for (let l = 0; l < curLanes; l++) {
          const lData = lanesData[l];
          for (let i = 0; i <= curSegments; i += 3) {
            tempVec
              .set(lData.points[3 * i], lData.points[3 * i + 1], lData.points[3 * i + 2])
              .applyMatrix4(mesh.matrixWorld)
              .project(camera);

            const screenX = (0.5 * tempVec.x + 0.5) * width;
            const screenY = (0.5 - 0.5 * tempVec.y) * height;
            const d = Math.hypot(screenX - px, screenY - py) - (tempVec.z < 1 ? 0 : 1e6);

            if (d < closestDist) {
              closestDist = d;
              hitLane = l;
              hitOrigin = lData.lengths[i];
            }
          }
        }
        triggerRippleTwist(hitLane, hitOrigin, nowSec);
      }
      requestNextFrame();
    };

    container.addEventListener('pointerenter', onPointerEnter);
    container.addEventListener('pointerleave', onPointerLeave);
    container.addEventListener('pointerdown', onPointerDown);
    win.addEventListener('pointermove', onPointerMove, { passive: true });
    win.addEventListener('pointerup', onPointerUp);
    win.addEventListener('pointercancel', onPointerUp);

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
      requestNextFrame();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        lastTime = 0;
        requestNextFrame();
      } else if (rafId) {
        win.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    });
    intersectionObserver.observe(container);

    // Initial setup
    updateMeshBuffers();
    updateColors();
    updateTextTexture();
    updateSize();

    if (doc.fonts && doc.fonts.ready) {
      doc.fonts.ready.then(() => {
        if (!destroyed) {
          textCacheKey = "";
          updateTextTexture();
          requestNextFrame();
        }
      });
    }

    engineRef.current = {
      sync: () => {
        updateMeshBuffers();
        updateColors();
        updateTextTexture();
        updateSize();
        requestNextFrame();
      },
      twist: (fraction) => {
        const lData = lanesData[0];
        if (!lData) return;
        const norm = typeof fraction === 'number' && Number.isFinite(fraction) ? clamp(fraction, 0, 1) : 0.5;
        triggerRippleTwist(0, lData.total * norm, performance.now() / 1000);
        requestNextFrame();
      },
      replay: () => {
        hasAnimated = false;
        activeTwists.length = 0;
        requestNextFrame();
      },
      destroy: () => {
        destroyed = true;
        if (rafId) {
          win.cancelAnimationFrame(rafId);
          rafId = 0;
        }
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        container.removeEventListener('pointerenter', onPointerEnter);
        container.removeEventListener('pointerleave', onPointerLeave);
        container.removeEventListener('pointerdown', onPointerDown);
        win.removeEventListener('pointermove', onPointerMove);
        win.removeEventListener('pointerup', onPointerUp);
        win.removeEventListener('pointercancel', onPointerUp);

        geometry.dispose();
        material.dispose();
        textTexture.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        canvas.remove();
      }
    };

    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      twist: (fraction) => engineRef.current?.twist(fraction),
      replay: () => engineRef.current?.replay()
    }),
    []
  );

  return (
    <div
      ref={containerRef}
      role={text ? "img" : undefined}
      aria-label={text || undefined}
      className={`relative isolate h-full min-h-[220px] w-full overflow-hidden ${className}`}
      style={style}
    >
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
});

RibbonType.displayName = 'RibbonType';

export default RibbonType;
