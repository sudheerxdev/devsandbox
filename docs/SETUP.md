# Project Setup & Development Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Service Setup](#service-setup)
4. [Development Workflow](#development-workflow)
5. [Database Setup](#database-setup)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Ensure you have the following installed on your system:

### Required
- **Node.js**: ≥18.17.0 [Download](https://nodejs.org/)
- **npm**: ≥9.0.0 (comes with Node.js)
- **Docker**: [Download](https://www.docker.com/)
- **Docker Compose**: [Download](https://docs.docker.com/compose/)
- **Python**: 3.11+ [Download](https://www.python.org/)

### Verification
```bash
node --version        # Should show v18.17.0 or higher
npm --version         # Should show 9.0.0 or higher
docker --version      # Should show Docker version
docker-compose --version  # Should show docker-compose version
python3 --version     # Should show Python 3.11 or higher
```

## Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone and navigate to project**
   ```bash
   cd DevSandbox
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Start all services**
   ```bash
   npm run docker:up
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Analysis Service: http://localhost:3002
   - API Documentation: http://localhost:3001/api/docs

5. **Stop services**
   ```bash
   npm run docker:down
   ```

### Option 2: Local Development

#### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install --legacy-peer-deps

# Install frontend dependencies
cd apps/frontend && npm install --legacy-peer-deps && cd ../..

# Install backend dependencies
cd apps/backend && npm install --legacy-peer-deps && cd ../..

# Setup Python virtual environment
cd apps/analysis-service
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ../..
```

#### Step 2: Start Database and Redis

Using Docker:
```bash
# Start PostgreSQL
docker run --name devsandbox-postgres -e POSTGRES_PASSWORD=devsandbox -e POSTGRES_DB=devsandbox -p 5432:5432 -d postgres:15-alpine

# Start Redis
docker run --name devsandbox-redis -p 6379:6379 -d redis:7-alpine
```

#### Step 3: Create Environment Files

```bash
# Root .env
cp .env.example .env

# Backend .env
cd apps/backend && cp .env.example .env && cd ../..

# Analysis Service .env
cd apps/analysis-service && cp .env.example .env && cd ../..
```

#### Step 4: Start Services

In separate terminal windows:

**Terminal 1 - Frontend**
```bash
cd apps/frontend
npm run dev
# Frontend will be available at http://localhost:5173
```

**Terminal 2 - Backend**
```bash
cd apps/backend
npm run dev
# Backend API will be available at http://localhost:3001
```

**Terminal 3 - Analysis Service**
```bash
cd apps/analysis-service
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 3002
# Analysis Service will be available at http://localhost:3002
```

## Service Setup

### Frontend (React + Vite)

**Location**: `apps/frontend/`

**Development**:
```bash
cd apps/frontend
npm run dev        # Start development server on http://localhost:5173
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

**Environment Variables**: `.env`
```
VITE_API_URL=http://localhost:3001
VITE_ANALYSIS_SERVICE_URL=http://localhost:3002
```

---

### Backend (NestJS)

**Location**: `apps/backend/`

**Development**:
```bash
cd apps/backend
npm run dev           # Start with hot reload
npm run dev:debug     # Start with debugger on port 9229
npm run build         # Build for production
npm run lint          # Run ESLint
npm run test          # Run unit tests
npm run test:cov      # Run tests with coverage
```

**Environment Variables**: `.env`
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://devsandbox:devsandbox@localhost:5432/devsandbox
REDIS_URL=redis://localhost:6379
ANALYSIS_SERVICE_URL=http://localhost:3002
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

**API Endpoints**:
- Health Check: `GET /api/health`
- API Docs: `http://localhost:3001/api/docs`

---

### Analysis Service (FastAPI)

**Location**: `apps/analysis-service/`

**Development**:
```bash
cd apps/analysis-service
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 3002
```

**Environment Variables**: `.env`
```
ANALYSIS_PORT=3002
DATABASE_URL=postgresql://devsandbox:devsandbox@localhost:5432/devsandbox
REDIS_URL=redis://localhost:6379
ENVIRONMENT=development
```

**API Endpoints**:
- Health Check: `GET /health`
- API Docs: `http://localhost:3002/docs`

---

## Development Workflow

### Monorepo Commands

```bash
# Development
npm run dev           # Start all services

# Building
npm run build         # Build all services
npm run clean         # Clean all artifacts

# Code Quality
npm run lint          # Lint all services
npm run format        # Format all services
npm run type-check    # Type check TypeScript

# Testing
npm run test          # Run all tests

# Docker
npm run docker:build  # Build Docker images
npm run docker:up     # Start Docker containers
npm run docker:down   # Stop Docker containers
npm run docker:logs   # View Docker logs
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: describe your changes"

# Push to remote
git push origin feature/your-feature

# Create Pull Request
# Follow the PR template
```

### Code Style

- **Formatting**: Prettier (run `npm run format`)
- **Linting**: ESLint for TypeScript, Pylint for Python
- **Commit Messages**: Follow conventional commits
  ```
  feat: add new feature
  fix: fix bug
  docs: update documentation
  style: code style changes
  refactor: refactor code
  test: add tests
  chore: maintenance
  ```

## Database Setup

### PostgreSQL

#### Local Setup
```bash
# Create database
createdb devsandbox

# Create user
createuser devsandbox --password
# Enter password: devsandbox

# Grant privileges
psql -d devsandbox -c "GRANT ALL PRIVILEGES ON DATABASE devsandbox TO devsandbox;"
```

#### Docker Setup
```bash
docker run --name devsandbox-postgres \
  -e POSTGRES_USER=devsandbox \
  -e POSTGRES_PASSWORD=devsandbox \
  -e POSTGRES_DB=devsandbox \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  -d postgres:15-alpine
```

### Migrations (Future)

```bash
# Run migrations
npm run migration:run

# Create migration
npm run migration:create -- CreateUsersTable

# Revert migration
npm run migration:revert
```

## Debugging

### Backend Debugging

**VS Code Debug Configuration** (`.vscode/launch.json`):
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Debug Backend",
      "port": 9229,
      "restart": true,
      "protocol": "inspector"
    }
  ]
}
```

**Start with debugger**:
```bash
cd apps/backend
npm run dev:debug
```

Then attach VS Code debugger (F5).

### Frontend Debugging

Use browser DevTools:
- Chrome: F12
- Firefox: F12
- Safari: Cmd+Opt+I

React DevTools Extension: [Chrome](https://chrome.google.com/webstore) / [Firefox](https://addons.mozilla.org/)

## Troubleshooting

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3001`

**Solution**:
```bash
# Find process using the port
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### Database Connection Error

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Start PostgreSQL if not running
npm run docker:up
```

### Python Virtual Environment Issues

**Solution**:
```bash
# Deactivate current environment
deactivate

# Remove venv
rm -rf apps/analysis-service/venv

# Recreate venv
cd apps/analysis-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Dependencies Not Installing

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Docker Issues

**Solution**:
```bash
# View Docker logs
docker logs devsandbox-backend
docker logs devsandbox-analysis

# Restart services
npm run docker:down
npm run docker:up

# Rebuild images
npm run docker:build
npm run docker:up --build
```

---

## Need Help?

- Check the [README.md](../README.md)
- Review [ARCHITECTURE.md](../ARCHITECTURE.md)
- Open an issue on GitHub
- Contact the development team

---

**Last Updated**: May 2024
