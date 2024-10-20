import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <TextInput 
        style={styles.searchInput} 
        placeholder="Search" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default Navbar;
