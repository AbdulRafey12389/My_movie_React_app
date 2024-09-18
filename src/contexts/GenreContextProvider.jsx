import React, { createContext, useContext, useState } from 'react'
import { api_key } from '../utils/api';


const GenreContext = createContext(null);


export function GenreContextProvider({children}) {

  const [genreMovieData, setGenreMovieData] = useState([]);
  const [IdForLoadData, setIdForLoadData] = useState(12);
  const [loadingGenreData, setLoadingGenreData] = useState(false)

  let currentPage = 1;

  const genreIdData = async (genreId) => {

  setLoadingGenreData(true)
  await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&page=${currentPage}&sort_by=popularity.desc&with_genres=${genreId}`).then(data => data.json()).then(({results}) => {
    setGenreMovieData(results);
    setLoadingGenreData(false)
  })
  
  setIdForLoadData(genreId)

  }
  

  return (
    <GenreContext.Provider value={{ genreIdData, genreMovieData, IdForLoadData, setGenreMovieData, loadingGenreData }} >
      {children}
    </GenreContext.Provider>
  )
}


export function useGenreData() {
  return useContext(GenreContext);
};


