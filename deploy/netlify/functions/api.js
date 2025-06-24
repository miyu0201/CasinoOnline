const db = require('../../db.json');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    console.log('Request path:', path);
    console.log('Request method:', event.httpMethod);
    console.log('Request body:', event.body);

    // Handle login
    if (path === '/login' && event.httpMethod === 'POST') {
      const { username, password } = JSON.parse(event.body);
      console.log('Login attempt for username:', username);
      
      if (!username || !password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            status: 'fail',
            error: 'username and password are required'
          })
        };
      }

      if (db.players && db.players[username] && db.players[username].password === password) {
        const player = { ...db.players[username] };
        delete player.password;
        console.log('Login successful for:', username);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            status: 'success',
            player
          })
        };
      } else {
        console.log('Login failed for:', username);
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
      console.log('Logout request for:', username);
      
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

    console.log('Route not found:', path);
    // Handle 404
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not Found' })
    };

  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message 
      })
    };
  }
}; 