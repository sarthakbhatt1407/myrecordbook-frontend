import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import AllOrders from "./pages/AllOrders";
import PendingOrders from "./pages/PendingOrders";
import DeliveredOrders from "./pages/DeliveredOrders";
import AllCards from "./pages/AllCards";
import CardFullView from "./pages/CardFullView";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllOrders />} />
        <Route path="/pending-orders" element={<PendingOrders />} />
        <Route path="/delivered-orders" element={<DeliveredOrders />} />
        <Route path="/user/all-cards" element={<AllCards />} />
        <Route path="/user/card/:cardId" element={<CardFullView />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
