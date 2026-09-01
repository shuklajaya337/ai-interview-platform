from typing import Dict
from pydantic import BaseModel


class ServiceStatus(BaseModel):
    database: str
    redis: str


class HealthResponse(BaseModel):
    status: str
    app: str
    version: str
    services: ServiceStatus
    timestamp: str
