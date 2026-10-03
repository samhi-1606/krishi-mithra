import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

# In-memory store for demo
ALERTS_STORE: List[Dict[str, Any]] = []


def create_alert(
    farmer_id: str,
    title: str,
    message: str,
    alert_type: str = "system",
    severity: str = "info",
    action_link: Optional[str] = None,
) -> Dict[str, Any]:
    alert = {
        "id": str(uuid.uuid4()),
        "farmerId": farmer_id,
        "title": title,
        "message": message,
        # weather, disease, water, market, system
        "type": alert_type,
        # info, warning, critical
        "severity": severity,
        "date": datetime.now(timezone.utc).isoformat(),
        "read": False,
        "actionLink": action_link,
    }
    ALERTS_STORE.append(alert)
    return alert


def get_alerts(farmer_id: str) -> List[Dict[str, Any]]:
    return [a for a in ALERTS_STORE if a["farmerId"] == farmer_id]


def mark_read(alert_id: str) -> bool:
    for alert in ALERTS_STORE:
        if alert["id"] == alert_id:
            alert["read"] = True
            return True
    return False
