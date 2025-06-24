import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import GameListPage from './pages/GameListPage'
import GamePage from './pages/GamePage'
import './App.css'

function App() {
  const [player, setPlayer] = useState(null)

  const handleLogin = (playerData) => {
    setPlayer(playerData)
  }

  const handleLogout = () => {
    setPlayer(null)
  }

  return (
    <Router>
      {player && <Header player={player} onLogout={handleLogout} />}
      <div>
        <Routes>
          <Route 
            path="/login" 
            element={
              player ? <Navigate to="/games" /> : 
              <LoginPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/games" 
            element={
              player ? 
              <GameListPage /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/game/:id" 
            element={
              player ? 
              <GamePage /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="*" 
            element={
              <Navigate to={player ? "/games" : "/login"} />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
