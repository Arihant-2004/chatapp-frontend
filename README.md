# Real-Time Chat Application

A real-time chat app built with React, Redux, and Socket.IO featuring rooms, typing indicators, message history, and more.

---

## 🌐 Live Demo

🔗 [Click here to visit the live website](https://doctorappointmentsystem-kappa.vercel.app/)



## Features

- Real-time messaging with Socket.IO
- Chat rooms and message history
- Typing indicators (start/stop)
- File attachment support (UI ready)
- Responsive UI with Material-UI
- Error handling and alerts

---

## Tech Stack

React, Redux Toolkit, Socket.IO, Node.js, Express, Material-UI

---

## Installation & Run

Open a terminal and run the following commands:

```bash
# Clone repo
git clone https://github.com/yourusername/your-chat-app.git
cd your-chat-app

# Install dependencies
npm install

# Start backend and frontend concurrently (if configured, otherwise run separately)
npm run dev

# If no concurrent script, run backend and frontend separately:
# In one terminal window (backend)
cd server
npm install
npm run dev

# In another terminal window (frontend)
cd client
npm install
npm start
