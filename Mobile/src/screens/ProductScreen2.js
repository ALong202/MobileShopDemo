import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import Swiper from 'react-native-swiper';

const ProductScreen = ({ route }) => {
  // Kiểm tra xem route.params có tồn tại không và có chứa sản phẩm hay không
  const product = route.params ? route.params.product : null;

  // Kiểm tra xem sản phẩm có tồn tại và có hình ảnh không
  const imageUrl = product && product.images && product.images.length > 0 ? product.images[0].url : null;

  // Nếu sản phẩm không tồn tại, hiển thị thông báo lỗi
  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found.</Text>
      </View>
    );
  }
  const images = product?.images || [];
  return (
    <ScrollView style={styles.container}>
      {/* Hiển thị hình ảnh sản phẩm */}
      {/* {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )} */}
      {/* Slider hiển thị hình ảnh sản phẩm */}
      <Swiper style={styles.wrapper} showsButtons={true}>
        {images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image
              source={{ uri: image.url }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ))}
      </Swiper>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toLocaleString()} VND</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Button title="Add to Cart" onPress={() => { /* Xử lý thêm vào giỏ hàng */ }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#ff4500',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  wrapper: {
    height: 300, // Chiều cao của slider
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ProductScreen;
