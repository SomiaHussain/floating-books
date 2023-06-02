import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "../Pages/Login/loginPage";

describe("LoginPage", () => {
  it("Assert all heading elements", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent(/Login/i);
  });
});
