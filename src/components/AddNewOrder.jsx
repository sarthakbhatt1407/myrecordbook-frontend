import React, { useState } from "react";
import styled from "styled-components";
import "animate.css";
import { useSelector } from "react-redux";
import { EnvVariables } from "../data";
import WatchLoader from "./Loader/WatchLoader/WatchLoader";

const OuterBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000a7;
`;
const MainBox = styled.div`
  animation: 0.5s zoomIn;
  padding: 2rem;
  z-index: 10;
  width: 84%;
  height: 55%;
  position: relative;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  h3 {
    text-align: center;
    margin: 1rem 0;
    text-transform: capitalize;
  }
`;
const LabelInpBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const Label = styled.label`
  font-size: 1.35rem;
  letter-spacing: 0.06rem;
  color: #9e9e9e;
`;
const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  outline: none;
  border: 1px solid #d7d7d7;

  &::placeholder {
    color: #d4cdcd;
    letter-spacing: 0.09rem;
    text-transform: capitalize;
  }
  &:focus {
    border: 1px solid #388def;
    box-shadow: 0.1rem 0.1rem 0.5rem #388def;
  }
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-year-field,
  &::-webkit-datetime-edit-fields-wrapper {
    color: #d4cdcd;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  text-transform: capitalize;
  span {
    padding: 0.8rem 1rem;
    border-radius: 1rem;
    color: #9b9a9a;
    border: 1px solid #d7d7d7;
    font-size: 1.45rem;
  }
  button {
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    font-size: 1.45rem;
    letter-spacing: 0.07rem;
    color: white;
    background-color: #388def;
    border: none;
  }
`;

const WatchLoaderDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #00000079;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddNewOrder = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const userId = useSelector((state) => {
    return state.userId;
  });
  const addNewOrderShowHandler = () => {
    props.addNewOrderShowHandler();
  };

  const defaultFields = {
    name: "",
    orderNum: "",
    cardUsed: "",
    merchant: "",
    user: userId,
    orderAmount: 0,
  };
  const [inpIsValid, setInpIsValid] = useState(false);
  const [inpFields, setInpFields] = useState(defaultFields);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const allFieldChecker = () => {
    const name = document.querySelector("#name").value.trim();
    const orderNum = document.querySelector("#orderNum").value.trim();
    const cardUsed = document.querySelector("#cardUsed").value.trim();
    const merchant = document.querySelector("#merchant").value.trim();
    const orderAmount = document.querySelector("#orderAmount").value.trim();
    if (
      name.length > 2 &&
      orderNum.length > 2 &&
      cardUsed.length > 4 &&
      merchant.length > 1 &&
      orderAmount.length > 0 &&
      orderAmount != 0
    ) {
      setInpIsValid(true);
    } else {
      setInpIsValid(false);
    }
  };
  const onChangeHanlder = (e) => {
    const val = e.target.value.trim();
    const id = e.target.id;
    allFieldChecker();
    e.target.style.border = " 1px solid #d7d7d7";
    if (id === "name") {
      e.target.placeholder = "title";
    }
    if (id === "orderNum") {
      e.target.placeholder = "enter order id";
    }
    if (id === "cardUsed") {
      e.target.placeholder = "Last five digits";
    }
    if (id === "merchant") {
      e.target.placeholder = "Ex. Amazon, Flipkart";
    }
    if (id === "orderAmount") {
      e.target.placeholder = "in rupees";
    }
    if (val.trim().length > 5 && id === "cardUsed") {
      const cardUsed = document.querySelector("#cardUsed");
      cardUsed.value = inpFields.cardUsed;
      return;
    }

    if (id === "cardUsed" && val.length > 5) {
      return false;
    }
    setInpFields({ ...inpFields, [id]: val });
  };

  const onBlurHandler = (e) => {
    const val = e.target.value.trim();
    const id = e.target.id;
    allFieldChecker();
    if (val.trim().length == 0 && id === "orderAmount") {
      const orderAmount = document.querySelector("#orderAmount");
      orderAmount.style.border = "1px solid red";
      orderAmount.placeholder = "enter valid amount";
      return;
    }
    if (val.trim().length < 3 && id === "name") {
      e.target.style.border = "1px solid red";
      e.target.placeholder = "Enter valid name";
      return;
    }
    if (val.trim().length < 3 && id === "orderNum") {
      e.target.style.border = "1px solid red";
      e.target.placeholder = "Enter valid id";
      return;
    }
    if (val.trim().length < 5 && id === "cardUsed") {
      e.target.style.border = "1px solid red";
      e.target.placeholder = "Enter valid card number";
      return;
    }
    if (val.trim().length < 2 && id === "merchant") {
      e.target.style.border = "1px solid red";
      e.target.placeholder = "Enter valid entry";
      return;
    }
  };
  const submitHanlder = async () => {
    setShowLoader(true);
    const currentTime = new Date();

    const currentOffset = currentTime.getTimezoneOffset();

    const ISTOffset = 330; // IST offset UTC +5:30

    const date = new Date(
      currentTime.getTime() + (ISTOffset + currentOffset) * 60000
    );

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }

    const fullDate = day + " " + months[month - 1] + " " + year;

    const res = await fetch(`${EnvVariables.BASE_URL}/add-new-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...inpFields, orderDate: fullDate }),
    });
    setShowLoader(false);
    const data = await res.json();
    if (!res.ok) {
      if (data.message === "Order already exists !") {
        const orderNum = document.querySelector("#orderNum");
        orderNum.placeholder = data.message;
        orderNum.style.border = "1px solid red";
        orderNum.value = "";
        setInpIsValid(false);
      }
    }
    if (res.ok) {
      addNewOrderShowHandler();
      setInpFields(defaultFields);
      window.location.reload(false);
    }
  };

  return (
    <OuterBox>
      <MainBox>
        {showLoader && (
          <WatchLoaderDiv>
            <WatchLoader />
          </WatchLoaderDiv>
        )}
        <h3>Add new order</h3>

        <LabelInpBox>
          <Label htmlFor="name">Order Name</Label>
          <Input
            onChange={onChangeHanlder}
            type="text"
            name="name"
            onBlur={onBlurHandler}
            id="name"
            placeholder="title"
          />
        </LabelInpBox>

        <LabelInpBox>
          <Label htmlFor="orderId">Order Id</Label>
          <Input
            onChange={onChangeHanlder}
            type="text"
            name="orderId"
            onBlur={onBlurHandler}
            id="orderNum"
            placeholder="enter order id"
          />
        </LabelInpBox>

        <LabelInpBox>
          <Label htmlFor="cardused">Card Used</Label>
          <Input
            onChange={onChangeHanlder}
            type="number"
            name="cardused"
            id="cardUsed"
            onBlur={onBlurHandler}
            placeholder="Last five digits"
          />
        </LabelInpBox>

        <LabelInpBox>
          <Label htmlFor="merchant">Merchant</Label>
          <Input
            onChange={onChangeHanlder}
            type="text"
            name="merchant"
            id="merchant"
            onBlur={onBlurHandler}
            placeholder="Ex. Amazon, Flipkart"
          />
        </LabelInpBox>
        <LabelInpBox>
          <Label htmlFor="amount">Amount</Label>
          <Input
            onChange={onChangeHanlder}
            type="number"
            name="amount"
            id="orderAmount"
            placeholder="in rupees"
            onBlur={onBlurHandler}
          />
        </LabelInpBox>
        <BtnDiv>
          <span onClick={addNewOrderShowHandler}>cancel</span>
          {!inpIsValid && (
            <button style={{ backgroundColor: "#e5e3e3" }} disabled>
              Submit
            </button>
          )}
          {inpIsValid && <button onClick={submitHanlder}>Submit</button>}
        </BtnDiv>
      </MainBox>
    </OuterBox>
  );
};

export default AddNewOrder;
