import React from 'react';
import { Text, View } from 'react-native';
import Btn from '../components/Btn';
import { useDraft } from '../context/DraftContext';
import { C, s } from '../utils/theme';

export default function HomeScreen({ navigation }: any) {
  const { reset } = useDraft();
  return (
    <View style={[s.screen, { padding: 24, justifyContent: 'center' }]}>
      <Text style={{ color: C.accent, fontWeight: '800', letterSpacing: 4 }}>SABLON APP</Text>
      <Text style={[s.h1, { fontSize: 38, marginVertical: 12 }]}>Design Your Own Shirt</Text>
      <Text style={[s.sub, { marginBottom: 24 }]}>Upload desainmu, lihat mockup, lalu pesan.</Text>
      <Btn title="Mulai Design" onPress={() => { reset(); navigation.navigate('ShirtSelection'); }} />
      <Btn title="Pesanan Saya" ghost onPress={() => navigation.navigate('MyOrders')} />
      <View style={{ marginTop: 32, alignItems: 'center' }}>
        <Btn title="Admin" ghost small onPress={() => navigation.navigate('Admin')} />
      </View>
    </View>
  );
}
