import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useMovieData} from '../contexts/MovieDataProvider';
import { imageBaseURL } from '../utils/api';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../style.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function SwiperSlider({setIndexNumber}) {

  const swiperRef = useRef(null);
  const { coverMovieData }  = useMovieData()

  const handleIndexUmber = (index) => {
    setIndexNumber(index)
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index); // Move clicked slide to center
    }
  };




  return (
    <>
      <Swiper
        ref={swiperRef}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
       { coverMovieData.map(({ poster_path, title }, index) => {

        
        return <SwiperSlide key={index} onClick={() => {handleIndexUmber(index)} }>
            <img src={`${imageBaseURL}/w500/${poster_path}`} loading='lazy' alt={title} />
        </SwiperSlide>
        
      }) }
       
      </Swiper>
    </>
  );
}
