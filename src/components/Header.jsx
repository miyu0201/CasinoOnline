import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, Button, Row, Col } from 'reactstrap'

function Header({ player, onLogout }) {
  console.log('Header rendered for player:', player.name, 'avatar:', player.avatar)
  return (
    <Navbar color="dark" dark expand="md" className="mb-4 px-4 py-3">
      <Row className="w-100 align-items-center">
        <Col xs="auto" className="d-flex align-items-center">
          <img
            src={`/${player.avatar}`}
            alt={player.name}
            style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 12, border: '2px solid #eee' }}
            className="me-2"
          />
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: 'white', fontWeight: 'bold', textAlign: 'left' }}>{player.name}</div>
            <div style={{ fontSize: 14, color: '#ccc', textAlign: 'left' }}>{player.event}</div>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button color="light" outline onClick={onLogout}>
            Log Out
          </Button>
        </Col>
      </Row>
    </Navbar>
  )
}

export default Header 