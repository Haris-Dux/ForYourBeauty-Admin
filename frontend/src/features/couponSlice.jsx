import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  coupon: [],
  isLoading: false,
};

//API URL
const createCoupunUrl = "http://localhost:8080/api/coupons/createCoupun";
const getAllCoupunUrl = "http://localhost:8080/api/coupons/getAllCoupons";
const deleteCoupunUrl = "http://localhost:8080/api/coupons/deleteCoupon";

// Register Function
export const createCoupunAsync = createAsyncThunk(
  "coupon/createCoupon",
  async (formData) => {
    try {
      const response = await axios.post(createCoupunUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

export const getAllCoupunAsync = createAsyncThunk(
  "coupon/getallCoupon",
  async () => {
    try {
      const response = await axios.post(getAllCoupunUrl);
      // toast.success(response.data.message);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

export const deleteCoupunAsync = createAsyncThunk(
  "coupon/deleteCoupon",
  async (id) => {
    try {
      const response = await axios.post(deleteCoupunUrl, id);
      toast.success(response.data.message);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

const couponSlice = createSlice({
  name: "couponSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // signup
      .addCase(createCoupunAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCoupunAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      // signup
      .addCase(getAllCoupunAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupunAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupon = action.payload;
      });
  },
});

export default couponSlice.reducer;
