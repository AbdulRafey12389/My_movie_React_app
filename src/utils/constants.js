import { fetchDataFromServer } from "./api";

const genreRating = {
  asString(genreIdList) {

    let newGenreList = [];
    for (const genreId of genreIdList) {
        this[genreId] && newGenreList.push(this[genreId]);
    };
  return newGenreList.join(", ");
}
};

const genreList = {};

try {
  fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list`).then(({genres}) => {

    
    for (const { id, name } of genres) {
      genreRating[id] = name;
      genreList[id] = name;

    }
  })
        
} catch (error) {
  console.log("Error fetching genreRating: ", error.message);
  throw error;
}




export { genreList, genreRating }



export const moviePageSections = [
  {
    title: "Now Playing",
    path: "movie/now_playing"
  },


  {
      title: "Upcoming Movies",
      path: "movie/upcoming"
  },

  
  {
      title: "Week Trending Movies",
      path: "trending/movie/week"
  },

  
  {
      title: "Top Rated Movies",
      path: "movie/top_rated"
  },

];


export const seriesPageSections = [
  {
      title: "Trending Today",
      path: "trending/tv/day"
  },

  
  {
      title: "On the Air",
      path: "tv/popular"
  },

  {
      title: "Popular Tv Show",
      path: "discover/tv"
  },

  {
      title: "TOP Rated Tv Show",
      path: "tv/top_rated"
  }

];
