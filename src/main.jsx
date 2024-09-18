import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import MovieCategory from './components/MovieCategory.jsx'
import Detail from './components/Detail.jsx'
import CastDetail from './components/CastDetail.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='' element={<MovieCategory />} />
      <Route path='/movie/:movieId' element={<Detail />} />
      <Route path='/cast/:castId' element={<CastDetail />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
