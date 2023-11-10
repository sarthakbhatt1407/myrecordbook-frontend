import React from "react";
import styled from "styled-components";
import "animate.css";
const MainBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: #0000007e;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ConfirmBox = styled.div`
  background-color: white;
  padding: 3rem 4rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: 0.3s zoomIn;
`;
const ParaBox = styled.div`
  font-size: 1.5rem;
  text-align: center;
  letter-spacing: 0.09rem;
`;
const SpanBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  span {
    font-size: 1.3rem;
    background-color: #c1c1c1;
    color: white;

    &:first-child {
      background-color: #df6b51;
    }
    padding: 0.6rem 1.8rem;
    border-radius: 10rem;
  }
`;

const ConfirmationBox = (props) => {
  const yesBtnHandler = () => {
    props.cardDeleter();
    props.confirmBoxHandler();
  };
  const cancelBtnHandler = () => {
    props.confirmBoxHandler();
  };

  return (
    <MainBox>
      <ConfirmBox>
        <ParaBox>
          <p>Are You Sure ?</p>
        </ParaBox>
        <SpanBox>
          <span onClick={yesBtnHandler}>Yes</span>
          <span onClick={cancelBtnHandler}>Cancel</span>
        </SpanBox>
      </ConfirmBox>
    </MainBox>
  );
};

export default ConfirmationBox;
