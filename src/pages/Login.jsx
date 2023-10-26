import React, { useState } from "react";
import loginSvg from "../assets/images/login.svg";
import "../components/Navbar/Login.css";
import styled from "styled-components";
import { EnvVariables } from "../data";
const Input = styled.input`
  font-family: "Poppins", sans-serif;
`;

const Login = () => {
  const [inpValid, setInpValid] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passIsValid, setPassIsValid] = useState(false);
  const defaultFields = {
    email: "",
    password: "",
  };
  const [inpFields, setInpFields] = useState(defaultFields);

  const onChangeHandler = (e) => {
    setInpValid(false);
    const val = e.target.value;
    const id = e.target.id;
    if (id === "email") {
      setEmailValid(false);
    }
    setInpFields({ ...inpFields, [id]: val });
    if (emailValid) {
      if (id === "password" && val.trim().length > 5) {
        setInpValid(true);
      }
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const emailOnBlurHandler = () => {
    if (validateEmail(inpFields.email)) {
      setEmailValid(true);
    }
  };
  const passwordOnBlur = () => {};
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `https://recordbook-server.onrender.com/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inpFields }),
      }
    );
    setInpFields({ ...inpFields, password: "" });
    const data = await res.json();
    if (res.ok) {
      setInpFields({ ...defaultFields });
      setInpValid(false);
    }
    console.log(data);
  };
  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="/" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <Input
                  onChange={onChangeHandler}
                  type="email"
                  onBlur={emailOnBlurHandler}
                  placeholder="Email"
                  id="email"
                  value={inpFields.email}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <Input
                  onChange={onChangeHandler}
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={inpFields.password}
                  onBlur={passwordOnBlur}
                />
              </div>
              {inpValid && (
                <Input
                  onClick={onSubmitHandler}
                  type="submit"
                  value="Login"
                  className="btn solid"
                />
              )}
              {!inpValid && (
                <button disabled className="btn disabled">
                  Login
                </button>
              )}
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
