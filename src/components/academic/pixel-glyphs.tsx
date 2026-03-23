import { useEffect, useRef } from "react";

// 1-bit pixel art for problem pain point cards
export function ProblemGlyph({ theme, visible }: { theme: 'overload' | 'reactive' | 'fatigue' | 'personal'; visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasDrawn = useRef(false);

  useEffect(() => {
    if (!visible || hasDrawn.current) return;
    hasDrawn.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cell = 3;
    const cols = 24;
    const rows = 28;
    canvas.width = cols * cell;
    canvas.height = rows * cell;

    const put = (x: number, y: number, a = 0.85) => {
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fillRect(x * cell, y * cell, cell - 0.5, cell - 0.5);
      }
    };

    if (theme === 'overload') {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const density = 0.65 - (y / rows) * 0.45;
          if (Math.random() < density) {
            put(x, y, 0.2 + Math.random() * 0.65);
          }
        }
      }
      for (let s = 0; s < 3; s++) {
        const sy = 4 + Math.floor(Math.random() * (rows - 8));
        for (let x = 0; x < cols; x++) {
          if (Math.random() > 0.15) put(x, sy, 0.9);
        }
      }
    } else if (theme === 'reactive') {
      const cx = Math.floor(cols / 2);
      for (let x = cx - 3; x <= cx + 3; x++) { put(x, rows - 1); put(x, rows - 2); }
      for (let x = cx - 2; x <= cx + 2; x++) { put(x, rows - 3); }
      for (let y = rows - 4; y >= 8; y--) {
        const drift = y < 14 ? Math.floor((14 - y) * 0.7) : 0;
        put(cx + drift, y);
        if (y < 12) put(cx + drift + 1, y, 0.4);
      }
      const leaves = [
        { sy: 10, dir: 1, len: 6 },
        { sy: 12, dir: -1, len: 5 },
        { sy: 8, dir: 1, len: 4 },
        { sy: 14, dir: -1, len: 4 },
      ];
      for (const leaf of leaves) {
        const stemX = cx + (leaf.sy < 14 ? Math.floor((14 - leaf.sy) * 0.7) : 0);
        for (let i = 1; i <= leaf.len; i++) {
          const droop = Math.floor(i * i * 0.15);
          put(stemX + i * leaf.dir, leaf.sy + droop, 0.7);
          if (i > 2) put(stemX + i * leaf.dir, leaf.sy + droop + 1, 0.3);
        }
      }
      for (let i = 0; i < 5; i++) {
        put(cx - 5 + Math.floor(Math.random() * 11), rows - 1 - Math.floor(Math.random() * 2), 0.2);
      }
    } else if (theme === 'fatigue') {
      const iconSize = 3;
      const spacing = 2;
      const totalSlot = iconSize + spacing;
      let count = 0;
      for (let gy = 0; gy * totalSlot + 2 + iconSize <= rows; gy++) {
        for (let gx = 0; gx * totalSlot + 1 + iconSize <= cols; gx++) {
          const bx = 1 + gx * totalSlot;
          const by = 2 + gy * totalSlot;
          const isFaded = count > 3;
          const alpha = isFaded ? 0.15 + Math.random() * 0.1 : 0.7;
          for (let dy = 0; dy < iconSize; dy++) {
            for (let dx = 0; dx < iconSize; dx++) {
              if (dy === 0 || dy === iconSize - 1 || dx === 0 || dx === iconSize - 1) {
                put(bx + dx, by + dy, alpha);
              }
            }
          }
          count++;
        }
      }
      for (let d = 0; d < Math.min(cols, rows); d++) {
        put(d, d, 0.35);
        put(cols - 1 - d, d, 0.35);
      }
    } else if (theme === 'personal') {
      const rowH = 4;
      const gap = 2;
      for (let gy = 0; (gy + 1) * (rowH + gap) <= rows; gy++) {
        const by = gy * (rowH + gap) + 1;
        for (let gx = 0; gx < 4; gx++) {
          const bx = 1 + gx * 6;
          put(bx + 2, by, 0.5);
          put(bx + 1, by + 1, 0.5); put(bx + 2, by + 1, 0.5); put(bx + 3, by + 1, 0.5);
          put(bx, by + 2, 0.5); put(bx + 1, by + 2, 0.5); put(bx + 2, by + 2, 0.5); put(bx + 3, by + 2, 0.5); put(bx + 4, by + 2, 0.5);
          put(bx + 2, by + 3, 0.4);
        }
      }
      const my = Math.floor(rows / 2);
      for (let x = 3; x < cols - 3; x++) {
        put(x, my - 1, 0.65);
        put(x, my + 1, 0.65);
      }
    }
  }, [visible, theme]);

  return <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }} />;
}

