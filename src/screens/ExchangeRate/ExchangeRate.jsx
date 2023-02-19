import React from "react";
import Classes from "./ExchangeRate.module.css";
import { CgArrowsExchange, CgArrowsExchangeAlt } from "react-icons/cg";


function ExchangeRate() {

  const [amount, setAmount] = React.useState(0);
  const [arrow, setArrow] = React.useState(false);
  const coins = [
    { name: "Bitcoin", symbol: "BTC"},
    { name: "Ethereum", symbol: "ETH"},
    {name:"Naira", symbol:"NGN"},
    {name:"Dollar", symbol:"USD"},
    {name: "Binance Coin", symbol: "BNB"},
    {name: "Binance USD", symbol: "BUSD"},
    {name: "Tether", symbol: "USDT"},
    {name: "Dash", symbol: "DASH"},
    {name: "Cardona Usd", symbol: "CUSD"},
  ];

  const handleAmountChange = (e) => {
    const amt = e.target.value;
    amt >= 0 ?
    setAmount(e.target.value) : setAmount(0);
  };



  return (
    <div className={Classes.container}>
      <div className={Classes.wrapper}>
        <h1>Cryptocurrency Converter Calculator</h1>
        <div className={Classes.converter}>
            <input type="number" name="amount"  placeholder="Enter amount" onChange={handleAmountChange} value={amount} />
            <div className={Classes.selectWrapper}>
            <select name="" id="" className={Classes.sourceCurrency}>
              {
                coins.map((coin, index) => {
                  return <option key={index} value={coin.symbol}>{coin.symbol}</option>
                }
              )}
            </select>
            {
              arrow ? < CgArrowsExchangeAlt className={Classes.arrow} onClick={() => setArrow(!arrow)} />
              : 
              < CgArrowsExchange className={Classes.arrow} onClick={() => setArrow(!arrow)} />
            }
            
            <select name="" id="" className={Classes.targetCurrency}>
              {
                coins.map((coin, index) => {
                  return <option key={index} value={coin.symbol}>{coin.symbol}</option>
                }
              )}
            </select>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ExchangeRate