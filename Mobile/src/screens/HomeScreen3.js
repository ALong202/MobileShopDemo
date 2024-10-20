import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import HotDeals from '../components/HotDeals';
import Slider from '../components/Slider';
import SearchBarWithFilters from '../components/SearchBarWithFilters';

const HomeScreen = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* <Navbar /> */}
      <SearchBarWithFilters/>
      <Slider />
      <Categories />
      <View style={styles.hotDealsTitleContainer}>
        <Text style={styles.hotDealsText}>Hot Deals 🔥</Text>
      </View>
      <View style={styles.hotDealList}>
        <HotDeals style ={styles.HD}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  hotDealsTitleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ffe4e1',
  },
  hotDealsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4500',
  },
  hotDealList: {
    backgroundColor: '#c4b3ad',
    marginTop: 20
  },
  HD: {
    marginTop: 20
  }
});

export default HomeScreen;
