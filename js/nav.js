// Mobile hamburger menu
export function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('nav--open');
    setNavOpen(!isOpen);
  });

  // Close on nav link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      setNavOpen(false);
      toggle.focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav--open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      setNavOpen(false);
    }
  });
}

function setNavOpen(open) {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#primary-nav');
  if (!toggle || !nav) return;

  nav.classList.toggle('nav--open', open);
  toggle.classList.toggle('active', open);
  toggle.setAttribute('aria-expanded', String(open));
}
