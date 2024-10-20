
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Product"],

  keepUnusedDataFor: 86400,
  
  endpoints: (builder) => ({ 
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        // đưa params về backend 
        params: {
          page: params?.page, // page: số trang
          keyword: params?.keyword, // keyword: từ khóa tìm kiếm
          category: params?.category,
          subCategory: params?.subCategory, //
          subSubCategory: params?.subSubCategory, //
          sort: params?.sort,
          "price[gte]": params?.min,
          "price[lte]": params?.max,
          
        }
      }),
    }),
    // Lấy thông tin chi tiết sản phẩm từ backend
    getProductDetails: builder.query({
      query: (id) => 
        `/products/${id}`,
        providesTags: ['Product'],
    }),
    // getProductById: builder.query({
    //   query: (id) => `/${id}`,
    // }),
    submitReview: builder.mutation({
      query(body){
        return {
          url: "/reviews",
          method: "PUT",
          body,
        }
      },
      invalidatesTags: ["Product"],
    }),
    canUserReview: builder.query({
      query: (productId) => 
        `/can_review/?productId=${productId}`,        
    }),
  }),
})

// the hook  để lấy toàn bộ sản phẩm, tất cả biến Isloading-sucess-error variables
export const { 
  useGetProductsQuery, 
  useGetProductDetailsQuery, 
  useSubmitReviewMutation,
  useCanUserReviewQuery
} = productApi;