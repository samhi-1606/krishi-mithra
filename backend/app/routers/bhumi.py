from fastapi import APIRouter
from app.models.schemas import ChatRequest
from app.services.bhumi_service import get_bhumi_response
from typing import List, Dict, Any

router = APIRouter(prefix="/bhumi", tags=["Bhumi AI"])

chat_history: Dict[str, List[Dict[str, str]]] = {}

@router.post("/chat")
async def chat_with_bhumi(request: ChatRequest):
    response = get_bhumi_response(request.message, request.farmer_context, request.preferred_language)
    
    farmer_id = request.farmer_context.get("id", "anonymous") if request.farmer_context else "anonymous"
    if farmer_id not in chat_history:
        chat_history[farmer_id] = []
        
    chat_history[farmer_id].append({"role": "user", "content": request.message})
    chat_history[farmer_id].append({"role": "assistant", "content": response})
    
    return {"response": response}

@router.get("/history/{farmer_id}")
async def get_history(farmer_id: str):
    return chat_history.get(farmer_id, [])
