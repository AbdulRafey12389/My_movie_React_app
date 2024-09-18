import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchDataFromServer, api_key } from '../utils/api';


const MovieDataContext = createContext(null);



export function MovieDataProvider({children}) {

  const [coverMovieData, setCoverMovieData] = useState([]);
  const [loadingMovieData, setLoadingMovieData] = useState(false)
  const [valueSearch, setvalueSearch] = useState("")
  const [searchData, setDearchData] = useState([])



  useEffect(() => {
    try {
      ;(async () => {
        setLoadingMovieData(true)
        const Data = await fetchDataFromServer("https://api.themoviedb.org/3/movie/popular");
        setCoverMovieData(Data.results);
        setLoadingMovieData(false)
      })()

    } catch (error) {
      console.log("error rendering cover movie data", error.message);
      throw error;
      
    }

  }, []);

  const handleSearchBtn = async (event) => {
    setLoadingMovieData(true)
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${event.target.value}&include_adult=true&api_key=${api_key}&page=1`
    ).then((data) => data.json())
      .then((response) => {
        setDearchData(response)
        setvalueSearch(event.target.value)
        setLoadingMovieData(false)
      });
    
  };

  return (

    <MovieDataContext.Provider value={ {coverMovieData, loadingMovieData, handleSearchBtn, valueSearch, searchData, setDearchData} }>
      {children}
    </MovieDataContext.Provider>
  )
}

export const useMovieData = () => {
  return useContext(MovieDataContext);
};

 
