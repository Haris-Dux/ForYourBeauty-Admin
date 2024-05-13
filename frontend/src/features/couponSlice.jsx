import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  coupon: [],
  isLoading: false
};

//API URL
const createCoupunUrl = "http://localhost:8080/api/coupons/createCoupun";


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

  },
});

export default couponSlice.reducer;
