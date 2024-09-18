import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import person from "../../public/Images/person.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../style.css';

// import required modules

import { imageBaseURL } from '../utils/api';
import useCardType from '../contexts/CardTypeProvider';

export default function MovieCard( { results }) {

  
  
  
  const { type } = useCardType()
  
  let data = [];
  if (results) {
    data = [...results]
  }
  

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        className="mySwiper swiperCard"
      >
        { data.map(({ id, backdrop_path, title }, index) => (
          <SwiperSlide key={index} className='card'>
          <Link to={`/movie/${type}:${id}`} className=' relative z-10 '>
            <img src={!backdrop_path ? `${person}` :  `${imageBaseURL}/w500/${backdrop_path}`} loading='lazy' alt={title} />
          </Link>
          </SwiperSlide>          
        )) }

      </Swiper>
    </>
  );
}
