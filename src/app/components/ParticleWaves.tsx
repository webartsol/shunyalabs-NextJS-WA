'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleWaves = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use refs for animation state to ensure stability across renders/events
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Sprite[]>([]);
  const countRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  const windowHalfRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuration
    const SEPARATION = 100;
    const AMOUNTX = 50;
    const AMOUNTY = 50;
    const PARTICLE_COLOR = '#ffffff';

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    windowHalfRef.current = { x: width / 2, y: height / 2 };

    const init = () => {
      const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
      camera.position.z = 1000;
      camera.position.y = 500; // Increased height for better visibility
      cameraRef.current = camera;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create Material
      const createParticleMaterial = (color: string) => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        if (context) {
          context.fillStyle = color;
          context.beginPath();
          context.arc(16, 16, 12, 0, Math.PI * 2, true);
          context.fill();
        }
        const texture = new THREE.CanvasTexture(canvas);
        return new THREE.SpriteMaterial({ map: texture, transparent: true });
      };

      const material = createParticleMaterial(PARTICLE_COLOR);

      // Create Particles
      particlesRef.current = [];
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const particle = new THREE.Sprite(material);
          particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
          particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
          scene.add(particle);
          particlesRef.current.push(particle);
        }
      }

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      rendererRef.current = renderer;

      // Clear container before appending to avoid duplicates
      while (containerRef.current?.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current?.appendChild(renderer.domElement);
    };

    const render = () => {
      const camera = cameraRef.current;
      const scene = sceneRef.current;
      const renderer = rendererRef.current;

      if (!camera || !scene || !renderer) return;

      // Move camera
      camera.position.x += (mouseRef.current.x - camera.position.x) * 0.05;
      camera.position.y += (-mouseRef.current.y + 500 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Waves
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const particle = particlesRef.current[i++];
          if (particle) {
            particle.position.y = (Math.sin((ix + countRef.current) * 0.3) * 50) +
              (Math.sin((iy + countRef.current) * 0.5) * 50);

            const scale = (Math.sin((ix + countRef.current) * 0.3) + 1) * 2 +
              (Math.sin((iy + countRef.current) * 0.5) + 1) * 2;
            particle.scale.setScalar(scale * 2);
          }
        }
      }

      renderer.render(scene, camera);
      countRef.current += 0.1;
    };

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      render();
    };

    const onWindowResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      windowHalfRef.current = { x: newWidth / 2, y: newHeight / 2 };

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    const onDocumentMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate relative to center
      mouseRef.current.x = (event.clientX - rect.left) - windowHalfRef.current.x;
      mouseRef.current.y = (event.clientY - rect.top) - windowHalfRef.current.y;
    };

    init();
    animate();

    const resizeObserver = new ResizeObserver(onWindowResize);
    resizeObserver.observe(containerRef.current);
    document.addEventListener('mousemove', onDocumentMouseMove);

    return () => {
      cancelAnimationFrame(requestRef.current);
      resizeObserver.disconnect();
      document.removeEventListener('mousemove', onDocumentMouseMove);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (containerRef.current && rendererRef.current?.domElement) {
        // Check if child exists before removing to prevent errors
        if (containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full"
      />
    </div>
  );
};
export default ParticleWaves;