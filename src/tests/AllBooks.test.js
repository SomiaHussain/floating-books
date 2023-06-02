import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AllBooks from "../Pages/Book/allbooks";

describe("AllBooks", () => {
  it("heading of add book page", async () => {
    render(
      <Router>
        <AllBooks />
      </Router>
    );
    const headings = screen.getAllByRole("heading");

    expect(headings).toHaveLength(3);
  });
});
