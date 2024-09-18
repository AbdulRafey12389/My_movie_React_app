import { imageBaseURL } from "./api";



export const getImages = (imagesData, lan) => {
  let backdropsData = [];
  let logosData = [];
  let postersData = [];

  if (imagesData) {
    const { backdrops, logos, posters } = imagesData
    for (let i = 0; i < backdrops.length; i++) {
      if (backdrops[i].iso_639_1 === lan) {
        backdropsData.push(backdrops[i].file_path);
      }
    }

    for (let i = 0; i < logos.length; i++) {
      if (logos[i].iso_639_1 === lan) {
        logosData.push(logos[i].file_path);
        
      }
    }

    for (let i = 0; i < posters.length; i++) {
      if (posters[i].iso_639_1 === lan) {
        postersData.push(posters[i].file_path);
      }
    }
    
  }

  let backdropImageUrl = `${imageBaseURL}/w1280/${ backdropsData[Math.floor(Math.random() * backdropsData.length)]}`

  let logoImageUrl = `${imageBaseURL}/w300/${ logosData[Math.floor(Math.random() * logosData.length)]}`

  let posterImageUrl = `${imageBaseURL}/w500/${ postersData[Math.floor(Math.random() * postersData.length)]}`
  

  return { backdropImageUrl, logoImageUrl, posterImageUrl};
  
};