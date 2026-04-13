// Interactive background glow that follows the cursor
export function initBackground() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Disable on touch-only devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const glow = document.querySelector('.bg-glow');
  if (!glow) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let animating = false;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!animating) {
      animating = true;
      requestAnimationFrame(animate);
    }
  });

  function animate() {
    // Lerp for smooth lag
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    glow.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;

    if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
      requestAnimationFrame(animate);
    } else {
      animating = false;
    }
  }
}
