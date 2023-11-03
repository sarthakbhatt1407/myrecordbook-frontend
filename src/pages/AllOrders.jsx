import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import OrderLoader from "../components/Loader/OrderLoader/OrderLoader";
import { EnvVariables } from "../data";
import OrderDetailsBox from "../components/OrderDetailsBox";

const OuterBox = styled.div``;
const MainBox = styled.div`
  padding: 1rem;
`;
const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding: 1rem;

  @media only screen and (min-width: 769px) and (max-width: 2500px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const HeadingAndFilterBox = styled.div`
  h2 {
    letter-spacing: 0.1rem;
    font-weight: 650;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (min-width: 769px) and (max-width: 2500px) {
    gap: 1rem;
    justify-content: space-between;
    width: 80vw;
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

const Select = styled.select`
  padding: 0.3rem 0rem;
  border: none;
  color: #d1d0d0;
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

const OrderBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  height: 80vh;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 1rem;
  overflow: auto;

  padding: 1rem 0;

  @media only screen and (min-width: 551px) {
    flex-direction: row;
    height: fit-content;
    justify-content: center;
    flex-wrap: wrap;
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

const AllOrders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(null);
  const [inpValue, setInpValue] = useState("init");
  const [searchResultArray, setSearchResultArray] = useState([]);
  const [selectField, setSelectField] = useState("Order Name");
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => {
    return state.userId;
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
    const fetcher = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/all-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userId }),
      });
      const data = await res.json();
      setIsLoading(false);
      setOrders(data.orders.reverse());
      if (inpValue === "init") {
        setSearchResultArray(data.orders);
        setInpValue("loaded");
      }
    };
    fetcher();
  }, []);
  const refresher = () => {
    window.location.reload(false);
  };
  const getSelectValueHandler = () => {
    const e = document.getElementById("searchFilter");

    const text = e.options[e.selectedIndex].text;
    setSelectField(text);
  };

  const onInpChanger = (e) => {
    const val = e.target.value.toLowerCase();
    if (val.length === 0) {
      setInpValue("init");
    }
    let filteredArray;
    if (orders) {
      if (selectField === "Order Name") {
        filteredArray = orders.filter((ord) => {
          return ord.name
            .replace(/ /g, "")
            .toLowerCase()
            .trim()
            .includes(val.replace(/ /g, ""));
        });
      }
      if (selectField === "Order Id") {
        filteredArray = orders.filter((ord) => {
          return ord.orderNum
            .toString()
            .replace(/ /g, "")
            .toLowerCase()
            .trim()
            .includes(val.replace(/ /g, ""));
        });
      }
      if (selectField === "Card Used") {
        filteredArray = orders.filter((ord) => {
          return ord.cardUsed
            .toString()
            .replace(/ /g, "")
            .toLowerCase()
            .trim()
            .includes(val.replace(/ /g, ""));
        });
      }
    }
    setSearchResultArray(filteredArray);
    console.log(filteredArray);
  };
  return (
    <OuterBox>
      {isLoading && <OrderLoader />}

      {orders && (
        <MainBox>
          <HeaderBox>
            <HeadingAndFilterBox>
              <h2>All Orders</h2>
              <Select
                name="searchFilter"
                id="searchFilter"
                onChange={getSelectValueHandler}
              >
                <option value="" disabled selected>
                  Search By
                </option>
                <Option value="name">Order Name</Option>
                <Option value="id">Order Id</Option>
                <Option value="card">Card Used</Option>
              </Select>
            </HeadingAndFilterBox>
            <InpAndIconBox>
              <InpBox>
                <Icon className="fas fa-search"></Icon>
                <Input
                  onChange={onInpChanger}
                  type="text"
                  placeholder="Search Your Order...."
                  id="searchInp"
                />
              </InpBox>
            </InpAndIconBox>
          </HeaderBox>
          <OrderBox>
            {orders &&
              searchResultArray.map((order) => {
                return (
                  <OrderDetailsBox
                    key={order.id}
                    order={order}
                    refresher={refresher}
                  />
                );
              })}
            {searchResultArray.length === 0 && (
              <EmptyParaDiv>No Order Found ...</EmptyParaDiv>
            )}
          </OrderBox>
        </MainBox>
      )}
      <button
        onClick={() => {
          dispatch({ type: "logout" });
        }}
      >
        Log out
      </button>
    </OuterBox>
  );
};

export default AllOrders;
