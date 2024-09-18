import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import useCardType from "../contexts/CardTypeProvider";
import loadingLogo from "../../public/svg/loading.svg" 

function MovieCategory() {

  const [movieType, setMovieType] = useState('Movies')
  const [finalData, setFinalData] = useState([]);

  const handleChangeBtn = (event) => {
    setMovieType(event.target.value);
  }

  const { collectType, homeSectionData, loadingCardType } = useCardType();

  useEffect(() => {
    
    collectType(movieType)

  }, [movieType])

  
  useEffect(() => {
    const data = homeSectionData ? homeSectionData : {};
    setFinalData([...data])
    
  }, [homeSectionData])
  


  return <>
    <div className="max-w-[90vw] pt-3 h-max pb-3 mt-4 rounded-lg mx-auto bg-[#13131D]">
      <div className="flex items-center justify-between px-4 sm:p-6 w-[90%] h-20 my-0 mx-auto rounded-lg bg-[#1b1b1f]">
        { loadingCardType === true ? <img src={loadingLogo} loading="lazy" alt={movieType} /> : "" }
        <h1 className={`${loadingCardType === true ? "hidden" : "block"} text-white font-black text-xl sm:text-3xl`}>{movieType}</h1>
          <select onChange={handleChangeBtn} name="movies" id="movies"
          className={`w-[140px] sm:w-[270px] sm:h-[50px] rounded-xl pl-2 h-[30px] bg-[#20203b] border-none outline-none text-white font-semibold`}        
          >
            <option value="Movies">Movies</option>
            <option value="Tv-show">Tv-show</option>
          </select>


      </div>

      { finalData.map((value, index) => {
        return <div key={index} className="w-[90%] min-h-80 my-0 mx-auto rounded-lg bg-[#1b1b1f] mt-4 p-4">
          <h1 key={index} className=" font-black text-white text-3xl ">{value.title}</h1>
          <MovieCard results={value.results} />           
         </div> 
      })}
    </div>
  </>
};

export default MovieCategory;
