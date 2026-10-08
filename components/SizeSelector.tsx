import React from 'react';
import { Text, View } from 'react-native';
import { Size } from '../types/shirt';
import { s } from '../utils/theme';
import Chip from './Chip';

const ALL: Size[] = ['S', 'M', 'L', 'XL', 'OVERSIZE'];
export default function SizeSelector({ value, available, onChange }: {
  value: Size | null; available?: Size[]; onChange: (s: Size) => void;
}) {
  return (
    <View>
      <Text style={s.h2}>Size</Text>
      <View style={s.row}>
        {ALL.map((z) => (
          <Chip key={z} label={z} active={value === z} disabled={!!available && !available.includes(z)} onPress={() => onChange(z)} />
        ))}
      </View>
    </View>
  );
}
