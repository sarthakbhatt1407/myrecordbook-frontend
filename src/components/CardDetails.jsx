import React, { useState } from "react";
import styled from "styled-components";
import "./CardDetails.css";
import "animate.css";
import hdfc from "../assets/images/hdfc.svg";
import axis from "../assets/images/axis.png";
import kotak from "../assets/images/kotak.png";
import sbi from "../assets/images/sbi.png";
import bob from "../assets/images/bob.png";
import icici from "../assets/images/icici.png";
import chip from "../assets/images/chip.png";
import nfc from "../assets/images/nfc.svg";
import { EnvVariables } from "../data";
import ConfirmationBox from "./ConfirmationBox";
import DeleteLoader from "./Loader/DeleteLoader/DeleteLoader";
import { Link } from "react-router-dom";

const MainBox = styled.div`
  height: 22rem;
  border-radius: 1rem;
  padding: 1.6rem 2rem;
  box-shadow: 0.4rem 0.4rem 1rem #b5acac;
  position: relative;
  animation: 0.7s zoomIn;
  @media only screen (max-width: 580px) {
    width: 90vw;
  }
  @media only screen and (min-width: 581px) and (max-width: 1000px) {
    width: 47vw;
  }
  @media only screen and (min-width: 1001px) and (max-width: 1500px) {
    width: 31vw;
  }
  @media only screen and (min-width: 1501px) {
    width: 23vw;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const OrderControlDiv = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: end;
  gap: 0.2rem;
  div {
    width: 4px;
    height: 4px;
    background-color: #fdfdfd;
    border-radius: 50%;
  }
`;

const DetailsOuterBox = styled.div`
  height: 90%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.3rem;
`;

const ChipNfcBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  /* padding: 0 1rem; */
  img {
    width: 3rem;
  }
`;
const CardNumberAndCopyBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  i {
    color: #000000;
    background-color: transparent;
  }
`;
const CardNumberBox = styled.div`
  display: flex;
  gap: 2.2rem;
  color: black;
  font-weight: 550;
  letter-spacing: 0.3rem;
`;

const ExpiryCvvArrowBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.3rem;
    letter-spacing: 0.13rem;
    color: #000000;
  }
  i {
    background-color: #ffffff;
    padding: 0.9rem 2rem;
    border-radius: 1rem;
    color: #388def;
    font-weight: bold;
  }
`;
const CopiedBox = styled.div`
  background-color: black;
  color: white;
  width: fit-content;
  padding: 0.2rem 0.5rem;
  font-size: 1.2rem;
  position: absolute;
  top: 42.5%;
  right: 2%;
  border-radius: 1rem;
  animation: 0.4s fadeIn;
`;

const BOBImg = styled.img`
  width: 9rem;
  height: 2.5rem;
  background-color: white;
`;
const HdfcImg = styled.img`
  width: 12rem;
`;
const AxisImg = styled.img`
  width: 12rem;
`;
const SbiImg = styled.img`
  width: 6rem;
`;
const KotakImg = styled.img`
  width: 10rem;
`;
const IciciImg = styled.img`
  width: 8rem;
`;

const MenuOptionBox = styled.div`
  position: absolute;
  top: 3.5%;
  right: 2%;
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  border-radius: 1rem;
  font-size: 1.4rem;
  animation: 0.5s fadeIn;
  i {
    cursor: pointer;
  }
`;

const DeleteAniBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardDetails = (props) => {
  const [showCopied, setShowCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteAni, setDeleteAni] = useState(false);
  const card = props.card;
  const bankName = card.bankName;
  const cardNum = card.cardNum;
  const cardArray = cardNum.match(/\d{4}/g);
  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(cardNum);
      setShowCopied(true);
      console.log("Content copied to clipboard");
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const menuHandler = () => {
    setShowMenu(!showMenu);
  };

  const cardDeleter = async () => {
    setDeleteAni(true);
    const res = await fetch(`${EnvVariables.BASE_URL}/delete-card`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: card.id }),
    });
    setDeleteAni(false);
    if (res.ok) {
      props.refresher();
    }
  };
  const confirmBoxHandler = () => {
    if (showMenu === true) {
      menuHandler();
    }
    setShowConfirm(!showConfirm);
  };

  return (
    <>
      <MainBox className={bankName}>
        {deleteAni && (
          <DeleteAniBox>
            <DeleteLoader />
          </DeleteAniBox>
        )}
        {showConfirm && (
          <ConfirmationBox
            confirmBoxHandler={confirmBoxHandler}
            cardDeleter={cardDeleter}
          />
        )}
        {showCopied && <CopiedBox>Copied</CopiedBox>}
        {showMenu && (
          <MenuOptionBox>
            <span onClick={confirmBoxHandler}>
              <i className="fas fa-trash"></i>
            </span>
            <span onClick={menuHandler}>
              <i className="fas fa-times"></i>
            </span>
          </MenuOptionBox>
        )}
        <HeaderBox>
          {bankName === "Hdfc" && <HdfcImg src={hdfc} alt="" />}
          {bankName === "Axis" && <AxisImg src={axis} alt="" />}
          {bankName === "Sbi" && <SbiImg src={sbi} alt="" />}
          {bankName === "Icici" && <IciciImg src={icici} alt="" />}
          {bankName === "Kotak" && <KotakImg src={kotak} alt="" />}
          {bankName === "Bob" && <BOBImg src={bob} />}
          <OrderControlDiv onClick={menuHandler}>
            <div></div>
            <div></div>
            <div></div>
          </OrderControlDiv>
        </HeaderBox>
        <DetailsOuterBox>
          <ChipNfcBox>
            <img src={chip} alt="" />
            <img src={nfc} alt="" />
          </ChipNfcBox>
          <CardNumberAndCopyBox>
            <CardNumberBox>
              <span>{cardArray[0]}</span>
              <span>{cardArray[1]}</span>
              <span>{cardArray[2]}</span>
              <span>{cardArray[3]}</span>
            </CardNumberBox>
            <i onClick={copyToClipBoard} className="fas fa-copy"></i>
          </CardNumberAndCopyBox>
          <ExpiryCvvArrowBox>
            <span>Expiry : {card.expiry}</span>
            <span>Cvv {card.cvv}</span>
            <Link to={`/user/card/${card.id}`}>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </ExpiryCvvArrowBox>
        </DetailsOuterBox>
      </MainBox>
    </>
  );
};

export default CardDetails;
