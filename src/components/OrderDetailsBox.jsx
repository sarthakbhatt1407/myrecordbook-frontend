import React, { useState } from "react";
import styled from "styled-components";
import "animate.css";
import { EnvVariables } from "../data";
import DeleteLoader from "./Loader/DeleteLoader/DeleteLoader";
import WatchLoader from "./Loader/WatchLoader/WatchLoader";
const MainBox = styled.div`
  text-transform: capitalize;
  animation: 1s fadeIn;
  /* background-color: #f5f5f5; */
  width: 30vw;
  height: fit-content;
  box-shadow: 0.2rem 0.2rem 1rem #e2e2e2;
  padding: 1.4rem;
  border-radius: 1rem;
  position: relative;

  @media only screen and (min-width: 0px) and (max-width: 599px) {
    width: 90vw;
  }
  @media only screen and (min-width: 600px) and (max-width: 1000px) {
    width: 45vw;
  }
  @media only screen and (min-width: 1001px) and (max-width: 1500px) {
    width: 30vw;
  }
  @media only screen and (min-width: 1501px) {
    width: 23vw;
  }
`;
const WatchAniDIv = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  z-index: 3;
  border-radius: 1rem;
  &::before {
    background-color: #4f4f4f;
    border-radius: 1rem;
    content: "";
    opacity: 0.6;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
`;
const DeleteAniBox = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  z-index: 3;
  border-radius: 1rem;
  &::before {
    background-color: #4f4f4f;
    border-radius: 1rem;
    content: "";
    opacity: 0.6;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
`;
const MenuBarBox = styled.div`
  position: absolute;
  background-color: #f8f8f8;
  backface-visibility: hidden;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  width: 40%;
  height: 47%;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: 0.55s fadeIn;
  margin-top: 0.3rem;
  div {
    width: 90%;
    display: block;
    font-size: 1.3rem;
    padding: 0.7rem 0;
    margin-top: 0.4rem;
    display: flex;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.9rem;
    font-size: 1.4rem;
    color: #6d6d6d;
    i {
      transform: scale(0.8);
      color: #919191;
    }
  }
  span {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    z-index: 2;
    i {
      color: #9f9e9e;
      transform: scale(0.9);
      animation: 0.7s fadeIn;
    }
  }
`;
const HeaderBox = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 3fr 1fr;
  align-items: center;
`;
const StatusIconDiv = styled.div`
  background-color: ${(props) => props.clr};
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  border-radius: 50%;
  i {
    font-size: 1rem;
  }
`;
const OrderNameBox = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;
const OrderControlDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.2rem;
  div {
    width: 4px;
    height: 4px;
    background-color: #9f9e9e;
    border-radius: 50%;
  }
`;

const DetailsBox = styled.div`
  color: #818181;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  padding: 1rem 0;
  gap: 1rem;
`;

const DetailLineBox = styled.div`
  padding: 0 1rem;

  display: flex;
  justify-content: space-between;
  font-weight: 500;
  letter-spacing: 0.07rem;
  font-size: 1.25rem;
  padding: 0.5rem 0;
  span {
    width: 40%;
    word-wrap: break-word;
  }
`;

const OrderStatusBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;
const StatusBox = styled.div`
  background-color: #f1f1f1;
  padding: 0.8rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  color: ${(props) => props.clr};
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  letter-spacing: 0.13rem;
`;
const OptionBox = styled.div`
  display: flex;
  justify-content: center;
  div {
    background-color: #f3f3f3;
    padding: 0.7rem 3rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
  }
`;

const OrderDetailsBox = (props) => {
  const order = props.order;
  const [showDeleteAni, setShowDeleteAni] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [wacthAni, setWacthAni] = useState(false);
  const menuButtonHandler = () => {
    setShowMenu(!showMenu);
  };
  const orderDeleter = async () => {
    setShowMenu(false);
    setShowDeleteAni(true);
    const res = await fetch(`${EnvVariables.BASE_URL}/delete-order`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: order.id }),
    });
    if (res.ok) {
      props.refresher();
    }
    setShowDeleteAni(false);
  };
  const orderStatusChanger = async () => {
    setShowMenu(false);
    setWacthAni(true);
    const res = await fetch(`${EnvVariables.BASE_URL}/order/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: order.id }),
    });
    setWacthAni(false);
    if (res.ok) {
      props.refresher();
    }
  };
  return (
    <MainBox>
      {showDeleteAni && (
        <DeleteAniBox>
          <DeleteLoader />
        </DeleteAniBox>
      )}
      {wacthAni && (
        <WatchAniDIv>
          <WatchLoader />
        </WatchAniDIv>
      )}

      {showMenu && (
        <MenuBarBox>
          <span onClick={menuButtonHandler}>
            <i className="fas fa-times"></i>
          </span>
          <div onClick={orderStatusChanger}>
            {order.status === "pending" && <i className="fas fa-check"></i>}
            {order.status === "pending" && "Delivered"}
            {order.status !== "pending" && <i className="fas fa-clock"></i>}
            {order.status !== "pending" && "Pending"}
          </div>
          <div onClick={orderDeleter}>
            <i className="fas fa-trash"></i>Delete
          </div>
        </MenuBarBox>
      )}
      <HeaderBox>
        <StatusIconDiv clr={order.status === "pending" ? "#ffb300" : "green"}>
          {order.status === "pending" ? (
            <i className="fas fa-truck"></i>
          ) : (
            <i className="fas fa-check"></i>
          )}
        </StatusIconDiv>
        <OrderNameBox>{order.name}</OrderNameBox>
        <OrderControlDiv onClick={menuButtonHandler}>
          <div></div>
          <div></div>
          <div></div>
        </OrderControlDiv>
      </HeaderBox>
      <DetailsBox>
        <DetailLineBox>
          <p>Order Id</p>
          {order.orderNum.length > 15 && <span>{order.orderNum}</span>}
          {order.orderNum.length < 15 && <p>{order.orderNum}</p>}
        </DetailLineBox>
        <DetailLineBox>
          <p>Order Amount</p>
          <p>{order.orderAmount}</p>
        </DetailLineBox>
        <DetailLineBox>
          <p>Merchant</p>
          <p>{order.merchant}</p>
        </DetailLineBox>
        <DetailLineBox>
          <p>Card Used</p>
          <p>{order.cardUsed}</p>
        </DetailLineBox>
      </DetailsBox>
      <OrderStatusBox>
        <StatusBox clr={order.status === "pending" ? "#e31f1f" : "#3a946d"}>
          {order.status === "pending" ? "Waiting for delivery" : "Delivered"}
        </StatusBox>
        <OptionBox>
          <div>
            {order.status === "pending" ? (
              <i className="fas fa-check" onClick={orderStatusChanger}></i>
            ) : (
              <i className="fas fa-trash" onClick={orderDeleter}></i>
            )}
          </div>
        </OptionBox>
      </OrderStatusBox>
    </MainBox>
  );
};

export default OrderDetailsBox;
