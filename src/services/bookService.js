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
  favouritesId,
}) => {
  const formData = {};
  formData.title = title;
  formData.ISBN = isbn;
  formData.author = author;
  formData.releaseDate = releaseDate;
  formData.donatorcomment = donatorComment;
  formData.donateDate = donateDate;
  formData.ownerId = ownerId;
  formData.genreId = 7;
  formData.donatorId = donatorId;

  try {
    return await axios.post("http://localhost:4000/books", formData);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetRecentlyAddedBooks = async (setBooksData, setFilteredData) => {
  try {
    const result = await axios.get("http://localhost:4000/books");
    const bookData = result.data;
    bookData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setBooksData(bookData);
    setFilteredData(bookData);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const AddFavouriteBook = async (bookId, userId, createDate) => {
  const formData = {};
  formData.bookId = bookId;
  formData.userId = userId;
  formData.createDate = createDate;

  try {
    return await axios.post("http://localhost:4000/favourites", formData);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetFavouriteBook = async (userId, setFavouriteBooks) => {
  try {
    const result = await axios.get(
      `http://localhost:4000/favourites/${userId}`
    );
    const uniqueBooksMap = new Map();
    result?.data.forEach((item) => {
      const data = { ...item.book, favouritesId: item.id };
      uniqueBooksMap.set(item.bookId, data);
    });
    setFavouriteBooks(Array.from(uniqueBooksMap.values()));
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
