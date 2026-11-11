import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import Btn from '@/components/Btn';
import Chip from '@/components/Chip';
import OrderCard from '@/components/OrderCard';
import { getOrders } from '@/services/orderStorage';
import { Order, OrderStatus, STATUS_FLOW, STATUS_LABEL } from '@/types/order';
import { C, s } from '@/utils/theme';

type InputRef = React.ComponentRef<typeof TextInput>;

export default function MyOrdersScreen() {
  const router = useRouter();
  // useLocalSearchParams: filter status dibaca dari URL, mis. /orders?status=printing
  const { status } = useLocalSearchParams<{ status?: string }>();
  const activeStatus = STATUS_FLOW.find((st) => st === status) ?? null;

  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState('');           // isi kolom cari (berubah tiap ketikan)
  const [debounced, setDebounced] = useState('');   // kata kunci yang dipakai menyaring
  const searchRef = useRef<InputRef>(null);        // useRef: akses TextInput tanpa memicu re-render

  useFocusEffect(useCallback(() => { getOrders().then(setOrders); }, []));

  // useEffect + cleanup: tunggu 300 ms setelah user berhenti mengetik, baru perbarui `debounced`.
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // useMemo: daftar hasil saring hanya dihitung ulang saat orders / status / kata kunci berubah.
  const shown = useMemo(
    () => orders.filter((o) =>
      (!activeStatus || o.status === activeStatus) &&
      (!debounced || [o.id, o.customerName, o.shirtModel].some((v) => v.toLowerCase().includes(debounced)))),
    [orders, activeStatus, debounced],
  );

  const clearSearch = () => { setQuery(''); setDebounced(''); searchRef.current?.focus(); };
  // setParams: ubah parameter route yang sedang aktif tanpa pindah halaman (undefined = hapus filter).
  const filterBy = (st: OrderStatus | null) => router.setParams({ status: st ?? undefined });

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
      <TextInput
        ref={searchRef} style={s.input} placeholder="Cari ID, nama, atau model kaos"
        placeholderTextColor={C.sub} value={query} onChangeText={setQuery} returnKeyType="search" />
      <View style={[s.row, { marginBottom: 12 }]}>
        <Chip label="Semua" active={!activeStatus} onPress={() => filterBy(null)} />
        {STATUS_FLOW.map((st) => (
          <Chip key={st} label={STATUS_LABEL[st]} active={activeStatus === st} onPress={() => filterBy(st)} />
        ))}
      </View>
      <Text style={[s.sub, { marginBottom: 10 }]}>Menampilkan {shown.length} dari {orders.length} pesanan</Text>
      {orders.length === 0 && <Text style={s.sub}>Belum ada pesanan.</Text>}
      {orders.length > 0 && shown.length === 0 && (
        <>
          <Text style={s.sub}>Tidak ada pesanan yang cocok.</Text>
          <Btn title="Hapus Pencarian" ghost onPress={clearSearch} />
        </>
      )}
      {shown.map((o) => <OrderCard key={o.id} order={o} onPress={() => router.push({ pathname: '/orders/[id]', params: { id: o.id } })} />)}
    </ScrollView>
  );
}
