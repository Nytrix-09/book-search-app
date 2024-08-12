import React from "react";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from "react-redux";
import { wishlistAdd } from "../slices/WishlistSlice";

export default function SearchResults() {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.search.fetchedResults);
  const onAdd = (book) => {
    dispatch(wishlistAdd(book));
  };

  return (
    <ul className="searchResults">
      {books?.map((book) => (
        <BookCard book={book} onAdd={onAdd} key={book.id} />
      ))}
    </ul>
  );
}
