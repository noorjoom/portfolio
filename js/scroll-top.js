// Scroll-to-top button
export function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const visible = window.scrollY > 400;
        btn.classList.toggle('scroll-top--visible', visible);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
