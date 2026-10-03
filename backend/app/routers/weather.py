from fastapi import APIRouter
from app.services.weather_service import get_weather, generate_weather_alerts

router = APIRouter(prefix="/weather", tags=["Weather"])

@router.get("/")
async def weather(lat: float, lon: float):
    return await get_weather(lat, lon)

@router.get("/alerts")
async def weather_alerts(lat: float, lon: float):
    return await generate_weather_alerts(lat, lon)
