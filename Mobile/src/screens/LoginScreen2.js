import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('YOUR_API_LOGIN_URL', values);
      // Handle success login response
      console.log('Logged in successfully:', response.data);
    } catch (error) {
      console.log('Login failed:', error.response?.data);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={(values) => handleLogin(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Image source={require('../../assets/FashionShop_logo.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <Button title="LOG IN" onPress={handleSubmit} color="#ff4500" />

          <Text style={styles.orLoginWith}>Or login with</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity>
              <Image source={require('../../assets/Facebook_logo.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/Google_logo2.png')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={styles.signUpLink}>Sign up here!</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 210,
    height: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: 'right',
    color: 'pink',
    marginBottom: 20,
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
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  signUpText: {
    textAlign: 'center',
    marginTop: 20,
  },
  signUpLink: {
    color: 'blue',
  },
});

export default LoginScreen;
