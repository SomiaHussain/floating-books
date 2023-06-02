import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import AddBookPage from "../Pages/Book/addBookPage";

describe("AddBookPage", () => {
  it("heading of add book page", async () => {
    render(
      <Router>
        <AddBookPage />
      </Router>
    );
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(/Add Book/i);
  });

  it("Assert correct number of inputs are present", async () => {
    render(
      <Router>
        <AddBookPage />
      </Router>
    );

    expect(screen.getByLabelText(/Title/)).toBeInTheDocument();
    expect(screen.getByLabelText(/ISBN/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Donator Comment/)).toBeInTheDocument();
  });

  it("Assert two buttons are present", async () => {
    render(
      <Router>
        <AddBookPage />
      </Router>
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
    expect(buttons[1]).toHaveTextContent("Add Book");
  });
});
