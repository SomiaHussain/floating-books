import axios from "axios";

export const getUser = async (userName) => {
  let endpoint = "http://localhost:4000/users/search";

  try {
    const response = await axios.post(endpoint, { userName: `${userName}` });
    return response;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
