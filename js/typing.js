// Enhanced typing animation with cursor - reusable function
export function typeWriter(element, text, options = {}) {
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

    element.textContent = '';

    let cursor = null;
    if (showCursor) {
      cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      cursor.textContent = '|';
      element.appendChild(cursor);
    }

    function skipAnimation() {
      if (skipped) return;
      skipped = true;
      if (cursor) cursor.remove();
      element.textContent = text;
      if (cursor) {
        if (!removeCursorOnComplete) {
          cursor.classList.add('cursor-blink');
          element.appendChild(cursor);
        }
      }
      resolve();
    }

    element._skipHandler = skipAnimation;
    const hero = document.querySelector('.hero');
    if (hero) hero.addEventListener('click', skipAnimation, { once: true });

    function type() {
      if (skipped) return;
      if (i < text.length) {
        if (cursor) cursor.remove();
        element.textContent += text.charAt(i);
        if (cursor) element.appendChild(cursor);

        i++;

        let currentSpeed = baseSpeed;
        if (text.charAt(i - 1) === ' ') {
          currentSpeed = fastSpeed;
        } else if (i > 0 && text.charAt(i - 1).match(/[A-Z]/)) {
          currentSpeed = slowSpeed;
        } else if (text.charAt(i - 1) === '.' || text.charAt(i - 1) === ',' || text.charAt(i - 1) === '!') {
          currentSpeed = slowSpeed * 1.5;
        }

        currentSpeed += Math.random() * 25 - 12;
        setTimeout(type, Math.max(currentSpeed, 15));
      } else {
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

const ROLES = [
  { prefix: 'a ', text: 'Frontend Developer.' },
  { prefix: 'a ', text: 'CS Student.' },
  { prefix: 'an ', text: 'AI Enthusiast.' },
  { prefix: 'a ', text: 'Full-Stack Builder.' },
  { prefix: 'a ', text: 'Problem Solver.' },
];

// Cycles through roles with type → pause → delete → next
export function initTypingAnimations() {
  const roleEl = document.querySelector('.hero-role');
  if (!roleEl) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const prefixEl = document.querySelector('.hero-role-prefix');
    if (prefixEl) prefixEl.textContent = ROLES[0].prefix;
    roleEl.textContent = ROLES[0].text;
    return;
  }

  const prefixEl = document.querySelector('.hero-role-prefix');
  let index = 0;

  function runCycle() {
    const { prefix, text } = ROLES[index % ROLES.length];
    if (prefixEl) prefixEl.textContent = prefix;
    typeIn(roleEl, text)
      .then(() => pause(1800))
      .then(() => deleteOut(roleEl))
      .then(() => pause(400))
      .then(() => {
        index++;
        runCycle();
      });
  }

  runCycle();
}

function typeIn(el, text) {
  return new Promise(resolve => {
    let i = 0;
    function tick() {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i < text.length) {
        setTimeout(tick, 60 + Math.random() * 40);
      } else {
        resolve();
      }
    }
    tick();
  });
}

function deleteOut(el) {
  return new Promise(resolve => {
    function tick() {
      const current = el.textContent;
      if (current.length === 0) { resolve(); return; }
      el.textContent = current.slice(0, -1);
      setTimeout(tick, 35);
    }
    tick();
  });
}

function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
