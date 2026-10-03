import httpx
import logging

async def get_weather(lat: float, lon: float):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_max,wind_speed_10m_max&timezone=Asia/Kolkata&forecast_days=6"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=5.0)
            response.raise_for_status()
            return response.json()
    except Exception as e:
        logging.error(f"Weather API error: {e}")
        # Fallback to demo data
        return {
            "daily": {
                "time": ["2023-10-01", "2023-10-02", "2023-10-03", "2023-10-04", "2023-10-05"],
                "temperature_2m_max": [32.0, 31.5, 33.0, 43.0, 30.0],
                "temperature_2m_min": [22.0, 21.0, 22.5, 23.0, 20.0],
                "precipitation_probability_max": [10, 20, 80, 5, 0],
                "relative_humidity_2m_max": [60, 65, 75, 50, 55],
                "wind_speed_10m_max": [15.0, 12.0, 55.0, 10.0, 14.0]
            }
        }

async def generate_weather_alerts(lat: float, lon: float):
    weather = await get_weather(lat, lon)
    alerts = []
    if not weather or "daily" not in weather:
        return alerts
    daily = weather["daily"]
    for i in range(len(daily["time"])):
        date = daily["time"][i]
        if daily["precipitation_probability_max"][i] > 70:
            alerts.append({"type": "High Rain Probability", "date": date, "message": "High chance of rain."})
        if daily["temperature_2m_max"][i] > 42:
            alerts.append({"type": "Extreme Heat", "date": date, "message": "Extreme heat expected."})
        if daily["wind_speed_10m_max"][i] > 50:
            alerts.append({"type": "High Winds", "date": date, "message": "Strong winds expected."})
    return alerts
