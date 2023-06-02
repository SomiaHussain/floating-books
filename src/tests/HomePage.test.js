import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../Pages/Home/homePage";

describe("HomePage", () => {
  it("Assert all heading elements", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    const headings = screen.getAllByRole("heading");

    expect(headings).toHaveLength(5);
    expect(headings[0]).toHaveTextContent(/Welcome to floating books/i);
    expect(headings[1]).toHaveTextContent(/Favourites/i);
    expect(headings[3]).toHaveTextContent(/Recently added books/i);
  });
});
