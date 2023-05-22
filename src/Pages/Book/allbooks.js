import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { InputAdornment, IconButton } from "@mui/material";
import "../Home/homePage.css";
import { GetUserDetails } from "../../services/accountService";

import { AddFavouriteBook, AddOrderBook } from "../../services/bookService";
import BookList from "../../components/booksList";
import { GetFavouriteBook } from "../../services/bookService";
import { DeleteFavouriteBook } from "../../services/bookService";
import { GetOrderBooks } from "../../services/bookService";
import sendEmail from "../../services/sendEmail";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllBooks } from "../../services/bookService";

const AllBooks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [booksData, setBooksData] = useState([]);
  const [filteredData, setFilteredData] = useState(booksData);
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [orderBooks, setOrderBooks] = useState([]);
  const { id, genre } = useParams();

  useEffect(() => {
    GetAllBooks().then((book) => {
      if (localStorage.getItem("userDetails")) {
        GetUserDetails(
          localStorage.getItem("userDetails"),
          setUserDetails
        ).then((res) => {
          GetFavouriteBook(res?.data[0].id, setFavouriteBooks);
          if (res?.data) {
            const filtered = book.data.filter(
              (item) => item.genreId.toString() === id
            );

            filtered.forEach((element, index) => {
              const fav = getFavourite(element);
              if (fav) {
                filtered[index] = fav;
              }
            });
            setFilteredData(filtered);
            setBooksData(filtered);
          }
        });
      } else {
        if (book?.data) {
          const filtered = book.data.filter(
            (item) => item.genreId.toString() === id
          );

          setFilteredData(filtered);
        }
      }
    });
  }, [id]);

  useEffect(() => {
    GetOrderBooks(setOrderBooks, () => {});
  }, []);

  const searchItems = (term, dataArray) => {
    const newTerm = term.toLowerCase().trim();
    return dataArray.filter((book) => {
      const lowerCaseTitle = book?.title.toLowerCase();
      const lowerCaseIsbn = book?.ISBN.toLowerCase();
      const lowerCaseAuthor = book?.author.toLowerCase();

      return (
        lowerCaseTitle.includes(newTerm) ||
        lowerCaseIsbn.includes(newTerm) ||
        lowerCaseAuthor.includes(newTerm)
      );
    });
  };

  const handleFavourite = (book, favouriteId) => {
    setErrorMessage("");
    const currentDate = new Date();

    if (isFavourite(book)) {
      DeleteFavouriteBook(favouriteId)
        .then((res) => {
          const updatedItems = favouriteBooks.filter((i) => i !== book);
          setFavouriteBooks(updatedItems);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      AddFavouriteBook(book.id, userDetails.id, currentDate.toDateString())
        .then(() => {
          setFavouriteBooks([...favouriteBooks, book]);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    search(event.target.value);
  };

  const search = (value) => {
    if (value === "") {
      setFilteredData(booksData);
    } else {
      const searchedResults = searchItems(value, booksData);
      setFilteredData(searchedResults);
    }
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData("text");
    setSearchTerm(pastedValue);
    search(pastedValue);
  };

  const isFavourite = (bookItem) => {
    return favouriteBooks.some((obj) => obj.id === bookItem.id);
  };

  const getFavourite = (bookItem) => {
    return favouriteBooks.find((obj) => obj.id === bookItem.id);
  };

  const handleOrder = (book, favouriteId) => {
    const currentDate = new Date();

    if (
      orderBooks.find(
        (order) =>
          order.book.id === book.id &&
          order.status !== "received" &&
          order.status !== "reject"
      )
    ) {
      setErrorMessage("This book is requested now!");
      return;
    }

    if (book.ownerId === userDetails.id) {
      setErrorMessage("This book is in your house, no need to order!");
      return;
    }

    if (isFavourite(book)) {
      DeleteFavouriteBook(favouriteId).then((res) => {
        const updatedItems = favouriteBooks.filter((i) => i !== book);
        setFavouriteBooks(updatedItems);
      });

      AddOrderBook(book.id, userDetails.id, currentDate.toDateString())
        .then(() => {
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error(error.message);
        });

      // send email to owner, someone order your book, please follow up @@@
      const emailData = {};
      emailData.from = "";
      emailData.to = book.owner.email;
      emailData.subject = `${book.title} is requested, please follow up!`;
      const message = `<p style='font-weight:bold;'>  Dear ${book.owner.userName}, </p> ${userDetails.userName} is requesting your book. Please follow up. Thank you very much. <p style='font-weight:bold;'> Sincerely, Floating Books Admin</p> `;
      emailData.html = message;
      sendEmail(emailData, () => {});
    }
  };

  return (
    <div>
      <Grid
        sx={{ paddingTop: "20px" }}
        container
        spacing={3}
        direction={"column"}
        justify={"center"}
        alignItems={"center"}
      >
        <h2>Welcome to floating books</h2>
        <Grid item xs={12}>
          {errorMessage && (
            <p className="authenticatedFailed">{errorMessage}</p>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Title, ISBN, Author"
            type="text"
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleChange}
            onPaste={handlePaste}
            value={searchTerm}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),

              endAdornment: searchTerm && (
                <IconButton
                  onClick={(e) => {
                    e.target.value = "";
                    handleChange(e);
                  }}
                >
                  <CloseRoundedIcon />
                </IconButton>
              )
            }}
          />
        </Grid>
      </Grid>
      <Grid className="bookRow" container spacing={2}>
        <Grid item xs={12} md={12}>
          <h2>All books {genre}</h2>
        </Grid>
        {filteredData?.length === 0 ? (
          <Grid item xs={12} md={12}>
            <h4 className="noResultsFound">No results found.</h4>
          </Grid>
        ) : (
          filteredData.map((book) => (
            <BookList
              key={book.id}
              book={book}
              handleFavourite={handleFavourite}
              isFavourite={isFavourite}
              handleOrder={handleOrder}
            />
          ))
        )}
      </Grid>
    </div>
  );
};

export default AllBooks;
