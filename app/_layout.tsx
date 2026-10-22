import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DraftProvider } from '@/context/DraftContext';
import { C } from '@/utils/theme';

// Root layout: dibungkus DraftProvider (useContext) lalu semua halaman dikelola oleh <Stack>.
export default function RootLayout() {
  return (
    <DraftProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: C.bg },
          contentStyle: { backgroundColor: C.bg },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="shirt-selection" options={{ title: 'Pilih Baju' }} />
        <Stack.Screen name="upload-design" options={{ title: 'Upload Design' }} />
        <Stack.Screen name="mockup-editor" options={{ title: 'Customize Design' }} />
        <Stack.Screen name="order-confirmation" options={{ title: 'Konfirmasi Pesanan' }} />
        <Stack.Screen
          name="order-success"
          options={{ title: 'Berhasil', headerBackVisible: false, gestureEnabled: false }}
        />
        <Stack.Screen name="orders/index" options={{ title: 'Pesanan Saya' }} />
        <Stack.Screen name="orders/[id]" options={{ title: 'Detail Pesanan' }} />
        <Stack.Screen name="admin" options={{ title: 'Admin' }} />
      </Stack>
    </DraftProvider>
  );
}
