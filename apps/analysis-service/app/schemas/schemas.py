from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Health check response model"""
    status: str
    timestamp: datetime
    service: str
    version: str
    environment: str



class AnalysisRequest(BaseModel):
    """Analysis request model"""
    repository_url: str
    branch: Optional[str] = "main"
    analysis_type: str = "full"


class AnalysisResult(BaseModel):
    """Analysis result model"""
    id: str
    status: str
    progress: float
    timestamp: datetime
    result_data: Optional[dict] = None
