import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import ItemRow from '../components/ItemRow';

export default function ReceiptDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    // Mocked single receipt detail
    setReceipt({
      vendor: 'Grocery Store',
      date: new Date(),
      total: 42.35,
      category: 'Food',
      items: [
        { name: 'Apples', quantity: 2, price: 3.5 },
        { name: 'Bread', quantity: 1, price: 2.5 },
      ],
    });
  }, [id]);

  if (!receipt) {
    return <Text style={{ padding: 16 }}>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: '600', fontSize: 16 }}>Vendor: {receipt.vendor}</Text>
      <Text>Date: {new Date(receipt.date).toLocaleDateString()}</Text>
      <Text>Total: ${receipt.total.toFixed(2)}</Text>
      <Text>Category: {receipt.category}</Text>

      <FlatList
        data={receipt.items}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => <ItemRow item={item} />}
        ListHeaderComponent={<Text style={{ marginTop: 12, marginBottom: 4, fontWeight: '500' }}>Items:</Text>}
      />

      <Button title="Back to List" onPress={() => navigation.navigate('List')} />
    </View>
  );
}
