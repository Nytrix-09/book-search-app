import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const MAX_AUTOCOMPLETE_SUGGESTIONS = 10;

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

export const fetchAutocompleteSuggestions = createAsyncThunk(
  "search/fetchAutocompleteSuggestions",
  async (query, thunkAPI) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`
      );
      const data = await response.json();
      const books = data.items;
      const titles = books
        .map((book) => book.volumeInfo.title)
        .slice(0, MAX_AUTOCOMPLETE_SUGGESTIONS);
      thunkAPI.dispatch(saveAutocompleteSuggestion(titles));
    } catch (err) {
      console.error("Failed to fetch with reason:", err);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isFetching: false,
    fetchedResults: [],
    autocompleteSuggestions: [],
  },
  reducers: {
    startFetch: (state) => {
      state.isFetching = true;
    },
    endFetch: (state) => {
      state.isFetching = false;
    },
    saveFetchedResults: (state, action) => {
      // payload should be list of book objects
      state.fetchedResults = action.payload;
    },
    clearFetchedResults: (state) => {
      state.fetchedResults.length = 0;
    },
    saveAutocompleteSuggestion: (state, action) => {
      // payload is list of book titles (string)
      state.autocompleteSuggestions = action.payload;
    },
    clearAutocompleteSuggestion: (state) => {
      state.autocompleteSuggestions.length = 0;
    },
  },
});

export const {
  startFetch,
  endFetch,
  saveFetchedResults,
  saveAutocompleteSuggestion,
  clearAutocompleteSuggestion,
  clearFetchedResults,
} = searchSlice.actions;
export default searchSlice.reducer;
