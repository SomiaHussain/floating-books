import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginPage from "../Pages/Login/loginPage";
import { BrowserRouter } from "react-router-dom";

describe("LoginPage", () => {
  test("renders login form", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByTestId("login");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("updates form values on input change", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });
});
