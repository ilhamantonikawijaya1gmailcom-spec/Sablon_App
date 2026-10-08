import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Btn from '../components/Btn';
import ShirtSelector from '../components/ShirtSelector';
import SizeSelector from '../components/SizeSelector';
import { useDraft } from '../context/DraftContext';
import { findTemplate } from '../data/shirtTemplates';
import { s } from '../utils/theme';

export default function ShirtSelectionScreen({ navigation }: any) {
  const { draft, update } = useDraft();
  const [err, setErr] = useState('');
  const tpl = findTemplate(draft.type, draft.color);
  const next = () => {
    if (!draft.type || !draft.color) return setErr('Pilih model dan warna kaos.');
    if (!draft.size) return setErr('Pilih ukuran.');
    setErr(''); navigation.navigate('UploadDesign');
  };
  const setModel = (p: any) => {
    const t = findTemplate(p.type ?? draft.type, p.color ?? draft.color);
    update({ ...p, size: draft.size && t && !t.availableSizes.includes(draft.size) ? null : draft.size });
  };
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      <ShirtSelector type={draft.type} color={draft.color} onType={(type) => setModel({ type })} onColor={(color) => setModel({ color })} />
      <SizeSelector value={draft.size} available={tpl?.availableSizes} onChange={(size) => update({ size })} />
      {!!err && <Text style={s.err}>{err}</Text>}
      <Btn title="Lanjutkan" onPress={next} />
    </ScrollView>
  );
}
