import Input from "antd/es/input/Input";
import React from "react";
import Classes from "./ExchangeRate.module.css";



function ExchangeRate() {

  // const [amount, setAmount] = React.useState(0);
  

  // const handleAmountChange = (e) => {
  //   const amt = e.target.value;
  //   amt >= 0 ?
  //   setAmount(e.target.value) : setAmount(0);
  // };

  return (
    <div className={Classes.container}>
      <div className={Classes.wrapper}>
        <h1>Cryptocurrency Exchange Rate Calculator</h1>
        <div className={Classes.converter}>
          <div className={Classes.input}>
            <Input type="number" name="amount"  placeholder="Enter amount" />
            <select name="" id="">
              <option value="">USD</option>
              <option value="">BUSD</option>
            </select>

        </div>
        </div>
      </div>
    </div>
  )
}

export default ExchangeRate