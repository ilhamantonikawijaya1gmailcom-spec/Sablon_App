import React from 'react';
import { Text, View } from 'react-native';
import { ShirtColor, ShirtType } from '../types/shirt';
import { s } from '../utils/theme';
import Chip from './Chip';

export default function ShirtSelector({ type, color, onType, onColor }: {
  type: ShirtType | null; color: ShirtColor | null;
  onType: (t: ShirtType) => void; onColor: (c: ShirtColor) => void;
}) {
  return (
    <View>
      <Text style={s.h2}>Model</Text>
      <View style={s.row}>
        <Chip label="Regular" active={type === 'regular'} onPress={() => onType('regular')} />
        <Chip label="Oversize" active={type === 'oversize'} onPress={() => onType('oversize')} />
      </View>
      <Text style={s.h2}>Color</Text>
      <View style={s.row}>
        <Chip label="Black" active={color === 'black'} onPress={() => onColor('black')} />
        <Chip label="White" active={color === 'white'} onPress={() => onColor('white')} />
      </View>
    </View>
  );
}
