from fastapi import APIRouter
from typing import Optional
from app.data.schemes_data import SCHEMES

router = APIRouter(prefix="/schemes", tags=["Schemes"])

@router.get("/")
async def get_schemes(region: Optional[str] = None, crop: Optional[str] = None):
    results = SCHEMES
    # Basic filtering if provided (case-insensitive)
    if region:
        results = [s for s in results if "All" in s["applicable_regions"] or region.lower() in [r.lower() for r in s["applicable_regions"]]]
    if crop:
        results = [s for s in results if "All" in s["applicable_crops"] or crop.lower() in [c.lower() for c in s["applicable_crops"]]]
    return results
