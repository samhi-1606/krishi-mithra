import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List

from fastapi import APIRouter

from app.models.schemas import ChatRequest
from app.services.bhumi_service import get_bhumi_response

router = APIRouter(prefix="/bhumi", tags=["Bhumi AI"])

chat_history: Dict[str, List[Dict[str, Any]]] = {}


def _message(sender: str, text: str) -> Dict[str, Any]:
    return {
        "id": str(uuid.uuid4()),
        "sender": sender,
        "text": text,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@router.post("/chat")
async def chat_with_bhumi(request: ChatRequest):
    response = get_bhumi_response(
        request.message, request.farmer_context, request.preferred_language
    )

    context = request.farmer_context or {}
    farmer_id = context.get("id", "anonymous")
    history = chat_history.setdefault(farmer_id, [])
    history.append(_message("user", request.message))
    history.append(_message("bot", response))

    return {"text": response}


@router.get("/history/{farmer_id}")
async def get_history(farmer_id: str):
    return chat_history.get(farmer_id, [])
