import React from "react";
import { render, screen } from "@testing-library/react";
import OrderBookList from "../components/orderBookList";

describe("OrderBookList", () => {
  it("Assert all heading elements for requestor", () => {
    const validProps = {
      key: 1,
      book: {
        id: 1,
        title: "book title",
        author: "book author",
        ISBN: "book ISBN",
        image: "book image",
      },
      order: { id: 1, status: "request" },
      status: "request",
      updateStatus: jest.fn(),
      role: "requestor",
    };
    render(
      <OrderBookList
        key={validProps.order.id}
        book={validProps.book}
        order={validProps.order}
        status={validProps.order.status}
        updateStatus={validProps.updateStatus}
        role={validProps.role}
      />
    );

    expect(screen.getByText("book title")).toBeInTheDocument();
    expect(screen.getByText("Author: book author")).toBeInTheDocument();
    expect(screen.getByText("Order status: request")).toBeInTheDocument();
  });

  it("Assert all heading elements for owner", () => {
    const validProps = {
      key: 1,
      book: {
        id: 1,
        title: "book title",
        author: "book author",
        ISBN: "book ISBN",
        image: "book image",
      },
      order: { id: 1, status: "request" },
      status: "request",
      updateStatus: jest.fn(),
      role: "owner",
    };
    render(
      <OrderBookList
        key={validProps.order.id}
        book={validProps.book}
        order={validProps.order}
        status={validProps.order.status}
        updateStatus={validProps.updateStatus}
        role={validProps.role}
      />
    );

    expect(screen.getByText("book title")).toBeInTheDocument();
    expect(screen.getByText("Author: book author")).toBeInTheDocument();
    expect(screen.getByText("Order status: request")).toBeInTheDocument();
  });

  it("Assert two buttons are present", () => {
    const validProps = {
      key: 1,
      book: {
        id: 1,
        title: "book title",
        author: "book author",
        ISBN: "book ISBN",
        image: "book image",
      },
      order: { id: 1, status: "request" },
      status: "request",
      updateStatus: jest.fn(),
      role: "owner",
    };
    render(
      <OrderBookList
        key={validProps.order.id}
        book={validProps.book}
        order={validProps.order}
        status={validProps.order.status}
        updateStatus={validProps.updateStatus}
        role={validProps.role}
      />
    );
    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("Reject");
    expect(buttons[1]).toHaveTextContent("Accept");
  });

  it("Assert all heading elements for requestor history", () => {
    const validProps = {
      key: 1,
      book: {
        id: 1,
        title: "book title",
        author: "book author",
        ISBN: "book ISBN",
        image: "book image",
      },
      order: { id: 1, status: "received" },
      status: "received",
      updateStatus: jest.fn(),
      role: "",
    };
    render(
      <OrderBookList
        key={validProps.order.id}
        book={validProps.book}
        order={validProps.order}
        status={validProps.order.status}
        updateStatus={validProps.updateStatus}
        role={validProps.role}
      />
    );

    expect(screen.getByText("book title")).toBeInTheDocument();
    expect(screen.getByText("Author: book author")).toBeInTheDocument();
    expect(screen.getByText("Order status: received")).toBeInTheDocument();
  });
});
