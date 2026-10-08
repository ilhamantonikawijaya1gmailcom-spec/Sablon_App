import React from 'react';
import { Text, View } from 'react-native';
import { OrderStatus as S, STATUS_LABEL } from '../types/order';
import { C } from '../utils/theme';

export default function OrderStatus({ status }: { status: S }) {
  return (
    <View style={{ alignSelf: 'flex-start', backgroundColor: status === 'completed' ? '#1F7A3E' : C.accent, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 }}>
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>{STATUS_LABEL[status]}</Text>
    </View>
  );
}
