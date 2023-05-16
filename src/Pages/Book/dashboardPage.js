import React, { useState, useEffect } from "react";
import { GetUserDetails } from "../../services/accountService";
import { GetOrderBooks, UpdateOrder } from "../../services/bookService";
import OrderBookList from "../../components/orderBookList";
import Alert from "../../components/Alert";

const DashboardPage = () => {
  const [userDetails, setUserDetails] = useState();
  const [orderBooks, setOrderBooks] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: false });
  let orderingBook = [];
  let postingBook = [];
  let historyBook = [];

  useEffect(() => {
    GetUserDetails(localStorage.getItem("userDetails"), setUserDetails);
  }, []);

  useEffect(() => {
    GetOrderBooks(setOrderBooks, setAlert);
  }, [alert]);

  const updateStatus = async (orderId, newStatus) => {
    UpdateOrder(orderId, newStatus, setAlert);
  };

  console.log("===========userDetails=========", userDetails);
  console.log("============orderBooks=========", orderBooks);

  if (userDetails && orderBooks.length > 0) {
    const id = userDetails[0].id;

    orderingBook = orderBooks.filter((order) => {
      return order.userId === id &&
        order.status !== "received" &&
        order.status !== "reject"
        ? true
        : false;
    });
    postingBook = orderBooks.filter((order) => {
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
            key={order.book.id}
            book={order.book}
            id={order.id}
            status={order.status}
            updateStatus={updateStatus}
            role={"requestor"}
          />
        ))}
      </div>

      <div className="postingBook">
        <h3>Book owner pending action:</h3>
        {postingBook.map((order) => (
          <OrderBookList
            key={order.book.id}
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
            key={order.book.id}
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
