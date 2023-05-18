import React, { useState, useEffect } from "react";
import { GetUserDetails } from "../../services/accountService";
import {
  GetOrderBooks,
  UpdateOrder,
  UpdateBook,
} from "../../services/bookService";
import OrderBookList from "../../components/orderBookList";
import Alert from "../../components/Alert";

const DashboardPage = () => {
  const [userDetails, setUserDetails] = useState();
  const [orderBooks, setOrderBooks] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: false });
  let orderingBook = [];
  let followupBook = [];
  let historyBook = [];

  useEffect(() => {
    GetUserDetails(localStorage.getItem("userDetails"), setUserDetails);
  }, []);

  useEffect(() => {
    GetOrderBooks(setOrderBooks, setAlert);
  }, [alert]);

  const updateStatus = async (orderId, newStatus, bookId = 0) => {
    UpdateOrder(orderId, newStatus, setAlert);
    if (newStatus === "received") {
      UpdateBook(bookId, userDetails.id, setAlert);
    }
  };

  if (userDetails && orderBooks.length > 0) {
    const id = userDetails.id;

    orderingBook = orderBooks.filter((order) => {
      return order.userId === id &&
        order.status !== "received" &&
        order.status !== "reject"
        ? true
        : false;
    });
    followupBook = orderBooks.filter((order) => {
      return order.book.owner.id === id &&
        order.status !== "received" &&
        order.status !== "reject"
        ? true
        : false;
    });
    historyBook = orderBooks.filter((order) => {
      return order.userId === id &&
        (order.status === "received" || order.status === "reject")
        ? true
        : false;
    });
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
      <div className="orderingBook">
        <h3>Ordering Book:</h3>
        {orderingBook.map((order) => (
          <OrderBookList
            key={order.id}
            book={order.book}
            id={order.id}
            status={order.status}
            updateStatus={updateStatus}
            role={"requestor"}
          />
        ))}
      </div>

      <div className="followupBook">
        <h3>Follow up action:</h3>
        {followupBook.map((order) => (
          <OrderBookList
            key={order.id}
            book={order.book}
            id={order.id}
            status={order.status}
            updateStatus={updateStatus}
            role={"owner"}
          />
        ))}
      </div>

      <div className="historyBook">
        <h3>Order History:</h3>
        {historyBook.map((order) => (
          <OrderBookList
            key={order.id}
            book={order.book}
            id={order.id}
            status={order.status}
            updateStatus={updateStatus}
            role={""}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
