import { writeFileSync, mkdirSync } from 'fs';
import { createCanvas } from 'canvas';

try { mkdirSync('public', { recursive: true }); } catch (_) {}

/**
 * Draw the 10 Years Journal icon on a canvas of the given size.
 * Dark background, amber circle, "10Y" mark in dark.
 */
function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // ── Background (#0F0F0F) ────────────────────────────────
  ctx.fillStyle = '#0F0F0F';
  ctx.fillRect(0, 0, size, size);

  // ── Amber circle ────────────────────────────────────────
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#F59E0B';
  ctx.fill();

  // ── "10Y" text ──────────────────────────────────────────
  const label = size <= 48 ? '10' : '10Y';
  const fontSize = Math.round(size * (label.length === 2 ? 0.36 : 0.30));
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#0F0F0F';
  ctx.fillText(label, cx, cy + fontSize * 0.03);

  return canvas;
}

// ── Generate each icon size ──────────────────────────────────
const sizes = [
  { name: 'pwa-192x192.png',     size: 192 },
  { name: 'pwa-512x512.png',     size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon.ico',          size: 32  },
];

for (const { name, size } of sizes) {
  const canvas = drawIcon(size);
  writeFileSync(`public/${name}`, canvas.toBuffer('image/png'));
  console.log(`  ✓ ${name} (${size}×${size})`);
}

console.log('\n✓ PWA icons generated in /public');
