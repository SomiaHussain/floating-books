import React from "react";
import { render, screen } from "@testing-library/react";
import AboutUsPage from "../Pages/AboutUs/aboutUsPage";

describe("AboutUsPage", () => {
  it("Assert all heading elements", () => {
    render(<AboutUsPage />);
    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent(/About Us Page/i);
  });
});
