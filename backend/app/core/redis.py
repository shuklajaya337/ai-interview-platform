from typing import AsyncGenerator
import redis.asyncio as aioredis
from app.core.config import settings

# Global redis client instance
redis_client: aioredis.Redis | None = None


def get_redis_client() -> aioredis.Redis:
    """Get or create Redis client instance."""
    global redis_client
    if redis_client is None:
        redis_client = aioredis.from_url(
            settings.get_redis_url(),
            encoding="utf-8",
            decode_responses=True,
        )
    return redis_client


async def get_redis() -> AsyncGenerator[aioredis.Redis, None]:
    """Dependency that yields a Redis client."""
    client = get_redis_client()
    try:
        yield client
    finally:
        pass


async def check_redis_connection() -> bool:
    """Check if Redis connection is healthy."""
    try:
        client = get_redis_client()
        return await client.ping()
    except Exception:
        return False


async def close_redis_connection() -> None:
    """Close Redis client connection pool."""
    global redis_client
    if redis_client is not None:
        await redis_client.close()
        redis_client = None
