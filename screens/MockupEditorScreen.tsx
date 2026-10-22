import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Btn from '../components/Btn';
import MockupViewer from '../components/MockupViewer';
import { useDraft } from '../context/DraftContext';
import { findTemplate } from '../data/shirtTemplates';
import { clamp, clampPosition, MAX_SCALE, MIN_SCALE } from '../utils/mockupUtils';
import { s } from '../utils/theme';

const POS_STEP = 0.03;
const SCALE_STEP = 0.1;

export default function MockupEditorScreen({ navigation }: any) {
  const { draft, update } = useDraft();
  const tpl = findTemplate(draft.type, draft.color);
  if (!tpl || !draft.designUri || !draft.designSize || !draft.size) {
    return <View style={[s.screen, s.pad]}><Text style={s.sub}>Data design belum lengkap. Kembali dan lengkapi dulu.</Text></View>;
  }
  const d = draft.designSize;
  const move = (dx: number, dy: number) =>
    update({ position: clampPosition({ x: draft.position.x + dx, y: draft.position.y + dy }, draft.scale, tpl, d) });
  const resize = (delta: number) => {
    const scale = clamp(draft.scale + delta, MIN_SCALE, MAX_SCALE);
    update({ scale, position: clampPosition(draft.position, scale, tpl, d) });
  };
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      <MockupViewer template={tpl} designImage={draft.designUri} designSize={d} position={draft.position} scale={draft.scale} size={draft.size} showArea />
      <Text style={[s.sub, { marginVertical: 10 }]}>Model: {tpl.name} · Color: {tpl.color} · Size: {draft.size}</Text>
      <View style={[s.card, { gap: 10 }]}>
        <View style={s.row}>
          <Btn small ghost title="−" onPress={() => resize(-SCALE_STEP)} />
          <Text style={s.txt}>Size {Math.round(draft.scale * 100)}%</Text>
          <Btn small ghost title="+" onPress={() => resize(SCALE_STEP)} />
        </View>
        <View style={s.row}>
          <Btn small ghost title="←" onPress={() => move(-POS_STEP, 0)} />
          <Btn small ghost title="↑" onPress={() => move(0, -POS_STEP)} />
          <Btn small ghost title="↓" onPress={() => move(0, POS_STEP)} />
          <Btn small ghost title="→" onPress={() => move(POS_STEP, 0)} />
        </View>
        <View style={s.row}>
          <Btn small ghost title="Tengah" onPress={() => update({ position: { x: 0, y: 0 } })} />
          <Btn small ghost title="Reset" onPress={() => update({ position: { x: 0, y: 0 }, scale: 1 })} />
        </View>
      </View>
      <Btn title="Konfirmasi Design" onPress={() => navigation.navigate('OrderConfirmation')} />
    </ScrollView>
  );
}
