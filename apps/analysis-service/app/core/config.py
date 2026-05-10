import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings from environment variables"""

    # Application
    APP_NAME: str = "DevSandbox Analysis Service"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

    # Server
    ANALYSIS_PORT: int = int(os.getenv("ANALYSIS_PORT", 3002))
    ANALYSIS_HOST: str = os.getenv("ANALYSIS_HOST", "0.0.0.0")

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://devsandbox:devsandbox@localhost:5432/devsandbox"
    )

    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")

    # CORS
    CORS_ORIGINS: list = ["http://localhost:5173", "http://localhost:3001"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
