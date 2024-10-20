// src/screens/ProfileScreen.js
import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Button title="LOG OUT" onPress={() => logout()} />
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
