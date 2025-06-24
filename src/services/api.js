//sets base URL for all API request
const API_URL = 'http://localhost:3001';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};

export const logout = async (username) => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  });
  return response.json();
};

export const getGames = async () => {
  const response = await fetch(`${API_URL}/games`);
  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  return response.json();
}; 