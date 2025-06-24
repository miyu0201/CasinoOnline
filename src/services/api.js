import localData from '../../db.json';

//sets base URL for all API request
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001';

const handleApiCall = async (apiCall, fallbackData) => {
  try {
    const response = await apiCall();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('API call failed, using local data:', error.message);
    return fallbackData;
  }
};

export const login = async (username, password) => {
  return handleApiCall(
    async () => {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    },
    // Fallback login logic
    (() => {
      if (localData.players[username] && localData.players[username].password === password) {
        const player = { ...localData.players[username] };
        delete player.password;
        return {
          status: 'success',
          player
        };
      }
      return {
        status: 'fail',
        error: 'player does not exist or wrong password'
      };
    })()
  );
};

export const logout = async (username) => {
  return handleApiCall(
    async () => {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    },
    { status: 'success' }
  );
};

export const getGames = async () => {
  return handleApiCall(
    async () => {
      const response = await fetch(`${API_URL}/games`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    },
    localData.games
  );
};

export const getCategories = async () => {
  return handleApiCall(
    async () => {
      const response = await fetch(`${API_URL}/categories`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    },
    localData.categories
  );
};