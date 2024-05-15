import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import productSlice from "../features/productSlice";
import couponSlice from "../features/couponSlice";
import orderSlice from "../features/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    coupons: couponSlice,
    order: orderSlice
  },
});