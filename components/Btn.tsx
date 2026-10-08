import React from 'react';
import { Pressable, Text } from 'react-native';
import { C } from '../utils/theme';

export default function Btn({ title, onPress, ghost, disabled, small }: {
  title: string; onPress: () => void; ghost?: boolean; disabled?: boolean; small?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress} disabled={disabled}
      style={{
        backgroundColor: ghost ? 'transparent' : C.accent, borderWidth: 1, borderColor: ghost ? C.line : C.accent,
        paddingVertical: small ? 8 : 14, paddingHorizontal: small ? 14 : 18, borderRadius: 12,
        alignItems: 'center', opacity: disabled ? 0.4 : 1, marginTop: small ? 0 : 10,
      }}>
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: small ? 14 : 16 }}>{title}</Text>
    </Pressable>
  );
}
