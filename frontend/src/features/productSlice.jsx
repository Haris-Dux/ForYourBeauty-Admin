import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false,
  message: "",
};

//API URL
const getProductsUrl = `http://localhost:8080/api/products/getProducts`;
const createProductUrl = "http://localhost:8080/api/products/addProduct";
const updateProductUrl = "http://localhost:8000/api/products/updateProduct";
// const deleteProductUrl = "http://localhost:4000/api/products/deleteProduct";
// const getLatestProductUrl = "http://localhost:4000/api/products/getLatestPRoducts";

//CREATE ASYNC THUNK
export const createProductAsync = createAsyncThunk(
  "Shop/create",
  async (formdata) => {
    try {
      const response = await axios.post(createProductUrl, formdata);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// UPDATE ASYNC THUNK
export const updateProductAsync = createAsyncThunk(
  "Shop/update",
  async (formdata) => {
    try {
      const response = await axios.post(updateProductUrl, formdata);
      toast.success(response.data.message);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

//GET PRODUCTS
export const getAllProductsAsync = createAsyncThunk(
  "Shop/getProduts",
  async (data) => {
    const searchQuery =
      data?.search !== undefined && data?.search !== null
        ? `&search=${data?.search}`
        : "";
    try {
      const response = await axios.post(
        `${getProductsUrl}?category=${data.category}&page=${data.page}${searchQuery}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    resetGoals: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state, action) => {
        state.createLoading = true;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.createLoading = false;
      })

      .addCase(getAllProductsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      });

    // .addCase(deleteGoalsAsync.pending, (state, action) => {
    //   // state.isLoading = true;
    //   state.deleteLoading = true;
    // })
    // .addCase(deleteGoalsAsync.fulfilled, (state, action) => {
    //   // state.isLoading = false;
    //   state.deleteLoading = false;
    //   state.isSuccess = true;
    //   state.products = state.products.filter(
    //     (product) => product._id !== action.payload.id
    //   );
    // })
    // .addCase(deleteGoalsAsync.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // })

    // .addCase(updateProductAsync.pending, (state, action) => {
    //   state.updateLoading = true;
    // })
    // .addCase(updateProductAsync.fulfilled, (state, action) => {
    //   state.updateLoading = false;
    //   state.isSuccess = true;
    // });
  },
});

export const { resetGoals } = productSlice.actions;
export default productSlice.reducer;
