//Mobile\src\components\ProductItem.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductItem = ({ item }) => {
  // Kiểm tra xem item có chứa thuộc tính images và có ít nhất một hình ảnh
  const imageUrl = item.images && item.images.length > 0 ? item.images[0].url : null;

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )}
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toLocaleString()} VND</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
    
  },
  price: {
    fontSize: 14,
    color: '#ff4500',
  },
});

export default ProductItem;
