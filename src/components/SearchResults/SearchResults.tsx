import React from "react";
import { wishlistAdd } from "../slices/WishlistSlice";
import { Book } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import BookCard from "../BookCard/BookCard";

export default function SearchResults() {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.search.fetchedResults);
  const onAdd = (book: Book) => {
    dispatch(wishlistAdd(book));
  };

  return (
    <ul className="searchResults">
      {books!.map((book) => (
        <BookCard book={book} onAdd={onAdd} key={book.id} />
      ))}
    </ul>
  );
}
