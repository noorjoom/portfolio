// Dark/Light theme toggle with localStorage persistence
const THEME_KEY = 'portfolio-theme';
const DARK = 'dark';
const LIGHT = 'light';

export function initTheme() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  // Apply stored theme (inline script in <head> already handles initial flash prevention)
  const stored = localStorage.getItem(THEME_KEY);
  const current = stored || DARK;
  applyTheme(current);

  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === LIGHT ? DARK : LIGHT;
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  btn.setAttribute('aria-label', theme === LIGHT ? 'Switch to dark theme' : 'Switch to light theme');
  btn.setAttribute('aria-pressed', theme === LIGHT ? 'true' : 'false');
}
