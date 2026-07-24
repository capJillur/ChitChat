# 💬 ChitChat - Real-Time Chat Application

App Link

https://chit-chat-khaki-ten.vercel.app

A modern real-time chat application built with **React**, **Node.js**, **Express**, **Socket.IO**, and **MongoDB Atlas**.

Users can exchange messages instantly without refreshing the page while all chat history is persisted in MongoDB and automatically loaded when the application starts.

---

## Features

### Core Features

- ✅ Real-time messaging using Socket.IO
- ✅ Store chat messages in MongoDB Atlas
- ✅ Retrieve previous chat history
- ✅ REST API for sending and fetching messages
- ✅ Instant message broadcasting
- ✅ Auto-scroll to latest message
- ✅ Responsive chat interface
- ✅ Display message timestamps
- ✅ Clean and reusable project architecture
- ✅ Input validation
- ✅ Error handling for API requests
- ✅ Error handling for Socket.IO events

---

## ✨ Bonus Features

- ✅ Dummy username login (LocalStorage)
- ✅ Typing indicator
- ✅ Online user counter
- ✅ Auto reconnect with Socket.IO
- ✅ Loading state while sending messages
- ✅ Empty chat state
- ✅ Enter key to send message
- ✅ Logout functionality

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Socket.IO Client

---

## Backend

- Node.js
- Express.js
- TypeScript
- Socket.IO
- MongoDB Atlas
- Mongoose

---

# 📁 Project Structure

```
ChitChat
│
├── chat-backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── sockets
│   │   ├── utils
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   └── .env
│
├── chat-frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── types
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/chitchat.git

cd chitchat
```

---

# Backend Setup

Navigate to backend

```bash
cd chat-backend
```

Install dependencies

```bash
npm install
```

Create a `.env`

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

CLIENT_URL=http://localhost:5173
```

Run development server

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend

```bash
cd chat-frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api

VITE_SOCKET_URL=http://localhost:5000
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# REST API

## Send Message

**POST**

```
POST /api/messages
```



## Get Chat History

**GET**

```
GET /api/messages
```


# Socket.IO Events

## Client → Server

### user-typing

```ts
socket.emit("user-typing")
```

### user-stop-typing

```ts
socket.emit("user-stop-typing")
```

---

## Server → Client

### new-message

Broadcasts every newly created message.

```ts
socket.on("new-message")
```

---

### online-users

Broadcasts connected user count.

```ts
socket.on("online-users")
```

---

### user-typing

Broadcasts when another user starts typing.

```ts
socket.on("user-typing")
```

---

### user-stop-typing

Broadcasts when another user stops typing.

```ts
socket.on("user-stop-typing")
```

---

# Design Decisions

The application follows a modular architecture to improve maintainability and scalability.

### Backend

- Controller-Service architecture
- Socket events separated into dedicated socket modules
- Environment variables centralized
- Shared API response utility
- MongoDB used for persistent storage

### Frontend

- Reusable components
- Dedicated API layer
- Dedicated Socket service
- Type-safe models using TypeScript
- Local state managed with React Hooks
- Axios instance for API communication

---

# Error Handling

The application gracefully handles:

- Missing username
- Empty messages
- Database connection failures
- Socket disconnections
- Invalid API requests
- Network failures
- Empty chat history

---

# Environment Variables

## Backend

```env
PORT=5000

MONGODB_URI=your_connection_string

CLIENT_URL=http://localhost:5173
```

---

## Frontend

```env
VITE_API_URL=http://localhost:5000/api

VITE_SOCKET_URL=http://localhost:5000
```

---

# Future Improvements

- Private messaging
- User avatars
- Emoji support
- Image sharing
- File uploads
- Read receipts
- Delivered status
- Message reactions
- Group chats
- Infinite scrolling
- Docker support
- Unit & Integration Tests
- CI/CD Pipeline
- Redis Adapter for multi-server Socket.IO deployment

---

# Deployment

## Frontend

Vercel 


## Backend

Render 

## Database

MongoDB Atlas



# Author

**Md Jillur Rahman**


# License

md jillur rahman
