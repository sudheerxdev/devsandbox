# Deployment Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Database Setup](#database-setup)
4. [Deployment Strategies](#deployment-strategies)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Monitoring](#monitoring)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- Docker and Docker Compose installed
- Access to cloud provider (AWS, GCP, Azure)
- DNS configuration access
- SSL certificates (for production)

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```bash
# Application
NODE_ENV=production
DEBUG=false

# API
PORT=3001
API_URL=https://api.devsandbox.com

# Frontend
VITE_API_URL=https://api.devsandbox.com
FRONTEND_URL=https://devsandbox.com

# Database
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/devsandbox_prod

# Redis
REDIS_URL=redis://<host>:6379

# Authentication
JWT_SECRET=<generate-strong-secret>
JWT_EXPIRES_IN=7d

# Services
ANALYSIS_SERVICE_URL=https://analysis.devsandbox.com

# Security
CORS_ORIGIN=https://devsandbox.com
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
```

## Database Setup

### PostgreSQL Production Setup

```bash
# Create database
createdb devsandbox_prod

# Create user with restricted permissions
createuser devsandbox_prod --password
# Enter strong password

# Grant privileges
psql -d devsandbox_prod -c "GRANT CONNECT ON DATABASE devsandbox_prod TO devsandbox_prod;"
psql -d devsandbox_prod -c "GRANT USAGE ON SCHEMA public TO devsandbox_prod;"
psql -d devsandbox_prod -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO devsandbox_prod;"
```

### Backups

```bash
# Automatic daily backups
0 2 * * * pg_dump devsandbox_prod | gzip > /backups/devsandbox_prod_$(date +\%Y\%m\%d).sql.gz

# Restore from backup
gunzip < /backups/devsandbox_prod_20240101.sql.gz | psql devsandbox_prod
```

## Deployment Strategies

### Strategy 1: Docker Compose (Staging)

```bash
# Build images
docker-compose build

# Run services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Strategy 2: Kubernetes (Production)

**Prerequisites**:
- Kubernetes cluster running
- kubectl configured
- Container registry access

**Deploy**:

```bash
# Create namespace
kubectl create namespace devsandbox

# Create secrets
kubectl create secret generic devsandbox-secrets \
  --from-env-file=.env.production \
  -n devsandbox

# Apply manifests
kubectl apply -f k8s/ -n devsandbox

# Check deployment
kubectl get pods -n devsandbox
kubectl logs -n devsandbox deployment/backend
```

**Scaling**:

```bash
# Scale backend
kubectl scale deployment backend --replicas=3 -n devsandbox

# Auto-scaling
kubectl autoscale deployment backend --min=1 --max=10 -n devsandbox
```

### Strategy 3: Cloud Providers

#### AWS ECS

```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

docker build -t devsandbox-backend ./apps/backend
docker tag devsandbox-backend <account>.dkr.ecr.us-east-1.amazonaws.com/devsandbox-backend:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/devsandbox-backend:latest

# Deploy with CloudFormation or AWS Console
```

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: Build Docker images
        run: docker-compose build
      
      - name: Push to registry
        run: docker-compose push
      
      - name: Deploy
        run: |
          # Deploy to production
          ssh deploy@server 'cd /app && docker-compose pull && docker-compose up -d'
```

## Monitoring

### Application Monitoring

```bash
# Health checks
curl https://api.devsandbox.com/api/health
curl https://analysis.devsandbox.com/health

# Metrics endpoint
curl https://api.devsandbox.com/api/metrics
```

### Log Aggregation

Using ELK Stack or Loki:

```bash
# View logs
curl http://localhost:5601  # Kibana

# Query logs
SELECT * FROM logs WHERE level = 'ERROR'
```

### Alerting

Set up alerts for:
- API response time > 1s
- Error rate > 1%
- Database connection pool exhausted
- Disk space < 10%

## Troubleshooting

### Application Won't Start

```bash
# Check logs
docker-compose logs backend

# Verify environment variables
docker-compose exec backend env | grep DATABASE_URL

# Check database connectivity
docker-compose exec backend psql $DATABASE_URL -c "SELECT 1"
```

### Database Issues

```bash
# Check connections
psql -d devsandbox_prod -c "SELECT count(*) FROM pg_stat_activity;"

# Kill idle connections
psql -d devsandbox_prod -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle';"

# Check disk space
df -h /var/lib/postgresql
```

### Performance Issues

```bash
# Check slow queries
tail -f /var/log/postgresql/postgresql.log | grep "duration"

# Analyze query plans
EXPLAIN ANALYZE SELECT * FROM analysis_jobs;

# Rebuild indexes
REINDEX DATABASE devsandbox_prod;
```

## Rollback Procedure

```bash
# Keep previous Docker images
docker tag devsandbox-backend:current devsandbox-backend:backup-$(date +%s)

# Revert to previous version
docker pull <registry>/devsandbox-backend:previous
docker-compose up -d

# Database rollback (if needed)
psql devsandbox_prod < /backups/devsandbox_prod_$(date -d yesterday +%Y%m%d).sql
```

---

**Last Updated**: May 2024
