import React, { useCallback, useEffect, useState } from "react";
import Classes from "./ExchangeRate.module.css";
import {BsArrowDownUp} from "react-icons/bs";
import { Card } from "antd";


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
    amount: "",
    convertTo: "NGN",
    result: "",
    coinsRates: {},
  });

  const { currencies, base, amount, convertTo, result, coinsRates } = initialState;

  useEffect(() => {
    if(amount === isNaN){
      return
    }else{
      const getCurrency = async () => {
        const response = await fetch(
          "https://staging-biz.coinprofile.co/v3/currency/rate"
        );
        const data = await response.json();
        setInitialState({
          ...initialState,
          coinsRates: data.data.rates,
        });
      } 
      getCurrency();
    }
  }, [amount, base, convertTo, initialState])
  

  const onChangeInput = useCallback((e) => {
    setInitialState((prevState) => ({
      ...prevState,
      amount: e.target.value,
      result: null,
    }));
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
    const keys = Object.keys(coinsRates);
    const rate = keys.find((coinKey) =>
      coinKey.includes(`${base}${convertTo}`)
    )?.rate;

    console.log(`${base}${convertTo}`)
    if (rate && !isNaN(amount)) {
      setInitialState((prevState) => ({
        ...prevState,
        result: amount * rate,
      }));
    }
    console.log(amount)
    console.log(rate)
    console.log(result)
  }, [coinsRates, base, convertTo, amount, result]);


  return (
    <div className={Classes.container}>
      <div>
        <div>
          < Card className={Classes.card}
          title={<Title level={2}>Custom Title</Title>}
          >
          <h5>{amount} {base} is equivalent to </h5>
          <h3>
            {amount === "" ? "0 " : result === null ? "Calculating..." : result + " "}
            {convertTo}
          </h3>
          <div className={Classes.cardWrapper}>
            <div className={Classes.forms}>
              <form action="">
                <input type="number" value={amount} onChange={onChangeInput} />
                <select name="base" id=""
                value={base}
                onChange={onChangeSelect}
                >
                  { currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}  
                    </option>
                  ))}
                </select>
              </form>
              <form action="">
                <input 
                disabled={true}
                type="number" 
                value={amount === "" ? "0" : result === null ? "Calculating..." : result} 
                onChange={onChangeInput} 
                />
                <select name="convertTo" id=""
                value={convertTo}
                onChange={onChangeSelect}
                >
                  {/* {console.log(keys)} */}
                  { currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
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