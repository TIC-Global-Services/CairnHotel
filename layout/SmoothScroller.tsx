"use client";
import { ReactNode, useRef, useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

interface LenisProviderProps {
  children: ReactNode;
}

const SmoothScroller = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"; // Manual prevents browser from fighting Lenis
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
    // This ensures smooth synchronization between GSAP animations and Lenis scrolling
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);

    // Disable GSAP's lag smoothing to avoid jumps during scrolling
    gsap.ticker.lagSmoothing(0);

    // Auto-refresh ScrollTrigger on window load/resize
    ScrollTrigger.refresh();

    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroller;