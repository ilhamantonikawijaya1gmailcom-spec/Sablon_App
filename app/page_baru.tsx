import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Btn from '@/components/Btn';
import OrderCard from '@/components/OrderCard';
import { getOrders, updateOrderStatus } from '@/services/orderStorage';
import { Order, STATUS_FLOW, STATUS_LABEL } from '@/types/order';
import { s } from '@/utils/theme';






export default function AdminScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const load = useCallback(() => { getOrders().then(setOrders); }, []);
  useFocusEffect(load);
  // useMemo: ringkasan jumlah pesanan per status, hanya dihitung ulang saat `orders` berubah.
  const summary = useMemo(
    () => STATUS_FLOW.map((st) => ({ st, n: orders.filter((o) => o.status === st).length })),
    [orders],
  );
  // canGoBack: aman kalau halaman dibuka lewat deep link tanpa riwayat.
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));
  const advance = async (o: Order) => {
    const next = STATUS_FLOW[STATUS_FLOW.indexOf(o.status) + 1];
    if (next) { await updateOrderStatus(o.id, next); load(); }
  };

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      
      <Btn title="Kembali" ghost onPress={goBack} />
   </ScrollView>
  );
}
