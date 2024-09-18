import React, { useState, useEffect } from "react";
import { useGenreData } from "../contexts/GenreContextProvider";
import { api_key } from "../utils/api";
import loadingLogo from "../../public/svg/loading.svg"
import { useMovieData } from "../contexts/MovieDataProvider";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();
  const { valueSearch, searchData, setDearchData } = useMovieData()

  const {
    IdForLoadData,
    genreMovieData,
    setGenreMovieData,
  } = useGenreData();


  const [totalPages, setTotalPages] = useState();
  const [loadBtn, setLoadBtn] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false)

  let currentPage = 1;
  const id = Number(IdForLoadData);

  const handleLoadBtn = async () => {


    if (currentPage >= totalPages) {
      setLoadBtn(true);
      return;
    }



    currentPage++;
    setCheckLoading(true)
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&page=${currentPage}&sort_by=popularity.desc&with_genres=${id}`
    );

    const { results, total_pages } = await response.json();

    setTotalPages(total_pages);

    setGenreMovieData([...genreMovieData, ...results]);
    setCheckLoading(false)

  };


  const handleBackTopBtn = (e) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll effect
    });
  };


  return (
    <>
      <div className=" flex sm:flex-row flex-col py-3 sm:py-0 gap-3 sm:gap-0 items-center justify-between mt-4 px-10 max-w-[90vw] min-h-[6rem] my-0 mx-auto rounded-lg bg-[#13131D]">
        <button onClick={handleBackTopBtn} className="bg-[#20203b] rounded-md py-2 px-3 text-white font-semibold cursor-pointer">
          Back To Top
        </button>
        <p className={`font-black text-white text-xl`}>Abdul_Rafey © 2024</p>

        {pathname === "/" ? <button
          onClick={handleLoadBtn}
          className={` flex items-center justify-center gap-2 bg-[#20203b] rounded-md py-2 px-3 text-white font-semibold cursor-pointer ${loadBtn === true ? "opacity-40 pointer-events-none" : ""
            } ${checkLoading && "opacity-40 pointer-events-none"} ${valueSearch ? "opacity-40 pointer-events-none" : ""
            }`}
        >
          {checkLoading === true ? <img src={loadingLogo} width="25px" alt="" /> : ""}
          Load More
        </button> : <Link to="/" className="w-max" >
          <button
            className={` flex items-center justify-center gap-2 bg-[#20203b] rounded-md py-2 px-3 text-white font-semibold cursor-pointer`}
          >
            Back to Home
          </button>
        </Link>}




      </div>
    </>
  );
}

export default Footer;
