from fastapi import APIRouter, HTTPException
from app.schemas.schemas import AnalysisRequest, AnalysisResult
from app.services.analyzer import CodeAnalyzer
from datetime import datetime

router = APIRouter(prefix="/analysis", tags=["analysis"])


@router.post("/analyze", response_model=AnalysisResult)
async def analyze_repository(request: AnalysisRequest) -> AnalysisResult:
    """
    Analyze a code repository
    
    - **repository_url**: URL of the repository to analyze
    - **branch**: Git branch to analyze (default: main)
    - **analysis_type**: Type of analysis (full, quick, custom)
    """
    try:
        result_data = CodeAnalyzer.analyze_repository(request.repository_url)
        
        return AnalysisResult(
            id=f"analysis-{datetime.now().timestamp()}",
            status="completed",
            progress=100.0,
            timestamp=datetime.now(),
            result_data=result_data,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@router.get("/results/{job_id}", response_model=AnalysisResult)
async def get_analysis_results(job_id: str) -> AnalysisResult:
    """Get analysis results for a specific job"""
    return AnalysisResult(
        id=job_id,
        status="completed",
        progress=100.0,
        timestamp=datetime.now(),
        result_data={"status": "results ready"},
    )
