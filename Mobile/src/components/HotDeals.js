import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useGetProductsQuery } from '../redux/api/productsApi';
import { useNavigation } from '@react-navigation/native';

const HotDeals = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const navigation = useNavigation();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching products</Text>;

  const handlePress = (product) => {
    navigation.navigate("Product", { product });
  };

  return (
    <FlatList
      data={data?.products}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.productCard} onPress={() => handlePress(item)}>
          <Image source={{ uri: item?.images[0]?.url }} style={styles.productImage} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.price}>{item?.price?.toLocaleString('vi-VN')}đ</Text>
        </TouchableOpacity>
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productCard: {
    width: '48%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#FF4500',
    marginVertical: 5,
  },
});

export default HotDeals;
