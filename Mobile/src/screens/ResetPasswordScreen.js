// src/screens/ResetPasswordScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useResetPasswordMutation } from '../redux/api/userApi';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ResetPasswordScreen = ({ route }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();
  const { token } = route.params || {}; // Get token from route parameters

  const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
    if (error) {
      Alert.alert("Error", error?.data?.message || "Có lỗi xảy ra");
    }
    if (isSuccess) {
      Alert.alert("Success", "Mật khẩu đã phục hồi thành công", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = () => {
    if (password !== confirmPassword) {
      return Alert.alert("Error", "Mật khẩu không khớp. Vui lòng thử lại!");
    }

    if (password.length < 6) {
      return Alert.alert("Error", "Mật khẩu phải có ít nhất 6 ký tự");
    }

    const data = { password, confirmPassword };
    resetPassword({ token, body: data });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lại mật khẩu mới</Text>

      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={isLoading ? "Đang xử lý..." : "Xác nhận mật khẩu"}
        onPress={submitHandler}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingLeft: 8 },
});

export default ResetPasswordScreen;
