import React from "react";
import Classes from "./Pagination.module.css";


const Pagination = ({ handleNextClick, handlePreviousClick, pageNeigbors, totalPages, currentPage, handleClick }) => {
  const fetchPageNumbers = () => {
    const totalNumbers = pageNeigbors * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    if(totalPages > totalBlocks){
        const startPage = Math.max(2, currentPage - pageNeigbors);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeigbors);
        let pages = [1];
        for(let i = startPage; i <= endPage; i++){
            pages = [...pages, i];
        }
        pages = [...pages, totalPages];
        return pages;
    }
    return Array.from({length: totalPages}, (_, i) => i + 1);
  };

  return (
    <nav className={Classes.pagination}>
        <ul className={Classes.pageList}>
            <li>
                <button onClick={handlePreviousClick}>Prev</button>
            </li>
            {fetchPageNumbers().map((index, page) => (
                <li key={index}>
                    <button onClick={() => handleClick(page)}>{page}</button>
                </li>
            ))}
            <li>
                <button onClick={handleNextClick}>Next</button>
            </li>
        </ul>
      
    </nav>
  );
}


export default Pagination;