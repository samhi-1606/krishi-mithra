import logging
import os
import uuid
from datetime import date, timedelta

import httpx

DEFAULT_BASE_URL = "https://api.open-meteo.com/v1"

# Open-Meteo WMO weather codes, collapsed into the labels the UI renders.
_CONDITIONS = [
    (0, "Sunny"),
    (3, "Partly Cloudy"),
    (48, "Cloudy"),
    (67, "Rainy"),
    (77, "Snow"),
    (82, "Rainy"),
    (99, "Thunderstorm"),
]


def _condition_from_code(code) -> str:
    if code is None:
        return "Cloudy"
    for threshold, label in _CONDITIONS:
        if code <= threshold:
            return label
    return "Cloudy"


def _fallback_weather(lat: float, lon: float):
    today = date.today()
    samples = [
        (31.0, "Cloudy", 68, 72, 14.0),
        (29.0, "Rainy", 85, 80, 18.0),
        (30.0, "Partly Cloudy", 40, 65, 12.0),
        (32.0, "Sunny", 10, 55, 10.0),
        (33.0, "Sunny", 5, 50, 9.0),
        (31.5, "Cloudy", 25, 60, 11.0),
    ]
    forecast = [
        {
            "date": (today + timedelta(days=index)).isoformat(),
            "temp": temp,
            "condition": condition,
            "rainProbability": rain,
        }
        for index, (temp, condition, rain, _humidity, _wind) in enumerate(samples)
    ]
    first = samples[0]
    return {
        "lat": lat,
        "lon": lon,
        "temp": first[0],
        "condition": first[1],
        "rainProbability": first[2],
        "humidity": first[3],
        "windSpeed": first[4],
        "forecast": forecast,
    }


def _normalize(lat: float, lon: float, payload: dict):
    daily = payload.get("daily") or {}
    days = daily.get("time") or []
    if not days:
        raise ValueError("Weather response did not contain a daily forecast")

    def series(key):
        return daily.get(key) or [None] * len(days)

    temps = series("temperature_2m_max")
    rain = series("precipitation_probability_max")
    humidity = series("relative_humidity_2m_max")
    wind = series("wind_speed_10m_max")
    codes = series("weather_code")

    forecast = [
        {
            "date": days[index],
            "temp": temps[index],
            "condition": _condition_from_code(codes[index]),
            "rainProbability": rain[index] or 0,
        }
        for index in range(len(days))
    ]

    return {
        "lat": lat,
        "lon": lon,
        "temp": temps[0],
        "condition": forecast[0]["condition"],
        "rainProbability": rain[0] or 0,
        "humidity": humidity[0] or 0,
        "windSpeed": wind[0] or 0,
        "forecast": forecast,
    }


async def get_weather(lat: float, lon: float):
    base_url = os.getenv("OPEN_METEO_BASE_URL", DEFAULT_BASE_URL).rstrip("/")
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": "weather_code,temperature_2m_max,temperature_2m_min,"
                 "precipitation_probability_max,relative_humidity_2m_max,wind_speed_10m_max",
        "timezone": "Asia/Kolkata",
        "forecast_days": 6,
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{base_url}/forecast", params=params, timeout=5.0)
            response.raise_for_status()
            return _normalize(lat, lon, response.json())
    except Exception as exc:
        logging.warning("Weather API unavailable, serving fallback data: %s", exc)
        return _fallback_weather(lat, lon)


async def generate_weather_alerts(lat: float, lon: float):
    weather = await get_weather(lat, lon)
    alerts = []

    for day in weather.get("forecast", []):
        if (day.get("rainProbability") or 0) > 70:
            alerts.append(
                {
                    "id": str(uuid.uuid4()),
                    "type": "rain",
                    "severity": "high",
                    "message": "High chance of heavy rain. Check field drainage.",
                    "date": day["date"],
                }
            )
        if (day.get("temp") or 0) > 42:
            alerts.append(
                {
                    "id": str(uuid.uuid4()),
                    "type": "heat",
                    "severity": "high",
                    "message": "Extreme heat expected. Increase irrigation frequency.",
                    "date": day["date"],
                }
            )

    if (weather.get("windSpeed") or 0) > 50:
        alerts.append(
            {
                "id": str(uuid.uuid4()),
                "type": "wind",
                "severity": "medium",
                "message": "Strong winds expected. Secure young plants and equipment.",
                "date": weather["forecast"][0]["date"],
            }
        )

    return alerts
