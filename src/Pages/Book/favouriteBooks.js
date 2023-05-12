import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { getFavouriteBooks } from "../../services/booksService";
import noCoverImage from "../../images/no-cover-image.jpeg";
import "./books.css";

const FavouriteBook = ({ userId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (userId) {
      getFavouriteBooks(userId).then((data) => {
        const books = data.map((fav) => fav.book);
        setBooks(books);
      });
    }
  }, [userId]);

  return (
    <Container sx={{ paddingTop: "10px" }}>
      Favourite Books
      {books && (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <ul>
                <li>
                  {book.image && (
                    <img
                      src={book.image}
                      alt="BookImage"
                      className="book-image"
                    />
                  )}
                  {!book.image && (
                    <img
                      src={noCoverImage}
                      alt="BookImage"
                      className="book-image"
                    />
                  )}
                </li>
                <li className="book-title">{book.title}</li>
                <li>{book.author}</li>
                <li>{book.releaseDate}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default FavouriteBook;
