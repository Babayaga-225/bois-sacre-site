// src/scripts/reveal.js
// Scroll reveal léger via IntersectionObserver. Respecte prefers-reduced-motion.

(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stagger = document.querySelectorAll(
    '.section-header, .project-card, .service-card, .territory-card, .journal-card, .manifesto-inner, .method-step, .cta-band'
  );
  const footer = document.querySelector('.site-footer');

  const allTargets = [...stagger];
  if (footer) allTargets.push(footer);

  if (reduce || !('IntersectionObserver' in window)) {
    allTargets.forEach((el) => el.classList.add('is-in-view'));
    return;
  }

  stagger.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in-view');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  allTargets.forEach((el) => io.observe(el));

  // Sticky header opacity on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
