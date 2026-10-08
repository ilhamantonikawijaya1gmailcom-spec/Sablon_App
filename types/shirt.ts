export type Size = 'S' | 'M' | 'L' | 'XL' | 'OVERSIZE';
export type ShirtType = 'regular' | 'oversize';
export type ShirtColor = 'black' | 'white';
export type PrintArea = { x: number; y: number; width: number; height: number };
export type ShirtTemplate = {
  id: string;
  name: string;
  type: ShirtType;
  color: ShirtColor;
  image: any | null; // require('../assets/...') ; null = placeholder gambar
  availableSizes: Size[];
  printArea: PrintArea;
};
export type DesignSize = { w: number; h: number };
