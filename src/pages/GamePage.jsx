import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './GamePage.css'
import gamesData from '../../db.json'

function GamePage() {
  const { id } = useParams()
  const gameContainerRef = useRef(null)
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setUsingFallback(false)
    
    // First try the API
    fetch('http://localhost:3001/games')
      .then(res => {
        if (!res.ok) {
          throw new Error('API response was not ok')
        }
        return res.json()
      })
      .then(data => {
        const foundGame = data.find(g => g.code === id)
        if (foundGame) {
          setGame(foundGame)
        } else {
          setError('Game not found')
        }
      })
      .catch(err => {
        console.log('Failed to load from API, trying fallback data:', err)
        // Fallback to local data
        const fallbackGame = gamesData.games.find(g => g.code === id)
        if (fallbackGame) {
          setGame(fallbackGame)
          setUsingFallback(true)
          setError(null)
        } else {
          setError('Game not found in API or local data')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  // Fullscreen mode handler
  const handleFullScreen = () => {
    const elem = gameContainerRef.current
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    }
  }

  if (loading) {
    return (
      <div className="game-page-container">
        <div className="game-container">
          <h3>Loading...</h3>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="game-page-container">
        <div className="game-container">
          <h3>Error: {error || 'Game not found'}</h3>
          <Link to="/games" className="back-btn">Back to Game List</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="game-page-container">
      <div className="game-container">
        <h3 className="game-title">{game.name}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Link to="/games" className="back-btn">Back to Game List</Link>
          <button
            className="fullscreen-btn-overlay"
            onClick={handleFullScreen}
            title="Full Screen"
          >
            ⛶
          </button>
        </div>
        {usingFallback && (
          <div style={{ 
            backgroundColor: '#fff3cd', 
            color: '#856404', 
            padding: '0.75rem', 
            marginBottom: '1rem', 
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            Note: Using locally stored game data (API unavailable)
          </div>
        )}
        <div
          ref={gameContainerRef}
          className="game-frame-container"
          style={{ position: 'relative', width: '100%', height: '600px' }}
        >
          <iframe
            src={game.url}
            title={game.name}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="fullscreen"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}

export default GamePage