# Full-Stack AI Multi-Agent Application

A modern, production-structured AI application built with **React**, **Tailwind CSS**, **Node.js + Express**, **MongoDB**, **LangGraph**, **Socket.IO**, **Gemini API / OpenAI API**, and **Recharts**.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) + Tailwind CSS | Fast, glassmorphic dark-mode UI with Lucide icons |
| **Backend** | Node.js + Express.js | Modular RESTful API and WebSocket engine |
| **Database** | MongoDB + Mongoose | Data models for Users, Agent Sessions, and Analytics |
| **AI / LLM** | Gemini API / OpenAI API | Flexible LLM factory with simulated fallback mode |
| **Agent Framework** | LangGraph (`@langchain/langgraph`) | StateGraph multi-agent pipeline (Planner, Researcher, Synthesizer) |
| **Real-Time Stream** | Socket.IO / WebSockets | Bi-directional real-time stream of agent thought processes |
| **Authentication** | Clerk / Custom JWT | Dual auth support (JWT tokens + Clerk ready) |
| **Visualization** | Recharts | Responsive Area, Bar, Pie, and Line charts |
| **API Testing** | Postman / REST Client | Built-in `/api/health`, `/api/agents`, `/api/analytics` endpoints |
| **Version Control** | Git + GitHub | Clean monorepo structure with `.gitignore` |

---

## 📁 Project Structure

```
AI PROJECT/
├── frontend/                     # React.js + Tailwind CSS + Recharts + Socket.IO
│   ├── src/
│   │   ├── components/          # Navbar, Sidebar, AgentGraphVisualizer, MetricsOverview
│   │   ├── context/             # AuthContext, SocketContext
│   │   ├── pages/               # AgentStudio, AnalyticsDashboard, ArchitectureOverview, AuthModal
│   │   ├── services/            # api.js (Axios), socket.js (Socket.IO client)
│   │   ├── App.jsx              # Main application router & view switcher
│   │   ├── index.css            # Tailwind & glassmorphism theme
│   │   └── main.jsx             # React root with providers
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/                      # Node.js + Express + MongoDB + LangGraph + Socket.IO
│   ├── src/
│   │   ├── agents/              # LangGraph state definition, agent nodes, StateGraph workflow
│   │   ├── config/              # MongoDB connection (db.js), LLM factory (llm.js)
│   │   ├── controllers/         # agentController, authController, analyticsController
│   │   ├── middleware/          # auth.js, errorHandler.js
│   │   ├── models/              # User.js, AgentSession.js, Analytics.js
│   │   ├── routes/              # authRoutes.js, agentRoutes.js, analyticsRoutes.js
│   │   ├── sockets/             # agentSocket.js (Real-time LangGraph streaming)
│   │   └── server.js            # Express + Socket.IO bootstrap
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── package.json                  # Root monorepo scripts
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/ai_project_db
JWT_SECRET=your_jwt_secret_key
DEFAULT_LLM_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

### 2. Run Locally

#### Start the Backend:
```bash
cd backend
npm run dev
```
Backend will start on `http://localhost:5000` with WebSockets on `ws://localhost:5000`.

#### Start the Frontend:
```bash
cd frontend
npm run dev
```
Frontend will start on `http://localhost:5173`.

---

## 📡 API Endpoints (Postman Testing)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health telemetry & active WebSocket connection count |
| `POST` | `/api/agents/run` | Execute LangGraph workflow synchronously (`{ "task": "..." }`) |
| `GET` | `/api/agents/sessions` | Fetch past execution logs & graph plans |
| `GET` | `/api/analytics/metrics` | Recharts KPI data (requests, latency, agent distribution) |
| `POST` | `/api/auth/register` | Register new user with name, email, password |
| `POST` | `/api/auth/login` | Login user and obtain JWT bearer token |
| `GET` | `/api/auth/me` | Fetch authenticated user profile (`Bearer <token>`) |

---

## ⚡ Real-Time WebSocket Events (Socket.IO)

- **Emit from Client:**
  - `agent:execute` -> `{ task: string, sessionId: string }`
- **Listen on Client:**
  - `agent:status` -> Status updates (`"Initializing LangGraph..."`)
  - `agent:step` -> Real-time updates as individual agent nodes (Planner, Researcher, Synthesizer) complete
  - `agent:complete` -> Final response & compiled graph execution state
  - `agent:error` -> Error notifications
