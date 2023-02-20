
import axios from "axios";
import { createContext, useContext, useState } from "react";


const coinContext = createContext();

export const CoinContextProvider = ({ children }) => {
    const [coinsData, setCoinsData] = useState({});

    const GetCoinsData = async () => {
        
        try{
            await axios.get("https://staging-biz.coinprofile.co/v3/currency/rate").then((res) => {
                setCoinsData(res.data.data.rates);
                console.log(res.data.data.rates);
                console.log("CoinsData:" + coinsData);
            })
        }catch(err){
            console.log(err);
        }
    };


    
    return <coinContext.Provider value={{
        coinsData, 
        GetCoinsData
    }}>
        {children}
    </coinContext.Provider>
}


export const useCoinContext = () => {
    const context = useContext(coinContext);
    if (context === "undefined") {
      throw new Error("useAuth must be used within the auth provider");
    }
    return context;
  };
  
export default coinContext;

