from fastapi import APIRouter
from app.data.crop_health_data import CROP_HEALTH
from app.data.market_data import MARKET_DATA
from app.services.weather_service import get_weather

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
async def get_dashboard():
    weather = await get_weather(18.0, 79.5)
    return {
        "farm_health": CROP_HEALTH,
        "weather_summary": weather,
        "market_summary": MARKET_DATA[:3],
        "alerts": [],
        "water_risk": "Low",
        "recommendations": [{"action": "Inspect crops", "priority": "Medium"}]
    }
