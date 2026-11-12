import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { ShirtProduct } from '../types/product';
import { C, s } from '../utils/theme';

export const fmtUsd = (n: number) => `$${n.toFixed(2)}`;

type Props = { item: ShirtProduct; favorite: boolean; onPress: () => void; onToggleFavorite: () => void };

export default function ProductCard({ item, favorite, onPress, onToggleFavorite }: Props) {
  return (
    <Pressable onPress={onPress} style={[s.card, { flexDirection: 'row', gap: 12, alignItems: 'center' }]}>
      <Image source={{ uri: item.thumbnail }} style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: '#202024' }} resizeMode="contain" />
      <View style={{ flex: 1 }}>
        <Text style={[s.txt, { fontWeight: '800' }]} numberOfLines={2}>{item.title}</Text>
        <Text style={s.sub}>{item.brand}</Text>
        <Text style={[s.sub, { marginTop: 2 }]}>{fmtUsd(item.price)} · ★ {item.rating.toFixed(1)}</Text>
      </View>
      <Pressable onPress={onToggleFavorite} hitSlop={12} accessibilityLabel={favorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}>
        <Text style={{ fontSize: 26, color: favorite ? C.accent : C.sub }}>{favorite ? '♥' : '♡'}</Text>
      </Pressable>
    </Pressable>
  );
}
