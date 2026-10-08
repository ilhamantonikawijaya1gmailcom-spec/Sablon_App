import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Order } from '../types/order';
import { s } from '../utils/theme';
import { OrderMockup } from './MockupViewer';
import OrderStatus from './OrderStatus';

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

export default function OrderCard({ order, onPress, children }: { order: Order; onPress?: () => void; children?: React.ReactNode }) {
  return (
    <Pressable onPress={onPress} style={s.card}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ width: 90 }}><OrderMockup order={order} /></View>
        <View style={{ flex: 1 }}>
          <Text style={[s.txt, { fontWeight: '800' }]}>{order.id}</Text>
          <Text style={s.txt}>{order.customerName}</Text>
          <Text style={s.sub}>{order.shirtModel} · {order.size} · x{order.quantity}</Text>
          <Text style={[s.sub, { marginBottom: 6 }]}>{fmtDate(order.createdAt)}</Text>
          <OrderStatus status={order.status} />
        </View>
      </View>
      {children}
    </Pressable>
  );
}
