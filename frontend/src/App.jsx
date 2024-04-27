import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Success from './Pages/Success/Success';
import Signup from './components/Signup';
import './App.css'

import Authentication from './Pages/Authentication/Authentication';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Authentication/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>
        <Toaster/>
      </Router>
    </>
  )
}

export default App
