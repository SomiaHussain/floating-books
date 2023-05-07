import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { getBooks } from "../../services/booksService";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "../../common/assets/Open_book_nae_02.svg.png";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [booksData, setBooksData] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchTerm); // You can perform search logic here
  };

  useEffect(() => {
    getBooks().then((data) => setBooksData(data));
  }, []);
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
            />
            <button type="submit">Search</button>
          </form>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <h2>Favorites</h2>
        </Grid>
        {booksData.map((book) => (
          <Grid key={book.ISBN} item xs={12} md={2}>
            <Card className="favoritesSection" sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <p>Author: {book.author}</p>
                  <p>Release Date: {book.releaseDate}</p>
                  <p>Donator Comment: {book.donatorcomment}</p>
                  <p>Donate Date: {book.donateDate}</p>
                  <p>Genre ID: {book.genreId}</p>
                  <p>Donator ID: {book.donatorId}</p>
                  <p>Owner ID: {book.ownerId}</p>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
