import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Videos from "./Videos";
import Casts from "./Casts";
import MovieCard from "./MovieCard";
import { useDetailData } from "../contexts/detailContextProvider";
import star from "../../public/Images/star.png";
import loadingLogo from "../../public/svg/loading.svg";
import { getImages } from "../utils/getImages";
import crossBtn from "../../public/Images/close.png"

function Detail() {
  const { movieId } = useParams();
  const { detailPageId, loadingDetailPage, homeDetaildata} = useDetailData();
  const [videoOverlayData, setVideoOverlayData] = useState(null);
  const [overlay, setOverlay] = useState(false);

  
  useEffect(() => {
    detailPageId(movieId);
  }, [movieId]);

  // GENRE DATA WORK...
  const {
     genres,
     homepage,
     images,
     name,
     original_language,
     overview,
     release_date,
     certification,
     runtime,
     status,
     title,
     vote_average,
     casts: { cast, crew } = {},
     similar,
     recommendations
    } = homeDetaildata || [];


    document.title = `${title} - Movieflix`
    

    const getGenre = (genre) => {
      let newList = []
      if(genre) {
        for (const  { name } of genre) {
          newList.push(name);
        }

      }
      
      return newList.join(", ")

    }

    const { backdropImageUrl, logoImageUrl, posterImageUrl } = getImages(images, original_language)
    

    document.querySelector("link[rel='icon']").href = logoImageUrl;


    const hanldeVideoBtn = (index, video) => {
      setVideoOverlayData(video[index])
      document.body.style.overflow = 'hidden';
      setOverlay(true)
      
      
    }
    
    const handleCloseBtn = () => {
      document.body.style.overflow = '';
      setOverlay(false)
      setVideoOverlayData(null)

    } 


  return (
    <>
      {loadingDetailPage === true ? (
        <img
          src={loadingLogo}
          loading="lazy"
          alt=""
          className="text-center m-2 relative left-[30%] sm:left-[40%]"
          width="100px"
        />
      ) : (
        <>
          {" "}
          <div
            className={`detail-page relative max-w-[90vw] mt-4 mx-auto h-[115rem] lg:h-[80rem] `}
          >
            <div className='w-full h-full absolute rounded-lg bg-center bg-cover blur-[3px]' style={{ backgroundImage: `url('${backdropImageUrl}'`}}></div>

            <div className=" absolute rounded-lg w-[100%] h-full lg:h-full z-0  bg-black opacity-75 "> </div>

            <div className="flex flex-col lg:flex-row gap-4 items-start pt-20 justify-between overlay rounded-lg w-[100%] h-full lg:h-full z-1">
              <div className="imageCard relative lg:sticky lg:top-2 lg:mb-2 min-w-[300px] min-h-[430px] rounded-2xl ml-14 lg:min-w-[320px] lg:h-[450px]  text-white overflow-hidden">
                <img
                  src={posterImageUrl}
                  loading="lazy"
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="contentCard w-[85%] sm:w-[91%] lg:ml-0 ml-14 h-[90%] lg:h-[100%] lg:w-[78%] z-10 overflow-hidden">
                <h1 className="text-white mt-1 h-[60px] text-over truncate font-black text-2xl sm:text-5xl">
                  {title}
                </h1>
                <div className="flex flex-wrap justify-start gap-3 items-center text-gray-300 mt-4 font-semibold">
                  <p className="flex items-center gap-1">
                    <img src={star} alt="" className="w-[27px] pb-1" /> {vote_average && vote_average.toFixed(1)}
                  </p>
                  <p>{runtime}m</p>
                  <p>{release_date && release_date.split("-")[0]}</p>
                  <p>{status}</p>
                  <p>{name}</p>
                  <p className="text-white bg-gray-600 font-bold rounded-lg px-1 py-0">
                    {certification}
                  </p>
                  <a href={homepage} className="w-max  decoration-none">
                    <button className="py-1 rounded-lg text-white px-2 bg-[#940404]">
                      Visit_now
                    </button>
                  </a>
                </div>
                <div className="mt-4 text-gray-300 font-semibold">
                  { getGenre(genres) }
                </div>
                <p className="mt-4 text-lg font-semibold lg:w-[700px] text-[#838383] h-[140px] overflow-auto">
                  { overview }
                </p>
                <h1 className="mt-10 text-3xl font-black text-white">
                  Trailer And Clips
                </h1>
                <Videos event={hanldeVideoBtn} />
                <h1 className="mt-10 text-3xl font-black text-white">Casts</h1>
                <Casts cast={cast} />
                <h1 className="mt-10 text-3xl font-black text-white">Group Of People</h1>
                <Casts cast={crew} />
              </div>
            </div>
          </div>
          <div className="w-[90%] min-h-80 my-0 mx-auto rounded-lg bg-[#1b1b1f] mt-4 p-4">
            <h1 className=" font-black text-white text-3xl ">Similar</h1>
            <MovieCard results={recommendations && recommendations.results} />           
          </div>
          <div className="w-[90%] min-h-80 my-0 mx-auto rounded-lg bg-[#1b1b1f] mt-4 p-4">
            <h1 className=" font-black text-white text-3xl ">Recomanded</h1>
            <MovieCard results={similar && similar.results} />           
          </div>


          <div className={`${overlay === true ? "scale-1 " : "scale-0 "} fixed transition-all ease-linear delay-100 duration-500 flex items-center justify-center overlayForVideo top-0 left-0 z-20 w-full h-[100vh] `}>
            <img src={crossBtn} onClick={handleCloseBtn} className="cross absolute top-[30%] lg:top-[20%] xl:top-[12%]  right-[50px] sm:right-[50px] lg:right-[90px] xl:right-[170px] cursor-pointer z-40" />
            <div className="w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black opacity-70"></div>
            <div className=" w-[70%] h-[300px] sm:h-[450px] lg:h-[550px] 2xl:h-[750px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black">
              {overlay && 
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoOverlayData?.key}?&theme=dark&color=white&rel=0`}  title={videoOverlayData?.name} allowfullscreen="1"></iframe>
              }
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Detail;
