import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

export const fetchBooks = createAsyncThunk(
  "search/fetchBooks",
  async (query, thunkAPI) => {
    thunkAPI.dispatch(startFetch());
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`
      );
      const data = await response.json();
      const books = data.items;
      thunkAPI.dispatch(saveFetchedResults(books));
      thunkAPI.dispatch(endFetch());
    } catch (err) {
      console.error("Failed to fetch with reason:", err);
      thunkAPI.dispatch(endFetch());
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isFetching: false,
    fetchedResults: [],
  },
  reducers: {
    startFetch: (state) => {
      state.isFetching = true;
    },
    endFetch: (state) => {
      state.isFetching = true;
    },
    saveFetchedResults: (state, action) => {
      //payload should be list of book objects
      state.fetchedResults = action.payload;
    },
  },
});

export const { startFetch, endFetch, saveFetchedResults } = searchSlice.actions;
export default searchSlice.reducer;
