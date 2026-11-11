import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { C } from '@/utils/theme';

// Layout Page + Nested Stack: semua halaman Bantuan punya Stack sendiri.
// Stack ini dibuka sebagai modal dari root layout (presentation: 'modal').
export default function BantuanLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: C.bg },
        contentStyle: { backgroundColor: C.bg },
        // dismissTo('/') menutup seluruh modal Bantuan dari halaman sedalam apa pun dan kembali ke Beranda.
        // (dismiss() biasa hanya membuang 1 halaman di stack yang aktif, jadi kurang cocok untuk tombol Tutup.)
        headerRight: () => (
          <Pressable onPress={() => router.dismissTo('/')} hitSlop={10}>
            <Text style={{ color: C.accent, fontWeight: '700' }}>Tutup</Text>
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Bantuan' }} />
      <Stack.Screen name="[...slug]" options={{ title: 'Panduan' }} />
    </Stack>
  );
}
