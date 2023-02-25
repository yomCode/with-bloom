import React, { useCallback, useEffect, useState } from "react";
import Classes from "./ExchangeRate.module.css";
import {BsArrowDownUp} from "react-icons/bs";
import { Card } from "antd";
import { useCoinContext } from "../../context/CoinContext";
import { StyledSelect } from "../../components/Select";
import { supportedCoins, baseCurr, convertToCurr } from "../../constant";


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
    base: baseCurr,
    convertTo: convertToCurr,
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
          < Card className='w-[90%] max-w-[30rem] flex flex-col justify-center items-center overflow-hidden'
          title={<Title level={2} />}
          >
          <h5 className="text-[1rem] text-center"> {amount} <span className="font-bold">{base}</span> is equivalent to </h5>
          {console.log('Amount: ', amount, 'Base: ', base, 'ConvertTo: ', convertTo, 'Result: ', result)}
          <h3 className="text-[1rem] text-center font-bold">
            {amount === "" ? "0 " + convertTo : result === null ? "Pair not supported" : result + " " + convertTo}
            
          </h3>
          <div className=' flex items-center justify-center gap-[2.5rem] p-[2rem]'>
            <div className=' w-[70%] h-[90%] flex flex-col gap-4 '>
              <form action="" className="flex flex-col justify-center gap-[1rem] md:flex-row ">
                <input type="number" value={amount} onChange={onChangeInput} placeholder='Amount' className='border-2 w-[80%] h-[2.5rem] bg-[#dbdbdbd4] rounded-md px-2 text-[black]' />
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
              <form action="" className="flex flex-col gap-[1rem] md:flex-row justify-center">
                <input 
                disabled={true}
                type="number" 
                value={amount === "" ? "0" : result === null ? "" : result} 
                onChange={onChangeInput} 
                className='border-2 w-[80%] h-[2.5rem] bg-[#dbdbdbd4] rounded-md px-2 text-[black]'
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