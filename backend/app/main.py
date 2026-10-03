from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import (
    dashboard,
    farmer,
    weather,
    market,
    schemes,
    crop_calendar,
    bhumi,
    crop_health,
    pest,
    water,
    alerts,
    farm_inputs,
)

app = FastAPI(title="Krishi Mithra API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api", tags=["Dashboard"])
app.include_router(farmer.router, prefix="/api", tags=["Farmer"])
app.include_router(weather.router, prefix="/api", tags=["Weather"])
app.include_router(market.router, prefix="/api", tags=["Market"])
app.include_router(schemes.router, prefix="/api", tags=["Schemes"])
app.include_router(crop_calendar.router, prefix="/api", tags=["Crop Calendar"])
app.include_router(bhumi.router, prefix="/api", tags=["Bhumi AI"])
app.include_router(crop_health.router, prefix="/api", tags=["Crop Health"])
app.include_router(pest.router, prefix="/api", tags=["Pest"])
app.include_router(water.router, prefix="/api", tags=["Water"])
app.include_router(alerts.router, prefix="/api", tags=["Alerts"])
app.include_router(farm_inputs.router, prefix="/api", tags=["Farm Inputs"])


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "Krishi Mithra API"}
