# DevSandbox Architecture Documentation

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architectural Principles](#architectural-principles)
3. [Service Architecture](#service-architecture)
4. [Data Flow](#data-flow)
5. [Technology Decisions](#technology-decisions)
6. [Scalability Strategy](#scalability-strategy)
7. [Security Architecture](#security-architecture)
8. [Deployment Strategy](#deployment-strategy)

## System Overview

DevSandbox is a distributed system designed to analyze large codebases and provide intelligent insights through dependency graphs, architecture analysis, and code execution visualization.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend Layer                           │
│                  React + Vite + TypeScript                       │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐   │
│  │   Dashboard UI   │  │  Graph Viz       │  │  Code Explore│   │
│  │                  │  │  (Cytoscape.js)  │  │              │   │
│  └──────────────────┘  └──────────────────┘  └──────────────┘   │
└─────────────┬──────────────────────────────────────────────────┘
              │ REST API
              │ WebSocket (Real-time Updates)
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   API Gateway & Backend Services                 │
│                         NestJS                                   │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │          NestJS Application Server                          │  │
│  │                                                             │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │  │
│  │  │Auth Module   │  │Health Module │  │Analysis Module   │ │  │
│  │  │  - JWT Auth  │  │  - Status    │  │  - Job Mgmt      │ │  │
│  │  │  - RBAC      │  │  - Metrics   │  │  - Cache         │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘ │  │
│  │                                                             │  │
│  │  ┌───────────────────────────────────────────────────────┐│  │
│  │  │         Middleware & Exception Handling              ││  │
│  │  │  - Request Logging & Correlation IDs                 ││  │
│  │  │  - Global Exception Handling                         ││  │
│  │  │  - Request Validation                                ││  │
│  │  └───────────────────────────────────────────────────────┘│  │
│  └────────────────────────────────────────────────────────────┘  │
└──┬──────────────────────────────────────┬───────────────────────┘
   │                                      │
   │ gRPC / HTTP                    HTTP  │
   │                                      ▼
   │                           ┌──────────────────────┐
   │                           │ Analysis Service     │
   │                           │ (Python FastAPI)     │
   │                           │                      │
   │                           │ ┌────────────────┐   │
   │                           │ │Code Parser     │   │
   │                           │ │Dependency      │   │
   │                           │ │Analysis Engine │   │
   │                           │ │Architecture    │   │
   │                           │ │Validator       │   │
   │                           │ └────────────────┘   │
   │                           └──────────────────────┘
   │
   └──────────────────────┬────────────────┬──────────────┐
                          │                │              │
                          ▼                ▼              ▼
                    ┌──────────┐    ┌────────────┐   ┌────────┐
                    │PostgreSQL│    │   Redis    │   │  File  │
                    │ Database │    │ Queue/     │   │ Storage│
                    │          │    │ Cache      │   │(S3)    │
                    └──────────┘    └────────────┘   └────────┘
```

## Architectural Principles

### 1. **Modularity**
- Each service is independently deployable and scalable
- Clear separation of concerns across frontend, backend, and analysis services
- Services communicate via well-defined APIs (REST/gRPC)

### 2. **Scalability**
- Horizontal scaling through containerization (Docker)
- Database replication for read scaling
- Redis for distributed caching
- Message queue for asynchronous job processing

### 3. **Type Safety**
- TypeScript across frontend and backend
- Python type hints in analysis service
- Shared type definitions for API contracts

### 4. **Performance**
- Vite for fast frontend builds
- NestJS built-in optimizations
- FastAPI's async/await for I/O operations
- Redis caching layer
- Database connection pooling

### 5. **Maintainability**
- Clear folder structure
- Consistent coding standards
- Comprehensive documentation
- Automated testing and linting

### 6. **Security**
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation with Pydantic
- SQL injection prevention with ORM
- CORS configuration
- Rate limiting (future)

## Service Architecture

### Frontend Service

**Technology**: React 18 + TypeScript + Vite + TailwindCSS

**Responsibilities**:
- User interface for code analysis
- Dependency graph visualization (Cytoscape.js)
- Real-time updates via WebSocket
- State management
- Client-side caching

**Key Folders**:
```
apps/frontend/src/
├── components/    # Reusable UI components
├── pages/         # Page-level components
├── hooks/         # Custom React hooks
├── stores/        # Global state (Zustand/Redux)
├── types/         # TypeScript interfaces
├── utils/         # Helper functions
├── services/      # API clients
└── styles/        # Global and component styles
```

**API Integration**:
- Axios/Fetch for REST calls
- TanStack Query for data fetching and caching
- WebSocket for real-time updates

---

### Backend Service

**Technology**: NestJS + TypeScript + PostgreSQL + Redis

**Responsibilities**:
- API gateway and business logic
- User authentication and authorization
- Analysis job orchestration
- Caching layer management
- Database transactions

**Module Architecture**:

```
apps/backend/src/
├── modules/
│   ├── auth/           # Authentication & JWT
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   └── guards/
│   │
│   ├── health/         # Health checks
│   │   ├── health.controller.ts
│   │   └── health.module.ts
│   │
│   └── analysis/       # Analysis management
│       ├── analysis.controller.ts
│       ├── analysis.service.ts
│       ├── analysis.module.ts
│       ├── entities/
│       └── dto/
│
├── common/
│   ├── exceptions/
│   ├── filters/        # Global exception filters
│   ├── guards/         # Authentication guards
│   ├── interceptors/   # Logging, response formatting
│   └── pipes/          # Validation
│
├── config/            # Environment config
├── database/          # Database setup, migrations
├── queue/             # Redis queue
├── app.module.ts      # Root module
└── main.ts            # Application entry point
```

**API Endpoints**:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/analysis/jobs` | List analysis jobs |
| POST | `/api/analysis/jobs` | Create new analysis |
| GET | `/api/analysis/jobs/:id` | Get job details |

---

### Analysis Service

**Technology**: Python FastAPI + Pydantic

**Responsibilities**:
- Code parsing and AST analysis
- Dependency graph generation
- Architecture validation
- Code metrics calculation

**Service Architecture**:

```
apps/analysis-service/app/
├── api/
│   ├── endpoints/
│   │   ├── health.py     # Health check endpoint
│   │   └── analysis.py   # Analysis endpoints
│   └── dependencies.py   # Dependency injection
│
├── core/
│   ├── config.py         # Configuration
│   └── security.py       # Security utilities
│
├── models/               # SQLAlchemy models
├── schemas/              # Pydantic schemas
│
├── services/             # Business logic
│   ├── code_parser.py
│   ├── dependency_analyzer.py
│   ├── architecture_validator.py
│   └── metrics_calculator.py
│
├── utils/                # Utilities
├── database.py           # DB connection
└── main.py              # FastAPI app
```

**API Endpoints**:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/analyze` | Analyze codebase |
| GET | `/results/:job_id` | Get analysis results |
| GET | `/graph/:job_id` | Get dependency graph |

---

## Data Flow

### 1. Code Analysis Flow

```
User uploads repository
        │
        ▼
Frontend validates & sends to Backend
        │
        ▼
Backend creates Analysis Job
        │
        ▼
Job enqueued in Redis Queue
        │
        ▼
Analysis Service picks up job
        │
        ▼
Parse code & Extract dependencies
        │
        ▼
Generate dependency graph
        │
        ▼
Validate architecture rules
        │
        ▼
Store results in PostgreSQL
        │
        ▼
Backend updates job status
        │
        ▼
Frontend receives update via WebSocket
        │
        ▼
Display results to user
```

### 2. Request/Response Lifecycle

```
Client Request
    │
    ▼
CORS & Rate Limiting Middleware
    │
    ▼
Authentication Guard (JWT)
    │
    ▼
Request Validation Pipe
    │
    ▼
Route Handler
    │
    ├─ Business Logic (Service)
    │
    ├─ Database Query (TypeORM)
    │
    └─ External Service Call (Analysis Service)
    │
    ▼
Response Interceptor (Formatting)
    │
    ▼
Client Response (JSON)
```

## Technology Decisions

### Why NestJS?
- **Enterprise-ready**: Built-in support for microservices, authentication, logging
- **Type-safe**: Full TypeScript support with decorators
- **Modular**: Clear module structure for scalability
- **DI Container**: Built-in dependency injection
- **Testing**: Excellent testing utilities

### Why FastAPI?
- **Performance**: One of the fastest Python frameworks
- **Async**: Native async/await support for I/O operations
- **Validation**: Automatic request validation with Pydantic
- **Documentation**: Auto-generated API docs
- **Developer Experience**: Simple, intuitive API design

### Why React + Vite?
- **Performance**: Vite's instant HMR significantly speeds up development
- **Modern**: React 18 with latest features
- **TypeScript**: Strong type support
- **Ecosystem**: Mature and extensive library ecosystem

### Why PostgreSQL + Redis?
- **PostgreSQL**: ACID compliance, complex queries, data integrity
- **Redis**: In-memory speed for caching and message queues

## Scalability Strategy

### Horizontal Scaling

1. **Frontend**:
   - Static assets served via CDN
   - Multiple instances behind load balancer
   - Client-side caching with service workers

2. **Backend**:
   - Multiple NestJS instances
   - Stateless design for horizontal scaling
   - Load balancing with nginx/AWS ALB
   - Session management via Redis

3. **Analysis Service**:
   - Multiple worker instances
   - Job distribution via Redis queue
   - Auto-scaling based on queue depth

### Vertical Scaling
- Database connection pooling
- Memory optimization
- Code splitting and lazy loading

### Caching Strategy
- Redis for session data
- Redis for frequently accessed data
- Browser caching for static assets
- ETags for conditional requests

## Security Architecture

### Authentication & Authorization

```
User Login
    │
    ▼
Credentials validated
    │
    ▼
JWT token issued
    │
    ├─ Access token (short-lived, 15min)
    └─ Refresh token (long-lived, 7days)
    │
    ▼
Client includes access token in headers
    │
    ▼
Backend verifies JWT signature
    │
    ▼
Extract user claims & permissions
    │
    ▼
RBAC guards evaluate permissions
    │
    ▼
Grant/Deny access
```

### Data Protection

- **In Transit**: HTTPS/TLS encryption
- **At Rest**: Encrypted database connections, encrypted environment variables
- **Secrets Management**: Environment variables, future: AWS Secrets Manager

### Input Validation

- Frontend: Client-side validation
- Backend: Request DTO validation
- Analysis Service: Pydantic model validation

## Deployment Strategy

### Development
```bash
npm run dev                # Local development
npm run docker:up         # Docker Compose
```

### Staging
- Docker images built and pushed to registry
- Docker Compose with staging environment variables
- Database migrations run automatically
- Health checks verify service availability

### Production
- Multi-node Kubernetes cluster (future)
- Rolling updates for zero-downtime deployments
- Auto-scaling based on metrics
- Centralized logging and monitoring
- Backup and disaster recovery

### CI/CD Pipeline (Future)
- GitHub Actions for automated testing
- Docker image builds on commit
- Deployment to staging on PR
- Production deployment on merge to main

## Monitoring & Observability

### Logging
- Centralized logging (ELK Stack/Loki)
- Structured logging with correlation IDs
- Log levels: DEBUG, INFO, WARN, ERROR

### Metrics
- Application metrics (requests/sec, latency, errors)
- System metrics (CPU, memory, disk)
- Database metrics (query time, connections)
- Business metrics (analysis jobs, users)

### Health Checks
```
Backend: /api/health
Analysis: /health
```

Returns:
```json
{
  "status": "ok|degraded|unhealthy",
  "uptime": 1234567,
  "checks": {
    "database": "ok",
    "redis": "ok",
    "analysis_service": "ok"
  }
}
```

---

## Future Enhancements

1. **gRPC**: For faster inter-service communication
2. **GraphQL**: Alternative to REST API
3. **Microservices**: Split analysis service into multiple specialized services
4. **Kubernetes**: Container orchestration
5. **Event Streaming**: Kafka for event-driven architecture
6. **API Versioning**: Support multiple API versions
7. **Rate Limiting**: Token bucket algorithm
8. **Circuit Breaker**: Fault tolerance pattern

---

**Last Updated**: May 2024
**Version**: 0.1.0
