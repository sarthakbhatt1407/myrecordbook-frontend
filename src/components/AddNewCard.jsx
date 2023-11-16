import React from "react";
import styled from "styled-components";
import CardUi from "./AddNewCardUi/CardUi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { EnvVariables } from "../data";
import WatchLoader from "./Loader/WatchLoader/WatchLoader";

const OuterBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
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
  width: 70vw;
  height: 75%;
  position: relative;
  background-color: #181717;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  /* justify-content: space-between; */
  gap: 1rem;
  @media only screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 90vw;
  }
  h3 {
    text-align: center;
    margin: 1rem 0;
    text-transform: capitalize;
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

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 2rem 0;
  color: white;
  /* background-color: red; */
  height: 80%;
  text-transform: uppercase;
  @media only screen and (max-width: 1200px) {
    width: 100%;
    height: 50%;
  }
`;
const FOrmInnerBox = styled.div`
  padding: 1rem 0;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  justify-content: center;
  /* background-color: white; */
  @media only screen and (max-width: 1200px) {
    height: 95%;
  }
  @media only screen and (min-width: 1201px) and (max-width: 2200px) {
    height: 60%;
  }
`;

const CardNumBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  input {
    width: 70%;
    @media only screen and (max-width: 2600px) {
      width: 95%;
    }
  }
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
    border: 1px solid #388def82;
    box-shadow: 0.1rem 0.1rem 1rem #388def;
  }
`;
const Label = styled.label`
  font-size: 1.35rem;
  letter-spacing: 0.2rem;
  font-weight: lighter;
  color: white;
`;
const LabelInpOuterBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  input {
    width: 90%;
  }
  margin: 0.4rem 0;
`;
const LabelInpBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 50%;
`;
const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  outline: none;
  border: 1px solid #d7d7d7;
  width: 90%;
  color: #d1d0d0;
  overflow: auto;
  background-color: white;
  border-radius: 1rem;
  &:focus {
    outline: none;
    border: none;
  }
`;
const Option = styled.option`
  color: #8c8b8b;
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  gap: 5rem;
  text-transform: capitalize;
  color: white;
  margin: 0 auto;
  span {
    padding: 0.8rem 1rem;
    border-radius: 1rem;
    color: #9b9a9a;
    border: 1px solid #d7d7d7;
    font-size: 1.45rem;
  }
  button {
    padding: 1rem 2rem;
    border-radius: 1rem;
    font-size: 1.45rem;
    letter-spacing: 0.07rem;
    color: white;
    background-color: #388def;
    border: none;
  }
`;

const AddNewCard = (props) => {
  const userId = useSelector((state) => state.userId);
  const [isLoading, setIsLoading] = useState(false);

  const defaultField = {
    cardNum: "",
    expiry: "",
    bankName: "Select Bank",
    cvv: "",
    creditLimit: "",
    user: userId,
  };

  const [inpField, setInpField] = useState(defaultField);
  const [allInpValid, setAllInpValid] = useState(false);
  const [err, setErr] = useState(true);
  const validHandler = () => {
    let cardNum = document.querySelector("#cardNum").value;
    let expiry = document.querySelector("#expiry").value;
    let cvv = document.querySelector("#cvv").value;
    let creditLimit = document.querySelector("#creditLimit").value;

    if (
      cardNum.trim().length > 15 &&
      expiry.trim().length > 4 &&
      cvv.length > 2 &&
      creditLimit > 0
    ) {
      setAllInpValid(true);
    } else {
      setAllInpValid(false);
    }
  };

  const expiryHandler = (e) => {
    const val = e.target.value;
    validHandler();
    let ele = document.getElementById("expiry");
    let elem = document.querySelector("#expiry");
    ele.style.border = "1px solid #d7d7d7";
    ele.style.boxShadow = " 0.9rem 0.9rem 1rem #388def12";
    if (val.length === 0) {
      setInpField({ ...inpField, expiry: "" });
    }
    if (val.length > 5) {
      let ele = document.getElementById("expiry");
      ele.value = inpField.expiry;
    }

    ele = ele.value.split("/").join(""); // Remove slash (/) if mistakenly entered.
    if (ele.length <= 4 && ele.length > 0) {
      let finalVal = ele.match(/.{1,2}/g).join("/");

      document.getElementById("expiry").value = finalVal;
      setInpField({ ...inpField, expiry: finalVal });
    }
  };
  const onChangeHandler = (e) => {
    validHandler();
    const val = e.target.value;
    const id = e.target.id;
    const ele = document.querySelector(`#${id}`);
    ele.style.border = "none";
    ele.style.boxShadow = " 0.1rem 0.1rem 1rem #388def12";
    if (val.length > 16 && id === "cardNum") {
      let ele = document.getElementById("cardNum");
      ele.value = inpField.cardNum;
      return;
    }
    if (val.length > 3 && id === "cvv") {
      let ele = document.getElementById("cvv");
      ele.value = inpField.cvv;
      return;
    }
    setInpField({ ...inpField, [id]: val });
  };
  const getSelectValueHandler = () => {
    validHandler();
    const e = document.getElementById("cardBank");
    const el = document.querySelector("#cardBank");

    const text = e.options[e.selectedIndex].text;
    setInpField({ ...inpField, bankName: text });

    if (text === "Select Bank") {
      setErr(true);
      el.style.border = "1px solid red";
      el.style.boxShadow = "0.1rem 0.1rem 1rem red";
    } else {
      setErr(false);
      el.style.border = "none";
      el.style.boxShadow = " 0.1rem 0.1rem 1rem #388def12";
    }
  };
  const onBlurHandler = (e) => {
    const id = e.target.id;
    const ele = document.querySelector(`#${id}`);
    const val = e.target.value;
    if (id === "cardNum" && val.length < 16) {
      ele.style.border = "1px solid red";
      ele.placeholder = "Enter Valid Input";
      ele.style.boxShadow = "0.1rem 0.1rem 1rem red";
    }
    if (id === "expiry" && val.length < 5) {
      ele.style.border = "1px solid red";
      ele.placeholder = "Enter Valid Input";
      ele.style.boxShadow = "0.1rem 0.1rem 1rem red";
    }
    if (id === "cvv" && val.length < 3) {
      ele.style.border = "1px solid red";
      ele.placeholder = "Enter Valid Input";
      ele.style.boxShadow = "0.1rem 0.1rem 1rem red";
    }
    if (id === "creditLimit" && val < 1) {
      ele.style.border = "1px solid red";
      ele.placeholder = "Enter Valid Input";
      ele.style.boxShadow = "0.1rem 0.1rem 1rem red";
    }
  };
  const selectOnBlur = () => {
    const e = document.getElementById("cardBank");

    const text = e.options[e.selectedIndex].text;
    const el = document.querySelector("#cardBank");
    if (text === "Select Bank") {
      el.style.border = "1px solid red";
      el.style.boxShadow = "0.1rem 0.1rem 1rem red";
    }
  };
  const submitHandler = async () => {
    setIsLoading(true);
    const res = await fetch(`${EnvVariables.BASE_URL}/add-new-card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...inpField,
        creditLimit: Number(inpField.creditLimit),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      window.location.reload(false);
      setInpField(defaultField);
    }
    console.log(data);
    setIsLoading(false);
    setInpField(defaultField);
    if (data.msg === "Card already exists!") {
      setAllInpValid(false);
      const cardNum = document.querySelector("#cardNum");
      cardNum.value = "";
      cardNum.style.border = "1px solid red";
      cardNum.placeholder = "Card already exists";
      cardNum.style.boxShadow = "0.1rem 0.1rem 1rem red";
    }
  };

  return (
    <OuterBox>
      <MainBox>
        {isLoading && (
          <WatchLoaderDiv>
            <WatchLoader />
          </WatchLoaderDiv>
        )}
        <FormBox>
          <FOrmInnerBox>
            <CardNumBox>
              <Label>card Number</Label>
              <Input
                type="number"
                id="cardNum"
                onChange={onChangeHandler}
                placeholder="Enter Card Number"
                onBlur={onBlurHandler}
              />
            </CardNumBox>
            <LabelInpOuterBox>
              <LabelInpBox>
                <Label>Expiry</Label>
                <Input
                  onChange={expiryHandler}
                  type="text"
                  placeholder="MM/YY"
                  id="expiry"
                  onBlur={onBlurHandler}
                />
              </LabelInpBox>
              <LabelInpBox>
                <Label>Cvv</Label>
                <Input
                  type="number"
                  id="cvv"
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                  placeholder="CVV"
                />
              </LabelInpBox>
            </LabelInpOuterBox>
            <LabelInpOuterBox>
              <LabelInpBox>
                <Label>Bank Name</Label>
                <Select
                  name="cardBank"
                  id="cardBank"
                  onChange={getSelectValueHandler}
                  onBlur={selectOnBlur}
                >
                  <Option value="default" defaultValue>
                    Select Bank
                  </Option>
                  <Option value="Hdfc">Hdfc</Option>
                  <Option value="Axis">Axis</Option>
                  <Option value="Sbi">Sbi</Option>
                  <Option value="Icici">Icici</Option>
                  <Option value="Kotak">Kotak</Option>
                  <Option value="Bob">Bob</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </LabelInpBox>
              <LabelInpBox>
                <Label>Credit Limit</Label>
                <Input
                  type="number"
                  id="creditLimit"
                  onChange={onChangeHandler}
                  placeholder="Card Limit"
                  onBlur={onBlurHandler}
                />
              </LabelInpBox>
            </LabelInpOuterBox>
          </FOrmInnerBox>
          <BtnDiv>
            <span
              onClick={() => {
                props.addNewOrderShowHandler();
              }}
            >
              cancel
            </span>

            {/* {!allInpValid && !err && inpField.bankName === "Select Bank" && (
              <button style={{ backgroundColor: "#e5e3e3" }} disabled>
                Submit
              </button>
            )} */}

            {allInpValid && inpField.bankName != "Select Bank" && (
              <button onClick={submitHandler}>Submit</button>
            )}
          </BtnDiv>
        </FormBox>
        <CardUi card={inpField} />
      </MainBox>
    </OuterBox>
  );
};

export default AddNewCard;
