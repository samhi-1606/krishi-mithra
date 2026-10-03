from fastapi import APIRouter
from app.models.schemas import AlertRequest, AlertReadRequest
from app.services.alert_service import get_alerts, mark_read, create_alert

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("/")
async def list_alerts(farmer_id: str):
    return get_alerts(farmer_id)

@router.post("/read")
async def read_alert(request: AlertReadRequest):
    success = mark_read(request.alert_id)
    return {"success": success}

@router.post("/")
async def new_alert(request: AlertRequest):
    alert = create_alert(request.farmer_id, request.category, request.message, request.priority)
    return alert
