import React, { useState } from 'react';
import { View, Button, Image, ActivityIndicator, Text } from 'react-native';

export default function UploadReceiptScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock pickImage (no real picker)
  const pickImage = async () => {
    // In real you’d use expo-image-picker; here we just simulate one
    setImage('https://via.placeholder.com/300x200.png?text=Receipt+Image');
  };

  const upload = async () => {
    setLoading(true);
    // simulate network delay
    setTimeout(() => {
      setLoading(false);
      // navigate to detail of mocked ID
      navigation.navigate('Detail', { id: '1' });
    }, 1000);
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <Button title="Pick Image (mock)" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200, marginVertical: 16, backgroundColor: '#eee' }}
        />
      )}
      {loading ? (
        <ActivityIndicator size="large" />
      ) : image ? (
        <Button title="Upload (mock)" onPress={upload} />
      ) : (
        <Text style={{ marginTop: 12, textAlign: 'center' }}>No image selected</Text>
      )}
    </View>
  );
}
