// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useGetProductsQuery } from '../redux/api/productsApi';
import ProductItem from '../components/ProductItem2';
import Loader from '../components/Loader';
import Filters from '../components/Filters';
import Sorters from '../components/Sorters';
import CustomPagination from '../components/CustomPagination';
import Slider from '../components/Slider';

const HomeScreen = ({ route, navigation }) => {
  const { keyword = "", category = "", page = 1 } = route.params || {};
  const [params, setParams] = useState({ page, keyword });

  // Fetch product data using Redux Toolkit Query
  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      Alert.alert("Error", error?.data?.message || "Có lỗi xảy ra");
    }
  }, [isError]);

  useEffect(() => {
    setParams({ ...params, keyword, category });
  }, [keyword, category]);

  if (isLoading) return <Loader />;

  const renderProductItem = ({ item }) => (
    <ProductItem key={item?._id} product={item} columnSize={keyword ? 2 : 1} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cửa hàng thời trang</Text>

      {/* Display Slider only if there’s no search or category filter */}
      {!keyword && !category && <Slider />}

      {/* Display Filters if a keyword or category is active */}
      {(keyword || category) && <Filters />}

      <Text style={styles.productCount}>
        {keyword || category
          ? `${data?.filteredProductsCount || 0} sản phẩm được tìm thấy với từ khóa: ${keyword}`
          : "Sản phẩm nổi bật"}
      </Text>

      {(keyword || category) && <Sorters />}

      {/* Product List using FlatList */}
      <FlatList
        data={data?.products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item?._id}
        numColumns={keyword ? 2 : 1}
        columnWrapperStyle={keyword ? styles.columnWrapper : null}
        contentContainerStyle={styles.productList}
      />

      {/* Custom Pagination */}
      <CustomPagination
        resPerPage={data?.resPerPage}
        filteredProductsCount={data?.filteredProductsCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  productCount: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
    textAlign: 'center',
  },
  productList: {
    justifyContent: 'space-between',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
