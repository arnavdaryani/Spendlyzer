import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Text } from 'react-native';
import ReceiptCard from '../components/ReceiptCard';

export default function ReceiptListScreen({ navigation }) {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    // Mocked receipts list
    setReceipts([
      {
        _id: '1',
        vendor: 'Grocery Store',
        total: 42.35,
        date: new Date().toISOString(),
      },
      {
        _id: '2',
        vendor: 'Bookstore',
        total: 15.99,
        date: new Date().toISOString(),
      },
    ]);
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Upload New" onPress={() => navigation.navigate('Upload')} />
      <Button title="View Analytics" onPress={() => navigation.navigate('Analytics')} />
      {receipts.length === 0 ? (
        <Text style={{ marginTop: 20, textAlign: 'center' }}>No receipts yet</Text>
      ) : (
        <FlatList
          data={receipts}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <ReceiptCard
              receipt={item}
              onPress={() => navigation.navigate('Detail', { id: item._id })}
            />
          )}
        />
      )}
    </View>
  );
}
