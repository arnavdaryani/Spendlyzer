import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function ReceiptCard({ receipt, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.vendor}>{receipt.vendor}</Text>
      <Text style={styles.total}>${receipt.total.toFixed(2)}</Text>
      <Text style={styles.date}>
        {new Date(receipt.date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  vendor: { fontSize: 16, fontWeight: '600' },
  total:  { fontSize: 14, marginTop: 4 },
  date:   { fontSize: 12, color: '#666', marginTop: 2 },
});
