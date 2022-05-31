import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/portfolio' element={<Portfolio/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes> 
    </>
  )
}

export default App