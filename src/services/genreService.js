import axios from "axios";

export const GetGenres = async (setGenreList) => {
  try {
    return await axios
      .get("http://localhost:4000/genres")
      // .get("http://floating-books-api.onrender.com/genres")
      .then((res) => {
        setGenreList(res.data);
      });
  } catch (error) {
    console.error("Error:", error);
  }
};
