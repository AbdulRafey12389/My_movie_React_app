import React, { useContext, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import SwiperSlider from "./SwiperSlider";
import MovieCategory from "./MovieCategory";
import GenreCategory from "./GenreCategory";
import { Link, useParams } from "react-router-dom";
import { useMovieData } from "../contexts/MovieDataProvider";
import { imageBaseURL } from '../utils/api';
import { genreRating } from "../utils/constants";
import loadingLogo from "../../public/svg/loading.svg" 
import fevUrl from "../../public/svg/MOVIEFLIX.svg"
import GenreCard from "./GenreCard";





function Home() {
  document.querySelector("link[rel='icon']").href = fevUrl;

  const {coverMovieData, loadingMovieData, valueSearch, searchData} = useMovieData();
  const [indexNumber, setIndexNumber] = useState(0)
  const randomNumber = Math.floor(Math.random() * 21 );
  

  const {
    id: movieId,
    backdrop_path,
    genre_ids,
    overview,
    release_date,
    vote_average,
    title
  } = coverMovieData[indexNumber] || {};

  document.title = `Movieflix`

  const { backdrop_path: randomImage }  = coverMovieData[randomNumber] || {}


  return (
    <>
    <div className={`home-container ${valueSearch ? "hidden" : ""}`}>
        <div className={`${loadingMovieData === true ? "hidden" : "block"} max-w-[90vw] my-0 mx-auto rounded-xl h-80 bg-[#13131D] mt-4`}>
          <img
            src={`${imageBaseURL}/w1280/${randomImage}`}
            alt=""
            className="w-[100%] h-[100%] object-cover rounded-xl"
            loading="lazy"
          />
        </div>

        <div className={` ${loadingMovieData === true ? "hidden" : "block"} home-detail relative max-w-[90vw] my-0 mx-auto rounded-xl mt-4 min-h-[47rem] bg-center bg-no-repeat bg-cover `} style={{ backgroundImage:  `url('${imageBaseURL}/w1280/${backdrop_path}'`}}>
          <div className=" absolute w-[100%] min-h-[100%] bg-[#0000009a]">
          <div
              className="  max-w-[60vw] lg:max-w-[90%] sm:max-w-[80%]
             mt-16 ml-12 sm:ml-16"
            >
              <h1 className="text-white text-over truncate font-black text-2xl sm:text-5xl">
                { title }
              </h1>
              <p className="mt-3 sm:mt-6">
                <span className="font-semibold mr-3 text-xl text-[#dedee2]">
                  { release_date && release_date.split('-')[0] }
                </span>{" "}
                <span className=" font-semibold text-sm rounded-md bg-[#313036] text-white p-1">
                  {Math.round(vote_average * 10) / 10 }
                </span>
              </p>
              <p className="mt-3 sm:mt-6 font-semibold text-[#dedee2]">
                {genre_ids? genreRating.asString(genre_ids) : "" }
              </p>
              <p className="mt-2 leading-[15px] sm:leading-5 text-sm sm:text-1xl sm:mt-6 font-medium text-[#dedee2] lg:max-w-[50vw] 2xl:max-w-[30vw] h-[140px] overflow-hidden">
                { overview }
              </p>
              <Link to={`/movie/Movies:${movieId}`} className=" inline-block w-max">
                <button className="mt-5 sm:mt-1 flex items-center justify-center gap-2 bg-[#20203b] rounded-md py-2 px-3 text-white font-semibold">
                  <FaPlay /> More Detail
                </button>
              </Link>
            </div>
            <SwiperSlider setIndexNumber={setIndexNumber}  />
          </div>
        </div>

        { loadingMovieData === true ? <img src={loadingLogo} loading="lazy" alt={title} className="text-center m-2 relative left-[30%] sm:left-[40%]" width="100px" /> : "" }

        <MovieCategory />
        <GenreCategory />
      </div>

    
    <div className={`search-container ${!valueSearch ? "hidden" : ""} pb-4  relative max-w-[90vw] my-0 mx-auto rounded-xl mt-4 bg-center bg-no-repeat bg-cover bg-[#13131D]`}>
      <h1 className="text-[#6f32ff] text-3xl font-black truncate pt-5 pl-4">Result For: <span className="text-white text-2xl capitalize" >{valueSearch}</span> </h1>
      <div className="grid gap-6 px-4 grid-cols-[repeat(auto-fit,_minmax(195px,_1fr))]">
        { searchData.results?.map((value) => (
          <GenreCard results={value} /> 
        )) }
      </div>
    </div>
    </>
  );
}

export default Home;
