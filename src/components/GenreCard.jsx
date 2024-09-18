import React from 'react'
import { useGenreData } from '../contexts/GenreContextProvider'
import { Link } from 'react-router-dom';
import { imageBaseURL } from '../utils/api';
import person from "../../public/Images/person.png"


function GenreCard({ results }) {
  const { id, poster_path, title } = results

  return (
    <>
      <div className='w-[210px] h-[300px] mt-6 bg-red-100 rounded-lg overflow-hidden'>
        <Link to={`/movie/Movies:${id}`} >
        <img src={` ${!poster_path ? `${person}` : `${imageBaseURL}/w500/${poster_path}`}`} alt={title} loading='lazy' className='w-full h-full object-cover' />
        </Link>
      </div>
    </>
  )
}

export default GenreCard
