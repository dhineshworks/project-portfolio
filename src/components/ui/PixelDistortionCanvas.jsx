import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * PixelDistortionCanvas
 * Exact WebGL Interactive Fluid / Pixel Distortion Shader from Dave Holloway's Portfolio (daveholloway.uk)
 * Features:
 * - 12x12 velocity grid simulation with 0.95 relaxation damping
 * - Interactive cursor drag refraction
 * - Radial shockwave entrance burst
 * - Subtle glass chromatic aberration
 */
export default function PixelDistortionCanvas({
  imageSrc,
  className = '',
  gridSize = 12,
  strength = 0.12,
  relaxation = 0.95,
  radius = 0.32,
  triggerBurst = true
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const simRef = useRef({
    mouse: { x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, vX: 0, vY: 0 },
    dataTexture: null,
    dataArray: null,
    renderer: null,
    scene: null,
    camera: null,
    material: null,
    imageTexture: null,
    isDestroyed: false,
    isHovered: false
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const sim = simRef.current;
    sim.isDestroyed = false;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sim.scene = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    sim.camera = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    sim.renderer = renderer;

    // 3. Create 12x12 Velocity DataTexture
    const totalPoints = gridSize * gridSize;
    const dataArray = new Float32Array(4 * totalPoints);
    for (let i = 0; i < totalPoints; i++) {
      const idx = i * 4;
      dataArray[idx] = 0;
      dataArray[idx + 1] = 0;
      dataArray[idx + 2] = 0;
      dataArray[idx + 3] = 1;
    }
    sim.dataArray = dataArray;

    const dataTexture = new THREE.DataTexture(
      dataArray,
      gridSize,
      gridSize,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    dataTexture.needsUpdate = true;
    sim.dataTexture = dataTexture;

    // 4. Load Image Texture
    const textureLoader = new THREE.TextureLoader();
    let imageWidth = 1;
    let imageHeight = 1;

    textureLoader.load(
      imageSrc,
      (texture) => {
        if (sim.isDestroyed) return;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        sim.imageTexture = texture;

        imageWidth = texture.image?.width || 1;
        imageHeight = texture.image?.height || 1;

        if (sim.material) {
          sim.material.uniforms.uTexture.value = texture;
          sim.material.uniforms.uImageResolution.value.set(imageWidth, imageHeight);
          sim.material.needsUpdate = true;
        }

        // Trigger entrance burst when texture is loaded
        if (triggerBurst) {
          triggerRadialBurst(1.1);
        }
      },
      undefined,
      (err) => {
        console.warn('Could not load image for pixel distortion:', imageSrc, err);
      }
    );

    // 5. Shader Material (Dave Holloway's exact refraction equation)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform sampler2D uDataTexture;
      uniform vec2 uResolution;
      uniform vec2 uImageResolution;
      uniform float uStrength;
      
      varying vec2 vUv;
      
      void main() {
        float screenRatio = uResolution.x / uResolution.y;
        float imageRatio = uImageResolution.x / uImageResolution.y;
        
        vec2 newUV = vUv;
        if (screenRatio > imageRatio) {
          float scale = screenRatio / imageRatio;
          newUV.y = (vUv.y - 0.5) / scale + 0.5;
        } else {
          float scale = imageRatio / screenRatio;
          newUV.x = (vUv.x - 0.5) / scale + 0.5;
        }
        
        // Sample velocity distortion
        vec4 distortion = texture2D(uDataTexture, vUv);
        vec2 distortedUV = newUV - uStrength * distortion.rg;
        
        // High-end glass chromatic dispersion fringe
        float speed = length(distortion.rg);
        float chromatic = speed * 0.025;
        
        vec4 colorR = texture2D(uTexture, distortedUV + vec2(chromatic, 0.0));
        vec4 colorG = texture2D(uTexture, distortedUV);
        vec4 colorB = texture2D(uTexture, distortedUV - vec2(chromatic, 0.0));
        
        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, colorG.a);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uDataTexture: { value: dataTexture },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uImageResolution: { value: new THREE.Vector2(1, 1) },
        uStrength: { value: strength }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });
    sim.material = material;

    const plane = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(plane, material);
    scene.add(mesh);

    // 6. Resize handling
    const handleResize = () => {
      if (!container || sim.isDestroyed) return;
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      renderer.setSize(w, h, false);
      material.uniforms.uResolution.value.set(w, h);
    };
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Mouse Velocity Tracking
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;

      sim.mouse.x = Math.max(0, Math.min(1, x));
      sim.mouse.y = Math.max(0, Math.min(1, y));
      sim.mouse.vX = sim.mouse.x - sim.mouse.prevX;
      sim.mouse.vY = sim.mouse.y - sim.mouse.prevY;
      sim.mouse.prevX = sim.mouse.x;
      sim.mouse.prevY = sim.mouse.y;
      sim.isHovered = true;
    };

    const handleMouseLeave = () => {
      sim.mouse.vX = 0;
      sim.mouse.vY = 0;
      sim.isHovered = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Touch support for mobile
    const handleTouchMove = (e) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const x = (touch.clientX - rect.left) / rect.width;
      const y = 1 - (touch.clientY - rect.top) / rect.height;

      sim.mouse.x = Math.max(0, Math.min(1, x));
      sim.mouse.y = Math.max(0, Math.min(1, y));
      sim.mouse.vX = (sim.mouse.x - sim.mouse.prevX) * 1.5;
      sim.mouse.vY = (sim.mouse.y - sim.mouse.prevY) * 1.5;
      sim.mouse.prevX = sim.mouse.x;
      sim.mouse.prevY = sim.mouse.y;
    };
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 8. Radial Shockwave Burst (Dave Holloway signature)
    const triggerRadialBurst = (intensity = 1.0) => {
      const data = sim.dataArray;
      if (!data) return;
      const cx = 0.5;
      const cy = 0.5;
      const maxR = 0.85;
      const forceMultiplier = 48 * intensity;

      for (let o = 0; o < gridSize; o++) {
        for (let c = 0; c < gridSize; c++) {
          const idx = 4 * (o + gridSize * c);
          const u = (o + 0.5) / gridSize;
          const v = (c + 0.5) / gridSize;
          const dx = u - cx;
          const dy = v - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxR && dist > 0.01) {
            const nx = dx / dist;
            const ny = dy / dist;
            const falloff = 1 - dist / maxR;
            const force = falloff * falloff;
            data[idx] += nx * force * forceMultiplier;
            data[idx + 1] += ny * force * forceMultiplier;
          }
        }
      }
      sim.dataTexture.needsUpdate = true;
    };

    // 9. Physics Update Loop
    const animate = () => {
      if (sim.isDestroyed) return;

      const data = sim.dataArray;
      if (data && sim.dataTexture) {
        // Grid velocity injection based on cursor proximity
        for (let t = 0; t < gridSize; t++) {
          for (let i = 0; i < gridSize; i++) {
            const idx = 4 * (t + gridSize * i);
            const u = (t + 0.5) / gridSize;
            const v = (i + 0.5) / gridSize;
            const dx = u - sim.mouse.x;
            const dy = v - sim.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
              const factor = 1 - dist / radius;
              data[idx] += sim.mouse.vX * factor * 50;
              data[idx + 1] += sim.mouse.vY * factor * 50;
            }

            // Relaxation damping
            data[idx] *= relaxation;
            data[idx + 1] *= relaxation;
          }
        }

        // Dampen cursor velocity when stationary
        sim.mouse.vX *= 0.85;
        sim.mouse.vY *= 0.85;

        sim.dataTexture.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      sim.isDestroyed = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);

      renderer.dispose();
      plane.dispose();
      material.dispose();
      dataTexture.dispose();
      if (sim.imageTexture) sim.imageTexture.dispose();
    };
  }, [imageSrc, gridSize, strength, relaxation, radius, triggerBurst]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden cursor-crosshair ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
