import axios from "axios";

export const GetAllGenres = async () => {
  try {
    return await axios.get("http://localhost:4000/genres");
  } catch (error) {
    console.error("Error:", error);
  }
};
