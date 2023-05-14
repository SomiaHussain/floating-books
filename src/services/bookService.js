import axios from "axios";

export const AddBook = async ({
  title,
  isbn,
  author,
  releaseDate,
  image,
  donatorComment,
  donatorId,
  donateDate,
  ownerId,
  genreId,
  favouritesId
}) => {
  try {
    return await axios.post("http://localhost:4000/books", {
      title,
      isbn,
      author,
      releaseDate,
      image,
      donatorComment,
      donateDate,
      ownerId,
      genreId,
      donatorId
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetRecentlyAddedBooks = async () => {
  try {
    return await axios.get("http://localhost:4000/books");
  } catch (error) {
    console.error("Error:", error);
  }
};

export const AddFavouriteBook = async (bookId, userId, createDate) => {
  try {
    return await axios.post("http://localhost:4000/favourites", {
      bookId,
      userId,
      createDate
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetFavouriteBook = async (userId) => {
  try {
    return await axios.get(`http://localhost:4000/favourites/${userId}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const DeleteFavouriteBook = async (favouriteId) => {
  try {
    return await axios.delete(
      `http://localhost:4000/favourites/${favouriteId}`
    );
  } catch (error) {
    console.error("Error:", error);
  }
};
