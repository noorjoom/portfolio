// Enhanced typing animation with cursor - reusable function
function typeWriter(element, text, options = {}) {
  if (!element) return Promise.resolve();

  const {
    baseSpeed = 60,
    fastSpeed = 30,
    slowSpeed = 100,
    showCursor = true,
    removeCursorOnComplete = false
  } = options;

  return new Promise((resolve) => {
    let i = 0;
    let skipped = false;

    // Clear element and set initial content
    element.textContent = '';

    // Add cursor element if needed
    let cursor = null;
    if (showCursor) {
      cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      cursor.textContent = '|';
      element.appendChild(cursor);
    }

    // Skip handler - complete text instantly on click
    function skipAnimation() {
      if (skipped) return;
      skipped = true;
      if (cursor) cursor.remove();
      element.textContent = text;
      if (cursor) {
        if (removeCursorOnComplete) {
          // don't re-add
        } else {
          cursor.classList.add('cursor-blink');
          element.appendChild(cursor);
        }
      }
      resolve();
    }

    // Store skip handler so it can be removed later
    element._skipHandler = skipAnimation;
    const hero = document.querySelector('.hero');
    if (hero) hero.addEventListener('click', skipAnimation, { once: true });

    function type() {
      if (skipped) return;
      if (i < text.length) {
        // Remove cursor temporarily
        if (cursor) cursor.remove();

        // Add the character
        element.textContent += text.charAt(i);

        // Re-add cursor
        if (cursor) element.appendChild(cursor);

        i++;

        // Variable speed: faster for spaces, slower for special chars
        let currentSpeed = baseSpeed;
        if (text.charAt(i - 1) === ' ') {
          currentSpeed = fastSpeed;
        } else if (i > 0 && text.charAt(i - 1).match(/[A-Z]/)) {
          currentSpeed = slowSpeed;
        } else if (text.charAt(i - 1) === '.' || text.charAt(i - 1) === ',' || text.charAt(i - 1) === '!') {
          currentSpeed = slowSpeed * 1.5;
        }

        // Random variation for more natural feel
        currentSpeed += Math.random() * 25 - 12;

        setTimeout(type, Math.max(currentSpeed, 15));
      } else {
        // Animation complete
        if (cursor) {
          if (removeCursorOnComplete) {
            cursor.remove();
          } else {
            cursor.classList.add('cursor-blink');
          }
        }
        resolve();
      }
    }

    type();
  });
}

// Initialize all typing animations sequentially
function initTypingAnimations() {
  const subtitleElement = document.querySelector('.hero-subtitle');
  const descriptionElement = document.querySelector('.hero-description');

  if (!subtitleElement || !descriptionElement) return;

  const subtitleText = 'Computer Science student and frontend-focused engineer crafting fast, user-centered web experiences.';
  const descriptionText = 'Building intelligent systems and full-stack applications with a passion for web development. Currently working as a Working Student - Frontend Web Developer at Strato GmbH, Berlin.';

  // If user prefers reduced motion, set text instantly
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    subtitleElement.textContent = subtitleText;
    descriptionElement.textContent = descriptionText;
    return;
  }

  // Chain animations: subtitle -> description
  typeWriter(subtitleElement, subtitleText, {
    baseSpeed: 50,
    showCursor: true,
    removeCursorOnComplete: true
  }).then(() => {
    return new Promise(resolve => setTimeout(resolve, 300));
  }).then(() => {
    return typeWriter(descriptionElement, descriptionText, {
      baseSpeed: 40,
      showCursor: true,
      removeCursorOnComplete: true
    });
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
  // Start after a brief initial delay
  setTimeout(initTypingAnimations, 300);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Active nav state on scroll
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll('section[id], footer[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        }
    });
}, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

sections.forEach(section => {
    navObserver.observe(section);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
