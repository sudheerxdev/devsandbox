#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 DevSandbox Setup Script${NC}"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm found: $(npm -v)${NC}"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python found: $(python3 --version)${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠ Docker is not installed (optional for Docker Compose)${NC}"
else
    echo -e "${GREEN}✓ Docker found: $(docker --version)${NC}"
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠ Docker Compose is not installed (optional)${NC}"
else
    echo -e "${GREEN}✓ Docker Compose found: $(docker-compose --version)${NC}"
fi

echo ""
echo -e "${YELLOW}📦 Installing dependencies...${NC}"

# Install root dependencies
npm install --legacy-peer-deps

# Install frontend dependencies
echo -e "${YELLOW}📦 Setting up frontend...${NC}"
cd apps/frontend
npm install --legacy-peer-deps
cd ../..

# Install backend dependencies
echo -e "${YELLOW}📦 Setting up backend...${NC}"
cd apps/backend
npm install --legacy-peer-deps
cd ../..

# Setup Python virtual environment for analysis service
echo -e "${YELLOW}📦 Setting up analysis service...${NC}"
cd apps/analysis-service
python3 -m venv venv
source venv/bin/activate || . venv/Scripts/activate
pip install --upgrade pip
pip install -r requirements.txt
cd ../..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env file from template...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Update .env with your configuration${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update .env with your configuration"
echo "2. Start development: npm run dev"
echo "3. Or use Docker: npm run docker:up"
echo ""
echo -e "${YELLOW}Available commands:${NC}"
echo "  npm run dev           - Start all services in development mode"
echo "  npm run build         - Build all services"
echo "  npm run docker:up     - Start Docker containers"
echo "  npm run docker:down   - Stop Docker containers"
echo ""
