import React, { useState } from "react";
import { Button, TextField, Grid, Container } from "@mui/material";
import { Login } from "../../services/accountService";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    Login(loginData)
      .then((response) => {
        localStorage.setItem("userDetails", JSON.stringify(response));
        setErrorMessage("");
        navigate("/");
        window.location.reload(true);
      })
      .catch((errorMessage) => {
        setErrorMessage("Authentication failed");
      });
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
          <h2>Login</h2>
          <Grid item xs={12}>
            <TextField
              name="userName"
              value={loginData.userName}
              onChange={handleChange}
              label="user Name"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              label="Password"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            {errorMessage && (
              <p className="authenticatedFailed">{errorMessage}</p>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth>
            Login
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginPage;
