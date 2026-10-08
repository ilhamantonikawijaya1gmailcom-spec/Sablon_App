import { ShirtTemplate } from '../types/shirt';

const regularArea = { x: 0.25, y: 0.2, width: 0.5, height: 0.45 };
const oversizeArea = { x: 0.2, y: 0.18, width: 0.6, height: 0.48 };

// Ganti `image: null` dengan require('../assets/black-regular.png') dst. bila aset sudah ada.
export const shirtTemplates: ShirtTemplate[] = [
  { id: 'black-regular', name: 'Black Regular T-Shirt', type: 'regular', color: 'black', image: null, availableSizes: ['S', 'M', 'L', 'XL'], printArea: regularArea },
  { id: 'white-regular', name: 'White Regular T-Shirt', type: 'regular', color: 'white', image: null, availableSizes: ['S', 'M', 'L', 'XL'], printArea: regularArea },
  { id: 'black-oversize', name: 'Black Oversize T-Shirt', type: 'oversize', color: 'black', image: null, availableSizes: ['M', 'L', 'XL', 'OVERSIZE'], printArea: oversizeArea },
  { id: 'white-oversize', name: 'White Oversize T-Shirt', type: 'oversize', color: 'white', image: null, availableSizes: ['M', 'L', 'XL', 'OVERSIZE'], printArea: oversizeArea },
];

export const getTemplate = (id: string) => shirtTemplates.find((t) => t.id === id);
export const findTemplate = (type?: string | null, color?: string | null) =>
  shirtTemplates.find((t) => t.type === type && t.color === color);
