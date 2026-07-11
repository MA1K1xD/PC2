import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Link, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

function App() {


  return (
    <>
      <BrowserRouter>
      
        <Link to = {"/Register"} element = {<Register/>}>Registrarase</Link>
        <Link to = {"/login"} element = {<Login/>}> Login</Link>
        <Link to = {"/"} element = {<Register/>}></Link>
      
      </BrowserRouter>
    </>
  )
}

export default App 



