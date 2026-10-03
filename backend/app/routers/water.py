from fastapi import APIRouter
from app.data.water_data import WATER_DATA

router = APIRouter(prefix="/water", tags=["Water"])

@router.get("/nearby")
async def get_nearby_water(lat: float, lon: float):
    # Dummy logic returning all data for demo
    return WATER_DATA

@router.get("/risk")
async def get_water_risk(farm_id: str):
    # Dummy logic
    return {"risk_level": "Medium", "factors": ["Nagarjuna Sagar releasing water", "High rain forecast"]}

@router.post("/simulate-release")
async def simulate_dam_release():
    return {"status": "success", "simulation_result": "Downstream farms at high risk of flooding."}
