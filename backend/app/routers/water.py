from typing import Optional

from fastapi import APIRouter

from app.data.water_data import WATER_BODIES

router = APIRouter(prefix="/water", tags=["Water"])


@router.get("/nearby")
async def nearby_water(lat: float, lon: float, radius_deg: float = 2.0):
    return [
        body
        for body in WATER_BODIES
        if abs(body["lat"] - lat) <= radius_deg and abs(body["lon"] - lon) <= radius_deg
    ]


@router.get("/risk")
async def water_risk(farm_id: str):
    releasing = [b for b in WATER_BODIES if b["status"] == "releasing"]
    if releasing:
        return {
            "farmId": farm_id,
            "riskLevel": "medium",
            "riskType": "flood",
            "factors": [f"{b['name']} is releasing water" for b in releasing]
            + ["Heavy rainfall predicted"],
            "recommendations": [
                "Clear drainage channels",
                "Move pump motors to higher ground",
            ],
        }
    return {
        "farmId": farm_id,
        "riskLevel": "low",
        "riskType": "none",
        "factors": ["No upstream releases detected"],
        "recommendations": ["Continue regular irrigation schedule"],
    }


@router.post("/simulate-release")
async def simulate_dam_release(dam_id: Optional[str] = None):
    dam = next(
        (b for b in WATER_BODIES if b["type"] == "dam" and (not dam_id or b["id"] == dam_id)),
        None,
    )
    return {
        "damId": dam["id"] if dam else (dam_id or "unknown"),
        "releaseAmount": 5000,
        "impactedFarms": ["f1", "f2"],
        "estimatedWaterLevelRise": 1.2,
        "timeToReach": 4.5,
    }
