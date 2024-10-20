// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5, Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { useGetProductsQuery } from '../redux/api/productsApi';

const Header = ({ navigation, title, route }) => {
  const { data, isLoading, error } = useGetProductsQuery();
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.header}>

      
      {/* <View
        style={styles.searchArea}
      >
        <View style={styles.searchBox}
        >

          <TouchableOpacity
            onPress={() => {
              if (searchText.trim() !== '') {
                navigation.navigate('Search', { searchString: searchText });
              } else {
                Alert.alert('Empty input value', 'Please type product name!');
                setSearchText('');
              }
            }}
          >
            <AntDesign
              style={{ paddingLeft: 10 }}
              name="search1"
              size={22}
              color="black"
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search in Apple Store"
            autoCapitalize='none'
            value={searchText}
            alignItems='right'
            textAlign='center'
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <TouchableOpacity onPress={() => setModalVisibleSiri(!modalVisibleSiri)}>
          <FontAwesome5 style={{ margin: 5 }} name="microphone-alt" size={24} color="white" />
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="bars" size={24} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginTop: 20
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchArea: {
    backgroundColor: "#000",
    //padding: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    //marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
});

export default Header;
