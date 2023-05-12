import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { getOrderBooks } from "../../services/booksService";
import noCoverImage from "../../images/no-cover-image.jpeg";
import "./books.css";

const OrderBook = ({ userId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (userId) {
      getOrderBooks(userId).then((data) => {
        const books = data.map((order) => order.book);
        setBooks(books);
      });
    }
  }, [userId]);

  return (
    <Container sx={{ paddingTop: "10px" }}>
      Order Books
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

export default OrderBook;
