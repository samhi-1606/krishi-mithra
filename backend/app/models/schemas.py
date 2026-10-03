from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class Location(BaseModel):
    state: str
    district: str
    mandal: str
    village: str
    lat: float
    lon: float

class Farmer(BaseModel):
    id: Optional[str] = None
    name: str
    location: Location
    crops: List[str]
    farm_area: float
    soil_type: str
    irrigation: str
    preferred_language: str

class ChatRequest(BaseModel):
    message: str
    farmer_context: Optional[Dict[str, Any]] = None
    preferred_language: str = "English"

class AlertRequest(BaseModel):
    farmer_id: str
    category: str
    message: str
    priority: str

class AlertReadRequest(BaseModel):
    alert_id: str
