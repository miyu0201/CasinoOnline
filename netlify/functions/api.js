<<<<<<< HEAD
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
=======
const db = require('../../db.json');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const path = event.path.replace('/.netlify/functions/api', '');
  
  try {
    // Handle login
    if (path === '/login' && event.httpMethod === 'POST') {
      const { username, password } = JSON.parse(event.body);
>>>>>>> 1ffc7ef4d3dd353cbf7e6631ce6896ad9bcb748e
      
      if (db.players[username] && db.players[username].password === password) {
        const player = { ...db.players[username] };
        delete player.password;
<<<<<<< HEAD
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
=======
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            status: 'success',
            player
          })
        };
      } else {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            status: 'fail',
            error: 'player does not exist or wrong password'
          })
        };
      }
    }

    // Handle logout
    if (path === '/logout' && event.httpMethod === 'POST') {
      const { username } = JSON.parse(event.body);
      
      if (username in db.players) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            status: 'success'
          })
        };
      } else {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            status: 'fail',
            error: 'Username does not match!'
          })
        };
      }
    }

    // Handle GET /games
    if (path === '/games' && event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(db.games)
      };
    }

    // Handle GET /categories
    if (path === '/categories' && event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(db.categories)
      };
    }

    // Handle 404
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not Found' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
}; 
>>>>>>> 1ffc7ef4d3dd353cbf7e6631ce6896ad9bcb748e
