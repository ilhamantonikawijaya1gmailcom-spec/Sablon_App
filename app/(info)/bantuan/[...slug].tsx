import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import Btn from '@/components/Btn';
import { resolveHelp } from '@/data/helpTopics';
import { s } from '@/utils/theme';

// Catch-All Route: satu file menangani banyak tingkat path di bawah /bantuan,
// mis. /bantuan/cara-pesan, /bantuan/ukuran, /bantuan/ukuran/regular.
export default function BantuanDetailScreen() {
  const router = useRouter();
  // Untuk [...slug], nilainya berupa array (bisa string saja jika hanya 1 tingkat di beberapa platform).
  const { slug } = useLocalSearchParams<{ slug: string | string[] }>();
  const parts = Array.isArray(slug) ? slug : slug ? [slug] : [];
  const page = resolveHelp(parts);

  // canGoBack: kalau halaman dibuka langsung (tanpa riwayat), ganti ke daftar topik.
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/bantuan'));

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      <Text style={[s.sub, { marginBottom: 6 }]}>/bantuan/{parts.join('/')}</Text>
      {page ? (
        <>
          <Text style={[s.h1, { marginBottom: 12 }]}>{page.title}</Text>
          {page.body.map((line) => <Text key={line} style={[s.txt, { fontSize: 15, marginBottom: 8 }]}>{line}</Text>)}
          {page.links?.map((l) => (
            <Link key={l.href} href={l.href as any} asChild>
              <Pressable style={s.card}>
                <Text style={[s.txt, { fontWeight: '700', marginBottom: 0 }]}>{l.label}  ›</Text>
              </Pressable>
            </Link>
          ))}
        </>
      ) : (
        <>
          <Text style={s.h1}>Halaman tidak ditemukan</Text>
          <Text style={[s.sub, { marginTop: 8 }]}>Topik bantuan yang kamu cari belum tersedia.</Text>
          <Btn title="Ke Daftar Bantuan" onPress={() => router.replace('/bantuan')} />
        </>
      )}
      <Btn title="Kembali" ghost onPress={goBack} />
    </ScrollView>
  );
}
