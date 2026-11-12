import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import Chip from '@/components/Chip';
import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import ProductCard from '@/components/ProductCard';
import { getFavoriteIds, toggleFavorite } from '@/services/favoriteService';
import { getShirts } from '@/services/productService';
import { ShirtProduct } from '@/types/product';
import { C, s } from '@/utils/theme';

export default function InspirasiScreen() {
  const router = useRouter();
  const [shirts, setShirts] = useState<ShirtProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [query, setQuery] = useState('');
  const [onlyFavorite, setOnlyFavorite] = useState(false);

  // useRef: penanda apakah layar masih tampil, agar tidak mengubah state setelah layar ditutup.
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Memuat daftar kaos dari API (async/await). Dipanggil saat layar dibuka dan saat "Coba Lagi".
  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await getShirts();
    if (!mounted.current) return;
    if (res.success) setShirts(res.data);
    else setError(res.message);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // Favorit dibaca ulang setiap layar kembali fokus (mis. setelah mengubah favorit di halaman detail).
  useFocusEffect(useCallback(() => { getFavoriteIds().then(setFavorites); }, []));

  // useMemo: saring daftar hanya saat data, kata kunci, atau filter favorit berubah.
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shirts.filter((p) =>
      (!onlyFavorite || favorites.includes(p.id)) &&
      (!q || p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)));
  }, [shirts, favorites, query, onlyFavorite]);

  const onToggle = (id: number) => { toggleFavorite(id).then(setFavorites); };

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
      <Text style={s.h1}>Inspirasi Kaos</Text>
      <Text style={[s.sub, { marginBottom: 14 }]}>
        Lihat referensi kaos dari katalog online (DummyJSON, harga dalam USD), lalu buat desainmu sendiri.
      </Text>

      {loading && <Loading label="Memuat katalog kaos..." />}
      {!loading && !!error && <ErrorMessage message={error} onRetry={load} />}

      {!loading && !error && (
        <View>
          <TextInput
            style={s.input} placeholder="Cari nama atau merek kaos" placeholderTextColor={C.sub}
            value={query} onChangeText={setQuery} />
          <View style={[s.row, { marginBottom: 12 }]}>
            <Chip label="Semua" active={!onlyFavorite} onPress={() => setOnlyFavorite(false)} />
            <Chip label={`Favorit (${favorites.length})`} active={onlyFavorite} onPress={() => setOnlyFavorite(true)} />
          </View>
          <Text style={[s.sub, { marginBottom: 10 }]}>Menampilkan {shown.length} dari {shirts.length} kaos</Text>
          {shown.length === 0 && (
            <Text style={s.sub}>{onlyFavorite && !query ? 'Belum ada kaos favorit.' : 'Tidak ada kaos yang cocok.'}</Text>
          )}
          {shown.map((p) => (
            <ProductCard
              key={p.id} item={p} favorite={favorites.includes(p.id)}
              onPress={() => router.push({ pathname: '/inspirasi/[id]', params: { id: String(p.id) } })}
              onToggleFavorite={() => onToggle(p.id)} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
