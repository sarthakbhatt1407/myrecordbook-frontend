import React from "react";
import "../OrderLoader/OrderLoader.css";
import styled from "styled-components";
const MainBox = styled.div`
  position: relative;
  height: 93vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
  &::before {
    background: #dedede;
    content: "";
    opacity: 0.6;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 93vh;
  }
`;

const OrderLoader = () => {
  return (
    <MainBox>
      <span className="orderLoader"></span>
    </MainBox>
  );
};

export default OrderLoader;
