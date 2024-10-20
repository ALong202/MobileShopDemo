import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // For the search icon

const SearchBarWithFilters = () => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search WatchCharts Marketplace"
        />
      </View>
      
      {/* Filters */}
      <View style={styles.filtersContainer}>
        {['Brand', 'Price Rating', 'Price Range', 'Count'].map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterButton}>
            <Text>{filter}</Text>
            <Ionicons name="caret-down" size={16} color="#000" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 5,
  },
});

export default SearchBarWithFilters;
