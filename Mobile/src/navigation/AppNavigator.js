// src/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTab from './MainTab'; // Import đúng MainTab
import ProductScreen from '../screens/ProductScreen2';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignupScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
// Nếu chưa có DrawerNavigation, tạm thời bỏ qua 
// import DrawerNavigation from './DrawerNavigation';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* MainTab sẽ chứa các tab điều hướng chính */}
      <Stack.Screen 
        name="Main" 
        component={MainTab} 
        options={{ headerShown: false }} 
      />
      {/* Các màn hình khác có thể được điều hướng từ các tab */}
      <Stack.Screen 
        name="Product" 
        component={ProductScreen} 
        options={{ headerShown: true, title: "Product Details" }} // Thêm tiêu đề sản phẩm
      />
       <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: true, title: "Đăng nhập" }} // Thêm tiêu đề sản phẩm
      />     
       <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ headerShown: true, title: "Đăng ký" }} // Thêm tiêu đề sản phẩm
      />     
       <Stack.Screen 
        name="ResetPassword" 
        component={ResetPasswordScreen} 
        options={{ headerShown: true, title: "Đặt lại mật khẩu" }} // Thêm tiêu đề sản phẩm
      />     
       <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen} 
        options={{ headerShown: true, title: "Quên mật khẩu" }} // Thêm tiêu đề sản phẩm
      />     


    </Stack.Navigator>
  );
};

export default AppNavigator;
