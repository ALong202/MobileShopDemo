// src/components/ProductItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StarRatings from 'react-native-star-rating';

const ProductItem = ({ product }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ProductDetails", { id: product?._id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: product?.images[0]?.url || 'https://via.placeholder.com/150' }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName} numberOfLines={1}>{product?.name}</Text>
        <View style={styles.ratingContainer}>
          <StarRatings
            disabled={true}
            maxStars={5}
            rating={product?.ratings || 0}
            starSize={15}
            fullStarColor="#ffb829"
          />
          <Text style={styles.reviewCount}> ({product?.numOfReviews || 0})</Text>
        </View>
        <Text style={styles.price}>{product?.price.toLocaleString('vi-VN')}đ</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  reviewCount: {
    fontSize: 12,
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    color: '#FF4500',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductItem;
