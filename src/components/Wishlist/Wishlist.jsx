import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishlistDelete } from "../slices/WishlistSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.books);

  return (
    <div className="wishlist">
      <h2 className="title">Wishlist ({wishlist.length})</h2>
      <ul>
        {wishlist.map((book) => (
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
