import uuid

from fastapi import APIRouter, HTTPException

from app.data.demo_farmers import DEMO_FARMERS
from app.models.schemas import Farmer

router = APIRouter(prefix="/farmer", tags=["Farmer"])

# In-memory store starting with demo data
farmers_db = {f["id"]: f for f in DEMO_FARMERS}
DEMO_FARMER_IDS = [f["id"] for f in DEMO_FARMERS]


@router.get("/demo-farmers")
async def list_demo_farmers():
    # Only the seeded profiles: farmers created at runtime must not show up in the demo picker.
    return [farmers_db[farmer_id] for farmer_id in DEMO_FARMER_IDS if farmer_id in farmers_db]


@router.get("/{farmer_id}")
async def get_farmer(farmer_id: str):
    if farmer_id not in farmers_db:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmers_db[farmer_id]


@router.put("/{farmer_id}")
async def update_farmer(farmer_id: str, farmer: Farmer):
    if farmer_id not in farmers_db:
        raise HTTPException(status_code=404, detail="Farmer not found")
    farmer_dict = farmer.model_dump()
    farmer_dict["id"] = farmer_id
    farmers_db[farmer_id] = farmer_dict
    return farmer_dict


@router.post("")
async def create_farmer(farmer: Farmer):
    farmer_dict = farmer.model_dump()
    farmer_dict["id"] = farmer.id or str(uuid.uuid4())
    farmers_db[farmer_dict["id"]] = farmer_dict
    return farmer_dict
