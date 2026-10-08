import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { getTemplate } from '../data/shirtTemplates';
import { Order } from '../types/order';
import { DesignSize, ShirtTemplate as T, Size } from '../types/shirt';
import { ASPECT, getDesignRect, getPrintBox } from '../utils/mockupUtils';
import ShirtTemplate from './ShirtTemplate';

type Props = {
  template: T; designImage?: string | null; designSize?: DesignSize | null;
  position: { x: number; y: number }; scale: number; size: Size; showArea?: boolean;
};

// Container responsive (width 100%), desain = overlay position:absolute di atas template.
export default function MockupViewer({ template, designImage, designSize, position, scale, size, showArea }: Props) {
  const [W, setW] = useState(0);
  const rect = W && designSize ? getDesignRect(template, size, W, designSize, position, scale) : null;
  const box = getPrintBox(template, size, W);
  return (
    <View
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
      style={{ width: '100%', aspectRatio: 1 / ASPECT, backgroundColor: '#202024', borderRadius: 16, overflow: 'hidden' }}>
      <ShirtTemplate template={template} />
      {showArea && W > 0 && (
        <View pointerEvents="none" style={{ position: 'absolute', ...box, borderWidth: 1.5, borderColor: '#ffffff88', borderStyle: 'dashed' }} />
      )}
      {designImage && rect && (
        <Image source={{ uri: designImage }} resizeMode="contain"
          style={{ position: 'absolute', left: rect.left, top: rect.top, width: rect.width, height: rect.height }} />
      )}
    </View>
  );
}

export function OrderMockup({ order }: { order: Order }) {
  const m = order.mockupData;
  const template = getTemplate(m.templateId);
  if (!template) return null;
  return (
    <MockupViewer template={template} designImage={order.designImage} designSize={{ w: m.designWidth, h: m.designHeight }}
      position={{ x: m.x, y: m.y }} scale={m.scale} size={order.size} />
  );
}
