//src\screens\HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput, Platform, Image } from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { useGetProductsQuery } from '../redux/api/productsApi';
import Header from '../components/Header';
import ProductItem from '../components/ProductItem2';
import Slider from '../components/Slider';

const HomeScreen = ({ route, navigation }) => {
  const { data, isLoading, error } = useGetProductsQuery();
  const [searchText, setSearchText] = useState('');
  const { keyword = "", category = "", page = 1 } = route.params || {};
  const [params, setParams] = useState({ page, keyword });
  const [columnSize, setColumnSize] = useState(keyword ? 2 : 1);

  // useEffect(() => {
  //   if (data) {
  //     console.log('Products:', data.products); // Log danh sách sản phẩm
  //   }
  //   if (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // }, [data, error]);

  const handleProductPress = (product) => {
    navigation.navigate('Product', { product });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/FashionShop_logo.png')} style={styles.logo} />
      <Header navigation={navigation} title="Home" />

      {isLoading ? (
        <Text>Loading products...</Text>
      ) : error ? (
        <Text>Error loading products</Text>
      ) : (
        <FlatList
          key={columnSize} // Đảm bảo cập nhật key khi columnSize thay đổi
          ListHeaderComponent={
            <>
              {!keyword && !category && <Slider />}
              <View style={styles.hotDealsContainer}>
                <Text style={styles.hotDealsText}>Hot Deals 🔥</Text>
              </View>
            </>
          }
          data={data.products}  // Đảm bảo dữ liệu products được truyền vào FlatList
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProductPress(item)}>
              <View style={styles.productContainer}>
                <ProductItem item={item} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}  // Sử dụng _id làm key
          numColumns={2}  // Đảm bảo số cột là 2
          columnWrapperStyle={styles.productList}  // Căn chỉnh các cột trong FlatList
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddinTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  hotDealsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ffe4e1',
  },
  hotDealsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4500',
  },
  searchArea: {
    backgroundColor: "#9bb0c4",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
  productContainer: {
    flex: 1,
    marginHorizontal: 3,  // Giảm khoảng cách giữa các cột
    marginBottom: 10,     // Khoảng cách giữa các hàng
    width: 198,         // Đảm bảo mỗi sản phẩm chiếm gần nửa màn hình
    height: 250,          // Chiều cao cố định của sản phẩm
    justifyContent: 'center',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',  // Giảm khoảng cách giữa các cột
  },
  logo: {
    width: 135,
    height: 35,
    alignSelf: 'center',
    marginTop: 10
  },
});


export default HomeScreen;