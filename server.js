const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
server.use(cors());

// Parse JSON bodies
server.use(jsonServer.bodyParser);

// Custom middleware for authentication
server.use((req, res, next) => {
  if (req.method === 'POST') {
    if (req.path === '/login') {
      const { username, password } = req.body;
      const db = router.db.getState();
      
      if (db.players[username] && db.players[username].password === password) {
        const player = { ...db.players[username] };
        delete player.password;
        return res.json({
          status: 'success',
          player
        });
      } else {
        return res.status(400).json({
          status: 'fail',
          error: 'player does not exist or wrong password'
        });
      }
    } else if (req.path === '/logout') {
      const { username } = req.body;
      const db = router.db.getState();
      
      if (username in db.players) {
        return res.json({
          status: 'success'
        });
      } else {
        return res.status(400).json({
          status: 'fail',
          error: 'Username does not match!'
        });
      }
    }
  }
  next();
});

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3001;

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});