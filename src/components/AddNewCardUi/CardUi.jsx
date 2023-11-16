import React from "react";
import "./CardUi.css";
import chip from "../../assets/images/chip.png";
import nfc from "../../assets/images/nfc.svg";
const CardUi = (props) => {
  const card = props.card;

  let { cardNum, expiry, bankName, cvv } = card;
  const cardArr = cardNum.split("");
  let c = 0;
  const resArr = cardArr.map((n) => {
    if (c % 4 == 0) {
      c++;
      return " " + n;
    }
    c++;
    return n;
  });
  const resCardNum = resArr.join("");
  if (bankName === "Select Bank") {
    bankName = "";
  }

  return (
    <>
      <div className="card">
        <div className="intern">
          <img className="approximation" src={nfc} alt="aproximation" />
          <div className="card-number">
            <div className="number-vl">
              <span className="spanHide">1</span>
              {resCardNum}
            </div>
          </div>
          <div className="card-holder">
            <label>Bank</label>
            <div className="name-vl">
              <span className="spanHideBank">1</span>
              {bankName}
            </div>
          </div>
          <div className="card-infos">
            <div className="exp">
              <label>valid-thru</label>
              <div className="expiration-vl">{expiry}</div>
            </div>
            <div className="cvv">
              <label>CVV</label>
              <div className="cvv-vl">{cvv}</div>
            </div>
          </div>
          <img className="chip" src={chip} alt="chip" />
        </div>
      </div>
    </>
  );
};

export default CardUi;
