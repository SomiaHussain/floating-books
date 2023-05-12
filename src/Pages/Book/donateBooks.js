import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { getDonateBooks } from "../../services/booksService";
import noCoverImage from "../../images/no-cover-image.jpeg";
import "./books.css";

const DonateBook = ({ userId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (userId) {
      getDonateBooks(userId).then((data) => setBooks(data));
    }
  }, [userId]);

  return (
    <Container sx={{ paddingTop: "10px" }}>
      Donate Books
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
                {/* <li>{book.donatorcomment}</li>
                  <li>{book.genre.genre}</li> */}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default DonateBook;
