import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "../common/assets/Open_book_nae_02.svg.png";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./bookList.css";

const BookList = ({ book, handleFavourite, isFavourite, handleOrder }) => {
  const bookImage = book.image === "" ? image : book.image;
  return (
    <Grid key={book.ISBN} item xs={12} md={2}>
      <Card className="bookDetails" sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={
            bookImage ||
            "https://images.pexels.com/photos/1730560/pexels-photo-1730560.jpeg"
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <div variant="body2" color="text.secondary">
            <p><b>Author:</b> {book.author}</p>
            <p><b>Release Date:</b> {book.releaseDate}</p>
            <p><b>Recommendation:</b> {book.donatorcomment}</p>
            <p><b>Genre:</b> {book.genre.genre}</p>
            <p><b>Owner:</b> {book.owner.userName}</p>
          </div>
        </CardContent>
        {localStorage.getItem("userDetails") && (
          <CardActions>
            {isFavourite(book) ? (
              <Box sx={{ paddingLeft: "5em" }}>
                <Button
                  size="small"
                  variant="outlined"
                  type="submit"
                  className="button-order"
                  onClick={() => {
                    handleOrder(book, book.favouritesId);
                  }}
                >
                  Order
                </Button>
                <IconButton
                  onClick={(e) => {
                    e.target.value = "";
                    handleFavourite(book, book.favouritesId);
                  }}
                >
                  <FavoriteIcon sx={{ color: "green" }} />
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  paddingLeft: "7em"
                }}
              >
                <IconButton
                  onClick={(e) => {
                    e.target.value = "";
                    handleFavourite(book, book.favouritesId);
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              </Box>
            )}
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

export default BookList;
