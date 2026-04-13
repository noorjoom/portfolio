// Animated skill bars — triggered when skills section enters viewport
export function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bars.forEach(bar => {
      const pct = bar.dataset.proficiency || '0';
      bar.style.width = pct + '%';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const pct = bar.dataset.proficiency || '0';
        bar.style.width = pct + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });

  bars.forEach(bar => observer.observe(bar));
}
