// Shared scroll motion for the PCMS page:
// - [data-reveal]: rises in once when it reaches the lower part of the screen (siblings stagger).
// - [data-dots]: a dot-matrix chapter word whose dots grow in as it scrolls into view.
// - loop(): a product mockup's own timeline, played only while the mockup is on screen.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce) {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }),
  });

  document.querySelectorAll<HTMLElement>('[data-dots]').forEach((el) =>
    gsap.fromTo(el, { '--dot': '0em' }, { '--dot': '0.021em', ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'center 55%', scrub: true } }),
  );
}

/** Plays a looping mockup timeline only while its element is on screen; reduced motion jumps to the end state. */
export function loop(el: Element, tl: gsap.core.Timeline) {
  if (reduce) {
    tl.progress(1).pause();
    return;
  }
  tl.pause();
  ScrollTrigger.create({ trigger: el, start: 'top 85%', end: 'bottom 10%', onToggle: (self) => (self.isActive ? tl.play() : tl.pause()) });
}
