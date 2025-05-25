import React, { useState } from 'react';
import { View, Button, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadReceiptScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.cancelled) setImage(result.uri);
  };

  const upload = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('image', { uri: image, name: 'receipt.jpg', type: 'image/jpeg' });

    const res = await fetch('https://your-api-url/api/receipts/upload', {
      method: 'POST',
      body: data
    });
    const newRec = await res.json();
    setLoading(false);
    navigation.navigate('Detail', { id: newRec._id });
  };

  return (
    <View style={{ flex:1, padding:16, justifyContent:'center' }}>
      <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200, marginVertical:16 }} />}
      {loading
        ? <ActivityIndicator/>
        : image && <Button title="Upload" onPress={upload} />
      }
    </View>
  );
}
