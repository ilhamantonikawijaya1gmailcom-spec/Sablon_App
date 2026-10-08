import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { s } from '../utils/theme';
import Btn from './Btn';

export default function DesignUploader({ uri, onPicked }: {
  uri: string | null; onPicked: (uri: string, w: number, h: number) => void;
}) {
  const [error, setError] = useState('');
  const pick = async () => {
    setError('');
    try {
      const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
      if (res.canceled) return; // user batal: tidak error
      const a = res.assets?.[0];
      if (!a?.uri) return setError('Gambar tidak dapat dibaca. Coba pilih gambar lain.');
      const ok = /png|jpe?g/i.test(a.mimeType ?? a.uri);
      if (!ok) return setError('Format tidak didukung. Gunakan PNG, JPG, atau JPEG.');
      if (!a.width || !a.height) return setError('Ukuran gambar tidak terbaca. Coba gambar lain.');
      onPicked(a.uri, a.width, a.height);
    } catch {
      setError('Gagal membuka gallery. Pastikan izin akses foto diberikan.');
    }
  };
  return (
    <View>
      <Btn title="Choose from Gallery" onPress={pick} />
      {!!error && <Text style={s.err}>{error}</Text>}
      {uri && (
        <View style={[s.card, { marginTop: 16, alignItems: 'center' }]}>
          <Image source={{ uri }} style={{ width: 160, height: 160 }} resizeMode="contain" />
          <Text style={[s.sub, { marginTop: 8 }]}>Thumbnail design</Text>
        </View>
      )}
    </View>
  );
}
