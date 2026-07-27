import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

import AppLayout from './layouts/AppLayout.tsx'
import Home from './pages/Home/Home.tsx'
import Leaderboards from './pages/Leaderboards/Leaderboards.tsx'
import Account from './pages/Account/Account.tsx'

import ErrorPage from './pages/Error/ErrorPage.tsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    errorElement: <ErrorPage message={"Something went wrong..."} sendHome= {true}/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'leaderboards',
        element: <Leaderboards/>
      },
      {
        path: '/accounts/:region/:gameName/:tagLine',
        element: <Account/>
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
