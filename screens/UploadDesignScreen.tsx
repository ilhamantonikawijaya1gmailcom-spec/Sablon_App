import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Btn from '../components/Btn';
import DesignUploader from '../components/DesignUploader';
import { useDraft } from '../context/DraftContext';
import { s } from '../utils/theme';

export default function UploadDesignScreen({ navigation }: any) {
  const { draft, update } = useDraft();
  const [err, setErr] = useState('');
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.pad}>
      <Text style={s.h1}>Upload Design</Text>
      <Text style={[s.sub, { marginBottom: 16 }]}>PNG, JPG, atau JPEG. PNG transparan hasilnya paling bagus.</Text>
      <DesignUploader uri={draft.designUri}
        onPicked={(uri, w, h) => update({ designUri: uri, designSize: { w, h }, position: { x: 0, y: 0 }, scale: 1 })} />
      {!!err && <Text style={s.err}>{err}</Text>}
      <Btn title="Gunakan Design" onPress={() => draft.designUri ? navigation.navigate('MockupEditor') : setErr('Upload design terlebih dahulu.')} />
    </ScrollView>
  );
}
