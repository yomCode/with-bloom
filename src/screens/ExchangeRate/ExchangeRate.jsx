import React, { useCallback, useEffect, useState } from "react";
import Classes from "./ExchangeRate.module.css";
import {BsArrowDownUp} from "react-icons/bs";
import { Card } from "antd";
import { useCoinContext } from "../../context/CoinContext";
import { StyledSelect } from "../../components/Select";
import { supportedCoins, exchangeSettings } from "../../constant";


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
    currencies: supportedCoins,
    base: exchangeSettings.base,
    convertTo: exchangeSettings.convertTo,
    result: "",
  });

  console.log(initialState);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeSelect = (value, name) => {
    setInitialState((prevState) => ({
      ...prevState,
      [name]: value,
      result: null,
    }));
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
             result: (amount * rate).toFixed(2),
          }));
        }
        console.log(rate);
      }
      return null;
    });
    console.log(`${base}${convertTo}`);

    console.log(keys);
    console.log(amount);
    
    console.log(result);
  }, [coinsData, base, convertTo, amount, result]);

  return (
    <div className={Classes.container}>
          < Card className=''
          title={<Title level={2}>Custom Title</Title>}
          >
          <h5 className="text-[1rem]">{amount} {base} is equivalent to </h5>
          <h3 className="text-[1rem] font-bold">
            {amount === "" ? "0 " + convertTo : result === null ? "Pair not supported" : result + " " + convertTo}
            
          </h3>
          <div className={Classes.cardWrapper}>
            <div className={Classes.forms}>
              <form action="" className="flex flex-col gap-[1rem] md:flex-row ">
                <input type="number" value={amount} onChange={onChangeInput} />
                <StyledSelect name="base" id=""
                value={base}
                onChange={(value) => onChangeSelect(value, 'base')}
                >
                  
                  { currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}  
                    </option>
                  ))}
                </StyledSelect>
              </form>
              <form action="" className="flex flex-col gap-[1rem] md:flex-row ">
                <input 
                disabled={true}
                type="number" 
                value={amount === "" ? "0" : result === null ? "" : result} 
                onChange={onChangeInput} 
                />
                <StyledSelect name="convertTo" id=""
                value={convertTo}
                onChange={(value) => onChangeSelect(value, 'convertTo')}
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
  )
}

export default ExchangeRate