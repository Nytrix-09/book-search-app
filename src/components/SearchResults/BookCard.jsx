import React from "react";

export default function BookCard({ book, onAdd }) {
  const { imageLinks, title, authors, publisher, publishedDate, description } =
    book.volumeInfo;

  return (
    <div onClick={() => onAdd(book)} className="bookCard">
      <div className="container__hor">
        <img
          alt="book thumbnail"
          src={imageLinks?.thumbnail}
          className="bookCard__img"
        />
      </div>
      <h3>{title}</h3>
      <p>Author: {authors}</p>
      <p>Publisher: {publisher}</p>
      <p>Published date: {publishedDate}</p>
      <p>Description: {description}</p>
    </div>
  );
}
