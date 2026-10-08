import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order, OrderStatus } from '../types/order';

const KEY = 'sablon_orders_v1';

export async function getOrders(): Promise<Order[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
const persist = (list: Order[]) => AsyncStorage.setItem(KEY, JSON.stringify(list));

export async function createOrder(data: Omit<Order, 'id' | 'status' | 'createdAt'>): Promise<Order> {
  const list = await getOrders();
  const order: Order = {
    ...data,
    id: `#SB-${String(list.length + 1).padStart(4, '0')}`,
    status: 'received',
    createdAt: new Date().toISOString(),
  };
  await persist([order, ...list]);
  return order;
}
export async function getOrder(id: string) {
  return (await getOrders()).find((o) => o.id === id) ?? null;
}
export async function updateOrderStatus(id: string, status: OrderStatus) {
  const list = (await getOrders()).map((o) => (o.id === id ? { ...o, status } : o));
  await persist(list);
}
