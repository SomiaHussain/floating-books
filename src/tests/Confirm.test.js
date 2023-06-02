import React from "react";
import { render, screen } from "@testing-library/react";
import Confirm from "../Pages/Registration/Confirm";

describe("Confirm", () => {
  it("Assert correct number of inputs are present", () => {
    const validProps = {
      values: {
        firstName: "first name",
        lastName: "last name",
        email: "email@gmail.com",
        password: "password123",
        confirmPassword: "password123",
        userName: "user name",
        postalAddress: "manchester",
      },
    };
    render(<Confirm nextStep={2} prevStep={1} values={validProps.values} />);

    expect(screen.getByText("first name")).toBeInTheDocument();
    expect(screen.getByText("last name")).toBeInTheDocument();
    expect(screen.getByText("email@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("manchester")).toBeInTheDocument();
    expect(screen.getByText("user name")).toBeInTheDocument();
  });

  it("Assert two buttons are present", () => {
    const validProps = {
      values: {
        firstName: "first name",
        lastName: "last name",
        email: "email@gmail.com",
        password: "password123",
        confirmPassword: "password123",
        userName: "user name",
        postalAddress: "manchester",
      },
    };
    render(<Confirm nextStep={2} prevStep={1} values={validProps.values} />);
    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("Back");
    expect(buttons[1]).toHaveTextContent("Confirm & Continue");
  });
});
