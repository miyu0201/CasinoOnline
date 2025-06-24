import React, { useMemo, useState, useEffect } from 'react'
import {
  Button, Row, Col, Input, Card, CardBody, Badge
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { getGames, getCategories, logout } from '../services/api'
import './GameListPage.css' 

function GameListPage() {
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL') 
  const [loading, setLoading] = useState(true)
  const [expandedGames, setExpandedGames] = useState(new Set())

  // Define a color palette for categories
  const categoryColors = [
    'success',    // green
    'primary',    // blue
    'warning',    // yellow
    'danger',     // red
    'info',       // cyan
    'secondary',  // gray
    'dark',       // dark gray
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesData, categoriesData] = await Promise.all([
          getGames(),
          getCategories()
        ])
        console.log('Fetched games:', gamesData)
        console.log('Fetched categories:', categoriesData)
        setGames(gamesData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log('Selected category:', selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    console.log('Search value:', search)
  }, [search])

  //game description
  const toggleDescription = (gameCode) => {
    setExpandedGames(prev => {
      const newSet = new Set(prev)
      if (newSet.has(gameCode)) {
        newSet.delete(gameCode)
      } else {
        newSet.add(gameCode)
      }
      return newSet
    })
  }

  const filteredGames = useMemo(() => {
    let filtered = games
    
    // Filter by category
    if (selectedCategory !== 'ALL') {
      const categoryId = categories.find(cat => cat.name.toUpperCase() === selectedCategory.toUpperCase())?.id
      if (categoryId !== undefined) {
        filtered = filtered.filter(game => game.categoryIds && game.categoryIds.includes(categoryId))
      }
    }

    // Filter by search
    if (search.trim()) {
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    console.log('Filtered games:', filtered)
    return filtered
  }, [games, categories, selectedCategory, search])

  if (loading) {
    return <div className="text-center">Loading games...</div>
  }

  return (
    <div className="container">
      <h2 className="mb-4">Games</h2>
      
      {/* Search and Category Filters */}
      <Row className="mb-3">
        <Col md={6}>
          <Input
            placeholder="Search Game"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <div>
            <Button
              color={selectedCategory === 'ALL' ? 'success' : 'outline-success'}
              className="me-2 mb-2"
              onClick={() => setSelectedCategory('ALL')}
            >
              ALL
            </Button>
            {categories
              .filter(cat => cat.id !== 0) 
              .map(cat => (
                <Button
                  key={cat.id}
                  color={selectedCategory.toUpperCase() === cat.name.toUpperCase() ? 'success' : 'outline-success'}
                  className="me-2 mb-2"
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name.toUpperCase()}
                </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Games Gard*/}
      <Row>
        {filteredGames.length === 0 ? (
          <Col>
            <div className="text-center text-muted">No games found.</div>
          </Col>
        ) : (
          filteredGames.map(game => (
            <Col md={6} lg={4} className="mb-4" key={game.code}>
              <Card className="game-card h-100">
                <div className="game-image-container">
                  <img 
                    src={game.icon}
                    alt={game.name} 
                    className="game-image"
                  />
                  <div className="game-overlay">
                    <Button 
                      className="play-button"
                      onClick={() => { 
                        console.log('Play Now clicked for game:', game.code, game.name)
                        navigate(`/game/${game.code}`)
                      }}
                    >
                      Play Now
                    </Button>
                  </div>
                </div>
                <CardBody className="d-flex flex-column">
                  <div className="mb-3">
                    <h5 className="mb-2 fw-bold">{game.name}</h5>
                    <div className="category-badges">
                      {game.categoryIds && game.categoryIds.map((catId, idx) => {
                        const cat = categories.find(c => c.id === catId);
                        const color = categoryColors[catId % categoryColors.length];
                        return cat && cat.id !== 0 ? (
                          <Badge color={color} className="me-1" key={catId}>
                            {cat.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="game-desc flex-grow-1">
                    <p className={`mb-0 ${!expandedGames.has(game.code) ? 'text-truncate-3' : ''}`}>
                      {game.description}
                    </p>
                    <Button 
                      color="link" 
                      className="p-0 mt-2 text-decoration-none"
                      onClick={() => {
                        console.log('Toggle Read More for game:', game.code, game.name)
                        toggleDescription(game.code)
                      }}
                    >
                      {expandedGames.has(game.code) ? 'Show Less ↑' : 'Read More ↓'}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  )
}

export default GameListPage 