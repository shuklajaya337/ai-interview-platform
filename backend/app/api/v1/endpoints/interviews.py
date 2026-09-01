from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.interview import Interview
from app.schemas.interview import InterviewCreate, InterviewUpdate, InterviewResponse

router = APIRouter()


@router.get("/", response_model=List[InterviewResponse])
async def list_interviews(
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
):
    """Retrieve list of interviews."""
    query = select(Interview).offset(skip).limit(limit).order_by(Interview.created_at.desc())
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/", response_model=InterviewResponse, status_code=status.HTTP_201_CREATED)
async def create_interview(
    interview_in: InterviewCreate,
    db: AsyncSession = Depends(get_db),
):
    """Create a new mock interview session."""
    interview = Interview(**interview_in.model_dump())
    db.add(interview)
    await db.commit()
    await db.refresh(interview)
    return interview


@router.get("/{interview_id}", response_model=InterviewResponse)
async def get_interview(
    interview_id: int,
    db: AsyncSession = Depends(get_db),
):
    """Get interview details by ID."""
    query = select(Interview).where(Interview.id == interview_id)
    result = await db.execute(query)
    interview = result.scalar_one_or_none()
    if not interview:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Interview with ID {interview_id} not found",
        )
    return interview


@router.patch("/{interview_id}", response_model=InterviewResponse)
async def update_interview(
    interview_id: int,
    interview_in: InterviewUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Update an interview (e.g. feedback, score, status)."""
    query = select(Interview).where(Interview.id == interview_id)
    result = await db.execute(query)
    interview = result.scalar_one_or_none()
    if not interview:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Interview with ID {interview_id} not found",
        )

    update_data = interview_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(interview, field, value)

    db.add(interview)
    await db.commit()
    await db.refresh(interview)
    return interview


@router.delete("/{interview_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_interview(
    interview_id: int,
    db: AsyncSession = Depends(get_db),
):
    """Delete an interview."""
    query = select(Interview).where(Interview.id == interview_id)
    result = await db.execute(query)
    interview = result.scalar_one_or_none()
    if not interview:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Interview with ID {interview_id} not found",
        )
    await db.delete(interview)
    await db.commit()
    return None
