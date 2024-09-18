import React, { createContext, useContext, useState } from 'react'
import { api_key, fetchDataFromServer } from '../utils/api';


const CastDetailDataContext = createContext(null);


export function CastDetailContext({ children }) {
  const [castDetaildata, setCastDetaildata] = useState([]);
  const [peopleDetaildata, setPeopleDetaildata] = useState([]);
  const [loadingDetailPage, setLoadingDetailPage] = useState(false);

  const CastPageId = async (id) => {
    

      try {
        setLoadingDetailPage(true)
        fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&append_to_response=popular,images,movie_credits,tv_credits`
        ).then((data) => data.json())
          .then((response) => {
            setCastDetaildata(response)
            
          });

        const popularData = await fetchDataFromServer(`https://api.themoviedb.org/3/person/popular`);

        const trendingData = await fetchDataFromServer(`https://api.themoviedb.org/3/trending/person/week`);
        

        setPeopleDetaildata([popularData, trendingData])
        setLoadingDetailPage(false)
        

      } catch (error) {
        console.log("Error Fetching Detailing page data: ", error.messag);
        throw error;
        
    }
  };
  
  return (
    <CastDetailDataContext.Provider value={{ CastPageId, loadingDetailPage, castDetaildata, peopleDetaildata }}>
      {children}
    </CastDetailDataContext.Provider>
  );
}

export const useCastData = () => {
  return useContext(CastDetailDataContext);
};
