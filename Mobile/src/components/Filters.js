// src/components/Filters.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PRODUCT_CATEGORIES, PRODUCT_SUBCATEGORIES, PRODUCT_SUBSUBCATEGORIES } from '../constants/constants';

const Filters = ({ route }) => {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategory, setSubSubCategory] = useState('');

  const navigation = useNavigation();

  // Load filter settings from localStorage on mount
  useEffect(() => {
    const localCategory = localStorage.getItem('category');
    if (localCategory) setCategory(localCategory);
  }, []);

  // Handle category, subCategory, and subSubCategory selection
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory === category ? '' : selectedCategory);
    setSubCategory('');
    setSubSubCategory('');
  };

  const handleSubCategorySelect = (selectedSubCategory) => {
    setSubCategory(selectedSubCategory === subCategory ? '' : selectedSubCategory);
    setSubSubCategory('');
  };

  const handleSubSubCategorySelect = (selectedSubSubCategory) => {
    setSubSubCategory(selectedSubSubCategory === subSubCategory ? '' : selectedSubSubCategory);
  };

  // Handle price filter application
  const applyPriceFilter = () => {
    if (!min && !max) {
      Alert.alert("Error", "Please enter at least one price range.");
      return;
    }
    const queryParams = new URLSearchParams({ min, max, category, subCategory, subSubCategory }).toString();
    navigation.navigate('Home', { query: queryParams });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Bộ Lọc</Text>
      
      {/* Price Filter */}
      <Text style={styles.filterTitle}>Giá</Text>
      <View style={styles.priceFilterContainer}>
        <TextInput
          style={styles.priceInput}
          placeholder="Min ($)"
          value={min}
          onChangeText={setMin}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.priceInput}
          placeholder="Max ($)"
          value={max}
          onChangeText={setMax}
          keyboardType="numeric"
        />
        <Button title="Lọc" onPress={applyPriceFilter} />
      </View>

      {/* Category Filter */}
      <Text style={styles.filterTitle}>Danh mục</Text>
      {PRODUCT_CATEGORIES.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.checkboxContainer}
          onPress={() => handleCategorySelect(item)}
        >
          <View style={[styles.checkbox, category === item && styles.checkboxSelected]} />
          <Text style={styles.checkboxLabel}>{item}</Text>
        </TouchableOpacity>
      ))}

      {/* SubCategory Filter */}
      {category && (
        <>
          <Text style={styles.filterTitle}>Danh mục phụ</Text>
          {PRODUCT_SUBCATEGORIES[category]?.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.checkboxContainer}
              onPress={() => handleSubCategorySelect(item)}
            >
              <View style={[styles.checkbox, subCategory === item && styles.checkboxSelected]} />
              <Text style={styles.checkboxLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {/* SubSubCategory Filter */}
      {subCategory && (
        <>
          <Text style={styles.filterTitle}>Danh mục con</Text>
          {PRODUCT_SUBSUBCATEGORIES[subCategory]?.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.checkboxContainer}
              onPress={() => handleSubSubCategorySelect(item)}
            >
              <View style={[styles.checkbox, subSubCategory === item && styles.checkboxSelected]} />
              <Text style={styles.checkboxLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  filterTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  priceFilterContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  priceInput: { flex: 1, borderColor: '#ccc', borderWidth: 1, padding: 8, marginRight: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#333', marginRight: 10 },
  checkboxSelected: { backgroundColor: '#333' },
  checkboxLabel: { fontSize: 14 }
});

export default Filters;
