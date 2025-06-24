import { useState } from 'react'
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import { login } from '../services/api'
import './LoginPage.css' 

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('alex')
  const [password, setPassword] = useState('gaming123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    console.log('Login form submitted. Username:', username)
    try {
      const response = await login(username, password)
      if (response.status === 'success') {
        console.log('Login successful for user:', username)
        onLogin(response.player)
      } else {
        console.log('Login failed for user:', username, 'Error:', response.error)
        const errMsg = (response.error || '').toLowerCase();
        if (errMsg.includes('player does not exist') && !errMsg.includes('wrong password')) {
          setError('Incorrect username. Please try again.')
        } else if (errMsg.includes('wrong password') && !errMsg.includes('player does not exist')) {
          setError('Incorrect password. Please try again.')
        } else if (errMsg.includes('player does not exist') && errMsg.includes('wrong password')) {
          setError('Incorrect username or password. Please try again.')
        } else {
          setError(response.error || 'Login failed')
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page-container">
      <Card className="login-card mx-auto shadow-lg">
        <CardBody className="p-5">
          <CardTitle tag="h1" className="text-center mb-4 login-title">CASINO ONLINE</CardTitle>
          {error && <Alert color="danger" className="mb-3">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <Label for="username" className="login-label">USERNAME</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={loading}
                className="login-input"
                placeholder="Default: alex"
                autoFocus
              />
            </FormGroup>
            <FormGroup className="mb-4">
              <Label for="password" className="login-label">PASSWORD</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                className="login-input"
                placeholder="Default: gaming123"
              />
            </FormGroup>
            <Button color="primary" block type="submit" disabled={loading} className="login-button">
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default LoginPage 