import axios from 'axios'

export const Register = async   ({firstName, lastName, userName, postalAddress }) => {
  const requestData = {
    firstName,
    lastName,
    userName,
    postalAddress,
  };
  console.log(requestData)
  
  axios
    .post("http://localhost:4000/users", requestData)
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
