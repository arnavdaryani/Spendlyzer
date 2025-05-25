import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ItemRow({ item }) {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>
        {item.name} x{item.quantity}
      </Text>
      <Text style={styles.price}>
        ${item.price.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: 4,
  },
  name:  { fontSize: 14 },
  price: { fontSize: 14, fontWeight: '500' },
});
