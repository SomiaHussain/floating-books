import React from "react";
import { render, screen } from "@testing-library/react";
import BookList from "../components/booksList";

describe("BookList", () => {
  it("Assert all heading elements for Favourites", () => {
    const validProps = {
      key: 1,
      book: {
        id: 1,
        title: "book title",
        author: "book author",
        ISBN: "book ISBN",
        image: "book image",
        releaseDate: "2010-01-01",
        donatorcomment: "this is donator comment",
        genre: { genre: "fiction" },
        owner: { userName: "user name" },
        favouritesId: 2,
      },
      handleFavourite: jest.fn(),
      isFavourite: jest.fn(() => true),
      handleOrder: jest.fn(),
    };
    Storage.prototype.getItem = jest.fn(() => true);
    render(
      <BookList
        key={validProps.key}
        book={validProps.book}
        handleFavourite={validProps.handleFavourite}
        isFavourite={validProps.isFavourite}
        handleOrder={validProps.handleOrder}
      />
    );

    expect(screen.getByText("book title")).toBeInTheDocument();
    expect(screen.getByText("book author")).toBeInTheDocument();
    expect(screen.getByText("2010-01-01")).toBeInTheDocument();
    expect(screen.getByText("this is donator comment")).toBeInTheDocument();
    expect(screen.getByText("fiction")).toBeInTheDocument();
    expect(screen.getByText("user name")).toBeInTheDocument();
  });

  it("Assert two buttons for Favourites", () => {
    const validProps = {
      key: 1,
      book: {
        id: 1,
        title: "book title",
        author: "book author",
        ISBN: "book ISBN",
        image: "book image",
        releaseDate: "2010-01-01",
        donatorcomment: "this is donator comment",
        genre: { genre: "fiction" },
        owner: { userName: "user name" },
        favouritesId: 2,
      },
      handleFavourite: jest.fn(),
      isFavourite: jest.fn(() => true),
      handleOrder: jest.fn(),
    };
    Storage.prototype.getItem = jest.fn(() => true);
    render(
      <BookList
        key={validProps.key}
        book={validProps.book}
        handleFavourite={validProps.handleFavourite}
        isFavourite={validProps.isFavourite}
        handleOrder={validProps.handleOrder}
      />
    );
    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("Order");
  });

  it("Assert all heading elements for Recently added books", () => {
    const validProps = {
      key: 1,
      book: {
        id: 1,
        title: "book title",
        author: "book author",
        ISBN: "book ISBN",
        image: "book image",
        releaseDate: "2010-01-01",
        donatorcomment: "this is donator comment",
        genre: { genre: "fiction" },
        owner: { userName: "user name" },
        favouritesId: 2,
      },
      handleFavourite: jest.fn(),
      isFavourite: jest.fn(() => false),
      handleOrder: jest.fn(),
    };
    Storage.prototype.getItem = jest.fn(() => true);
    render(
      <BookList
        key={validProps.key}
        book={validProps.book}
        handleFavourite={validProps.handleFavourite}
        isFavourite={validProps.isFavourite}
        handleOrder={validProps.handleOrder}
      />
    );

    expect(screen.getByText("book title")).toBeInTheDocument();
    expect(screen.getByText("book author")).toBeInTheDocument();
    expect(screen.getByText("2010-01-01")).toBeInTheDocument();
    expect(screen.getByText("this is donator comment")).toBeInTheDocument();
    expect(screen.getByText("fiction")).toBeInTheDocument();
    expect(screen.getByText("user name")).toBeInTheDocument();
  });

  it("Assert a single button for Recently added books", () => {
    const validProps = {
      key: 1,
      book: {
        id: 1,
        title: "book title",
        author: "book author",
        ISBN: "book ISBN",
        image: "book image",
        releaseDate: "2010-01-01",
        donatorcomment: "this is donator comment",
        genre: { genre: "fiction" },
        owner: { userName: "user name" },
        favouritesId: 2,
      },
      handleFavourite: jest.fn(),
      isFavourite: jest.fn(() => false),
      handleOrder: jest.fn(),
    };
    Storage.prototype.getItem = jest.fn(() => true);
    render(
      <BookList
        key={validProps.key}
        book={validProps.book}
        handleFavourite={validProps.handleFavourite}
        isFavourite={validProps.isFavourite}
        handleOrder={validProps.handleOrder}
      />
    );
    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(1);
  });
});
