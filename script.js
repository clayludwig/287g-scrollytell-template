/* ============================================
   SCROLLYTELL TEMPLATE — SCROLL ENGINE

   Two systems:
   1. Block fade-in via IntersectionObserver. Each [data-scroll]
      element gets `.is-visible` when it crosses into view; CSS
      drives the actual fade/translate via a transition.
   2. Sticky people-scrolly interactive via scrollama. Each .step
      element fires onStepEnter when it crosses 50% of the viewport.

   Both honor `prefers-reduced-motion`. Both degrade gracefully if
   their library/feature isn't available — under no-JS, the
   `.js [data-scroll]` selector in CSS doesn't match, so all blocks
   stay visible.
   ============================================ */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // ============================================
  // BLOCK FADE-IN (IntersectionObserver)
  // ============================================
  const fadeElements = document.querySelectorAll('[data-scroll]');

  // Stagger cards inside the same .card-grid via CSS transition-delay
  // so they enter in sequence rather than all together.
  document.querySelectorAll('.card-grid .card[data-scroll]').forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });

  if (reduceMotion) {
    // Skip the fade entirely under reduced motion. CSS also pins these.
    fadeElements.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        }
      },
      // Trigger when the top edge is ~30% above the viewport bottom,
      // i.e. element is entering the lower third of the screen.
      { rootMargin: '0px 0px -30% 0px', threshold: 0.05 }
    );
    fadeElements.forEach((el) => fadeObserver.observe(el));
  } else {
    // Very old browsers with no IO: just reveal everything.
    fadeElements.forEach((el) => el.classList.add('is-visible'));
  }

  // ============================================
  // HERO SCROLL INDICATOR (hide after first scroll)
  // ============================================
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    const hideOnScroll = () => {
      if (window.scrollY > 80) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transition = 'opacity 0.8s ease';
        window.removeEventListener('scroll', hideOnScroll);
      }
    };
    window.addEventListener('scroll', hideOnScroll, { passive: true });
  }

  // ============================================
  // PEOPLE-SCROLLY INTERACTIVE (scrollama)
  //
  // Each .step inside #people-scrolly triggers a state change in
  // the sticky graphic. Scrollama handles the IntersectionObserver
  // bookkeeping; we just supply onStepEnter.
  //
  // Tunables:
  //   MAX_HIGHLIGHTED — peak number of figures highlighted (numerator
  //                     in "X of N"). Cap; further steps dim the rest.
  //   The denominator (N) is auto-derived from .people-item count.
  //
  // To remove the interactive: delete this whole section, the
  // #people-scrolly markup in index.html, and the related CSS in
  // style.css.
  // ============================================
  const MAX_HIGHLIGHTED = 9;

  const peopleSection = document.querySelector('#people-scrolly');
  const peopleItems = peopleSection
    ? Array.from(peopleSection.querySelectorAll('.people-item'))
    : [];
  const stepEls = peopleSection
    ? Array.from(peopleSection.querySelectorAll('.step'))
    : [];
  const statNumberValue = peopleSection
    ? peopleSection.querySelector('.stat-number-value')
    : null;
  const statNumberTotal = peopleSection
    ? peopleSection.querySelector('.stat-number-total')
    : null;

  // Last announced count — used to throttle aria-live updates.
  // Without this, scrollama would re-announce the same number on
  // every minor IO callback and screen readers would queue duplicates.
  let lastAnnouncedCount = -1;

  function setPersonState(item, state) {
    if (item.classList.contains(state)) return;
    item.classList.remove('is-hidden', 'is-highlighted', 'is-unhighlighted');
    item.classList.add(state);
  }

  function applyStep(stepIndex) {
    if (!peopleItems.length) return;

    const totalFigures = peopleItems.length;
    const displayCount = Math.min(MAX_HIGHLIGHTED, stepIndex + 1);
    const pastPeak = stepIndex >= MAX_HIGHLIGHTED - 1;

    if (displayCount !== lastAnnouncedCount) {
      statNumberValue.textContent = String(displayCount);
      statNumberTotal.textContent = ` of ${totalFigures}`;
      lastAnnouncedCount = displayCount;
    }

    peopleItems.forEach((item, index) => {
      const state = index < displayCount
        ? 'is-highlighted'
        : (pastPeak ? 'is-unhighlighted' : 'is-hidden');
      setPersonState(item, state);
    });
  }

  if (peopleSection && peopleItems.length) {
    // Always initialize to step 0 — matches the markup default and
    // ensures a consistent visible state even if scrollama fails.
    applyStep(0);

    if (stepEls.length && typeof window.scrollama === 'function') {
      const scroller = window.scrollama();
      scroller
        .setup({
          // Observe the .step-card itself, not the .step wrapper.
          // Cards are anchored to the bottom of each step, so a
          // step-wrapper trigger would fire before the card is
          // even visible. Card-trigger fires when the reader can
          // actually read the text.
          step: '#people-scrolly .step-card',
          offset: 0.6,
        })
        .onStepEnter(({ element }) => {
          // Get the index from the parent .step's DOM order.
          const stepEl = element.closest('.step');
          const index = stepEls.indexOf(stepEl);
          if (index >= 0) applyStep(index);
        });

      window.addEventListener('resize', () => scroller.resize(), { passive: true });
    }
  }
})();
