import { DesignSize, ShirtTemplate, Size } from '../types/shirt';

export const ASPECT = 1.15; // tinggi / lebar container mockup
export const MIN_SCALE = 0.2;
export const MAX_SCALE = 1; // 1 = desain pas memenuhi print area
export const SIZE_SCALE: Record<Size, number> = { S: 0.94, M: 0.97, L: 1, XL: 1.03, OVERSIZE: 1.06 };

export const getPrintBox = (t: ShirtTemplate, size: Size, W: number) => {
  const k = SIZE_SCALE[size] ?? 1;
  const { x, y, width, height } = t.printArea;
  const w = width * W * k;
  const h = height * W * ASPECT * k;
  const cx = (x + width / 2) * W;
  const cy = (y + height / 2) * W * ASPECT;
  return { left: cx - w / 2, top: cy - h / 2, width: w, height: h };
};

// Ukuran dasar desain (fraksi dari print area) dengan aspect ratio asli (contain).
export const getDesignFrac = (t: ShirtTemplate, d: DesignSize) => {
  const boxAR = t.printArea.width / (t.printArea.height * ASPECT);
  const dAR = d.w / d.h;
  return dAR > boxAR ? { fw: 1, fh: boxAR / dAR } : { fw: dAR / boxAR, fh: 1 };
};

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export const clampPosition = (
  pos: { x: number; y: number }, scale: number, t: ShirtTemplate, d: DesignSize
) => {
  const { fw, fh } = getDesignFrac(t, d);
  const mx = Math.max(0, (1 - fw * scale) / 2);
  const my = Math.max(0, (1 - fh * scale) / 2);
  return { x: clamp(pos.x, -mx, mx), y: clamp(pos.y, -my, my) };
};

export const getDesignRect = (
  t: ShirtTemplate, size: Size, W: number, d: DesignSize,
  pos: { x: number; y: number }, scale: number
) => {
  const box = getPrintBox(t, size, W);
  const { fw, fh } = getDesignFrac(t, d);
  const width = box.width * fw * scale;
  const height = box.height * fh * scale;
  return {
    width, height,
    left: box.left + box.width / 2 - width / 2 + pos.x * box.width,
    top: box.top + box.height / 2 - height / 2 + pos.y * box.height,
  };
};
