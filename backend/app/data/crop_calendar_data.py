from datetime import date

# Events are stored as (month, day, title, type) and resolved against the current year.
_CROP_CALENDAR = {
    "Rice": {
        "Kharif": [
            (6, 15, "Nursery Preparation", "planting"),
            (7, 10, "Transplanting", "planting"),
            (7, 25, "First Fertilizer Dose", "fertilizer"),
            (8, 10, "Weed Control", "pesticide"),
            (9, 5, "Second Fertilizer Dose", "fertilizer"),
            (10, 5, "Disease Inspection", "pesticide"),
            (11, 1, "Drain Water", "irrigation"),
            (11, 15, "Harvesting", "harvest"),
        ],
        "Rabi": [
            (12, 10, "Nursery Preparation", "planting"),
            (1, 5, "Transplanting", "planting"),
            (2, 1, "Fertilizer Dose", "fertilizer"),
            (4, 15, "Harvesting", "harvest"),
        ],
    },
    "Cotton": {
        "Kharif": [
            (6, 10, "Sowing", "planting"),
            (7, 20, "First Fertilizer Dose", "fertilizer"),
            (8, 20, "Bollworm Monitoring", "pesticide"),
            (12, 1, "First Picking", "harvest"),
        ]
    },
    "Maize": {
        "Kharif": [
            (6, 20, "Sowing", "planting"),
            (7, 25, "Top Dressing", "fertilizer"),
            (10, 20, "Harvesting", "harvest"),
        ],
        "Rabi": [
            (10, 25, "Sowing", "planting"),
            (12, 5, "Top Dressing", "fertilizer"),
            (3, 15, "Harvesting", "harvest"),
        ],
    },
    "Chilli": {
        "Kharif": [
            (7, 20, "Transplanting", "planting"),
            (9, 10, "Thrips Monitoring", "pesticide"),
            (1, 20, "First Picking", "harvest"),
        ]
    },
}

SUPPORTED_CROPS = sorted(_CROP_CALENDAR)


def _event_status(event_date: date, today: date, event_type: str) -> str:
    if event_date > today:
        return "pending"
    # Only time-critical activities go overdue; completed work stays completed.
    if event_type in ("pesticide", "irrigation") and (today - event_date).days <= 14:
        return "overdue"
    return "completed"


def get_crop_calendar(crop: str, season: str, region: str = "Telangana", today: date | None = None):
    today = today or date.today()
    seasons = _CROP_CALENDAR.get(crop, {})
    entries = seasons.get(season, [])

    events = []
    for index, (month, day, title, event_type) in enumerate(entries):
        event_date = date(today.year, month, day)
        events.append(
            {
                "id": f"{crop.lower()}-{season.lower()}-{index}",
                "title": title,
                "date": event_date.isoformat(),
                "type": event_type,
                "status": _event_status(event_date, today, event_type),
            }
        )

    return {"region": region, "crop": crop, "season": season, "events": events}
