import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Btn from '@/components/Btn';
import { useAuth } from '@/context/AuthContext';
import { useDraft } from '@/context/DraftContext';
import { C, s } from '@/utils/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { reset } = useDraft();
  const { user, signOut } = useAuth();

  return (
    <View style={[s.screen, { padding: 24, justifyContent: 'center' }]}>
      {/* Info User & Tombol Sign Out */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
          paddingBottom: 14,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255,255,255,0.12)',
        }}
      >
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
            Halo, {user?.user_metadata?.full_name || 'Pelanggan'}
          </Text>
          <Text style={{ color: C.sub, fontSize: 12 }} numberOfLines={1}>
            {user?.email}
          </Text>
        </View>
        <TouchableOpacity
          onPress={signOut}
          style={{
            backgroundColor: '#dc2626',
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>Keluar</Text>
        </TouchableOpacity>
      </View>

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