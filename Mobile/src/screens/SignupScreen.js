// src/screens/SignupScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useRegisterMutation } from '../redux/api/authApi';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const { name, email, password, phone, address } = user;
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigation = useNavigation();

  useEffect(() => {
    if (isAuthenticated) {
      Alert.alert("Success", "Bạn đã đăng ký thành công");
      navigation.navigate("Home");
    }
    if (error) {
      Alert.alert("Error", error?.data?.message || "Đăng ký thất bại");
    }
  }, [isAuthenticated, error]);

  const submitHandler = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    const signUpData = { name, email, password, phone, address };
    register(signUpData);
  };

  const onChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/FashionShop_logo.png')} style={styles.logo} />

      
      <TextInput
        placeholder="Họ tên"
        value={name}
        onChangeText={(value) => onChange("name", value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(value) => onChange("email", value)}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={(value) => onChange("password", value)}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={(value) => onChange("phone", value)}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Địa chỉ"
        value={address}
        onChangeText={(value) => onChange("address", value)}
        style={styles.input}
      />

      {/* <Button title={isLoading ? "Đang tạo..." : "Đăng ký"} onPress={submitHandler} disabled={isLoading} /> */}

      <TouchableOpacity
        style={styles.btn}
        onPress={submitHandler}
        disabled={isLoading}
      >
        <Text style={styles.btnText}>
          {isLoading ? "Đang tạo..." : "Đăng ký"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
            Đã có tài khoản? <Text style={styles.loginLink}>Đăng nhập!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: { 
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    marginBottom: 12, 
    paddingLeft: 8 
  },
  logo: {
    width: 180,
    height: 40,
    alignSelf: 'center',
    margin: 10,
  },

  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
  },
  btn: {
    backgroundColor: '#151515',
    paddingVertical: 10,
    paddingHorizontal: 20,
    //borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignupScreen;
