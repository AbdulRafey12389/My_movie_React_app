import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchDataFromServer } from '../utils/api';
import { moviePageSections, seriesPageSections } from '../utils/constants';

const CardTypeContext = createContext(null);



export function CardTypeProvider({children}) {

  const [homeSectionData, setHomeSectionMovies] = useState([]);
  const [loadingCardType, setLoadingCardType] = useState(false);
  const [type, setType] = useState("Movies")

  
  const collectType = async (type) => {

    if(type === "Movies") {
      
      setLoadingCardType(true)
      const fetchPromises = moviePageSections.map(({ path }) =>
        fetchDataFromServer(`https://api.themoviedb.org/3/${path}`)
    );
    
    const results = await Promise.all(fetchPromises);
    
    // Map results to movie data with title
    const moviesData = results.map((result, index) => ({
      title: moviePageSections[index].title,
      results: result.results,
    }));
    
    setHomeSectionMovies(moviesData);  
    setLoadingCardType(false)
    setType("Movies")
  } else {
    
    setLoadingCardType(true)
    const fetchPromises = seriesPageSections.map(({ path }) =>
        fetchDataFromServer(`https://api.themoviedb.org/3/${path}`)
    );
    
    const results = await Promise.all(fetchPromises);
    
    const seriesData = results.map((result, index) => ({
      title: seriesPageSections[index].title,
      results: result.results,
    }));

    setHomeSectionMovies(seriesData);  
    setLoadingCardType(false)
    setType("Tv-show")
    
  }

  }
  
  return (
    <CardTypeContext.Provider value={{collectType, homeSectionData, loadingCardType, type}} >
      {children}
    </CardTypeContext.Provider>
  )

}


export default function useCardType() {
  return useContext(CardTypeContext);
};



 
