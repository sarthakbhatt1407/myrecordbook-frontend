import React from "react";

import "./DeleteLoader.css";
import styled from "styled-components";
const MainBox = styled.div`
  /* position: relative;
  height: 100%;
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
  } */
  background-color: red;
`;

const DeleteLoader = () => {
  return (
    <MainBox>
      <span className="deleteLoader">Deleting</span>
    </MainBox>
  );
};

export default DeleteLoader;
