import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../src/components/App";

describe("App", () => {
  it("Assert all heading elements", () => {
    render(<App />);
    const headings = screen.getAllByText(/Floating books/);

    expect(headings).toHaveLength(2);
  });
});
