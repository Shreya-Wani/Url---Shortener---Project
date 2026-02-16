# ✂️ SnipLink — URL Shortener

A full-stack URL shortener with user authentication, click analytics, QR code generation, and a dark-themed UI with smooth animations.

> **🌐 Live Demo**
> - **Frontend:** [url-shortener-project-jet.vercel.app](https://url-shortener-project-jet.vercel.app)
> - **Backend API:** [url-shortener-api-lo0k.onrender.com](https://url-shortener-api-lo0k.onrender.com)

---

## 📸 Features

| Feature | Description |
| --- | --- |
| 🔗 Shorten URLs | Convert any long URL into a compact short link |
| 🔤 Custom Short Codes | Choose your own memorable alias for a short URL |
| 📊 Click Tracking | Track how many times each short link has been visited |
| 📱 QR Code Generation | Generate & download QR codes for any shortened URL |
| 🔐 User Authentication | Secure signup & login with JWT-based auth |
| 📋 Dashboard | Manage all your URLs — view, copy, delete with pagination |
| 🎨 Dark Mode UI | Polished dark theme with glassmorphism & Framer Motion animations |

---

## 🧱 Tech Stack

### Backend

| Technology | Purpose |
| --- | --- |
| Node.js + Express 5 | REST API framework |
| PostgreSQL | Relational database |
| Drizzle ORM | Type-safe schema & queries |
| JWT + bcrypt | Authentication & password hashing |
| Zod | Request validation |
| Docker Compose | Local PostgreSQL container |

### Frontend

| Technology | Purpose |
| --- | --- |
| React 18 + Vite | SPA framework & dev tooling |
| TailwindCSS | Utility-first styling |
| Framer Motion | Page & component animations |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| Recharts | Analytics charts |
| qrcode.react | QR code generation |
| react-hot-toast + Lucide | Notifications & icons |

### Deployment

| Service | Usage |
| --- | --- |
| [Render](https://render.com/) | Backend API hosting |
| [Vercel](https://vercel.com/) | Frontend hosting (SPA) |
| Neon / Remote PostgreSQL | Production database |

---

## 📁 Project Structure

```
Url-Shortener-Project/
├── backend/
│   ├── controllers/         # URL & user business logic
│   ├── db/                  # Drizzle + PostgreSQL connection
│   ├── middlewares/         # JWT auth middleware
│   ├── models/              # Drizzle table schemas (users, urls)
│   ├── routes/              # Express route definitions
│   ├── utils/               # ApiError, ApiResponse, asyncHandler, hash
│   ├── validation/          # Zod request schemas
│   ├── docker-compose.yml   # Local PostgreSQL setup
│   ├── drizzle.config.js    # Drizzle Kit config
│   └── index.js             # App entry point
│
├── frontend/src/
│   ├── api/                 # Axios instance & API calls
│   ├── components/          # Navbar, UrlTable, QRModal, StatsCard,
│   │                        # Pagination, ProtectedRoute, AnimatedRoutes
│   ├── context/             # AuthContext (JWT state management)
│   ├── pages/               # Landing, Login, Signup, Dashboard
│   ├── App.jsx              # Root component
│   └── index.css            # Global styles
│
└── README.md
```

---

## 🔌 API Reference

### Auth — `POST /api/v1/users`

| Endpoint | Description | Auth |
| --- | --- | --- |
| `/signup` | Register a new user | ❌ |
| `/login` | Login & receive JWT token | ❌ |

### URLs — `/api/v1/urls`

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `POST` | `/shorten` | Shorten a URL (supports custom codes) | ✅ |
| `GET` | `/` | List user's URLs (paginated) | ✅ |
| `DELETE` | `/:id` | Delete a URL owned by the user | ✅ |

### Redirect

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/:shortCode` | Redirect to original URL & increment clicks |

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ &nbsp;•&nbsp; [pnpm](https://pnpm.io/) &nbsp;•&nbsp; [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Clone & Install

```bash
git clone https://github.com/Shreya-Wani/Url---Shortener---Project.git
cd Url---Shortener---Project
```

### 2. Backend

```bash
cd backend
pnpm install
docker compose up -d          # Start local PostgreSQL
```

Create `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:admin@localhost:5433/postgres
PORT=8000
JWT_SECRET=your_secret_key_here
```

```bash
pnpm db:push                  # Push schema to DB
pnpm dev                      # Start server → http://localhost:8000
```

### 3. Frontend

```bash
cd frontend
pnpm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

```bash
pnpm dev                      # Start app → http://localhost:5173
```

---

## 🛠️ Scripts

| Command | Backend | Frontend |
| --- | --- | --- |
| `pnpm dev` | Start with auto-reload | Start Vite dev server |
| `pnpm start` / `pnpm build` | Production server | Production build |
| `pnpm db:push` | Push Drizzle schema | — |
| `pnpm db:studio` | Drizzle Studio GUI | — |
| `pnpm lint` | — | Run ESLint |

---

## 🚀 Deployment

| Component | Platform | Config |
| --- | --- | --- |
| **Backend** | Render | Start: `node index.js` |
| **Frontend** | Vercel | SPA rewrites via `vercel.json` |
| **Database** | Neon / Supabase / etc. | Set `DATABASE_URL` in backend env |

---

## 👩‍💻 Author

**Shreya Wani**

## 📜 License

[ISC License](https://opensource.org/licenses/ISC)
