import React, { useEffect, useState } from 'react';
import { View, FlatList, Button } from 'react-native';
import ReceiptCard from '../components/ReceiptCard';

export default function ReceiptListScreen({ navigation }) {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    fetch('https://your-api-url/api/receipts')
      .then(res => res.json())
      .then(setReceipts)
      .catch(console.error);
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Upload New" onPress={() => navigation.navigate('Upload')} />
      <Button title="View Analytics" onPress={() => navigation.navigate('Analytics')} />
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
    </View>
  );
}
