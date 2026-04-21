import { initTypingAnimations } from './typing.js';
import { initScrollAnimations, initActiveNav, initSmoothScroll } from './scroll.js';
import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initHeader } from './header.js';
import { initProgress } from './progress.js';
import { initScrollTop } from './scroll-top.js';
import { initBackground } from './background.js';
import { initContactForm } from './contact.js';
import { initCvDownload } from './cv-download.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initHeader();
  initScrollAnimations();
  initActiveNav();
  initSmoothScroll();
  initProgress();
  initScrollTop();
  initBackground();
  initContactForm();
  initCvDownload();

  // Typing animation with a brief delay for visual polish
  setTimeout(initTypingAnimations, 300);
});
