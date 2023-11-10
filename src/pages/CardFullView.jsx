import React, { useEffect, useState } from "react";
import { EnvVariables } from "../data";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CardDetails from "../components/CardDetails";
import CanvasJSReact from "@canvasjs/react-charts";
import CreditCardLoader from "../components/Loader/CreditCardLoader/CreditCardLoader";
import "animate.css";
import OrderTable from "../components/OrderTable";

const MainBox = styled.div`
  height: 93vh;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1rem;
  animation: 1s fadeIn;
  @media only screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

// Left Sec
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 4rem 2rem;
  align-items: center;
  @media only screen and (max-width: 581px) {
    padding: 2rem 1rem;
  }
`;

const CardBox = styled.div``;
const CardDetailsListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
  ul {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 80%;
    align-items: center;
    @media only screen and (max-width: 581px) {
      width: 100%;
    }
    padding: 1rem 2rem;
    li {
      text-align: center;

      &:nth-child(2n + 1) {
        background-color: #faf8f8;
        border-radius: 1rem;
      }
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      span {
        font-size: 1.5rem;
        letter-spacing: 0.09rem;
        &:first-child {
          font-weight: bold;
        }
      }
    }
  }
`;

// Right Sec

const RightSection = styled.div``;
const ChartBox = styled.div`
  position: relative;
`;

const LinkHider = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: white;
  z-index: 3;
  width: 10rem;
  height: 1.2rem;
`;
const CardFullView = () => {
  const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const dispatch = useDispatch();
  const id = useParams().cardId;
  const [card, setCard] = useState(null);
  const [totalLimit, setTotalLimit] = useState(null);
  const [availLimit, SetAvailLimit] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
    const fetcher = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/card/${id}`);
      const data = await res.json();
      // console.log(data.card);
      setCard(data.card);
      setTotalLimit(data.card.totalCreditLimit);
      SetAvailLimit(data.card.creditLimit);
    };
    fetcher();
    const cardInt = setInterval(async () => {
      fetcher();
    }, 1000);
    return () => {
      clearInterval(cardInt);
    };
  }, []);
  const options = {
    animationEnabled: true,
    animationDuration: 2000,
    width:
      window.innerWidth > 1600
        ? 1000
        : window.innerWidth > 1200 && window.innerWidth < 1600
        ? 700
        : window.innerWidth,
    height: window.innerWidth < 1600 ? 300 : 400,
    theme: "light2",
    title: {
      text: "Card Limit",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: ₹ {y}",
        startAngle: -90,
        dataPoints: [
          { y: availLimit, label: "Available" },
          { y: totalLimit - availLimit, label: "Used" },
        ],
      },
    ],
  };
  const refresher = () => {
    window.location.reload(false);
  };
  return (
    <>
      {!card && <CreditCardLoader />}
      {card && (
        <MainBox>
          <LeftSection>
            <CardBox>
              <CardDetails card={card} key={card.id} refresher={refresher} />
            </CardBox>
            <CardDetailsListBox>
              <h2>Card Details</h2>
              <ul>
                <li>
                  <span>Card Number</span>
                  <span>{card.cardNum}</span>
                </li>
                <li>
                  <span>Expiry</span>
                  <span>{card.expiry}</span>
                </li>
                <li>
                  <span>Cvv</span>
                  <span>{card.cvv}</span>
                </li>
                <li>
                  <span>Bank</span>
                  <span>{card.bankName}</span>
                </li>
                <li>
                  <span>Card Limit</span>
                  <span>{card.totalCreditLimit}</span>
                </li>
                <li>
                  <span>Available Limit</span>
                  <span>{card.creditLimit}</span>
                </li>
              </ul>
            </CardDetailsListBox>
          </LeftSection>
          <RightSection>
            <ChartBox>
              <LinkHider></LinkHider>
              <CanvasJSChart options={options} />
            </ChartBox>
            <OrderTable orders={card.orders} />
          </RightSection>
        </MainBox>
      )}
    </>
  );
};

export default CardFullView;
