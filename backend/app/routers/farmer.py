from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import Farmer
from app.data.demo_farmers import DEMO_FARMERS
import uuid

router = APIRouter(prefix="/farmer", tags=["Farmer"])

# In-memory store starting with demo data
farmers_db = {f["id"]: f for f in DEMO_FARMERS}

@router.get("/demo-farmers")
async def list_demo_farmers():
    return list(farmers_db.values())

@router.get("/{farmer_id}")
async def get_farmer(farmer_id: str):
    if farmer_id not in farmers_db:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmers_db[farmer_id]

@router.put("/{farmer_id}")
async def update_farmer(farmer_id: str, farmer: Farmer):
    if farmer_id not in farmers_db:
        raise HTTPException(status_code=404, detail="Farmer not found")
    farmer_dict = farmer.dict()
    farmer_dict["id"] = farmer_id
    farmers_db[farmer_id] = farmer_dict
    return farmer_dict

@router.post("/")
async def create_farmer(farmer: Farmer):
    new_id = str(uuid.uuid4())
    farmer_dict = farmer.dict()
    farmer_dict["id"] = new_id
    farmers_db[new_id] = farmer_dict
    return farmer_dict
