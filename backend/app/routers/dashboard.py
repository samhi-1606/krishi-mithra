from fastapi import APIRouter

from app.data.crop_health_data import CROP_HEALTH
from app.data.market_data import MARKET_DATA
from app.services.recommendation_engine import get_recommendations
from app.services.weather_service import generate_weather_alerts, get_weather

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("")
async def dashboard(lat: float = 17.9689, lon: float = 79.5941):
    weather = await get_weather(lat, lon)
    alerts = await generate_weather_alerts(lat, lon)

    rain = "high" if weather["rainProbability"] > 70 else "low"
    disease_risk = "high" if any(z["status"] == "critical" for z in CROP_HEALTH["zones"]) else "low"
    market_summary = MARKET_DATA[:3]
    market_price = "rising" if any(m["trend"] == "up" for m in market_summary) else "stable"

    return {
        "farm_health": CROP_HEALTH,
        "weather_summary": weather,
        "market_summary": market_summary,
        "alerts": alerts,
        "water_risk": "Low",
        "recommendations": get_recommendations(
            disease_risk=disease_risk,
            rain=rain,
            dam_release="inactive",
            farm_location="downstream",
            market_price=market_price,
        ),
    }
