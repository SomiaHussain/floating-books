import React from "react";
import { render, screen } from "@testing-library/react";
import FormPersonalDetails from "../Pages/Registration/FormPersonalDetails";

describe("FormPersonalDetails", () => {
  it("Assert correct number of inputs are present", () => {
    const validProps = {
      handleChange: jest.fn(),
      values: {
        userName: "user name",
        postalAddress: "manchester",
      },
    };
    render(
      <FormPersonalDetails
        nextStep={2}
        prevStep={1}
        handleChange={validProps.handleChange}
        values={validProps.values}
      />
    );

    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });

  it("Assert two buttons are present", () => {
    const validProps = {
      handleChange: jest.fn(),
      values: {
        userName: "user name",
        postalAddress: "manchester",
      },
    };
    render(
      <FormPersonalDetails
        nextStep={2}
        prevStep={1}
        handleChange={validProps.handleChange}
        values={validProps.values}
      />
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("Back");
    expect(buttons[1]).toHaveTextContent("Continue");
  });
});
