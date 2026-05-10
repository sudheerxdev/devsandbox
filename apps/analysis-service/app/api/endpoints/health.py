from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.core.config import settings
from app.schemas.schemas import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """
    Health check endpoint
    
    Returns the current health status of the analysis service
    """
    return HealthResponse(
        status="ok",
        timestamp=datetime.now(),
        service="analysis-service",
        version=settings.APP_VERSION,
        environment=settings.ENVIRONMENT,
    )
