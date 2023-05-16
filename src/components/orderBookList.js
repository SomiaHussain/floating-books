import React from "react";
import { Grid, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import image from "../common/assets/Open_book_nae_02.svg.png";
import "./orderBookList.css";

const OrderBookList = ({ book, id, status, updateStatus, role }) => {
  const bookImage = book.image === "" ? image : book.image;
  return (
    <Grid key={book.ISBN} item xs={12} md={2}>
      <Card className="bookDetails" sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={bookImage} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <p>Author: {book.author}</p>
            <p>Order status: {status}</p>
          </Typography>
        </CardContent>
        <CardActions>
          {role === "owner" && status === "request" && (
            <div>
              <Button
                size="small"
                variant="outlined"
                type="submit"
                onClick={() => {
                  updateStatus(id, "reject");
                }}
              >
                Reject
              </Button>
              <Button
                size="small"
                variant="outlined"
                type="submit"
                onClick={() => {
                  updateStatus(id, "accept");
                }}
              >
                Accept
              </Button>
            </div>
          )}
          {role === "owner" && status === "accept" && (
            <div>
              <Button
                size="small"
                variant="outlined"
                type="submit"
                onClick={() => {
                  updateStatus(id, "delivered");
                }}
              >
                Delivered
              </Button>
            </div>
          )}
          {role === "requestor" && status === "delivered" && (
            <div>
              <Button
                size="small"
                variant="outlined"
                type="submit"
                onClick={() => {
                  updateStatus(id, "received");
                }}
              >
                Received
              </Button>
            </div>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default OrderBookList;