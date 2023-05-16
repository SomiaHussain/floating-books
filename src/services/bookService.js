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
      donatorId,
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
      createDate,
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
