import React from "react";
import { wishlistDelete } from "../slices/WishlistSlice";
import "./Wishlist.css";
import { Book } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function Wishlist() {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.books);

  return (
    <div className="wishlist">
      <h2 className="title">Wishlist ({wishlist.length})</h2>
      <ul>
        {wishlist.map((book: Book) => (
          <div key={book.id} className="wishlist__item_container">
            <span>{book.volumeInfo.title}</span>
            <button
              onClick={() => dispatch(wishlistDelete(book.id))}
              className="wishlist__deleteBtn"
            >
              X
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
