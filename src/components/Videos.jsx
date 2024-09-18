import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import videoImage from "../../public/Images/video-bg-icon.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../style.css';
import { useDetailData } from '../contexts/detailContextProvider';

// import required modules


function Videos({event}) {
  const { videosData } = useDetailData()
  let videofiltredData = []
  
  if (videosData) {
    const videoFilterData = videosData.filter((video ) => (
      video.type === "Teaser"  || video.type === "Trailer" || video.site === "youtube"
    ))

    videofiltredData = [...videoFilterData]
    
  }
  

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        className="mySwiper swiperCard"
      >
        
        
        {!videofiltredData ? <SwiperSlide className='video bg-gray-900'>
          <img
          src={videoImage}
          loading="lazy"
          alt=""
          className="text-center"
          width="100%"
        />
          </SwiperSlide>  
        : videofiltredData.map(({key, name}, index) => (
          <SwiperSlide key={key} className='video '>
            <div key={key} className=' absolute cursor-pointer w-full h-full z-10 bg-[black] opacity-50' onClick={() => event(index, videofiltredData) }></div>
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0`}  title={name}></iframe>
          </SwiperSlide>          
        ) ) }
        
       

      </Swiper>
    </>
  );
}

export default Videos




// // import 'swiper/swiper-bundle.min.css';

// // Function to load the YouTube IFrame API
// function loadYouTubeIFrameAPI() {
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// }

// // Main component
// function VideoSwiper({ event }) {
//     const { videosData } = useDetailData()
//     let videofiltredData = []
  
//   if (videosData) {
//     const videoFilterData = videosData.filter((video ) => (
//       video.type === "Teaser"  || video.type === "Trailer" ||  video.type === "Clip" || video.site === "youtube"
//     ))

//     videofiltredData = [...videoFilterData]
    
//   }
//     const players = useRef([]); // Ref to store YouTube players

//     useEffect(() => {
//         // Load the YouTube IFrame API if not already loaded
//         if (!window.YT) {
//             loadYouTubeIFrameAPI();
//         } else if (window.YT && window.YT.Player) {
//             initializePlayers(); // Initialize players if API is already loaded
//         }

//         // Function to create YouTube players
//         function initializePlayers() {
//             videofiltredData.forEach(({ key }, index) => {
//                 if (!players.current[index] && document.getElementById(`player-${index}`)) {
//                     players.current[index] = new window.YT.Player(`player-${index}`, {
//                         height: '100%',
//                         width: '100%',
//                         videoId: key,
//                         playerVars: {
//                             autoplay: 0,
//                             controls: 1,
//                             modestbranding: 1,
//                             rel: 0,
//                         },
//                     });
//                 }
//             });
//         }

//         // Check when YouTube API is ready
//         window.onYouTubeIframeAPIReady = initializePlayers;

//         // Cleanup players on component unmount
//         return () => {
//             players.current.forEach(player => {
//                 if (player && player.destroy) {
//                     player.destroy();
//                 }
//             });
//         };
//     }, [videofiltredData]);

//     return (
//         <Swiper slidesPerView={4} spaceBetween={30} className="mySwiper swiperCard">
//             {!videofiltredData ? (
//                 <SwiperSlide className='video bg-gray-900'>
//                     <img src={videoImage} loading="lazy" alt="" className="text-center" width="100%" />
//                 </SwiperSlide>
//             ) : (
//                 videofiltredData.map(({ key, name }, index) => (
//                     <SwiperSlide className='video' key={index}>
//                         <div
//                             className='absolute w-full h-full z-10 bg-[black] opacity-50'
//                             onClick={() => event(index, videofiltredData)}
//                         ></div>
//                         {/* Placeholder div for YouTube player */}
//                         <div id={`player-${index}`} className="w-full h-full"></div>
//                     </SwiperSlide>
//                 ))
//             )}
//         </Swiper>
//     );
// }

// export default VideoSwiper;

