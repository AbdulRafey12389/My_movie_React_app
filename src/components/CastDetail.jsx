import React, { useEffect } from 'react'
import loadingLogo from "../../public/svg/loading.svg"
import { useParams } from 'react-router-dom'
import { useCastData } from '../contexts/CastDetailContext'
import { imageBaseURL } from '../utils/api'
import Casts from './Casts'
import MovieCard from './MovieCard'



function CastDetail() {
  const { castId } = useParams()
  const { CastPageId, loadingDetailPage,  castDetaildata, peopleDetaildata} = useCastData()

  useEffect(() => {
    CastPageId(castId)
  }, [castId])
  

  const {
    also_known_as,
    biography,
    birthday,
    gender,
    images: {profiles} = {},
    known_for_department,
    name,
    place_of_birth,
    profile_path,
    movie_credits,
    tv_credits
  } = castDetaildata || {};

  
  const popularPeople = peopleDetaildata[0] || [];
  const trendingPeople = peopleDetaildata[1] || [];

  const getpeopleHobbies = (hobies) => {
    let newList = []
    if(hobies) {
      for (const  name of hobies) {
        newList.push(name);
      }

    }
    
    return newList.join(", ")

  }

  const getGender = (genders) => {
    let peopleGender = ''
    if (genders === 1) {
      peopleGender = "Female"
    }else if(genders === 2) {
      peopleGender = "Male"
    }else {
      peopleGender = "Gay"
    }
    
    return peopleGender

  }


  let filePath;

  if (profiles) {
    filePath = profiles[Math.floor(Math.random() * profiles.length)].file_path;
 
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
          className={`detail-page relative max-w-[90vw] mt-4 mx-auto h-[98rem] lg:h-[65rem] `}
        >
          <div className='w-full h-full absolute rounded-lg bg-center bg-cover blur-[3px]' style={{ backgroundImage: `url('${imageBaseURL}/w1280/${filePath}'`}}></div>

          <div className=" absolute rounded-lg w-[100%] h-full lg:h-full z-0  bg-black opacity-75 "> </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start pt-20 justify-between overlay rounded-lg w-[100%] h-full lg:h-full z-1">
            <div className="imageCard relative lg:sticky lg:top-2 lg:mb-2 min-w-[300px] min-h-[430px] rounded-2xl ml-14 lg:min-w-[320px] lg:h-[450px]  text-white overflow-hidden">
              <img
                src={`${imageBaseURL}/w500/${profile_path}`}
                loading="lazy"
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="contentCard w-[85%] sm:w-[91%] lg:ml-0 ml-14 h-[90%] lg:h-[100%] lg:w-[78%] z-10 overflow-hidden">
              <h1 className="text-white mt-1 text-over h-[60px] truncate font-black text-2xl sm:text-5xl">
                { name }
              </h1>
              <div className="flex flex-wrap justify-start gap-3 items-center text-gray-300 mt-4 font-semibold">
                <p className="flex items-center gap-1">
                  { also_known_as && getpeopleHobbies(also_known_as) }
                </p>

                <p>{ birthday && birthday.split("-")[0]} </p>
                <p className="text-white bg-gray-600 font-bold rounded-lg px-1 py-0">
                  { known_for_department }
                </p>
                <button className="py-1 rounded-lg text-white px-2 bg-[#940404]">
                  { place_of_birth }
                </button>

              </div>
              <div className="mt-4 text-gray-300 font-semibold">
                { gender && getGender(gender) }
              </div>
              <p className="mt-4 text-lg font-semibold lg:w-[700px] text-[#838383] h-[200px] overflow-auto">
                { biography }
              </p>

              <h1 className="mt-3 text-3xl font-black text-white">Popular Peoples</h1>
              <Casts cast={popularPeople.results} />
              <h1 className="mt-8 text-3xl font-black text-white">Trending Peoples</h1>
              <Casts cast={trendingPeople.results} />
            </div>
          </div>
        </div>
        <div className="w-[90%] min-h-80 my-0 mx-auto rounded-lg bg-[#1b1b1f] mt-4 p-4">
          <h1 className=" font-black text-white text-3xl ">Movies Work In</h1>
          <MovieCard results={movie_credits && movie_credits.cast} />           
        </div>
        <div className="w-[90%] min-h-80 my-0 mx-auto rounded-lg bg-[#1b1b1f] mt-4 p-4">
          <h1 className=" font-black text-white text-3xl ">Tv Show Work in</h1>
          <MovieCard results={tv_credits && tv_credits.cast} />  
        </div>
      </>
    )} 
  </>
  )
}

export default CastDetail;
