import { configureStore } from "@reduxjs/toolkit";
import searchSliceReducer from "../slices/SearchSlice";
import wishlistSliceReducer from "../slices/WishlistSlice";

const store = configureStore({
  reducer: {
    search: searchSliceReducer,
    wishlist: wishlistSliceReducer,
  },
});

export default store;
