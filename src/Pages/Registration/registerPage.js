import React, { useState } from "react";
import { Button, TextField, Grid, Container } from "@mui/material";
import "./registerPage.css";
import { Register } from "../../services/accountService";
import { useNavigate } from "react-router-dom";
import { UserForm } from '../Registration/UserForm';


const RegistrationPage = () => {
  return (
    <Container sx={{ paddingTop: "10px" }}>
      <UserForm />
    </Container>
  );
};

export default RegistrationPage;