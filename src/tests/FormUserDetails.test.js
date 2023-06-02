import React from "react";
import { render, screen } from "@testing-library/react";
import FormUserDetails from "../Pages/Registration/FormUserDetails";

describe("FormUserDetails", () => {
  it("Assert correct number of inputs are present", () => {
    const validProps = {
      handleChange: jest.fn(),
      values: {
        userName: "user name",
        postalAddress: "manchester",
      },
    };
    render(
      <FormUserDetails
        nextStep={2}
        handleChange={validProps.handleChange}
        values={validProps.values}
      />
    );
    const labelPasswords = screen.getAllByLabelText(/Password/);
    const labelConfirmPasswords = screen.getAllByLabelText(/Confirm password/);

    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    expect(labelPasswords).toHaveLength(1);
    expect(labelConfirmPasswords).toHaveLength(1);
  });

  it("Assert a single button is present", () => {
    const validProps = {
      handleChange: jest.fn(),
      values: {
        userName: "user name",
        postalAddress: "manchester",
      },
    };
    render(
      <FormUserDetails
        nextStep={2}
        handleChange={validProps.handleChange}
        values={validProps.values}
      />
    );
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Continue");
  });
});
