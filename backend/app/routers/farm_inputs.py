from fastapi import APIRouter
from typing import Optional
from app.data.seed_data import SEED_DATA

router = APIRouter(prefix="/farm-inputs", tags=["Farm Inputs"])

@router.get("/seeds")
async def get_seeds(crop: Optional[str] = None, region: Optional[str] = None, season: Optional[str] = None, soil: Optional[str] = None):
    if not crop:
        return SEED_DATA
    return SEED_DATA.get(crop, [])

@router.post("/soil-analysis")
async def analyze_soil():
    return {
        "ph": 6.5,
        "nitrogen": "Low",
        "phosphorus": "Medium",
        "potassium": "High",
        "recommendation": "Add urea to increase nitrogen levels."
    }

@router.get("/fertilizer")
async def get_fertilizer(crop: str, soil_type: str):
    return {
        "crop": crop,
        "soil_type": soil_type,
        "recommendations": [
            {"type": "Urea", "amount": "50 kg/acre"},
            {"type": "DAP", "amount": "20 kg/acre"}
        ]
    }

@router.get("/pest-control")
async def get_pest_control(crop: str):
    return {
        "crop": crop,
        "ipm_suggestions": [
            "Use neem oil as preventive spray.",
            "Install pheromone traps (5 per acre).",
            "Maintain proper spacing to improve aeration."
        ]
    }
