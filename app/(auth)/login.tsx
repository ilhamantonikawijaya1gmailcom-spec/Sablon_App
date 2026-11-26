import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { supabase } from '../../lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAuth = async () => {
    const cleanEmail = email.trim();
    const cleanName = fullName.trim();

    if (!cleanEmail || !password) {
      setErrorMsg('Email dan password wajib diisi.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password minimal 6 karakter.');
      return;
    }
    if (isRegistering && !cleanName) {
      setErrorMsg('Nama lengkap wajib diisi saat mendaftar.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      if (isRegistering) {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: cleanName,
              role: 'customer',
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          Alert.alert('Berhasil', 'Akun berhasil didaftarkan! Selamat datang.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          {isRegistering ? 'Daftar Akun Sablon' : 'Masuk ke Aplikasi'}
        </Text>
        <Text style={styles.subtitle}>
          {isRegistering
            ? 'Buat akun untuk mulai memesan kaos custom'
            : 'Masuk untuk melihat pesanan dan desain Anda'}
        </Text>

        {isRegistering && (
          <TextInput
            style={styles.input}
            placeholder="Nama Lengkap"
            placeholderTextColor="#6b7280"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            editable={!loading}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6b7280"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Password (min. 6 karakter)"
          placeholderTextColor="#6b7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          editable={!loading}
        />

        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegistering ? 'Daftar Sekarang' : 'Masuk'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchBtn}
          onPress={() => {
            setIsRegistering(!isRegistering);
            setErrorMsg(null);
          }}
          disabled={loading}
        >
          <Text style={styles.switchText}>
            {isRegistering
              ? 'Sudah punya akun? Masuk di sini'
              : 'Belum punya akun? Daftar di sini'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 24, borderRadius: 16, elevation: 3 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 6, color: '#111' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
  },
  errorText: { color: '#dc2626', marginBottom: 12, fontSize: 13 },
  button: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  switchBtn: { marginTop: 16, alignItems: 'center' },
  switchText: { color: '#2563eb', fontSize: 14, fontWeight: '500' },
});