import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Btn from '../components/Btn';
import OrderCard from '../components/OrderCard';
import { getOrders, updateOrderStatus } from '../services/orderStorage';
import { Order, STATUS_FLOW, STATUS_LABEL } from '../types/order';
import { s } from '../utils/theme';

export default function AdminScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const load = useCallback(() => { getOrders().then(setOrders); }, []);
  useFocusEffect(load);
  const advance = async (o: Order) => {
    const next = STATUS_FLOW[STATUS_FLOW.indexOf(o.status) + 1];
    if (next) { await updateOrderStatus(o.id, next); load(); }
  };
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      {orders.length === 0 && <Text style={s.sub}>Belum ada pesanan masuk.</Text>}
      {orders.map((o) => {
        const next = STATUS_FLOW[STATUS_FLOW.indexOf(o.status) + 1];
        return (
          <OrderCard key={o.id} order={o}>
            {next
              ? <Btn title={`Ubah Status → ${STATUS_LABEL[next]}`} onPress={() => advance(o)} />
              : <Text style={[s.sub, { marginTop: 10 }]}>Pesanan selesai.</Text>}
          </OrderCard>
        );
      })}
    </ScrollView>
  );
}
