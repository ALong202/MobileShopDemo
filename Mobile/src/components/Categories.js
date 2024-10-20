import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const Categories = () => {
  const categories = [
    { name: 'For The Weekend', image: require('../../assets/test.png') },
    { name: 'Date Night', image: require('../../assets/test.png') },
    { name: 'Date Night', image: require('../../assets/test.png') },
    { name: 'Date Night', image: require('../../assets/test.png') },
    { name: 'Date Night', image: require('../../assets/test.png') },
    // Add more categories as needed
  ];

  
  return (
    <View style={styles.container}>
      {/* Tiêu đề text được căn giữa */}
      <Text style={styles.txtCat}>Categories</Text>
      
      {/* ScrollView hiển thị các mục thể loại */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: '#c4b3ad',
    paddingLeft:10
  },
  // Căn giữa tiêu đề text
  txtCat: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15, // Khoảng cách giữa tiêu đề và ScrollView
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryImage: {
    width: 120,
    height: 190,
    borderRadius: 5,
  },
});

export default Categories;