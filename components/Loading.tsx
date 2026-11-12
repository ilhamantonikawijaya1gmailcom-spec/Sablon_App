import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { C, s } from '../utils/theme';

export default function Loading({ label = 'Memuat data...' }: { label?: string }) {
  return (
    <View style={{ alignItems: 'center', paddingVertical: 40, gap: 12 }}>
      <ActivityIndicator size="large" color={C.accent} />
      <Text style={s.sub}>{label}</Text>
    </View>
  );
}
