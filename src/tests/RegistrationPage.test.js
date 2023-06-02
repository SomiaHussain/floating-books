import React from "react";
import { render, screen } from "@testing-library/react";
import RegistrationPage from "../Pages/Registration/registerPage";

describe("RegistrationPage", () => {
  it("Assert correct number of inputs are present", () => {
    render(<RegistrationPage />);
    const labelPasswords = screen.getAllByLabelText(/Password/);
    const labelConfirmPasswords = screen.getAllByLabelText(/Confirm password/);

    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    expect(labelPasswords).toHaveLength(1);
    expect(labelConfirmPasswords).toHaveLength(1);
  });

  it("Assert a single button is present", () => {
    render(<RegistrationPage />);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Continue");
  });
});
