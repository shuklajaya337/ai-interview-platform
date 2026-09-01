from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.models.interview import InterviewStatus


class InterviewBase(BaseModel):
    title: str
    candidate_name: str
    role_target: str
    status: Optional[InterviewStatus] = InterviewStatus.PENDING
    feedback: Optional[str] = None
    score: Optional[int] = None


class InterviewCreate(InterviewBase):
    pass


class InterviewUpdate(BaseModel):
    title: Optional[str] = None
    candidate_name: Optional[str] = None
    role_target: Optional[str] = None
    status: Optional[InterviewStatus] = None
    feedback: Optional[str] = None
    score: Optional[int] = None


class InterviewResponse(InterviewBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
