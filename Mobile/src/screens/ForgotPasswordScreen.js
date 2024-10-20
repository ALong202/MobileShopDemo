import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useForgotPasswordMutation } from '../redux/api/userApi';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home'); // Navigate to the home screen if the user is authenticated
    }
    if (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error?.data?.message || 'Something went wrong' });
    }
    if (isSuccess) {
      Toast.show({ type: 'success', text1: 'Success', text2: 'Check your email for the reset link.' });
    }
  }, [error, isAuthenticated, isSuccess, navigation]);

  const submitHandler = () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter your email');
      return;
    }
    forgotPassword({ email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phục hồi mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={submitHandler}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Đang gửi...' : 'Gửi Email'}
        </Text>
      </TouchableOpacity>
      
      {/* Optional Toast Notification */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    //borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#392a27',
    paddingVertical: 10,
    paddingHorizontal: 20,
    //borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
