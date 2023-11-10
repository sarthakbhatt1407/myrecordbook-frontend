import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import {
  Navigate,
  Route,
  Routes,
  redirect,
  useLocation,
} from "react-router-dom";
import AllOrders from "./pages/AllOrders";
import PendingOrders from "./pages/PendingOrders";
import DeliveredOrders from "./pages/DeliveredOrders";
import AllCards from "./pages/AllCards";
import CardFullView from "./pages/CardFullView";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const pathname = useLocation().pathname;

  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
  }, []);
  const isLoggedIn = useSelector((state) => {
    return state.isLoggedIn;
  });

  return (
    <>
      <Navbar />
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/" element={<AllOrders />} />
            <Route path="/pending-orders" element={<PendingOrders />} />
            <Route path="/delivered-orders" element={<DeliveredOrders />} />
            <Route path="/user/all-cards" element={<AllCards />} />
            <Route path="/user/card/:cardId" element={<CardFullView />} />
          </>
        )}
        {!isLoggedIn && <Route path="*" element={<Login />} />}
        {isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </>
  );
};

export default App;
