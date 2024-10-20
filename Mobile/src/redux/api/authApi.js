// /src\redux\api\authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userApi } from './userApi';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thay vì localStorage

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.7:3001/api",  // Điều chỉnh URL cho React Native
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 86400,
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await AsyncStorage.setItem('token', data.token); // Lưu token vào AsyncStorage
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await AsyncStorage.setItem('token', data.token); // Lưu token vào AsyncStorage
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => "/logout",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await AsyncStorage.removeItem('token'); // Xóa token khỏi AsyncStorage khi logout
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

// Export các hooks
export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } = authApi;
