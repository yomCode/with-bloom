import React, { useCallback, useEffect, useState } from "react";
import Classes from "./ExchangeRate.module.css";
import {BsArrowDownUp} from "react-icons/bs";
import { Card, Select } from "antd";
import { useCoinContext } from "../../context/CoinContext";
import { StyledSelect } from "../../components/Select";


export const Title = () => {

  return (
    <div className={Classes.title}>
      <h1>Exchange Rate</h1>
    </div>
  );
};

function ExchangeRate() {
  const [arrow, setArrow] = useState(false);

  const [initialState, setInitialState] = useState({
    currencies: ["BTC", "ETH", "NGN", "USD", "BNB", "BUSD", "USDT", "DASH", "CUSD"],
    base: "BTC",
    convertTo: "NGN",
    result: "",
  });

  const [amount, setAmount] = useState("");
  const {coinsData, GetCoinsData} = useCoinContext();
  const { currencies, base, convertTo, result } = initialState;

  const onChangeInput = useCallback((e) => {
    setAmount(e.target.value);
  }, []);

  const coinCallBack = useCallback(() => {
    GetCoinsData();
  }, [GetCoinsData]);

  useEffect(() => {
    coinCallBack();
  }, []);

  const onChangeSelect = (e) => {
    setInitialState({
      ...initialState,
      [e.target.name]: e.target.value,
      result: null,
    });
  };

  const handleSwap = (e) => {
    e.preventDefault();
    setInitialState({
      ...initialState,
      base: convertTo,
      convertTo: base,
    });
    setArrow(!arrow);
  };

  useEffect(() => {
    const keys = Object.keys(coinsData);
    keys.map((key) => {
      if (key === `${base}${convertTo}`) {
        const { rate } = coinsData[key];

        if (rate && !isNaN(amount)) {
          setInitialState((prevState) => ({
            ...prevState,
            result: (amount * rate).toFixed(4),
          }));
        }
        console.log(rate);
      }
    });
    console.log(`${base}${convertTo}`);

    console.log(keys);
    console.log(amount);

    console.log(result);
  }, [coinsData, base, convertTo, amount, result]);

  return (
    <div className={Classes.container}>
      <div>
        <div>
          < Card className={Classes.card}
          title={<Title level={2}>Custom Title</Title>}
          >
          <h5>{amount} {base} is equivalent to </h5>
          <h3>
            {amount === "" ? "0 " + convertTo : result === null ? "Pair not supported" : result + " " + convertTo}
            
          </h3>
          <div className={Classes.cardWrapper}>
            <div className={Classes.forms}>
              <form action="">
                <input type="number" value={amount} onChange={onChangeInput} />
                <StyledSelect name="base" id=""
                value={base}
                onChange={onChangeSelect}
                // className={Classes.select}
                >
                  { currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}  
                    </option>
                  ))}
                </StyledSelect>
              </form>
              <form action="">
                <input 
                disabled={true}
                type="number" 
                value={amount === "" ? "0" : result === null ? "" : result} 
                onChange={onChangeInput} 
                />
                <StyledSelect name="convertTo" id=""
                value={convertTo}
                onChange={onChangeSelect}
                // className={Classes.select}
                >
                  { currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </StyledSelect>
              </form>
            </div>
            <div className={Classes.swap}>
              <h1 onClick={handleSwap} style={{cursor: "pointer"}}>
                < BsArrowDownUp />
              </h1>
            </div>
          </div>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default ExchangeRate