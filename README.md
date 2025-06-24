# Casino Online

A modern React-based casino application featuring a collection of slot games and a user authentication system.

## Features

- 🎮 Multiple themed slot games
- 🔐 User authentication system
- 🎯 Game categorization and filtering
- 🔍 Game search functionality
- 📱 Responsive design
- 🖼️ Fullscreen game mode

## Demo Accounts

You can use any of these accounts to test the application:

```
Username: alex
Password: gaming123

Username: sarah
Password: lucky777

Username: mike
Password: jackpot
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
casino-online/
├── src/                # Source files
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   └── services/      # API services
├── public/            # Static files
│   └── images/        # Game and avatar images
└── server.js         # JSON Server configuration
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the JSON server (handles authentication and data):
   ```bash
   node server.js
   ```
   The server will run on port 3001

3. In a new terminal, start the React application:
   ```bash
   npm run dev
   ```
   The application will run on port 5173 by default

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Technologies Used

- ⚛️ React 
- 🛣️ React Router - For navigation
- 🎨 Reactstrap - UI components
- 🔄 JSON Server - Backend mock API
- 🏗️ Vite - Build tool and development server

## Features in Detail

### Authentication
- Secure login system
- User session management
- Protected routes

### Game Management
- Game categorization (ALL, VIDEO SLOTS, SLOT MACHINES)
- Search functionality
- Game filtering by category
- Detailed game descriptions
- Fullscreen game mode

### User Interface
- Modern, responsive design
- Animated game cards
- Category badges
- Expandable game descriptions
- Clean and intuitive navigation

## API Endpoints

The JSON server provides the following endpoints:

- `POST /login` - User authentication
- `POST /logout` - User logout
- `GET /games` - List all games
- `GET /categories` - List game categories

## Development

The application uses:
- Vite for fast development and optimized builds
- JSON Server for mocking a backend API
- React Router for client-side routing
- Reactstrap for responsive UI components
# CasinoOnline
