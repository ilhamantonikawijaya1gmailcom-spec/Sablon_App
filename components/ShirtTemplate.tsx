import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ShirtTemplate as T } from '../types/shirt';

const abs = (l: string, t: string, w: string, h: string, extra: object = {}): any =>
  ({ position: 'absolute', left: l, top: t, width: w, height: h, ...extra });

// Gambar dasar kaos. Jika template.image null, pakai placeholder berbentuk View.
export default function ShirtTemplate({ template }: { template: T }) {
  if (template.image) return <Image source={template.image} style={StyleSheet.absoluteFill} resizeMode="contain" />;
  const fill = template.color === 'black' ? '#151517' : '#F1F1F1';
  const o = template.type === 'oversize';
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={abs(o ? '14%' : '20%', '10%', o ? '72%' : '60%', '86%', { backgroundColor: fill, borderRadius: 14 })} />
      <View style={abs(o ? '0%' : '6%', '10%', o ? '24%' : '20%', '24%', { backgroundColor: fill, borderRadius: 12, transform: [{ rotate: '12deg' }] })} />
      <View style={abs(o ? '76%' : '74%', '10%', o ? '24%' : '20%', '24%', { backgroundColor: fill, borderRadius: 12, transform: [{ rotate: '-12deg' }] })} />
      <View style={abs('40%', '6%', '20%', '8%', { backgroundColor: '#202024', borderRadius: 40 })} />
    </View>
  );
}
