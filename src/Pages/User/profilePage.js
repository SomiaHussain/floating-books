import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { getUser } from "../../services/usersService";
import DonateBooks from "../Book/donateBooks";
import FavouriteBooks from "../Book/favouriteBooks";
import OrderBooks from "../Book/orderBooks";
import "./profilePage.css";

const ProfilePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      getUser(userDetails.email).then((response) => setUsers(response.data[0]));
    }
  }, []);

  const rows = [
    { key: "First Name", value: users.firstName },
    { key: "Last Name", value: users.lastName },
    { key: "User Name", value: users.userName },
    { key: "Postal Address", value: users.postalAddress },
  ];

  return (
    <Container sx={{ paddingTop: "10px" }}>
      User Profile
      <table>
        <tbody>
          {rows.map((e) => {
            return (
              <tr key={e.key}>
                <td>{e.key}</td>
                <td>{e.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <DonateBooks userId={users.id} />
      <FavouriteBooks userId={users.id} />
      <OrderBooks userId={users.id} />
    </Container>
  );
};

export default ProfilePage;
