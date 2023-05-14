import React, { useState } from "react";
import { Button, TextField, Grid, Container } from "@mui/material";
import "./registerPage.css";
import { Register } from "../../services/accountService";
import { useNavigate } from "react-router-dom";

const PersonalDetailsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password === formData.confirmPassword) {
      setErrorMessage("");

      Register(formData)
        .then(() => navigate("/login"))
        .catch((error) => {
          setErrorMessage(error.message.replace("Firebase: ", ""));
        });
    } else {
      setErrorMessage("Passwords must match");
    }
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
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              label="confirm password"
            ></TextField>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {errorMessage && <p className="errorLabel">{errorMessage}</p>}
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

export default PersonalDetailsPage;
