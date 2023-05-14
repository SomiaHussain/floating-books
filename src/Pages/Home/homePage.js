import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";

import { GetRecentlyAddedBooks } from "../../services/bookService";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { InputAdornment, IconButton } from "@mui/material";
import "./homePage.css";
import { GetUserDetails } from "../../services/accountService";
import { AddFavouriteBook } from "../../services/bookService";
import BookList from "../../components/booksList";
import { GetFavouriteBook } from "../../services/bookService";
import { DeleteFavouriteBook } from "../../services/bookService";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [booksData, setBooksData] = useState([]);
  const [filteredData, setFilteredData] = useState(booksData);
  const [loggedUserDetails, setLoggedUserDetails] = useState({});
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  useEffect(() => {
    GetUserDetails(localStorage.getItem("userDetails")).then((res) => {
      setLoggedUserDetails(res.data);

      GetFavouriteBook(res.data.id).then((result) => {
        const uniqueBooksMap = new Map();
        result?.data.forEach((item) => {
          const data = { ...item.book, favouritesId: item.id };
          uniqueBooksMap.set(item.bookId, data);
        });
        setFavouriteBooks(Array.from(uniqueBooksMap.values()));
      });
    });

    GetRecentlyAddedBooks().then((res) => {
      const bookData = res.data;
      bookData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setBooksData(bookData);
      setFilteredData(bookData);
    });
  }, [setFavouriteBooks]);

  const searchItems = (searchTerm, dataArray) => {
    searchTerm = searchTerm.toLowerCase().trim();
    return dataArray.filter((item) => {
      const { title, isbn, author } = item;
      const lowerCaseTitle = title.toLowerCase();
      const lowerCaseIsbn = isbn.toLowerCase();
      const lowerCaseAuthor = author.toLowerCase();

      return (
        lowerCaseTitle.includes(searchTerm) ||
        lowerCaseIsbn.includes(searchTerm) ||
        lowerCaseAuthor.includes(searchTerm)
      );
    });
  };
  const handleFavourite = (book, favouriteId) => {
    const currentDate = new Date();
    if (isFavourite(book.id)) {
      const updatedItems = favouriteBooks.filter((i) => i !== book);
      setFavouriteBooks(updatedItems);
      DeleteFavouriteBook(favouriteId);
    } else {
      AddFavouriteBook(
        book.id,
        loggedUserDetails.id,
        currentDate.toDateString()
      ).then(() => {
        setFavouriteBooks([...favouriteBooks, book]);
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
      const searchedResults = searchItems(searchTerm, booksData);
      setFilteredData(searchedResults);
    }
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData("text");
    setSearchTerm(pastedValue);
    search(pastedValue);
  };

  const isFavourite = (bookId) => {
    if (
      favouriteBooks?.some(
        (obj) => obj.id === bookId && obj.ownerId === loggedUserDetails.id
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div sx={{ paddingTop: "10px" }}>
      <Grid
        container
        spacing={3}
        direction={"column"}
        justify={"center"}
        alignItems={"center"}
      >
        <h2>Welcome to floating books</h2>
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
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid className="bookRow" container spacing={2}>
        <Grid item xs={12} md={12}>
          <h2>Favourites</h2>
        </Grid>
        {favouriteBooks?.length === 0 ? (
          <Grid item xs={12} md={12}>
            <h4 className="noResultsFound">No favourites found.</h4>
          </Grid>
        ) : (
          favouriteBooks
            ?.slice(0, 6)
            .map((book) => (
              <BookList
                book={book}
                handleFavourite={handleFavourite}
                isFavourite={isFavourite}
              />
            ))
        )}
      </Grid>

      <Grid className="bookRow" container spacing={2}>
        <Grid item xs={12} md={12}>
          <h2>Recently added books</h2>
        </Grid>
        {filteredData?.length === 0 ? (
          <Grid item xs={12} md={12}>
            <h4 className="noResultsFound">No results found.</h4>
          </Grid>
        ) : (
          filteredData
            ?.slice(0, 6)
            .map(
              (book) =>
                !isFavourite(book.id) && (
                  <BookList
                    book={book}
                    handleFavourite={handleFavourite}
                    isFavourite={isFavourite}
                  />
                )
            )
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
