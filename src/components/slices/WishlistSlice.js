import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    books: [],
  },

  reducers: {
    wishlistAdd: (state, action) => {
      //payload should be book obj
      const book = action.payload;
      //pushes new book if not already in state's array
      const temp = state.books.find((x) => x.id === book.id);
      if (temp === undefined) {
        state.books.push(book);
      }
    },
    wishlistDelete: (state, action) => {
      //payload should be book id
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export const { wishlistAdd, wishlistDelete } = wishlistSlice.actions;
export default wishlistSlice.reducer;