// 1-bit pixel art for tech feature bento cells
export function TechGlyph({ theme, visible, size = 32 }: { theme: 'eye' | 'brain' | 'bell' | 'chat'; visible: boolean; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasDrawn = useRef(false);

  useEffect(() => {
    if (!visible || hasDrawn.current) return;
    hasDrawn.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cell = 3;
    const cols = size;
    const rows = size;
    canvas.width = cols * cell;
    canvas.height = rows * cell;

    const put = (x: number, y: number, a = 0.8) => {
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fillRect(x * cell, y * cell, cell - 0.5, cell - 0.5);
      }
    };

    if (theme === 'eye') {
      const cx = Math.floor(cols / 2), cy = Math.floor(rows / 2);
      for (let a = 0; a < Math.PI * 2; a += 0.08) {
        put(cx + Math.round(Math.cos(a) * 10), cy + Math.round(Math.sin(a) * 10), 0.5);
        put(cx + Math.round(Math.cos(a) * 11), cy + Math.round(Math.sin(a) * 11), 0.3);
      }
      for (let a = 0; a < Math.PI * 2; a += 0.1) {
        put(cx + Math.round(Math.cos(a) * 4), cy + Math.round(Math.sin(a) * 4), 0.9);
      }
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          if (dx * dx + dy * dy <= 9) put(cx + dx, cy + dy, 0.6);
        }
      }
      put(cx, cy, 1); put(cx - 1, cy - 1, 0.9);
      for (let i = 0; i < 4; i++) {
        const a = (Math.PI / 4) * (i * 2 + 0.5);
        for (let r = 12; r < 15; r++) {
          put(cx + Math.round(Math.cos(a) * r), cy + Math.round(Math.sin(a) * r), 0.2);
        }
      }
    } else if (theme === 'brain') {
      const nodes: [number, number][] = [];
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const r = 7 + Math.random() * 4;
        nodes.push([Math.floor(cols / 2 + Math.cos(a) * r), Math.floor(rows / 2 + Math.sin(a) * r)]);
      }
      nodes.push([Math.floor(cols / 2), Math.floor(rows / 2)]);
      nodes.push([Math.floor(cols / 2) - 3, Math.floor(rows / 2) + 2]);
      nodes.push([Math.floor(cols / 2) + 3, Math.floor(rows / 2) - 1]);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.sqrt((nodes[i][0] - nodes[j][0]) ** 2 + (nodes[i][1] - nodes[j][1]) ** 2);
          if (dist < 12) {
            const steps = Math.ceil(dist);
            for (let s = 0; s <= steps; s++) {
              const t = s / steps;
              put(Math.round(nodes[i][0] + (nodes[j][0] - nodes[i][0]) * t), Math.round(nodes[i][1] + (nodes[j][1] - nodes[i][1]) * t), 0.15);
            }
          }
        }
      }
      for (const [nx, ny] of nodes) {
        put(nx, ny, 0.9);
        put(nx + 1, ny, 0.5); put(nx - 1, ny, 0.5);
        put(nx, ny + 1, 0.5); put(nx, ny - 1, 0.5);
      }
    } else if (theme === 'bell') {
      const cx = Math.floor(cols / 2);
      for (let a = 0; a <= Math.PI; a += 0.08) {
        put(cx + Math.round(Math.cos(a) * 7), Math.floor(rows / 2) - Math.round(Math.sin(a) * 7), 0.7);
      }
      for (let y = Math.floor(rows / 2); y <= Math.floor(rows / 2) + 6; y++) {
        const width = 7 + Math.floor((y - rows / 2) * 0.8);
        put(cx - width, y, 0.5);
        put(cx + width, y, 0.5);
      }
      const by = Math.floor(rows / 2) + 7;
      for (let x = cx - 9; x <= cx + 9; x++) put(x, by, 0.6);
      for (let x = cx - 10; x <= cx + 10; x++) put(x, by + 1, 0.5);
      put(cx, by + 3, 0.7); put(cx, by + 2, 0.5);
      for (let ring = 0; ring < 3; ring++) {
        const r = 12 + ring * 2;
        const alpha = 0.25 - ring * 0.07;
        for (let a = -0.6; a <= 0.6; a += 0.1) {
          put(cx + Math.round(Math.cos(a - Math.PI / 2) * r), Math.floor(rows / 2) - 4 + Math.round(Math.sin(a - Math.PI / 2) * r), alpha);
        }
      }
    } else if (theme === 'chat') {
      for (let y = 6; y <= 14; y++) {
        for (let x = 4; x <= 20; x++) {
          if (y === 6 || y === 14) put(x, y, 0.4);
          else if (x === 4 || x === 20) put(x, y, 0.4);
        }
      }
      put(6, 15, 0.3); put(5, 16, 0.3);
      for (let x = 6; x <= 18; x++) { if (Math.random() > 0.2) put(x, 8, 0.25); }
      for (let x = 6; x <= 15; x++) { if (Math.random() > 0.2) put(x, 10, 0.25); }
      for (let x = 6; x <= 12; x++) { if (Math.random() > 0.25) put(x, 12, 0.25); }
      for (let y = 17; y <= 23; y++) {
        for (let x = 10; x <= 26; x++) {
          if (y === 17 || y === 23) put(x, y, 0.6);
          else if (x === 10 || x === 26) put(x, y, 0.6);
        }
      }
      put(24, 24, 0.5); put(25, 25, 0.5);
      for (let x = 12; x <= 24; x++) { if (Math.random() > 0.15) put(x, 19, 0.35); }
      for (let x = 12; x <= 20; x++) { if (Math.random() > 0.2) put(x, 21, 0.35); }
    }
  }, [visible, theme]);

  return <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }} />;
}

