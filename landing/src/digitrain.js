/**
 * Amber digit rain — CSS-only columns with random digits.
 * Respects prefers-reduced-motion (hidden via CSS).
 */
const container = document.getElementById('digitRain');
if (container) {
  const columnCount = Math.floor(window.innerWidth / 24);
  for (let i = 0; i < columnCount; i++) {
    const col = document.createElement('div');
    col.className = 'column';
    col.style.left = `${(i / columnCount) * 100}%`;
    col.style.animationDuration = `${8 + Math.random() * 12}s`;
    col.style.animationDelay = `${-Math.random() * 20}s`;

    // Generate random digits
    const chars = [];
    const len = 20 + Math.floor(Math.random() * 20);
    for (let j = 0; j < len; j++) {
      chars.push(Math.floor(Math.random() * 10));
    }
    col.textContent = chars.join('\n');
    container.appendChild(col);
  }
}
