import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  queries: [],
  isLoading: false,
};

//API URL
const getAllContactQueriesUrl =
  "http://localhost:8080/api/contact/getAllContacts";

export const getAllQueriesAsync = createAsyncThunk(
  "contact/getallcontact",
  async () => {
    try {
      const response = await axios.post(getAllContactQueriesUrl);
      // toast.success(response.data.message);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getAllQueriesAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllQueriesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.queries = action.payload;
      });
  },
});

export default contactSlice.reducer;
