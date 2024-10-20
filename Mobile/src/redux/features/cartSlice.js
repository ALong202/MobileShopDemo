//src\redux\features\cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
  cartItems: [],
  shippingInfo: {},
};

// Function to load data from AsyncStorage
const loadFromAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log('Error loading data from AsyncStorage:', error);
    return null;
  }
};

// Initial loading of cartItems and shippingInfo from AsyncStorage
const initializeState = async () => {
  const cartItems = await loadFromAsyncStorage('cartItems');
  const shippingInfo = await loadFromAsyncStorage('shippingInfo');
  return {
    cartItems: cartItems || [],
    shippingInfo: shippingInfo || {},
  };
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Save updated cartItems to AsyncStorage
      AsyncStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      state.cartItems = state?.cartItems?.filter(
        (i) => i.product !== action.payload
      );

      // Save updated cartItems to AsyncStorage
      AsyncStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      AsyncStorage.removeItem("cartItems"); // Remove from AsyncStorage
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;

      // Save shippingInfo to AsyncStorage
      AsyncStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

export default cartSlice.reducer;

export const { setCartItem, removeCartItem, saveShippingInfo, clearCart } = cartSlice.actions;
