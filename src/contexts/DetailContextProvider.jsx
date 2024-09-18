import React, { createContext, useContext, useEffect, useState } from "react";
import { api_key, fetchDataFromServer } from "../utils/api";

const DetailDataContext = createContext(null);

export function DetailContextProvider({ children }) {
  const [homeDetaildata, setHomeDetaildata] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [loadingDetailPage, setLoadingDetailPage] = useState(false);

  const detailPageId = async (id) => {
    const detailId = Number(id.split(":")[1]);
    const detailType = id.split(":")[0];

    if (detailType === "Movies") {
      try {
        setLoadingDetailPage(true)
        fetch(
          `https://api.themoviedb.org/3/movie/${detailId}?api_key=${api_key}&append_to_response=casts,videos,images,releases,similar,recommendations`
        )
          .then((data) => data.json())
          .then((response) => {
            const {
              casts,
              genres,
              homepage,
              images,
              original_language,
              original_title,
              overview,
              release_date,
              releases: {
                countries: [{ certification }],
              },
              runtime,
              spoken_languages: [{ name }],
              status,
              title,
              videos: { results },
              vote_average,
              similar,
              recommendations
            } = response;
            

            setHomeDetaildata({
              genres,
              homepage,
              original_language,
              original_title,
              overview,
              release_date,
              certification,
              runtime,
              name,
              status,
              title,
              vote_average,
              images,
              casts,
              similar,
              recommendations
            });
            setVideosData(results);
            setLoadingDetailPage(false);
          });
      } catch (error) {
        console.log("Error Fetching Detailing page data: ", error.messag);
        throw error;
        
      }
    } else if (detailType === "Tv-show") {
      try {
        setLoadingDetailPage(true)
        fetch(
          `https://api.themoviedb.org/3/tv/${detailId}?api_key=${api_key}&append_to_response=credits,videos,images,similar,recommendations`
        )
          .then((data) => data.json())
          .then((response) => {
            const {
              credits: casts,
              genres,
              homepage,
              images,
              original_language,
              original_name: original_title,
              overview,
              first_air_date: release_date,
              runtime,
              spoken_languages: [{ name }],
              status,
              name: title,
              videos: { results },
              vote_average,
              similar,
              recommendations
            } = response;
            

            setHomeDetaildata({
              genres,
              homepage,
              original_language,
              original_title,
              overview,
              release_date,
              certification: "Series",
              runtime,
              name,
              status,
              title,
              vote_average,
              images,
              casts,
              similar,
              recommendations
            });
            setVideosData(results);
            setLoadingDetailPage(false);
          });
      } catch (error) {
        console.log("Error Fetching Detailing page data: ", error.messag);
        throw error;
        
      }
    }
  };
  
  return (
    <DetailDataContext.Provider value={{ detailPageId, loadingDetailPage, homeDetaildata, videosData }}>
      {children}
    </DetailDataContext.Provider>
  );
}

export const useDetailData = () => {
  return useContext(DetailDataContext);
};
