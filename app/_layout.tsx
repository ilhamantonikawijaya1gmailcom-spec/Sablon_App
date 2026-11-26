import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DraftProvider } from '@/context/DraftContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { C } from '@/utils/theme';

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: C.bg }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: C.bg },
          contentStyle: { backgroundColor: C.bg },
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
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
        <Stack.Screen name="inspirasi/index" options={{ title: 'Inspirasi Kaos' }} />
        <Stack.Screen name="inspirasi/[id]" options={{ title: 'Detail Inspirasi' }} />
        {/* Route group (info) tidak muncul di URL: tetap /bantuan. Dibuka sebagai modal, header diatur layout bantuan sendiri. */}
        <Stack.Screen name="(info)/bantuan" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </>
  );
}

// Root layout: dibungkus AuthProvider & DraftProvider lalu semua halaman dikelola oleh <Stack>.
export default function RootLayout() {
  return (
    <AuthProvider>
      <DraftProvider>
        <RootLayoutNav />
      </DraftProvider>
    </AuthProvider>
  );
}