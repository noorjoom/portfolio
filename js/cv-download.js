export function initCvDownload() {
  const wrapper = document.querySelector('[data-cv-download]');
  if (!wrapper) return;

  const toggle = wrapper.querySelector('[data-cv-toggle]');
  const menu = wrapper.querySelector('.cv-menu');
  if (!toggle || !menu) return;

  const close = () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };

  const open = () => {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.hidden ? open() : close();
  });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      close();
      toggle.focus();
    }
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });
}
