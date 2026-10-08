import React from 'react';
import { Pressable, Text } from 'react-native';
import { C } from '../utils/theme';

export default function Chip({ label, active, disabled, onPress }: {
  label: string; active?: boolean; disabled?: boolean; onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={{
      paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, borderWidth: 1,
      borderColor: active ? C.accent : C.line, backgroundColor: active ? C.accent : C.card, opacity: disabled ? 0.3 : 1,
    }}>
      <Text style={{ color: '#fff', fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}
