import React from "react";
import loginSvg from "../assets/images/login.svg";
import "../components/Navbar/Login.css";
import styled from "styled-components";
const Input = styled.input`
  font-family: "Poppins", sans-serif;
`;

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="/" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <Input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <Input type="password" placeholder="Password" />
              </div>
              <Input type="submit" value="Login" className="btn solid" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>My RecordBook</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button className="btn transparent signupBtn" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src={loginSvg} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button className="btn transparent " id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src={loginSvg} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
