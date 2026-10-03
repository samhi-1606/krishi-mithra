from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class Location(BaseModel):
    lat: float
    lon: float
    address: str
    region: str


class FarmDetails(BaseModel):
    area: float
    primaryCrop: str
    soilType: str
    irrigationType: str


class Farmer(BaseModel):
    id: Optional[str] = None
    name: str
    phone: str = ""
    location: Location
    farmDetails: FarmDetails
    preferredLanguage: str = "en"
    avatarUrl: Optional[str] = None


class ChatRequest(BaseModel):
    message: str
    farmer_context: Optional[Dict[str, Any]] = Field(default=None, alias="farmerContext")
    preferred_language: str = Field(default="English", alias="preferredLanguage")

    model_config = {"populate_by_name": True}


class AlertRequest(BaseModel):
    farmer_id: str = Field(alias="farmerId")
    title: str
    message: str
    type: str = "system"
    severity: str = "info"
    actionLink: Optional[str] = None

    model_config = {"populate_by_name": True}


class AlertReadRequest(BaseModel):
    alert_id: str = Field(alias="alertId")

    model_config = {"populate_by_name": True}


class SoilAnalysisRequest(BaseModel):
    ph: Optional[float] = None
    nitrogen: Optional[float] = None
    phosphorus: Optional[float] = None
    potassium: Optional[float] = None


class SimulationRequest(BaseModel):
    dam_id: str = Field(default="sriram", alias="damId")

    model_config = {"populate_by_name": True}
