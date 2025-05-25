import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceiptListScreen from '../screens/ReceiptListScreen';
import ReceiptDetailScreen from '../screens/ReceiptDetailScreen';
import UploadReceiptScreen from '../screens/UploadReceiptScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={ReceiptListScreen} options={{ title: 'Receipts' }}/>
      <Stack.Screen name="Detail" component={ReceiptDetailScreen} options={{ title: 'Receipt Detail' }}/>
      <Stack.Screen name="Upload" component={UploadReceiptScreen} options={{ title: 'Upload Receipt' }}/>
      <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ title: 'Analytics' }}/>
    </Stack.Navigator>
  );
}