from fastapi import Depends
from app.core.security import get_api_key


async def verify_api_key(api_key: str = Depends(get_api_key)) -> str:
    """Verify API key for requests"""
    return api_key
