import React from "react";
import { render, screen } from "@testing-library/react";
import ContactUsPage from "../Pages/ContactUs/contactUsPage";

describe("ContactUsPage", () => {
  it("Assert all heading elements", () => {
    render(<ContactUsPage />);
    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent(/Contact Us/i);
  });
});
