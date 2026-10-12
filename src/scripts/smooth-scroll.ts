// Smooth, weighted scrolling (Lenis) driven by GSAP's clock, so every ScrollTrigger
// (pins, scrubs, reveals) reads the same eased scroll position. Off for reduced motion.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({
    lerp: 0.085, // lower = heavier, glidier scroll
    wheelMultiplier: 0.9,
    anchors: true, // in-page links like "See our work" glide too
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
