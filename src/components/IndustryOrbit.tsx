import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const IndustryOrbit = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 7;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.className = "h-full w-full";
    host.appendChild(renderer.domElement);

    const orbit = new THREE.Group();
    scene.add(orbit);

    const globe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.7, 1),
      new THREE.MeshBasicMaterial({ color: 0x0e7a88, transparent: true, opacity: 0.07, wireframe: true }),
    );
    orbit.add(globe);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x0e7a88, transparent: true, opacity: 0.2 });
    const ringOne = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.008, 8, 120), ringMaterial);
    ringOne.rotation.set(0.9, 0.2, -0.5);
    const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.006, 8, 120), ringMaterial.clone());
    ringTwo.rotation.set(-0.7, 0.45, 0.35);
    orbit.add(ringOne, ringTwo);

    const pointPositions = new Float32Array(110 * 3);
    for (let index = 0; index < 110; index += 1) {
      const theta = (Math.sin(index * 27.91) * 0.5 + 0.5) * Math.PI * 2;
      const phi = Math.acos(2 * (Math.sin(index * 13.37) * 0.5 + 0.5) - 1);
      const radius = 1.9 + (Math.sin(index * 7.17) * 0.5 + 0.5) * 0.85;
      pointPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pointPositions[index * 3 + 1] = radius * Math.cos(phi);
      pointPositions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    const points = new THREE.Points(pointsGeometry, new THREE.PointsMaterial({ color: 0x0e7a88, size: 0.025, transparent: true, opacity: 0.5 }));
    orbit.add(points);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    let frame = 0;
    let inViewport = true;
    let pageVisible = !document.hidden;

    const render = () => renderer.render(scene, camera);
    const animate = () => {
      frame = 0;
      if (!inViewport || !pageVisible) return;
      orbit.rotation.y += 0.0018;
      orbit.rotation.x = Math.sin(Date.now() * 0.00022) * 0.1;
      ringOne.rotation.z += 0.0008;
      ringTwo.rotation.z -= 0.0005;
      render();
      frame = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!reducedMotion && !frame && inViewport && pageVisible) frame = requestAnimationFrame(animate);
    };

    const pauseAnimation = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport) {
        render();
        startAnimation();
      } else {
        pauseAnimation();
      }
    }, { threshold: 0.01 });
    visibilityObserver.observe(host);

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) startAnimation();
      else pauseAnimation();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    render();
    startAnimation();

    return () => {
      pauseAnimation();
      observer.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      globe.geometry.dispose();
      (globe.material as THREE.Material).dispose();
      ringOne.geometry.dispose();
      ringMaterial.dispose();
      ringTwo.geometry.dispose();
      (ringTwo.material as THREE.Material).dispose();
      pointsGeometry.dispose();
      (points.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reducedMotion]);

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70" />;
};

export default IndustryOrbit;
