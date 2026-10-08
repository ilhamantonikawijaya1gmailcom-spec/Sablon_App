import { StyleSheet } from 'react-native';
export const C = { bg: '#0B0B0C', card: '#17171A', line: '#2A2A2E', text: '#FFFFFF', sub: '#9A9AA2', accent: '#FF4D3D' };
export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  pad: { padding: 20, paddingBottom: 48 },
  h1: { color: C.text, fontSize: 28, fontWeight: '800' },
  h2: { color: C.text, fontSize: 16, fontWeight: '700', marginTop: 20, marginBottom: 8 },
  sub: { color: C.sub, fontSize: 14 },
  txt: { color: C.text, fontSize: 14, marginBottom: 4 },
  card: { backgroundColor: C.card, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: C.line },
  input: { backgroundColor: C.card, color: C.text, borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: C.line },
  err: { color: '#FF6B6B', marginTop: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
});
