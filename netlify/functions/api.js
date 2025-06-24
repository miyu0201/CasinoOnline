const jsonServer = require('json-server');
const serverless = require('serverless-http');

// Create an Express server
const app = jsonServer.create();

// Create a router from our db.json file
const router = jsonServer.router('db.json');

// Set default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  }
  next();
});

// Parse JSON bodies
app.use(jsonServer.bodyParser);

// Custom middleware for authentication
app.use((req, res, next) => {
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

app.use(middlewares);
app.use(router);

// Export the serverless function
module.exports.handler = serverless(app); 