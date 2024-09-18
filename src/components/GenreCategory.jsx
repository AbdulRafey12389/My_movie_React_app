import React, { useState, useEffect } from "react";
import GenreCard from "./GenreCard";
import { genreList } from "../utils/constants";
import { useGenreData } from "../contexts/GenreContextProvider";
import loadingLogo from "../../public/svg/loading.svg" 

function GenreCategory() {
const [genreSelected, SetGenreSelected] = useState("Adventure")
const [genreId, setGenreId] = useState(12)
const { genreIdData, genreMovieData, loadingGenreData } = useGenreData();


const handleChangeGenreBtn = (event) => {
  // SetGenreSelected(event.target.options[event.target.selectedIndex].value)
  const id = event.target.options[event.target.selectedIndex].getAttribute("data-attribute")
  
  setGenreId(id)
  SetGenreSelected(event.target.options[event.target.selectedIndex].value);
  
  
  
}

useEffect(() => {
  
  genreIdData(genreId)

}, [genreId])



  return (
    <>
      <div className="max-w-[90vw] pt-3 h-max pb-3 mt-4 rounded-lg mx-auto bg-[#13131D]">
        <div className="flex items-center justify-between px-4 sm:p-6 w-[90%] h-20 my-0 mx-auto rounded-lg bg-[#1b1b1f]">
        { loadingGenreData === true ? <img src={loadingLogo} loading="lazy" alt={genreSelected} /> : "" }
          <h1 className={`${loadingGenreData === true ? "hidden" : "block"} text-white font-black text-xl sm:text-3xl`}>Categories</h1>
          <select
          value={genreSelected}
            key={genreId}
            onChange={handleChangeGenreBtn}
            name="Genre"
            id="Genre"
            className={`w-[140px] sm:w-[270px] sm:h-[50px] rounded-xl pl-2 h-[30px] bg-[#20203b] border-none outline-none text-white font-semibold`}
          >
            { Object.entries(genreList).map(([genreIds, genreName]) => (
              <option key={genreIds} data-attribute={genreIds}> {genreName}</option>
            ) ) }
          </select>
        </div>
        <div className=" w-[90%] min-h-80 my-0 mx-auto rounded-lg bg-[#1b1b1f] mt-4 p-4">
          <h1 className=" font-black text-white text-3xl pl-4">{genreSelected}</h1>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(195px,_1fr))] gap-6 pl-4 m-h-[100%] ">
            { genreMovieData.map((data, index) => (
              <GenreCard key={index} results={data} />
            )) }
          </div>
        </div>
      </div>
    </>
  );
}

export default GenreCategory;
