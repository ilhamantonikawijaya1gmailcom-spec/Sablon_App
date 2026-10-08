import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Btn from '../components/Btn';
import { OrderMockup } from '../components/MockupViewer';
import OrderStatus from '../components/OrderStatus';
import { getOrder } from '../services/orderStorage';
import { Order } from '../types/order';
import { s } from '../utils/theme';

export default function OrderSuccessScreen({ route, navigation }: any) {
  const [o, setO] = useState<Order | null>(null);
  useEffect(() => { getOrder(route.params.id).then(setO); }, []);
  if (!o) return <ScrollView style={s.screen} />;
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      <Text style={s.h1}>Pesanan Berhasil Dibuat</Text>
      <Text style={[s.h2, { marginTop: 8 }]}>Order ID: {o.id}</Text>
      <OrderStatus status={o.status} />
      <Text style={[s.sub, { marginVertical: 12 }]}>{o.shirtModel} · Size {o.size} · Qty {o.quantity}</Text>
      <OrderMockup order={o} />
      <Btn title="Lihat Pesanan" onPress={() => navigation.navigate('MyOrders')} />
    </ScrollView>
  );
}
