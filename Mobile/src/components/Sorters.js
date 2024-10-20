import React, { useEffect, useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Sorters = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sort: initialSort } = route.params || {}; // Retrieve initial sort from route params
  const [sort, setSort] = useState(initialSort || '');

  useEffect(() => {
    // Only update the route if a sort option has been selected
    if (sort) {
      navigation.setParams({ sort });
    }
  }, [sort, navigation]);

  const handleSortChange = (value) => {
    setSort(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sắp xếp theo:</Text>
      <Picker
        selectedValue={sort}
        onValueChange={handleSortChange}
        style={styles.picker}
      >
        <Picker.Item label="Để trống" value="" />
        <Picker.Item label="Giá: Thấp đến Cao" value="price" />
        <Picker.Item label="Giá: Cao đến Thấp" value="-price" />
        <Picker.Item label="Đánh giá: Thấp đến Cao" value="ratings" />
        <Picker.Item label="Đánh giá: Cao đến Thấp" value="-ratings" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  picker: { height: 50, width: '100%' }
});

export default Sorters;
