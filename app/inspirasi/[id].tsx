import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Btn from '@/components/Btn';
import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import { fmtUsd } from '@/components/ProductCard';
import { useDraft } from '@/context/DraftContext';
import { getFavoriteIds, toggleFavorite } from '@/services/favoriteService';
import { getShirtById } from '@/services/productService';
import { ShirtProduct } from '@/types/product';
import { s } from '@/utils/theme';

export default function InspirasiDetailScreen() {
  const router = useRouter();
  const { reset } = useDraft();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<ShirtProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [reloadKey, setReloadKey] = useState(0); // dinaikkan saat "Coba Lagi" agar effect berjalan ulang

  // Versi .then() / .catch() / .finally(): getShirtById() mengembalikan Promise.
  // `active` mencegah update state jika user sudah meninggalkan halaman.
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getShirtById(Number(id))
      .then((res) => { if (active) setProduct(res.data); })
      .catch((e: unknown) => { if (active) setError(e instanceof Error ? e.message : 'Gagal memuat detail kaos.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, reloadKey]);

  useEffect(() => { getFavoriteIds().then(setFavorites); }, []);

  // canGoBack: aman jika halaman dibuka langsung lewat deep link tanpa riwayat.
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/inspirasi'));
  const startDesign = () => { reset(); router.push('/shirt-selection'); };

  if (loading) return <ScrollView style={s.screen} contentContainerStyle={s.pad}><Loading label="Memuat detail kaos..." /></ScrollView>;
  if (error || !product) {
    return (
      <ScrollView style={s.screen} contentContainerStyle={s.pad}>
        <ErrorMessage message={error || 'Data kaos tidak ditemukan.'} onRetry={() => setReloadKey((k) => k + 1)} />
        <Btn title="Kembali" ghost onPress={goBack} />
      </ScrollView>
    );
  }

  const isFavorite = favorites.includes(product.id);
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      <Image source={{ uri: product.thumbnail }} style={{ width: '100%', aspectRatio: 1, borderRadius: 16, backgroundColor: '#202024' }} resizeMode="contain" />
      <Text style={[s.h1, { marginTop: 16 }]}>{product.title}</Text>
      <Text style={[s.sub, { marginTop: 4 }]}>{product.brand}</Text>
      <View style={[s.card, { marginTop: 14 }]}>
        <Text style={s.txt}>Harga referensi: {fmtUsd(product.price)}</Text>
        <Text style={s.txt}>Rating: ★ {product.rating.toFixed(1)}</Text>
        <Text style={s.txt}>Stok katalog: {product.stock}</Text>
      </View>
      <Text style={s.sub}>{product.description}</Text>
      <Btn title={isFavorite ? '♥ Hapus dari Favorit' : '♡ Tambah ke Favorit'} ghost onPress={() => { toggleFavorite(product.id).then(setFavorites); }} />
      <Btn title="Mulai Design Kaosmu" onPress={startDesign} />
      <Text style={[s.sub, { marginTop: 8, fontSize: 12 }]}>Ini hanya inspirasi. Model, warna, dan ukuran dipilih di langkah berikutnya.</Text>
      <Btn title="Kembali" ghost onPress={goBack} />
    </ScrollView>
  );
}
