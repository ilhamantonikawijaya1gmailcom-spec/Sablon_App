import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { OrderMockup } from '../components/MockupViewer';
import { fmtDate } from '../components/OrderCard';
import StatusTimeline from '../components/StatusTimeline';
import { getOrder } from '../services/orderStorage';
import { Order } from '../types/order';
import { s } from '../utils/theme';

export default function OrderDetailScreen({ route }: any) {
  const [o, setO] = useState<Order | null>(null);
  useFocusEffect(useCallback(() => { getOrder(route.params.id).then(setO); }, []));
  if (!o) return <View style={s.screen} />;
  const row = (k: string, v: string) => <Text style={s.txt}><Text style={{ color: '#9A9AA2' }}>{k}: </Text>{v || '-'}</Text>;
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      <OrderMockup order={o} />
      <View style={[s.card, { marginTop: 14 }]}>
        {row('Order ID', o.id)}{row('Tanggal', fmtDate(o.createdAt))}{row('Customer', `${o.customerName} (${o.phone})`)}
        {row('Alamat', o.address)}{row('Model', o.shirtModel)}{row('Color', o.shirtColor)}
        {row('Size', o.size)}{row('Quantity', String(o.quantity))}{row('Notes', o.notes)}
        <Image source={{ uri: o.designImage }} style={{ width: 70, height: 70, marginTop: 8 }} resizeMode="contain" />
      </View>
      <Text style={s.h2}>Status</Text>
      <StatusTimeline status={o.status} />
    </ScrollView>
  );
}
