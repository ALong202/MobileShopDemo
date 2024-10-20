//src\redux\store.js
/* store.js trong Redux Toolkit cấu hình Redux store, lưu trữ toàn bộ trạng thái ứng dụng. */
import { configureStore } from "@reduxjs/toolkit"; // ref: https://redux-toolkit.js.org/api/configureStore
import userReducer from "./features/userSlice"; // reducer cho trạng thái người dùng
import { productApi } from "./api/productsApi"; // API slice cho sản phẩm
import { authApi } from "./api/authApi"; // API slice cho xác thực
import { userApi } from "./api/userApi"; // API slice cho người dùng
import cartReducer from "./features/cartSlice"; // reducer cho giỏ hàng
import { orderApi } from "./api/orderApi"; // API slice cho đơn hàng

export const store = configureStore({
  // Dùng Chrome extension Redux DevTools để theo dõi các reducers và trạng thái của ứng dụng
  reducer: {
    // Định nghĩa các reducer cho ứng dụng
    auth: userReducer, // Trạng thái xác thực
    cart: cartReducer, // Trạng thái giỏ hàng
    // Các API slices xử lý trạng thái của các yêu cầu API ứng dụng
    [productApi.reducerPath]: productApi.reducer, // API slice cho sản phẩm
    [authApi.reducerPath]: authApi.reducer, // API slice cho xác thực
    [userApi.reducerPath]: userApi.reducer, // API slice cho người dùng
    [orderApi.reducerPath]: orderApi.reducer, // API slice cho đơn hàng
  },
  // ref: https://redux-toolkit.js.org/rtk-query/usage#adding-the-api-middleware
  // thêm các middleware từ các API slices vào chuỗi middleware mặc định của Redux Toolkit
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware, // middleware cho sản phẩm
      authApi.middleware, // middleware cho xác thực
      userApi.middleware, // middleware cho người dùng
      orderApi.middleware, // middleware cho đơn hàng
    ]),
});
