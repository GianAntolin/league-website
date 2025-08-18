import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import HomePage from './pages/HomePage.tsx'
import Leaderboards from './pages/Leaderboards.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import AccountContent from './pages/AccountContent.tsx'
import HomeContent from './pages/HomeContent.tsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <ErrorPage message={"Something went wrong..."} sendHome= {true}/>,
    children: [
      {
        path: '',
        element: <HomeContent/>
      },
      {
        path: 'leaderboards',
        element: <Leaderboards/>
      },
      {
        path: '/account/:region/:gameName/:tagLine',
        element: <AccountContent/>
      }, 
      {
        path: '*',
        element: <ErrorPage message={"This webpage is not available. Please check the URL."} sendHome= {true}/>
      }
    ]
    
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
