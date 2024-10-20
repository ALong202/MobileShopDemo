// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLoginMutation } from '../redux/api/authApi';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [login, { isLoading, error, data }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
    if (error) {
      alert(error?.data?.message);  // Display error using alert for simplicity
    }
  }, [error, isAuthenticated]);

  const submitHandler = () => {
    login({ email, password });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/FashionShop_logo.png')} style={styles.logo} />
      <Text style={styles.slogan}>Thời trang The Fashionshop</Text>
            {/* Thông báo giảm giá */}
            <View style={styles.promoContainer}>
        <Text style={styles.promoText}>🛍️ GIẢM THÊM 15% CHO ĐƠN HÀNG ĐẦU TIÊN</Text>
      </View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={submitHandler}
        disabled={isLoading}
      >
        <Text style={styles.btnText}>
          {isLoading ? "Đang xác thực..." : "Đăng nhập"}
        </Text>
      </TouchableOpacity>
      {/* <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
        Chưa có tài khoản?
      </Text> */}

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>
          Chưa có tài khoản? <Text style={styles.signUpLink}>Đăng ký!</Text>
        </Text>
      </TouchableOpacity>
      <Text style={styles.orLoginWith}>Hoặc đăng nhập với:</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity>
          <Image source={require('../../assets/Facebook_logo.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/Google_logo2.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.privacyText}>
        Bằng cách tiếp tục, bạn đồng ý với <Text style={styles.link}>Chính sách bảo mật & Cookie</Text> và <Text style={styles.link}>Điều khoản và Điều kiện</Text> của chúng tôi.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
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
  link: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center'
  },
  logo: {
    width: 180,
    height: 40,
    alignSelf: 'center',
    margin: 10,
  },
  orLoginWith: {
    textAlign: 'center',
    marginVertical: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  signUpText: {
    textAlign: 'center',
    marginTop: 20,
  },
  signUpLink: {
    color: 'blue',
  },
  slogan: {
    textAlign: 'center',
    marginBottom: 20,
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
  forgotPassword: {
    textAlign: 'right',
    color: 'blue',
    marginBottom: 10,
  },
  promoContainer: {
    backgroundColor: '#fdebd0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  promoText: {
    color: '#d9534f',         
  },
  privacyText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 20,
  },
});

export default LoginScreen;
