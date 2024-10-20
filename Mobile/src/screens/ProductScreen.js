// src/screens/ProductDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useGetProductDetailsQuery } from '../redux/api/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../redux/features/cartSlice';
import StarRatings from 'react-native-star-rating'; // Use a React Native compatible star rating library
import NewReview from '../components/NewReview';
import ListReviews from '../components/ListReviews';
import Loader from '../components/Loader';

const ProductScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  
  const { data, isLoading, error, isError } = useGetProductDetailsQuery(id);
  const product = data?.product;
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    setActiveImg(product?.images?.[0]?.url || 'https://via.placeholder.com/340x390');
  }, [product]);

  useEffect(() => {
    if (isError) {
      Alert.alert("Error", error?.data?.message || "Có lỗi xảy ra");
    }
  }, [isError]);

  const handleColorChange = (color) => setSelectedColor(color);
  const handleSizeClick = (size) => setSelectedSize(size);
  
  const increseQty = () => {
    if (quantity < product?.stock) {
      setQuantity(prevQty => prevQty + 1);
    }
  };

  const decreseQty = () => {
    if (quantity > 1) {
      setQuantity(prevQty => prevQty - 1);
    }
  };

  const setItemToCart = () => {
    if (product?.color?.length > 0 && !selectedColor) {
      Alert.alert("Error", "Vui lòng chọn màu");
      return;
    }

    if (product?.size?.length > 0 && !selectedSize) {
      Alert.alert("Error", "Vui lòng chọn kích cỡ");
      return;
    }

    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      color: product?.color,
      size: product?.size,
      selectedColor,
      selectedSize,
      quantity
    };

    dispatch(setCartItem(cartItem));
    Alert.alert("Success", "Đã thêm vào giỏ");
  };

  if (isLoading) return <Loader />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: activeImg }} style={styles.mainImage} />
        <View style={styles.thumbnailContainer}>
          {product?.images?.map((img, index) => (
            <TouchableOpacity key={index} onPress={() => setActiveImg(img.url)}>
              <Image
                source={{ uri: img.url }}
                style={[
                  styles.thumbnail,
                  { borderColor: img.url === activeImg ? 'orange' : 'transparent' }
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product?.name}</Text>
        <Text style={styles.productSku}>SKU # {product?.productID}</Text>

        <StarRatings
          disabled={true}
          maxStars={5}
          rating={product?.ratings || 0}
          starSize={30}
          fullStarColor="#ffb829"
        />
        <Text style={styles.reviewCount}>({product?.numOfReviews} Đánh giá)</Text>

        <Text style={styles.productPrice}>{product?.price?.toLocaleString("vi-VN")}đ</Text>
        
        <View style={styles.quantityContainer}>
          <Button title="-" onPress={decreseQty} />
          <Text style={styles.quantityText}>{quantity}</Text>
          <Button title="+" onPress={increseQty} />
        </View>

        <Button title="Thêm vào giỏ" onPress={setItemToCart} disabled={product?.stock <= 0} />

        <Text style={styles.stockStatus}>
          Tình trạng: <Text style={{ color: product?.stock > 0 ? 'green' : 'red' }}>{product?.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</Text>
        </Text>

        <Text style={styles.productDescription}>{product?.description}</Text>

        {isAuthenticated ? (
          <NewReview productId={product?._id} />
        ) : (
          <Text style={styles.loginPrompt}>Hãy đăng nhập để đánh giá sản phẩm!</Text>
        )}

        {product?.reviews?.length > 0 && (
          <ListReviews reviews={product?.reviews} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20 
  },
  imageContainer: { 
    alignItems: 'center' 
  },
  mainImage: { 
    width: 340, 
    height: 390, 
    resizeMode: 'contain' 
  },
  thumbnailContainer: { 
    flexDirection: 'row', 
    marginTop: 10 
  },
  thumbnail: { 
    width: 60, 
    height: 60, 
    marginRight: 5, 
    borderWidth: 2, 
    borderRadius: 5 
  },
  detailsContainer: { 
    marginTop: 20 
  },
  productName: { 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  productSku: { 
    fontSize: 12, 
    color: '#777' 
  },
  reviewCount: { 
    marginVertical: 10 
  },
  productPrice: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#FF4500', 
    marginVertical: 10 
  },
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10 
  },
  quantityText: { 
    fontSize: 18, 
    marginHorizontal: 10 
  },
  stockStatus: { 
    marginVertical: 10, 
    fontSize: 16 
  },
  productDescription: { 
    marginVertical: 10, 
    fontSize: 16 
  },
  loginPrompt: { 
    color: 'red', 
    marginVertical: 10 
  }
});

export default ProductScreen;
