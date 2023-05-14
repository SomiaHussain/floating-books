import React, { useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import "./addBook.css";
import { GetUserDetails } from "../../services/accountService";
import { AddBook } from "../../services/bookService";

const AddBookPage = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userDetails");
    setUserData(JSON.parse(storedData));
    console.log(userData);
  }, []);

  const [bookData, setBookData] = useState({
    title: "",
    isbn: "",
    author: "",
    releaseDate: "",
    image: "",
    donatorComment: "",
    donateDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    GetUserDetails(localStorage.getItem("userDetails")).then((res) => {
      const bookDetails = {
        ...bookData,
        ownerId: res.data.id,
        genreId: 1,
        donatorId: res.data.id
      };
      AddBook(bookDetails).then((res) => {
        if (res.status === 201) {
          navigate("/")
        }
      });
    });
  };

  return (
    <Container className="addBookForm" sx={{ paddingTop: "10px" }}>
      <form onSubmit={handleSubmit}>
        <h2>Add Book</h2>
        <TextField
          label="Title"
          type="text"
          required={true}
          name="title"
          value={bookData.title}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <br />
        <TextField
          label="ISBN"
          type="text"
          required={true}
          name="isbn"
          value={bookData.isbn}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Author"
          type="text"
          required={true}
          name="author"
          value={bookData.author}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Release Date"
          type="text"
          required={true}
          name="releaseDate"
          value={bookData.releaseDate}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Image url"
          type="text"
          required={true}
          name="image"
          value={bookData.image}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Donator Comment"
          type="text"
          required={true}
          name="donatorComment"
          value={bookData.donatorComment}
          onChange={handleChange}
          multiline
          rows={5}
          maxRows={4}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Donate Date"
          type="text"
          required={true}
          name="donateDate"
          value={bookData.donateDate}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <Button variant="outlined" type="submit">
          Add Book
        </Button>
      </form>
    </Container>
  );
};

export default AddBookPage;
