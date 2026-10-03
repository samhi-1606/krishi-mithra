from fastapi import APIRouter

from app.data.crop_calendar_data import SUPPORTED_CROPS, get_crop_calendar

router = APIRouter(prefix="/crop-calendar", tags=["Crop Calendar"])


@router.get("")
async def crop_calendar(crop: str = "Rice", season: str = "Kharif", region: str = "Telangana"):
    return get_crop_calendar(crop, season, region)


@router.get("/crops")
async def list_crops():
    return SUPPORTED_CROPS
