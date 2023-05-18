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
  // favouritesId,
}) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("ISBN", isbn);
  formData.append("author", author);
  formData.append("releaseDate", releaseDate);
  formData.append("donatorcomment", donatorComment);
  formData.append("donateDate", donateDate);
  formData.append("genreId", genreId);
  formData.append("donatorId", donatorId);
  formData.append("ownerId", ownerId);
  if (image) {
    formData.append("image", image);
  } else {
    formData.append("image", "");
  }

  try {
    return await axios.post("http://localhost:4000/books", formData);
  } catch (error) {
    console.error("Error:", error.message);
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
    const formData = {};
    formData.userId = userId;
    const result = await axios.post(
      "http://localhost:4000/favourites/search",
      formData
    );
    const uniqueBooksMap = new Map();
    result?.data.forEach((item) => {
      const data = { ...item.book, favouritesId: item.id };
      uniqueBooksMap.set(item.bookId, data);
    });

    setFavouriteBooks(Array.from(uniqueBooksMap.values()));
  } catch (error) {
    console.error("Error:", error.message);
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

export const AddOrderBook = async (bookId, userId, createDate) => {
  const formData = {};
  formData.bookId = bookId;
  formData.userId = userId;
  formData.orderDate = createDate;

  try {
    return await axios.post("http://localhost:4000/orders", formData);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetOrderBooks = async (setOrderBooks, setAlert) => {
  const endpoint = "http://localhost:4000/orders";
  return axios
    .get(endpoint)
    .then((response) => {
      setOrderBooks(response.data);
      if (response.data.length === 0) {
        setAlert({ message: "No Order book!", isSuccess: true });
      } else {
        setAlert({ message: "", isSuccess: true });
      }
    })
    .catch(() => {
      setOrderBooks([]);
      setAlert({
        message: "Get error, please try again later!",
        isSuccess: false,
      });
    });
};

export const UpdateOrder = async (orderId, newStatus, setAlert) => {
  const endpoint = `http://localhost:4000/orders/${orderId}`;
  const formData = {};
  formData.status = newStatus;

  return axios
    .patch(endpoint, formData)
    .then((response) => {
      setAlert({ message: "Status updated!", isSuccess: true });
    })
    .catch(() => {
      setAlert({
        message: "Get error, please try again later!",
        isSuccess: false,
      });
    });
};

export const UpdateBook = (bookId, userId, setAlert) => {
  const endpoint = `http://localhost:4000/books/${bookId}`;

  const formData = {};
  formData.ownerId = userId;

  return axios
    .patch(endpoint, formData)
    .then(() => {
      setAlert({
        message: "Book owner is updated.",
        isSuccess: true,
      });
    })
    .catch(() => {
      setAlert({
        message: "Server error. Please try again later.",
        isSuccess: false,
      });
    });
};