// 1-bit pixel art for architecture/implementation cards
export function ArchGlyph({ theme, visible, size = 32 }: { theme: 'messaging' | 'dashboard' | 'stack' | 'launch'; visible: boolean; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasDrawn = useRef(false);

  useEffect(() => {
    if (!visible || hasDrawn.current) return;
    hasDrawn.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cell = 3, cols = size, rows = size;
    canvas.width = cols * cell;
    canvas.height = rows * cell;
    const put = (x: number, y: number, a = 1) => {
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fillRect(x * cell, y * cell, cell - 0.5, cell - 0.5);
      }
    };
    if (theme === 'messaging') {
      const px = 8, py = 3, pw = 16, ph = 26;
      for (let x = px; x <= px + pw; x++) { put(x, py); put(x, py + ph); }
      for (let y = py; y <= py + ph; y++) { put(px, y); put(px + pw, y); }
      for (let x = px + 2; x <= px + pw - 2; x++) put(x, py + 3, 0.3);
      put(px + pw / 2, py + ph - 1, 0.5);
      for (let x = px + 3; x <= px + 10; x++) put(x, py + 7, 0.7);
      for (let x = px + 3; x <= px + 8; x++) put(x, py + 9, 0.7);
      for (let x = px + 8; x <= px + pw - 3; x++) put(x, py + 13, 0.5);
      for (let x = px + 10; x <= px + pw - 3; x++) put(x, py + 15, 0.5);
      for (let x = px + 3; x <= px + 12; x++) put(x, py + 19, 0.7);
      put(px + 3, py + 22, 0.4); put(px + 5, py + 22, 0.4); put(px + 7, py + 22, 0.4);
    } else if (theme === 'dashboard') {
      const bx = 3, by = 3, bw = 26, bh = 24;
      for (let x = bx; x <= bx + bw; x++) { put(x, by); put(x, by + bh); }
      for (let y = by; y <= by + bh; y++) { put(bx, y); put(bx + bw, y); }
      for (let x = bx; x <= bx + bw; x++) put(x, by + 2, 0.3);
      put(bx + 2, by + 1, 0.6); put(bx + 4, by + 1, 0.4); put(bx + 6, by + 1, 0.4);
      for (let y = by + 3; y <= by + bh - 1; y++) put(bx + 7, y, 0.2);
      for (let i = 0; i < 4; i++) { for (let x = bx + 2; x <= bx + 5; x++) put(x, by + 5 + i * 3, 0.35); }
      for (let i = 0; i < 4; i++) {
        const h = 3 + Math.floor(Math.random() * 8);
        for (let dy = 0; dy < h; dy++) { put(bx + 11 + i * 4, by + bh - 2 - dy, 0.5); put(bx + 12 + i * 4, by + bh - 2 - dy, 0.5); }
      }
    } else if (theme === 'stack') {
      const layers = [{ y: 4, w: 20 }, { y: 10, w: 22 }, { y: 16, w: 24 }, { y: 22, w: 18 }];
      for (const layer of layers) {
        const lx = Math.floor((cols - layer.w) / 2);
        for (let x = lx; x <= lx + layer.w; x++) { put(x, layer.y); put(x, layer.y + 4); }
        for (let y = layer.y; y <= layer.y + 4; y++) { put(lx, y); put(lx + layer.w, y); }
        for (let x = lx + 2; x < lx + layer.w - 1; x += 2) put(x, layer.y + 2, 0.3);
      }
      const cx = Math.floor(cols / 2);
      for (const layer of layers.slice(0, -1)) { for (let y = layer.y + 5; y < layer.y + 10; y++) { if (y < rows) put(cx, y, 0.2); } }
    } else if (theme === 'launch') {
      const cx = Math.floor(cols / 2);
      put(cx, 4); put(cx - 1, 5); put(cx + 1, 5); put(cx - 2, 6); put(cx + 2, 6); put(cx - 3, 7); put(cx + 3, 7);
      for (let y = 7; y <= 20; y++) { put(cx - 1, y, 0.7); put(cx, y, 0.8); put(cx + 1, y, 0.7); }
      put(cx - 3, 18, 0.5); put(cx - 2, 19, 0.5); put(cx - 2, 20, 0.5);
      put(cx + 3, 18, 0.5); put(cx + 2, 19, 0.5); put(cx + 2, 20, 0.5);
      for (let i = 0; i < 8; i++) put(cx - 2 + Math.floor(Math.random() * 5), 22 + Math.floor(Math.random() * 6), 0.15 + Math.random() * 0.25);
      for (let x = 5; x < cols - 5; x++) put(x, rows - 3, 0.8);
      for (let x = 5; x < cols - 5; x++) put(x, rows - 2, 0.15);
    }
  }, [visible, theme, size]);

  return <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }} />;
}
