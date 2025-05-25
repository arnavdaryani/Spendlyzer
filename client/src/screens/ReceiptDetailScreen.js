import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import ItemRow from '../components/ItemRow';

export default function ReceiptDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetch(`https://your-api-url/api/receipts/${id}`)
      .then(res => res.json())
      .then(setReceipt)
      .catch(console.error);
  }, []);

  if (!receipt) return <Text>Loading...</Text>;

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text>Vendor: {receipt.vendor}</Text>
      <Text>Date: {new Date(receipt.date).toLocaleDateString()}</Text>
      <Text>Total: ${receipt.total.toFixed(2)}</Text>
      <Text>Category: {receipt.category}</Text>
      <FlatList
        data={receipt.items}
        keyExtractor={(item,i) => i.toString()}
        renderItem={({item}) => <ItemRow item={item}/> }
      />
      <Button
        title="Delete"
        onPress={async () => {
          await fetch(`https://your-api-url/api/receipts/${id}`, { method:'DELETE' });
          navigation.navigate('List');
        }}
      />
    </View>
  );
}
