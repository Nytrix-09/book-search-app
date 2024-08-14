import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../types/types";

interface WishlistState {
  books: Book[];
}

const initialState: WishlistState = {
  books: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlistAdd: (state, action: PayloadAction<Book>) => {
      // payload should be book obj
      const book = action.payload;
      // pushes new book if not already in state's array
      const tmp = state.books.find((x) => x.id === book.id);
      if (tmp === undefined) {
        state.books.push(book);
      }
    },
    wishlistDelete: (state, action: PayloadAction<string>) => {
      // payload should be book id
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export const { wishlistAdd, wishlistDelete } = wishlistSlice.actions;
export default wishlistSlice.reducer;
