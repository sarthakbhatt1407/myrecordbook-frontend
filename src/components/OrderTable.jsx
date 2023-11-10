import React from "react";
import styled from "styled-components";
const OuterBox = styled.div`
  display: flex;
  text-transform: capitalize;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow: auto;
  height: 60vh;
`;

const MainBox = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 2fr 0.7fr;
  border-radius: 1rem;
  padding: 1rem 2rem;
  box-shadow: 0.2rem 0.2rem 1rem #bbbbbb;
  @media only screen and (min-width: 0px) and (max-width: 599px) {
    gap: 2rem;
  }
`;
const NoTransDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  color: #929292;
  letter-spacing: 0.09rem;
`;
const AmountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.7rem;
  @media only screen and (min-width: 0px) and (max-width: 599px) {
    font-size: 1.3rem;
  }
`;
const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: black;
    font-weight: bold;
    letter-spacing: 0.06rem;
    @media only screen and (min-width: 0px) and (max-width: 599px) {
      font-size: 1.4rem;
    }
  }
  span {
    color: #aeaeae;
    font-size: 1.3rem;
    @media only screen and (min-width: 0px) and (max-width: 599px) {
      font-size: 1.1rem;
    }
  }
  @media only screen and (min-width: 0px) and (max-width: 599px) {
    gap: 0.2rem;
  }
`;
const StatusBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StatusBoxDiv = styled.div`
  background-color: ${(props) => props.clr};
  border-radius: 1rem;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  width: 9rem;
  height: 2rem;
  @media only screen and (min-width: 0px) and (max-width: 599px) {
    font-size: 1.1rem;
    width: 7rem;
  }
`;

const Heading = styled.h2`
  margin-left: 1rem;
`;

const OrderTable = (props) => {
  const orders = props.orders;

  return (
    <>
      <Heading>Transactions</Heading>
      <OuterBox>
        {orders.length === 0 && (
          <NoTransDiv>No Transaction Found...</NoTransDiv>
        )}
        {orders.map((order) => {
          const {
            id,
            merchant,
            name,
            orderAmount,
            orderDate,
            orderNum,
            status,
          } = order;
          return (
            <MainBox key={id}>
              <AmountBox>
                ₹ {Number(orderAmount).toLocaleString("en-IN")}
              </AmountBox>
              <DetailsBox>
                <p>{name}</p>
                <span>Order Id: {orderNum}</span>
                <span>
                  {orderDate} ({merchant})
                </span>
              </DetailsBox>
              <StatusBox>
                <StatusBoxDiv
                  clr={status === "pending" ? "#f9ba45" : "#20E68D"}
                >
                  {status}
                </StatusBoxDiv>
              </StatusBox>
            </MainBox>
          );
        })}
      </OuterBox>
    </>
  );
};

export default OrderTable;
