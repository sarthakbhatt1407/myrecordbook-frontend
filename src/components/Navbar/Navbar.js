import React, { useState } from "react";
import "../Navbar/Navbar.css";
import logo from "../../assets/images/RecordBook.png";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Logo = styled.img`
  width: 20rem;
`;
const LogOutBtn = styled.button`
  background-color: #388def;
  padding: 1rem 2.5rem;
  border-radius: 2rem;
  color: white;
  outline: none;
  border: none;
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
  font-weight: 600;
`;

function Navbar() {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className={!isLoggedIn ? "loginNav" : "nav"}>
      <Link className="nav__brand" to="/">
        <Logo src={logo} alt="" />
      </Link>
      {isLoggedIn && (
        <ul className={location === "/login" ? "disableBtn" : `${active}`}>
          <li className="nav__item">
            <Link
              className={location === "/" ? "activeLink" : "nav_link"}
              onClick={navToggle}
              to="/"
            >
              All Orders
            </Link>
          </li>
          <li className="nav__item">
            <Link
              className={
                location === "/pending-orders" ? "activeLink" : "nav_link"
              }
              onClick={navToggle}
              to="/pending-orders"
            >
              Pending
            </Link>
          </li>
          <li className="nav__item">
            <Link
              className={
                location === "/delivered-orders" ? "activeLink" : "nav_link"
              }
              onClick={navToggle}
              to="/delivered-orders"
            >
              Delivered
            </Link>
          </li>
          <li className="nav__item">
            <Link
              className={
                location === "/user/all-cards" ? "activeLink" : "nav_link"
              }
              onClick={navToggle}
              to="/user/all-cards"
            >
              Cards
            </Link>
          </li>
          <li className="nav__item">
            <Link
              className={
                location === "/user/all-cards" ? "activeLink" : "nav_link"
              }
              onClick={navToggle}
              to="/"
            >
              <LogOutBtn
                onClick={() => {
                  dispatch({ type: "logout" });
                }}
              >
                Log Out
              </LogOutBtn>
            </Link>
          </li>
        </ul>
      )}
      {isLoggedIn && (
        <div
          className={location === "/login" ? "disableBtn" : `${icon}`}
          onClick={navToggle}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
