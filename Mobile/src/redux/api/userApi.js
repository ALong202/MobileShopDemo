//src\redux\api\userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setLoading, setUser } from '../features/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage để lấy token

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"], 
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({ url: '/me' }),
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
          console.log(error);
        }
      },
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/me/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query: (body) => ({
        url: "/me/upload_avatar",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/password/update",
        method: "PUT",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/password/forgot",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, body }) => ({
        url: `/password/reset/${token}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

// Export các hooks để sử dụng trong các component React Native
export const { 
  useGetMeQuery, 
  useUpdateProfileMutation, 
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;
