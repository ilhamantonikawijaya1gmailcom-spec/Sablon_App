import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Btn from '@/components/Btn';
import { useDraft } from '@/context/DraftContext';
import { C, s } from '@/utils/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { reset } = useDraft();
  return (
    <View style={[s.screen, { padding: 24, justifyContent: 'center' }]}>
      <Text style={{ color: C.accent, fontWeight: '800', letterSpacing: 4 }}>SABLON APP</Text>
      <Text style={[s.h1, { fontSize: 38, marginVertical: 12 }]}>Design Your Own Shirt</Text>
      <Text style={[s.sub, { marginBottom: 24 }]}>Upload desainmu, lihat mockup, lalu pesan.</Text>
      <Btn title="Mulai Design" onPress={() => { reset(); router.push('/shirt-selection'); }} />
      {/* Navigasi deklaratif dengan <Link>; asChild = tampilan tetap memakai tombol Btn. */}
      <Link href="/inspirasi" asChild>
        <Btn title="Inspirasi Kaos" ghost />
      </Link>
      <Link href="/orders" asChild>
        <Btn title="Pesanan Saya" ghost />
      </Link>
      <Link href="/bantuan" asChild>
        <Btn title="Bantuan" ghost />
      </Link>
      <View style={{ marginTop: 32, alignItems: 'center' }}>
        <Btn title="Admin" ghost small onPress={() => router.push('/admin')} />
      </View>
    </View>
  );
}
