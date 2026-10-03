from fastapi import APIRouter
from typing import Optional
from app.data.market_data import MARKET_DATA

router = APIRouter(prefix="/market-prices", tags=["Market"])

@router.get("/")
async def get_market_prices(crop: Optional[str] = None, district: Optional[str] = None, market: Optional[str] = None):
    results = MARKET_DATA
    if crop:
        results = [r for r in results if r["crop"].lower() == crop.lower()]
    if district:
        results = [r for r in results if r["district"].lower() == district.lower()]
    if market:
        results = [r for r in results if r["market"].lower() == market.lower()]
    return results

@router.get("/trends")
async def get_market_trends(crop: Optional[str] = None, market: Optional[str] = None):
    # Mocking trend data based on market data
    return [
        {"date": "2023-09-01", "price": 2300},
        {"date": "2023-09-15", "price": 2350},
        {"date": "2023-10-01", "price": 2400}
    ]

@router.get("/best")
async def get_best_price(crop: str, lat: float, lon: float):
    # Dummy logic to find best price for crop
    prices = [r for r in MARKET_DATA if r["crop"].lower() == crop.lower()]
    if not prices:
        return {"message": "No data available"}
    best = max(prices, key=lambda x: x["price"])
    return best
