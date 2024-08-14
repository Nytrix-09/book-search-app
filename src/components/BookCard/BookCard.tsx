import React from "react";
import "./BookCard.css";
import { Book } from "../../types/types";

interface BookCardProps {
  book: Book;
  onAdd: (book: Book) => void
}

const BookCard: React.FC<BookCardProps> = ({ book, onAdd }) => {
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

export default BookCard;