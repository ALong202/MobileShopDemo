//src\redux\api\orderApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage cho token

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.7:3001/api",  // Điều chỉnh baseUrl cho React Native
    // Chuẩn bị headers cho các request, bao gồm cả token từ AsyncStorage
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: "/orders/new",
          method: "POST",
          body,
        };
      },
    }),
    myOrders: builder.query({
      query: () => ({
        url: `/me/orders`,
      }),
    }),
    orderDetails: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
    }),
  }),
});

// Export các hooks để sử dụng trong các component
export const { useCreateNewOrderMutation, useMyOrdersQuery, useOrderDetailsQuery } = orderApi;
