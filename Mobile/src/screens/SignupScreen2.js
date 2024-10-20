import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const signUpValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSignUp = async (values) => {
    try {
      const response = await axios.post('YOUR_API_SIGNUP_URL', values);
      // Handle successful sign up
      console.log('Sign up successfully:', response.data);
    } catch (error) {
      console.log('Sign up failed:', error.response?.data);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={signUpValidationSchema}
      onSubmit={(values) => handleSignUp(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Image source={require('../../assets/FashionShop_logo.png')} style={styles.logo} />
          <Text style={styles.title}>Create New Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Enter email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Enter password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <Button title="CREATE" onPress={handleSubmit} color="#ff4500" />

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Login now!</Text>
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
    width: 200,
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
  loginText: {
    textAlign: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
  },
});

export default SignUpScreen;
