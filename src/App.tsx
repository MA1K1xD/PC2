import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Link } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Link to = {"/Register"} element = {Register}>Registrarase</Link>
      <Link to = {"/login"} element = {Login}> Login</Link>
      </BrowserRouter>
    </>
  )
}

export default App 
