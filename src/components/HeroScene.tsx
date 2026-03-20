import { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 6;

    // Particles
    const COUNT = window.innerWidth < 768 ? 80 : 140;
    const verts: THREE.Vector3[] = [];

    for (let i = 0; i < COUNT; i++) {
      verts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 5
        )
      );
    }

    const ptGeo = new THREE.BufferGeometry().setFromPoints(verts);
    const ptMat = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.055,
      transparent: true,
      opacity: 0.7,
    });
    const points = new THREE.Points(ptGeo, ptMat);

    // Lines — single LineSegments draw call
    const linePositions: number[] = [];
    const THRESHOLD = 2.4;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        if (verts[i].distanceTo(verts[j]) < THRESHOLD) {
          linePositions.push(
            verts[i].x, verts[i].y, verts[i].z,
            verts[j].x, verts[j].y, verts[j].z
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);

    const group = new THREE.Group();
    group.add(points);
    group.add(lines);
    scene.add(group);

    // Mouse
    let mx = 0;
    let my = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Animate
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow base rotation
      group.rotation.y = t * 0.04;
      // Mouse influence on top
      group.rotation.x += (my * 0.25 - group.rotation.x) * 0.04;
      group.rotation.y += (mx * 0.25 - (group.rotation.y - t * 0.04)) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      ptGeo.dispose();
      ptMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default HeroScene;
