# Todo List App

Welcome to the Todo List App — a modern and minimal task management tool built using a powerful full-stack JavaScript stack.


## Demo

[Live App](https://todo-list-eys1.vercel.app/)


## Technologies Used

**Frontend:**

- **React** – for building dynamic and interactive user interfaces  
- **Recoil** – for state management within React  
- **Sass (SCSS)** – for modular and maintainable styling  
- **Framer Motion** – for smooth animations and transitions  

**Backend:**

- **Node.js** – backend runtime environment  
- **Express.js** – for handling backend routing and API logic  
- **dotenv** – for managing environment variables  

**Authentication & Security:**

- **jsonwebtoken** – implements stateless authentication using JSON Web Tokens  
- **bcrypt** – securely hashes and compares user passwords  
- **cookie-parser** – parses and manages cookies on incoming requests  

**Validation & Middleware:**

- **express-validator** – validates and sanitizes incoming request data  

**Database:**

- **MongoDB** – document-based NoSQL database for storing tasks and user data  
- **Mongoose** – elegant MongoDB object modeling for Node.js  


## Project Structure

```markdown
project-root/
├── client/ # React frontend
│ ├── public/ # Static frontend assets (index.html, images, etc.)
│ ├── src/ # React source code (components, pages, styles)
│ ├── package.json # Frontend dependencies and scripts
│ └── package-lock.json # Lockfile for frontend dependencies
├── server/ # Express backend
│ ├── controllers/ # Request handlers and business logic
│ ├── Dtos/ # Data Transfer Objects
│ ├── middlewares/ # Express middleware functions
│ ├── models/ # Mongoose schemas and models
│ ├── routers/ # Route definitions
│ ├── services/ # Services and utilities for business logic
│ ├── utils/ # Helper functions
│ ├── server.js # Entry point of the backend server
│ ├── package.json # Backend dependencies and scripts
│ └── package-lock.json # Lockfile for backend dependencies
├── package.json # Root project dependencies and scripts
├── package-lock.json # Root lockfile
└── README.md # Project documentation


## Requirements

Make sure you have the following installed on your machine:

- Node.js (v18+ recommended)  
- npm or yarn  
- MongoDB (local or Atlas)


## Setup Instructions

1. Clone the repository  
2. Install dependencies:  

```bash
npm install

3. Create `.env` files in the root and server directories based on `.env.example`
4. Start the development environment: 

This will concurrently run both frontend and backend using a development proxy setup.


## Features

- User registration and login (JWT-based auth)  
- Add, edit, delete tasks  
- Mark tasks as complete/incomplete  
- Smooth UI transitions with Framer Motion  
- Secure password hashing with bcrypt  
- Form validation using express-validator  
- Protected routes with token-based auth  
- Lightweight REST API built with Express  
- MongoDB data persistence via Mongoose  


## Build for Production

To build the frontend for production:

Then serve the static files using a Node.js server or deploy to hosting services like Vercel (frontend) and Render, Railway, or VPS (backend).


## Contributing

This is an open-source project. Contributions are welcome — feel free to fork, open issues, or submit pull requests with improvements or new features.


## License

MIT License