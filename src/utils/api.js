import axios from "axios";

export const api_key = 'd2f772e6a8589971014181f345d1728f';

export const imageBaseURL = 'https://image.tmdb.org/t/p/';


// fetch data from server by api and api_key...
export const fetchDataFromServer = function(url, optionalParam) {
   
   try {

      return axios.get(`${url}?api_key=${api_key}`).then(data => { return data.data; })
      
   } catch (error) {
      
      console.log("Error Fetching Data", error.message);
      throw error;
      
   }
};




