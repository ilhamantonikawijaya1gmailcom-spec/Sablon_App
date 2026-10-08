import React from 'react';
import { Text, View } from 'react-native';
import { OrderStatus, STATUS_FLOW, STATUS_LABEL } from '../types/order';
import { C } from '../utils/theme';

export default function StatusTimeline({ status }: { status: OrderStatus }) {
  const cur = STATUS_FLOW.indexOf(status);
  return (
    <View>
      {STATUS_FLOW.map((st, i) => (
        <View key={st} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={{ alignItems: 'center', width: 24 }}>
            <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: i <= cur ? C.accent : C.line }} />
            {i < STATUS_FLOW.length - 1 && <View style={{ width: 2, height: 28, backgroundColor: i < cur ? C.accent : C.line }} />}
          </View>
          <Text style={{ color: i <= cur ? '#fff' : C.sub, fontWeight: i === cur ? '700' : '400', marginLeft: 8, marginTop: -2 }}>
            {STATUS_LABEL[st]}
          </Text>
        </View>
      ))}
    </View>
  );
}
