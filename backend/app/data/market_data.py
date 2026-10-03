_RAW_MARKET_DATA = [
    ("Warangal", "Warangal", "Cotton", 7200, "up", 1.8),
    ("Warangal", "Warangal", "Rice", 2400, "stable", 0.0),
    ("Warangal", "Warangal", "Chilli", 15000, "up", 2.4),
    ("Karimnagar", "Karimnagar", "Rice", 2450, "stable", 0.2),
    ("Karimnagar", "Karimnagar", "Maize", 2100, "down", -1.1),
    ("Khammam", "Khammam", "Cotton", 7100, "up", 1.2),
    ("Khammam", "Khammam", "Chilli", 14800, "up", 1.9),
    ("Nizamabad", "Nizamabad", "Turmeric", 8500, "stable", 0.1),
    ("Nizamabad", "Nizamabad", "Maize", 2050, "down", -0.8),
    ("Hyderabad", "Hyderabad", "Tomato", 3000, "up", 4.5),
]

MARKET_DATA = [
    {
        "id": f"mp-{index}",
        "market": market,
        "district": district,
        "crop": crop,
        "price": price,
        "unit": "Quintal",
        "date": "2023-10-01",
        "trend": trend,
        "changePercentage": change,
    }
    for index, (market, district, crop, price, trend, change) in enumerate(_RAW_MARKET_DATA)
]
