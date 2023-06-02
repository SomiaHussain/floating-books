import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardPage from "../Pages/Book/dashboardPage";

describe("DashboardPage", () => {
  it("Assert all heading elements", () => {
    render(<DashboardPage />);
    const headings = screen.getAllByRole("heading");

    expect(headings).toHaveLength(4);
    expect(headings[0]).toHaveTextContent(/Dashboard/i);
    expect(headings[1]).toHaveTextContent(/Ordering Book:/i);
    expect(headings[2]).toHaveTextContent(/Follow up action:/i);
    expect(headings[3]).toHaveTextContent(/Order History:/i);
  });
});
