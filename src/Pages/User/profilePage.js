import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { getUser } from "../../services/usersService";
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
    </Container>
  );
};

export default ProfilePage;
