import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Audience from './components/Audience/Audience'
import Layout from './Layout'
import Login from './components/Login/Login'
import Campaign from './components/Campaign/Campaign'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<Login/>} />
        <Route path='audience' element={<Audience/>} />
        <Route path='campaign' element={<Campaign/>} />
      </Route>
    </Route>     
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
