import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HERO_TEXTURE = "/soko-a01-mine-hero.png";

/**
 * A deliberately still Three.js treatment: the generated mine composition is
 * a textured plane in a perspective camera, with only a small cursor response.
 * On reduced-motion and small-screen devices the same image remains as the
 * lightweight semantic fallback.
 */
const MineLandingScene = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reducedMotion || window.matchMedia("(max-width: 767px)").matches) return;

    let renderer: THREE.WebGLRenderer | undefined;
    let animationFrame = 0;
    let disposed = false;
    let active = false;
    const target = new THREE.Vector2();
    const current = new THREE.Vector2();

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "absolute inset-0 size-full opacity-0 transition-opacity duration-700";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 20);
    camera.position.z = 5.4;

    const geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const image = new THREE.Mesh(geometry, material);
    image.position.x = 0.06;
    scene.add(image);

    // A quiet depth layer gives the still texture a material, cinematic finish.
    const haze = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#080a09"),
        transparent: true,
        opacity: 0.12,
        blending: THREE.MultiplyBlending,
      }),
    );
    haze.position.z = 0.02;
    scene.add(haze);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer?.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      const imageAspect = 16 / 9;
      const viewportAspect = width / height;
      const planeWidth = viewportAspect > imageAspect ? visibleWidth * 1.08 : visibleHeight * imageAspect * 1.08;
      const planeHeight = planeWidth / imageAspect;
      image.scale.set(planeWidth, planeHeight, 1);
      haze.scale.set(planeWidth, planeHeight, 1);
      render();
    };

    const render = () => {
      if (!renderer || disposed) return;
      image.rotation.y = current.x * 0.024;
      image.rotation.x = -current.y * 0.016;
      image.position.x = 0.06 + current.x * 0.04;
      haze.rotation.copy(image.rotation);
      haze.position.x = image.position.x;
      renderer.render(scene, camera);
    };

    const tick = () => {
      current.lerp(target, 0.08);
      render();
      if (current.distanceTo(target) > 0.001) {
        animationFrame = window.requestAnimationFrame(tick);
      } else {
        current.copy(target);
        active = false;
      }
    };

    const animateToTarget = () => {
      if (!active) {
        active = true;
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.set((event.clientX - rect.left) / rect.width - 0.5, (event.clientY - rect.top) / rect.height - 0.5);
      animateToTarget();
    };
    const onPointerLeave = () => {
      target.set(0, 0);
      animateToTarget();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const loader = new THREE.TextureLoader();
    loader.load(HERO_TEXTURE, (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      material.map = texture;
      material.needsUpdate = true;
      resize();
      renderer?.domElement.classList.remove("opacity-0");
    });

    resize();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
      haze.geometry.dispose();
      (haze.material as THREE.Material).dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [reducedMotion]);

  return (
    <div ref={hostRef} aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#090a09]">
      <img src={HERO_TEXTURE} alt="" className="absolute inset-0 size-full object-cover object-[64%_center]" />
    </div>
  );
};

export default MineLandingScene;
