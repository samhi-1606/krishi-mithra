from fastapi import APIRouter, HTTPException
from app.data.crop_health_data import CROP_HEALTH

router = APIRouter(prefix="/crop-health", tags=["Crop Health"])

@router.post("/analyze")
async def analyze_farm():
    # In real world, this would take an image or coordinates
    return CROP_HEALTH

@router.get("/zone/{zone_id}")
async def get_zone_detail(zone_id: str):
    for zone in CROP_HEALTH["zones"]:
        if zone["id"] == zone_id:
            return zone
    raise HTTPException(status_code=404, detail="Zone not found")

@router.get("/{farm_id}")
async def get_crop_health(farm_id: str):
    return CROP_HEALTH
