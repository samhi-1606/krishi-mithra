from fastapi import APIRouter, HTTPException

from app.data.crop_health_data import CROP_HEALTH, get_zone_detail

router = APIRouter(prefix="/crop-health", tags=["Crop Health"])


@router.post("/analyze")
async def analyze_farm():
    # In the real system this would take imagery or coordinates.
    return CROP_HEALTH


# Declared before /{farm_id} so "zone" is not captured as a farm id.
@router.get("/zone/{zone_id}")
async def zone_detail(zone_id: str):
    detail = get_zone_detail(zone_id)
    if detail is None:
        raise HTTPException(status_code=404, detail="Zone not found")
    return detail


@router.get("/{farm_id}")
async def crop_health(farm_id: str):
    return {**CROP_HEALTH, "farmId": farm_id}
