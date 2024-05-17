import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  reviews: [],
  isLoading: false,
};

//API URL
const getAllReviewsUrl = "http://localhost:8080/api/reviews/getAllReviews";
const deleteReviewsUrl = "http://localhost:8080/api/reviews/deleteReview";

export const getAllReviewsAsync = createAsyncThunk(
  "reviews/getallreviews",
  async () => {
    try {
      const response = await axios.post(getAllReviewsUrl);
      // toast.success(response.data.message);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

export const deleteReviewsAsync = createAsyncThunk(
  "reviews/deleteReview",
  async (id) => {
    try {
      const response = await axios.post(deleteReviewsUrl, id);
      toast.success(response.data.message);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getAllReviewsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllReviewsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      });
  },
});

export default reviewSlice.reducer;
