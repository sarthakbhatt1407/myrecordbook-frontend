import React, { useEffect, useState } from "react";
import CreditCardLoader from "../components/Loader/CreditCardLoader/CreditCardLoader";
import { useDispatch, useSelector } from "react-redux";
import { EnvVariables } from "../data";
import styled from "styled-components";
import CardDetails from "../components/CardDetails";
import AddNewCard from "../components/AddNewCard";
const OuterBox = styled.div`
  position: relative;
`;
const MainBox = styled.div`
  height: 90vh;
`;
const HeaderBox = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
  gap: 1.4rem;
  padding: 1rem;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: normal;
  }

  h3 {
    letter-spacing: 0.1rem;
    font-weight: 650;
    font-size: 2.4rem;
    @media only screen and (max-width: 500px) {
      font-size: 2.1rem;
    }
  }
`;

const InpBox = styled.div`
  background-color: #ffffff;
  display: flex;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0.1rem 0.14rem 1.5rem #b5b5b5;
  gap: 1rem;
  align-items: center;
  @media only screen and (min-width: 769px) and (max-width: 2500px) {
    width: 30vw;
  }
`;
const InpAndIconBox = styled.div`
  padding: 0 1rem;
  @media only screen and (min-width: 769px) and (max-width: 2500px) {
    padding: 0.4rem 1rem;
  }
`;
const Input = styled.input`
  border: none;
  width: 90%;
  &::placeholder {
    color: #aaa;
    font-weight: 500;
    font-size: 1.3rem;
    letter-spacing: 0.1rem;
  }
  &:focus {
    outline: none;
    border: none;
  }
`;
const Icon = styled.i`
  color: #a1a0a0;
  font-size: 1.2rem;
  @media only screen and (min-width: 769px) and (max-width: 2500px) {
    font-size: 1.5rem;
  }
`;
const CardsBox = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem 1rem;
  flex-wrap: wrap;

  @media only screen and (max-width: 660px) {
    flex-direction: column;
  }
`;
const EmptyParaDiv = styled.div`
  height: 50vh;

  width: 100%;
  color: #b7b7b7;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.2rem;
`;
const AddNewDiv = styled.div`
  position: absolute;
  backface-visibility: hidden;
  top: 0.8vh;
  right: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: #388def;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  animation: 2s zoomInRight;
  color: white;
  transition: 0.5s all;
  overflow: hidden;
  cursor: pointer;

  @media only screen and (min-width: 501px) and (max-width: 2200px) {
    right: 3vw;
    top: 80vh;
    bottom: 0;
    width: 5.5rem;
    height: 5.5rem;
  }
  &:hover {
    width: 15rem;
    border-radius: 1.2rem;
    span {
      display: block;
      font-size: 1.4rem;
      animation: 0.7s zoomIn;
    }
    p {
      display: none;
    }
  }
  span {
    display: none;
  }
  p {
    font-size: 2rem;
    font-weight: bold;
    color: white;
  }
`;

const AllCards = () => {
  const userId = useSelector((state) => {
    return state.userId;
  });
  const dispatch = useDispatch();
  const [showAddNew, setShowAddNew] = useState(false);
  const [cardLoading, setCardLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const [filteredCards, setFilteredCards] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
    const fetcher = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/all-cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      const data = await res.json();
      // console.log(data.cards);
      setCards(data.cards.reverse());
      setFilteredCards(data.cards);
      setCardLoading(false);
    };
    fetcher();
  }, []);

  const onChangeHandler = (e) => {
    const val = e.target.value.toString().replace(/ /g, "").trim();
    if (val.trim().length === 0) {
      setFilteredCards(cards);
    }
    const arr = cards.filter((card) => {
      return card.cardNum.toString().includes(val);
    });
    setFilteredCards(arr);
  };
  const refresher = () => {
    window.location.reload(false);
  };
  const addNewOrderShowHandler = () => {
    setShowAddNew(!showAddNew);
  };

  return (
    <OuterBox>
      {showAddNew && (
        <AddNewCard addNewOrderShowHandler={addNewOrderShowHandler} />
      )}
      <MainBox>
        <AddNewDiv onClick={addNewOrderShowHandler}>
          <p>+ </p>
          <span>Add New Card</span>
        </AddNewDiv>
        {cardLoading && <CreditCardLoader />}
        {!cardLoading && (
          <>
            <HeaderBox>
              <h3>Your Cards</h3>
              <InpAndIconBox>
                <InpBox>
                  <Icon className="fas fa-search"></Icon>
                  <Input
                    type="number"
                    placeholder="Search Your Card...."
                    id="searchInp"
                    onChange={onChangeHandler}
                  />
                </InpBox>
              </InpAndIconBox>
            </HeaderBox>
            {!showAddNew && (
              <CardsBox>
                {cards &&
                  filteredCards.map((card) => {
                    return (
                      <CardDetails
                        card={card}
                        key={card.id}
                        refresher={refresher}
                        showRed={true}
                      />
                    );
                  })}
                {cards && filteredCards.length === 0 && (
                  <EmptyParaDiv>No Card Found...</EmptyParaDiv>
                )}
              </CardsBox>
            )}
          </>
        )}
      </MainBox>
    </OuterBox>
  );
};

export default AllCards;
