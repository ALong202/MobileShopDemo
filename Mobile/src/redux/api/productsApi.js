//src\redux\api\productsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage cho token

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.7:3001/api", // Cập nhật baseUrl cho React Native
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"],
  keepUnusedDataFor: 86400, // Giữ cache trong 1 ngày
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          subCategory: params?.subCategory,
          subSubCategory: params?.subSubCategory,
          sort: params?.sort,
          "price[gte]": params?.min,
          "price[lte]": params?.max,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    canUserReview: builder.query({
      query: (productId) => `/can_review/?productId=${productId}`,
    }),
  }),
});

// Export các hooks để sử dụng trong các component React Native
export const { 
  useGetProductsQuery, 
  useGetProductDetailsQuery, 
  useSubmitReviewMutation, 
  useCanUserReviewQuery 
} = productApi;
