from datetime import date, timedelta
from typing import Optional

from fastapi import APIRouter

from app.data.market_data import MARKET_DATA

router = APIRouter(prefix="/market-prices", tags=["Market"])

# Flat rate used to estimate transport cost from the farm to the mandi.
TRANSPORT_COST_PER_KM = 12


@router.get("")
async def market_prices(
    crop: Optional[str] = None, district: Optional[str] = None, market: Optional[str] = None
):
    results = MARKET_DATA
    if crop:
        results = [r for r in results if r["crop"].lower() == crop.lower()]
    if district:
        results = [r for r in results if r["district"].lower() == district.lower()]
    if market:
        results = [r for r in results if r["market"].lower() == market.lower()]
    return results


@router.get("/trends")
async def market_trends(crop: Optional[str] = None, market: Optional[str] = None):
    matches = [
        r
        for r in MARKET_DATA
        if (not crop or r["crop"].lower() == crop.lower())
        and (not market or r["market"].lower() == market.lower())
    ]
    base_price = matches[0]["price"] if matches else 2400

    today = date.today()
    # Demo trend: a gentle climb into today's quoted price.
    return [
        {
            "date": (today - timedelta(days=offset)).isoformat(),
            "price": round(base_price * (1 - offset * 0.004)),
        }
        for offset in range(6, -1, -1)
    ]


@router.get("/best")
async def best_price(crop: str, lat: float, lon: float):
    matches = [r for r in MARKET_DATA if r["crop"].lower() == crop.lower()]
    if not matches:
        return None

    best = max(matches, key=lambda r: r["price"])
    # Distance is not modelled in the demo dataset; assume a nearby mandi.
    distance = 12.5
    transport_cost = round(distance * TRANSPORT_COST_PER_KM)
    return {
        "crop": best["crop"],
        "market": best["market"],
        "price": best["price"],
        "distance": distance,
        "transportCost": transport_cost,
        "netProfit": best["price"] - transport_cost,
    }
