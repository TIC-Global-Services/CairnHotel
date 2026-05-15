"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

interface LenisProviderProps {
  children: ReactNode;
}

const SmoothScroller = ({ children }: LenisProviderProps) => {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Skip Lenis on mobile — native momentum scroll is already smooth
    if (window.innerWidth < 768) return

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"; // Manual prevents browser from fighting Lenis
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      syncTouch: false,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", () => ScrollTrigger.update());

    // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);

    // Disable GSAP's lag smoothing to avoid jumps during scrolling
    gsap.ticker.lagSmoothing(0);

    // Auto-refresh ScrollTrigger after all child triggers have registered
    requestAnimationFrame(() => ScrollTrigger.refresh());

    // Watch for DOM height changes (like images loading) to prevent scroll lock
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroller;