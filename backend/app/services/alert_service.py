import uuid
from typing import List, Dict, Any

# In-memory store for demo
ALERTS_STORE = []

def create_alert(farmer_id: str, category: str, message: str, priority: str) -> Dict[str, Any]:
    alert = {
        "id": str(uuid.uuid4()),
        "farmer_id": farmer_id,
        "category": category, # weather, disease, pest, market, water, schemes
        "message": message,
        "priority": priority,
        "read": False
    }
    ALERTS_STORE.append(alert)
    return alert

def get_alerts(farmer_id: str) -> List[Dict[str, Any]]:
    return [a for a in ALERTS_STORE if a["farmer_id"] == farmer_id]

def mark_read(alert_id: str) -> bool:
    for a in ALERTS_STORE:
        if a["id"] == alert_id:
            a["read"] = True
            return True
    return False
