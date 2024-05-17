import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import productSlice from "../features/productSlice";
import couponSlice from "../features/couponSlice";
import orderSlice from "../features/orderSlice";
import reviewSlice from "../features/reviewSlice";
import contactSlice from "../features/contactSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    coupons: couponSlice,
    order: orderSlice,
    review: reviewSlice,
    contact: contactSlice,
  },
});
