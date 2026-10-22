import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DraftProvider } from './context/DraftContext';
import AdminScreen from './screens/AdminScreen';
import HomeScreen from './screens/HomeScreen';
import MockupEditorScreen from './screens/MockupEditorScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import ShirtSelectionScreen from './screens/ShirtSelectionScreen';
import UploadDesignScreen from './screens/UploadDesignScreen';
import { C } from './utils/theme';

const Stack = createNativeStackNavigator();
const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: C.bg, card: C.bg, primary: C.accent } };

export default function App() {
  return (
    <DraftProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerTintColor: '#fff', headerStyle: { backgroundColor: C.bg }, contentStyle: { backgroundColor: C.bg } }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ShirtSelection" component={ShirtSelectionScreen} options={{ title: 'Pilih Baju' }} />
          <Stack.Screen name="UploadDesign" component={UploadDesignScreen} options={{ title: 'Upload Design' }} />
          <Stack.Screen name="MockupEditor" component={MockupEditorScreen} options={{ title: 'Customize Design' }} />
          <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ title: 'Konfirmasi Pesanan' }} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={{ title: 'Berhasil', headerBackVisible: false }} />
          <Stack.Screen name="MyOrders" component={MyOrdersScreen} options={{ title: 'Pesanan Saya' }} />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: 'Detail Pesanan' }} />
          <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Admin' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DraftProvider>
  );
}
