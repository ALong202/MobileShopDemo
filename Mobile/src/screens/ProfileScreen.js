import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText2}>Login now!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
export default ProfileScreen;