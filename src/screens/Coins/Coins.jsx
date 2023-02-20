import React, { useCallback, useEffect, useState } from "react";
import { Empty } from "antd";
import Classes from "./Coins.module.css"
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader"


const Coins = () =>{
    const [coinsData, setCoinsData] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage] = useState(10);
    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const keys = Object.keys(coinsData);
    const currentCoins = keys.slice(indexOfFirstCoin, indexOfLastCoin);
    let totalPages = keys && keys.length > 0 ? Math.ceil(keys.length / coinsPerPage) : 0;
    const [search, setSearch] = useState("");

    const serialNumber = () => {
        return (currentPage - 1) * coinsPerPage + 1;
    }
    const handlePreviousClick = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextClick = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }

    const handleClick = (page) => {
        setCurrentPage(page);
    }


    const searchHandler = (e) => {
        setSearch(e.target.value);
        console.log(search);
    }


    const getCoinCallback = useCallback(async () => {
        setLoading(true);
        await fetch("https://staging-biz.coinprofile.co/v3/currency/rate")
          .then((res) => res.json())
          .then((data) => {
            setCoinsData(data.data.rates);
            setLoading(false);
          })
          .catch((err) => console.log(err));
    }, []);
    
    useEffect(() => {
        getCoinCallback();
    }, [getCoinCallback]);

    
    return(
        
        <div className={Classes.container}>
            <div className={Classes.coinWrapper}>
                <div className={Classes.coinHeader}>
                    <h1>Coins List</h1>
                    <input type="search" placeholder="Search" value={search} onChange={searchHandler} />
                </div>
                <div className={Classes.coinBody}>
                    {console.log(currentCoins)}
                    {coinsData !== null ?(
                    <table className={Classes.coinTable}>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Currency Pair</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                                currentCoins.filter((coin) => {
                                    if(search === ""){
                                        return coin
                                    }else if(coin.toLowerCase().includes(search.toLowerCase())){
                                        return coin
                                    }
                                    return null
                                }).map((coinKey, index) => {
                                    const { rate} = coinsData[coinKey];
                                    return(
                                        <tr key={index}>
                                            <td>{serialNumber() + index}</td>
                                            <td>{coinKey}</td>
                                            <td>{rate}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                     
                    ):(
                    <div className={Classes.empty}>
                        <Empty className={Classes.empty_text} />
                    </div>
                    
                    )}
                    {loading && <Loader /> }
                    <Pagination 
                        totalPages={totalPages} 
                        currentPage={currentPage} 
                        pageNeigbors= {1} 
                        handleNextClick={handleNextClick}
                        handlePreviousClick={handlePreviousClick}
                        handleClick={handleClick}

                    />
                </div>
            </div>
            
        </div>
    )
}

export default Coins