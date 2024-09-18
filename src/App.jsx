import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import {MovieDataProvider, useMovieData } from './contexts/MovieDataProvider';
import { CardTypeProvider } from './contexts/CardTypeProvider';
import { GenreContextProvider } from './contexts/GenreContextProvider';
import { DetailContextProvider } from './contexts/detailContextProvider';
import { CastDetailContext } from './contexts/CastDetailContext';


function App() {
  return (
    <MovieDataProvider >
      <CardTypeProvider >
        <GenreContextProvider >
          <DetailContextProvider >
            <CastDetailContext >
              <main className='w[100%] min-h-screen bg-[#000013] pt-4 pb-4'>
                <Header />
                  <Outlet />
                <Footer />
              </main>
            </CastDetailContext>
          </DetailContextProvider>
        </GenreContextProvider>
      </CardTypeProvider>
    </MovieDataProvider>
  )
};

export default App;
