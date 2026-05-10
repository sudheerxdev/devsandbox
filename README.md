# 🚀 DevSandbox

An intelligent developer infrastructure platform that helps developers understand large codebases faster using static analysis, dependency graph generation, architecture validation, and execution flow visualization.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Development](#development)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Current Foundation
- Modular monorepo structure
- Docker-based development environment
- Scalable API architecture
- Type-safe full-stack development

### Planned Features
- 📊 Repository parsing and analysis
- 🔗 Dependency graph visualization
- 🏗️ Architecture analysis and validation
- 🚨 Architectural violation detection
- ⚡ Runtime execution insights
- 🐳 Docker-based code execution
- 🤖 AI-assisted debugging

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS
- **Cytoscape.js** - Graph visualization

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type safety
- **PostgreSQL** - Primary database
- **Redis** - Message queue and caching
- **JWT** - Authentication

### Analysis Service
- **Python FastAPI** - High-performance API
- **Pydantic** - Data validation
- **PostgreSQL** - Data persistence

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Local orchestration
- **PostgreSQL** - Database
- **Redis** - Queue/Cache

## 📁 Project Structure

```
DevSandbox/
├── apps/
│   ├── frontend/                 # React + Vite + TypeScript application
│   │   ├── src/
│   │   │   ├── components/       # Reusable React components
│   │   │   ├── pages/            # Page components
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── stores/           # State management (Zustand/Redux)
│   │   │   ├── types/            # TypeScript types
│   │   │   ├── utils/            # Utility functions
│   │   │   ├── styles/           # Global styles
│   │   │   └── App.tsx           # Root component
│   │   ├── public/               # Static assets
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   │
│   ├── backend/                  # NestJS backend API
│   │   ├── src/
│   │   │   ├── modules/          # Feature modules
│   │   │   │   ├── health/       # Health check
│   │   │   │   ├── auth/         # Authentication
│   │   │   │   └── analysis/     # Analysis management
│   │   │   ├── common/
│   │   │   │   ├── exceptions/   # Global exceptions
│   │   │   │   ├── filters/      # Exception filters
│   │   │   │   ├── guards/       # Auth guards
│   │   │   │   ├── interceptors/ # Request/response interceptors
│   │   │   │   └── pipes/        # Validation pipes
│   │   │   ├── config/           # Configuration
│   │   │   ├── database/         # Database setup
│   │   │   ├── queue/            # Redis queue
│   │   │   ├── types/            # TypeScript types
│   │   │   ├── main.ts           # Entry point
│   │   │   └── app.module.ts     # Root module
│   │   ├── test/                 # E2E tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env.example
│   │
│   └── analysis-service/         # Python FastAPI service
│       ├── app/
│       │   ├── api/
│       │   │   ├── endpoints/    # API routes
│       │   │   │   ├── health.py
│       │   │   │   └── analysis.py
│       │   │   └── dependencies.py
│       │   ├── core/
│       │   │   ├── config.py     # Configuration
│       │   │   └── security.py   # Security utilities
│       │   ├── models/           # Pydantic models
│       │   ├── schemas/          # Request/response schemas
│       │   ├── services/         # Business logic
│       │   ├── utils/            # Utility functions
│       │   ├── database.py       # Database connection
│       │   └── main.py           # Entry point
│       ├── tests/
│       ├── requirements.txt
│       ├── Dockerfile
│       └── .env.example
│
├── packages/
│   └── shared/                   # Shared types and utilities
│       ├── types/
│       │   ├── api.ts
│       │   └── models.ts
│       ├── utils/
│       ├── package.json
│       └── tsconfig.json
│
├── docker-compose.yml            # Local development setup
├── Dockerfile.frontend           # Frontend container
├── Dockerfile.backend            # Backend container
├── .env.example                  # Environment variables template
├── .gitignore
├── .dockerignore
├── .prettierrc                   # Code formatting
├── .eslintrc.json               # Linting rules
├── package.json                 # Root monorepo configuration
├── README.md                    # This file
├── ARCHITECTURE.md              # Architecture documentation
└── scripts/
    ├── setup.js                 # Project setup script
    └── docker-setup.sh          # Docker initialization
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: ≥18.17.0
- **npm**: ≥9.0.0
- **Docker**: Latest version
- **Docker Compose**: Latest version
- **Python**: 3.11+ (for analysis service)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd DevSandbox
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start with Docker Compose** (Recommended)
   ```bash
   npm run docker:up
   ```

   Or for development without Docker:

   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Analysis Service: http://localhost:3002
   - API Docs: http://localhost:3001/api/docs

## 💻 Development

### Running Individual Services

**Frontend Development**
```bash
cd apps/frontend
npm run dev
```

**Backend Development**
```bash
cd apps/backend
npm run dev
```

**Analysis Service Development**
```bash
cd apps/analysis-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 3002
```

### Available Commands

```bash
npm run dev           # Start all services in development mode
npm run build         # Build all services
npm run lint          # Lint all services
npm run format        # Format code
npm run type-check    # Type check all TypeScript
npm run test          # Run tests
npm run clean         # Clean all build artifacts

npm run docker:build  # Build Docker images
npm run docker:up     # Start Docker containers
npm run docker:down   # Stop Docker containers
npm run docker:logs   # View Docker logs
```

## 🏗️ Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

### High-Level Overview

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTP/WebSocket
       ▼
┌─────────────────────────────────────┐
│       Frontend (React + Vite)       │
│  - Dependency Graph Visualization   │
│  - Architecture Analysis UI         │
│  - Code Explorer                    │
└──────┬──────────────────────────────┘
       │ REST API (HTTP)
       ▼
┌──────────────────────────────────┐
│   Backend API (NestJS)           │
│  - Authentication & Authorization│
│  - Analysis Job Management       │
│  - Cache Management              │
└──┬──────────────────────────┬────┘
   │                          │
   │                    HTTP  │
   │                          ▼
   │              ┌─────────────────────┐
   │              │ Analysis Service    │
   │              │ (Python FastAPI)    │
   │              │ - Code Analysis     │
   │              │ - Dependency Graph  │
   │              │ - Architecture      │
   │              └─────────────────────┘
   │
   ├─ PostgreSQL (Data Persistence)
   ├─ Redis (Queue & Cache)
   └─ Message Queue (Job Processing)
```

## 📝 API Health Checks

### Backend Health Check
```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-05-10T10:30:00Z",
  "uptime": 1234567,
  "version": "0.1.0"
}
```

### Analysis Service Health Check
```bash
curl http://localhost:3002/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-05-10T10:30:00Z",
  "service": "analysis-service",
  "version": "0.1.0"
}
```

## 🔐 Environment Variables

See `.env.example` for all available environment variables. Key variables:

- `NODE_ENV`: Development/Production mode
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: Secret for JWT signing
- `VITE_API_URL`: Backend API URL for frontend

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🐛 Debugging

### Backend
```bash
cd apps/backend
npm run dev:debug
```

Then attach VS Code debugger to `localhost:9229`

### Analysis Service
```bash
cd apps/analysis-service
python -m debugpy --listen 5678 -m uvicorn app.main:app --reload
```

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and design
- API Documentation (Swagger): http://localhost:3001/api/docs
- Analysis Service Docs: http://localhost:3002/docs

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Start a discussion
- Contact the development team

---

**Happy coding! 🚀**
