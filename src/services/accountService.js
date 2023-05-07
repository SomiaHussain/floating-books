import axios from "axios";

export const Register = async ({
  firstName,
  lastName,
  userName,
  postalAddress,
  password
}) => {
  const requestData = {
    firstName,
    lastName,
    userName,
    password,
    postalAddress
  };
  axios
    .post("http://localhost:4000/users", requestData)
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const Login = async ({ userName, password }) => {
  const requestData = {
    userName,
    password
  };
  return axios
    .post("http://localhost:4000/users/login", requestData)
    .then((response) => {
      const { status } = response;
      if (status === 401 || status === 400) {
        throw new Error({ status: 401, message: "Authentication failed" });
      }
      return response.data;
    })
    .catch((error) => {
      throw new Error({ status: 401, message: "Authentication failed" });
    });
};
