from datetime import datetime, timezone
from fastapi import APIRouter
from app.core.config import settings
from app.core.database import check_db_connection
from app.core.redis import check_redis_connection
from app.schemas.health import HealthResponse, ServiceStatus

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint checking PostgreSQL and Redis connectivity."""
    db_healthy = await check_db_connection()
    redis_healthy = await check_redis_connection()

    all_healthy = db_healthy and redis_healthy

    return HealthResponse(
        status="ok" if all_healthy else "degraded",
        app=settings.PROJECT_NAME,
        version="1.0.0",
        services=ServiceStatus(
            database="connected" if db_healthy else "disconnected",
            redis="connected" if redis_healthy else "disconnected",
        ),
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
