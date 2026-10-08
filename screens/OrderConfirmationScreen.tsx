import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import Btn from '../components/Btn';
import MockupViewer from '../components/MockupViewer';
import { useDraft } from '../context/DraftContext';
import { findTemplate } from '../data/shirtTemplates';
import { createOrder } from '../services/orderStorage';
import { C, s } from '../utils/theme';

export default function OrderConfirmationScreen({ navigation }: any) {
  const { draft, reset } = useDraft();
  const tpl = findTemplate(draft.type, draft.color);
  const [qty, setQty] = useState(1);
  const [f, setF] = useState({ name: '', phone: '', address: '', notes: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  if (!tpl || !draft.designUri || !draft.designSize || !draft.size) {
    return <View style={[s.screen, s.pad]}><Text style={s.sub}>Data pesanan belum lengkap.</Text></View>;
  }
  const submit = async () => {
    if (!f.name.trim()) return setErr('Nama wajib diisi.');
    if (!f.phone.trim()) return setErr('Nomor WhatsApp wajib diisi.');
    setErr(''); setBusy(true);
    try {
      const order = await createOrder({
        customerName: f.name.trim(), phone: f.phone.trim(), address: f.address.trim(), notes: f.notes.trim(),
        shirtModel: tpl.name, shirtColor: tpl.color, shirtType: tpl.type, size: draft.size!, quantity: qty,
        designImage: draft.designUri!,
        mockupData: { templateId: tpl.id, x: draft.position.x, y: draft.position.y, scale: draft.scale, designWidth: draft.designSize!.w, designHeight: draft.designSize!.h },
      });
      reset();
      navigation.replace('OrderSuccess', { id: order.id });
    } catch {
      setErr('Gagal menyimpan pesanan. Coba lagi.'); setBusy(false);
    }
  };
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });
  const ph = C.sub;
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
      <MockupViewer template={tpl} designImage={draft.designUri} designSize={draft.designSize} position={draft.position} scale={draft.scale} size={draft.size} />
      <View style={[s.card, { marginTop: 14, flexDirection: 'row', gap: 12, alignItems: 'center' }]}>
        <Image source={{ uri: draft.designUri }} style={{ width: 56, height: 56 }} resizeMode="contain" />
        <View>
          <Text style={s.txt}>{tpl.name}</Text>
          <Text style={s.sub}>Size {draft.size}</Text>
        </View>
      </View>
      <View style={[s.row, { marginBottom: 12 }]}>
        <Text style={s.txt}>Quantity</Text>
        <Btn small ghost title="−" onPress={() => setQty(Math.max(1, qty - 1))} />
        <Text style={s.txt}>{qty}</Text>
        <Btn small ghost title="+" onPress={() => setQty(qty + 1)} />
      </View>
      <TextInput style={s.input} placeholder="Nama" placeholderTextColor={ph} value={f.name} onChangeText={set('name')} />
      <TextInput style={s.input} placeholder="Nomor WhatsApp" placeholderTextColor={ph} keyboardType="phone-pad" value={f.phone} onChangeText={set('phone')} />
      <TextInput style={[s.input, { height: 80 }]} multiline placeholder="Alamat" placeholderTextColor={ph} value={f.address} onChangeText={set('address')} />
      <TextInput style={[s.input, { height: 80 }]} multiline placeholder="Catatan" placeholderTextColor={ph} value={f.notes} onChangeText={set('notes')} />
      {!!err && <Text style={s.err}>{err}</Text>}
      <Btn title={busy ? 'Mengirim...' : 'Kirim Pesanan'} disabled={busy} onPress={submit} />
    </ScrollView>
  );
}
