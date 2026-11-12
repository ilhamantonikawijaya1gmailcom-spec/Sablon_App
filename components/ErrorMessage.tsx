import React from 'react';
import { Text, View } from 'react-native';
import { s } from '../utils/theme';
import Btn from './Btn';

export default function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View style={s.card}>
      <Text style={[s.txt, { fontWeight: '700' }]}>Gagal memuat data</Text>
      <Text style={s.err}>{message}</Text>
      {onRetry && <Btn title="Coba Lagi" onPress={onRetry} />}
    </View>
  );
}
