import React, { useEffect, useState, useCallback } from "react";
import { Empty } from "antd";
import Classes from "./Coins.module.css"
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader"
import { useCoinContext } from "../../context/CoinContext";




const Coins = () =>{
   const {coinsData, GetCoinsData} = useCoinContext();
   const [loading, setLoading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [coinsPerPage] = useState(10);
   const indexOfLastCoin = currentPage * coinsPerPage;
   const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
   const keys = Object.keys(coinsData);
   const currentCoins = keys.slice(indexOfFirstCoin, indexOfLastCoin);
   let totalPages = keys && keys.length > 0 ? Math.ceil(keys.length / coinsPerPage) : 0;
   const [search, setSearch] = useState("");
   const [screenSize, setScreenSize] = useState(window.innerWidth);


   const handleResize = () => {
       setScreenSize(window.innerWidth);
   };


   useEffect(() => {
       window.addEventListener("resize", handleResize);
       return () => window.removeEventListener("resize", handleResize);
     }, []);


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


  
   const memoizedGetCoinsData = useCallback(() => {
       setLoading(true);
       GetCoinsData();
       setLoading(false);
      
   }, [GetCoinsData]);


   useEffect(() => {
       memoizedGetCoinsData();
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
  
   return(


      
       <div className={Classes.container}>
           <div className={Classes.coinWrapper}>
               <div className={`${Classes.coinHeader}`}>
                   <h1>Coins List</h1>
                   <input type="search" placeholder="Search" value={search} onChange={searchHandler} />
               </div>
               {screenSize > 639 ? (
                   <div className="w-100 overflow-x-auto text-[white] flex flex-col justify-center items-center gap-[2rem] py-[2rem] ">
                    
                   {coinsData !== null ?(
                   <table className="table-auto w-full">
                       <thead>
                           <tr className="bg-gray-200">
                               <th className="px-4 py-2  text-[black] text-[1rem] text-left">No.</th>
                               <th className="px-4 py-2 text-[black] text-[1rem] text-left">Currency Pair</th>
                               <th className="px-4 py-2 text-[black] text-[1rem] text-left">Price</th>
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
                                       <tr key={index} className={`${index % 2 === 0 ? 'text-[white]'  :  "bg-gray-100 text-[black]"}`}>
                                           <td className="border px-4 py-2">{serialNumber() + index}</td>
                                           <td className="border px-4 py-2">{coinKey}</td>
                                           <td className="border px-4 py-2">{rate.toFixed(2)}</td>
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


               ) : (
                   <div className="w-100 text-[white] flex flex-col justify-center items-center gap-[2rem] py-[2rem] ">
                    <div className="w-[90%] flex justify-between items-center gap-2">
                        <h6 className="basis-1/4">No.</h6>
                        <h6 className="basis-2/4">Currency Pair</h6>
                        <h6 className="basis-2/4">Price</h6>
                    </div>
                    
                   {coinsData !== null ?(
                   <div className="w-[100%]">
                       {currentCoins.filter((coin) => {
                                       if(search === ""){
                                           return coin
                                       }else if(coin.toLowerCase().includes(search.toLowerCase())){
                                           return coin
                                       }
                                       return null
                           }).map((coinKey, index) => {
                               const { rate} = coinsData[coinKey];
                           return(
                               <div key={index} className='flex flex-col'>
                                   <div className="flex justify-between gap-2 border-b-2 border-[#7e6a17] p-3 mb-3 rounded-md">
                                       <p className="basis-1/4">{serialNumber() + index}</p>
                                       <p className="basis-2/4">{coinKey}</p>
                                       <p className="basis-2/4">{rate.toFixed(2)}</p>
                                   </div>
                               </div>
                           )})
                       }
                   </div>    
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
               )}
           </div>
          
       </div>
   )
}


export default Coins

