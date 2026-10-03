GRID_ROWS = 4
GRID_COLS = 4

# Zones are labelled "<row letter><cell index>": A0-A3, B4-B7, C8-C11, D12-D15.
_DISEASE_ZONE = "B7"
_STRESS_ZONES = ("B6", "C9")


def _zone_id(index: int) -> str:
    return f"{chr(65 + index // GRID_COLS)}{index}"


def _build_zones():
    zones = []
    for index in range(GRID_ROWS * GRID_COLS):
        zone_id = _zone_id(index)
        if zone_id == _DISEASE_ZONE:
            status, score, issues = "critical", 45, ["Rice Leaf Blast detected"]
        elif zone_id in _STRESS_ZONES:
            status, score, issues = "warning", 68, ["Water stress detected"]
        else:
            status, score, issues = "healthy", 90, None
        zones.append(
            {
                "id": zone_id,
                "row": index // GRID_COLS,
                "col": index % GRID_COLS,
                "healthScore": score,
                "status": status,
                "issues": issues,
            }
        )
    return zones


CROP_HEALTH = {
    "farmId": "f1",
    "rows": GRID_ROWS,
    "cols": GRID_COLS,
    "zones": _build_zones(),
    "overallHealth": 82,
}

ZONE_DETAILS = {
    _DISEASE_ZONE: {
        "zoneId": _DISEASE_ZONE,
        "healthScore": 45,
        "moistureLevel": 72,
        "nitrogenLevel": 40,
        "diseases": [
            {
                "name": "Rice Leaf Blast",
                "confidence": 91,
                "severity": "medium",
                "treatment": [
                    "Apply Tricyclazole 75% WP at 0.6 g/litre",
                    "Avoid applying excess nitrogen fertilizer",
                    "Improve field drainage to lower canopy humidity",
                ],
            }
        ],
        "recommendation": "Inspect the zone before the next rainfall and apply the recommended fungicide.",
    }
}


def get_zone_detail(zone_id: str):
    if zone_id in ZONE_DETAILS:
        return ZONE_DETAILS[zone_id]

    zone = next((z for z in CROP_HEALTH["zones"] if z["id"] == zone_id), None)
    if zone is None:
        return None

    return {
        "zoneId": zone_id,
        "healthScore": zone["healthScore"],
        "moistureLevel": 65 if zone["status"] == "healthy" else 48,
        "nitrogenLevel": 55 if zone["status"] == "healthy" else 40,
        "diseases": [],
        "recommendation": (
            "Zone is healthy. Continue standard care."
            if zone["status"] == "healthy"
            else "Monitor this zone and check irrigation coverage."
        ),
    }
