import { useEffect } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CharacterCount from './components/CharacterCount'
import Home from './components/Home'
import NavPrimary from './components/NavPrimary'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
  }, [])

  return (
    <div id="page">
      <div id="nav-primary">
        <NavPrimary />
      </div>
      <h1>Lang<strong>Tools</strong></h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character-count" element={<CharacterCount />} />
      </Routes>
    </div>
  )
}

export default App
