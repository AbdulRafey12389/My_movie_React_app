import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "../style.css";
import { imageBaseURL } from "../utils/api";
import personLogo from "../../public/Images/person.png"

function Casts({ cast }) {
 let castArr = []

  if(cast) {
    castArr = [...cast]
  }
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        className="mySwiper swiperCard"
      >
        {castArr.map(({ id, profile_path, name }, index) => (
          <SwiperSlide key={index} className="cast">
            <Link to={`/cast/${id}`} className=" relative z-10 ">
                <img
                src={profile_path === null ? `${personLogo}` : `${imageBaseURL}/w500/${profile_path}`}
                // src={`${imageBaseURL}/w500/${profile_path}`}
                alt={name}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Casts;
