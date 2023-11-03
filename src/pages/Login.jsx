import React, { useState } from "react";
import loginSvg from "../assets/images/login.svg";
import "../components/Navbar/Login.css";
import styled from "styled-components";
import { EnvVariables } from "../data";
import AccountLoader from "../components/Loader/AccountLoader/AccountLoader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Input = styled.input`
  font-family: "Poppins", sans-serif;
`;
const ErrPara = styled.p`
  font-size: 1.2rem;

  text-transform: capitalize;
  letter-spacing: 0.1rem;
`;

const Login = () => {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const [inpValid, setInpValid] = useState(false);
  const [btnTxt, setBtnTxt] = useState(null);
  const [emailValid, setEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const defaultFields = {
    email: "",
    password: "",
  };
  const validator = () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (validateEmail(email) && password.trim().length > 5) {
      setInpValid(true);
    }
  };

  useEffect(() => {
    const inpChecker = setInterval(() => {
      validator();
    }, 1500);
    return () => {
      clearInterval(inpChecker);
    };
  }, []);

  const [inpFields, setInpFields] = useState(defaultFields);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // setInterval(() => {
  //   validator();
  // }, 1000);
  const onChangeHandler = (e) => {
    setInpValid(false);
    setBtnTxt(null);
    const val = e.target.value;
    const id = e.target.id;
    if (id === "email") {
      const emailField = document.querySelector(".emailField");
      const email = document.querySelector("#email");
      email.placeholder = "Email";
      emailField.style.border = "none";
      setEmailValid(false);
    }
    setInpFields({ ...inpFields, [id]: val });
    if (emailValid) {
      if (id === "password" && val.trim().length > 5) {
        setInpValid(true);
      }
    }
  };

  const emailOnBlurHandler = () => {
    if (validateEmail(inpFields.email)) {
      setEmailValid(true);
      const emailField = document.querySelector(".emailField");
      const email = document.querySelector("#email");
      email.placeholder = "Email";
      emailField.style.border = "none";
    } else {
      const emailField = document.querySelector(".emailField");
      const email = document.querySelector("#email");
      email.placeholder = "Invalid Email";
      emailField.style.border = "1px solid red";
      setBtnTxt("Invalid Email");
    }
  };
  const passwordOnBlur = () => {};
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`${EnvVariables.BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...inpFields,
        email: inpFields.email.toLowerCase(),
      }),
    });
    setInpFields({ ...inpFields, password: "" });
    const data = await res.json();

    if (res.ok) {
      dispatcher({ type: "login", data: { ...data } });
      setInpFields({ ...defaultFields });
      setInpValid(false);
      navigate("/");
    }
    if (!res.ok) {
      setInpValid(false);
      setBtnTxt(data.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="container">
        {isLoading && <AccountLoader />}
        <div className="forms-container">
          <div className="signin-signup">
            <form action="/" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field emailField">
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
              <div className="input-field passwordField">
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
                <button
                  disabled
                  className={btnTxt ? "disabledErr btn" : "btn disabled"}
                >
                  {(btnTxt && <ErrPara>{btnTxt}</ErrPara>) || "Login"}
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
        </div>
      </div>
    </>
  );
};

export default Login;
