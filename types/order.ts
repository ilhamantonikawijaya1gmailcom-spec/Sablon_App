import { ShirtColor, ShirtType, Size } from './shirt';
export type OrderStatus = 'received' | 'design_checked' | 'printing' | 'completed';
export const STATUS_FLOW: OrderStatus[] = ['received', 'design_checked', 'printing', 'completed'];
export const STATUS_LABEL: Record<OrderStatus, string> = {
  received: 'Pesanan Diterima',
  design_checked: 'Design Dicek',
  printing: 'Proses Sablon',
  completed: 'Selesai',
};
export type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  notes: string;
  shirtModel: string;
  shirtColor: ShirtColor;
  shirtType: ShirtType;
  size: Size;
  quantity: number;
  designImage: string;
  // x,y = offset desain dari tengah print area (fraksi 0-1 dari lebar/tinggi print area)
  mockupData: { templateId: string; x: number; y: number; scale: number; designWidth: number; designHeight: number };
  status: OrderStatus;
  createdAt: string;
};
