import React, { useState } from "react";
import { Button, TextField, Grid, Container } from "@mui/material";
import "./registerPage.css";
import { Register } from "../../services/accountService";


const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    postalAddress: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Need to add validation
    Register(formData)
  };

  return (
    <Container sx={{ paddingTop: "10px" }}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <h2>Registration</h2>

          <Grid item xs={12}>
            <TextField
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              label="First Name"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              label="last Name"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              label="user Name"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="postalAddress"
              value={formData.postalAddress}
              onChange={handleChange}
              label="postalAddress"
            ></TextField>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth>
            Register
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default RegistrationPage;
