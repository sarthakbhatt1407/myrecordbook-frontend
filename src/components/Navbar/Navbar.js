import React, { useState } from "react";
import "../Navbar/Navbar.css";
import logo from "../../assets/images/RecordBook.png";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Logo = styled.img`
  width: 20rem;
`;

function Navbar() {
  const location = useLocation().pathname;

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
    <nav className={location === "/login" ? "loginNav" : "nav"}>
      <Link className="nav__brand" to="/login">
        <Logo src={logo} alt="" />
      </Link>
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
      </ul>
      <div
        className={location === "/login" ? "disableBtn" : `${icon}`}
        onClick={navToggle}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
