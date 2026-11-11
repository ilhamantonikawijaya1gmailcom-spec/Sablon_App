import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { helpTopics } from '@/data/helpTopics';
import { s } from '@/utils/theme';

// Index Page dari folder bantuan -> URL: /bantuan
export default function BantuanIndexScreen() {
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      <Text style={s.h1}>Pusat Bantuan</Text>
      <Text style={[s.sub, { marginBottom: 16 }]}>Pilih topik yang ingin kamu ketahui.</Text>
      {helpTopics.map((t) => (
        // Link deklaratif: asChild meneruskan navigasi ke Pressable di dalamnya.
        <Link key={t.href} href={t.href as any} asChild>
          <Pressable style={s.card}>
            <Text style={[s.txt, { fontWeight: '700', marginBottom: 0 }]}>{t.label}  ›</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}
