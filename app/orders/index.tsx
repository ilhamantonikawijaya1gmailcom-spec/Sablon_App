import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import OrderCard from '@/components/OrderCard';
import { getOrders } from '@/services/orderStorage';
import { Order } from '@/types/order';
import { s } from '@/utils/theme';

export default function MyOrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  useFocusEffect(useCallback(() => { getOrders().then(setOrders); }, []));
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      {orders.length === 0 && <Text style={s.sub}>Belum ada pesanan.</Text>}
      {orders.map((o) => <OrderCard key={o.id} order={o} onPress={() => router.push({ pathname: '/orders/[id]', params: { id: o.id } })} />)}
    </ScrollView>
  );
}
