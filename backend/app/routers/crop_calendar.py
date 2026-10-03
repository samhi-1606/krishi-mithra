from fastapi import APIRouter
from typing import Optional
from app.data.crop_calendar_data import CROP_CALENDAR

router = APIRouter(prefix="/crop-calendar", tags=["Crop Calendar"])

@router.get("/")
async def get_crop_calendar(crop: Optional[str] = None, season: Optional[str] = None, region: Optional[str] = None):
    if not crop:
        return CROP_CALENDAR
    crop_data = CROP_CALENDAR.get(crop, {})
    if season:
        return {season: crop_data.get(season, {})}
    return crop_data
