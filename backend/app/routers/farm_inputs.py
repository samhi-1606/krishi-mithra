from typing import Optional

from fastapi import APIRouter

from app.data.seed_data import SEED_DATA
from app.models.schemas import SoilAnalysisRequest

router = APIRouter(prefix="/farm-inputs", tags=["Farm Inputs"])


def _soil_status(ph: float, nitrogen: float, phosphorus: float, potassium: float) -> str:
    score = 0
    score += 1 if 6.0 <= ph <= 7.5 else 0
    score += 1 if nitrogen >= 280 else 0
    score += 1 if phosphorus >= 20 else 0
    score += 1 if potassium >= 150 else 0
    return ["poor", "fair", "fair", "good", "excellent"][score]


@router.get("/seeds")
async def seeds(
    crop: Optional[str] = None,
    region: Optional[str] = None,
    season: Optional[str] = None,
    soil: Optional[str] = None,
):
    if not crop:
        return [variety for varieties in SEED_DATA.values() for variety in varieties]
    return SEED_DATA.get(crop, [])


@router.post("/soil-analysis")
async def soil_analysis(request: SoilAnalysisRequest):
    ph = request.ph if request.ph is not None else 6.5
    nitrogen = request.nitrogen if request.nitrogen is not None else 280
    phosphorus = request.phosphorus if request.phosphorus is not None else 22
    potassium = request.potassium if request.potassium is not None else 180

    return {
        "ph": ph,
        "nitrogen": nitrogen,
        "phosphorus": phosphorus,
        "potassium": potassium,
        "organicCarbon": 0.6,
        "moisture": 45,
        "status": _soil_status(ph, nitrogen, phosphorus, potassium),
    }


@router.get("/fertilizer")
async def fertilizer(crop: str, soil_type: Optional[str] = None):
    return [
        {
            "name": "Urea (46% N)",
            "type": "chemical",
            "dosage": "50 kg/acre",
            "timing": "Basal application",
            "priceEstimate": 266,
        },
        {
            "name": "DAP (18-46-0)",
            "type": "chemical",
            "dosage": "20 kg/acre",
            "timing": "At tillering stage",
            "priceEstimate": 1350,
        },
        {
            "name": "Vermicompost",
            "type": "organic",
            "dosage": "200 kg/acre",
            "timing": "Pre-sowing",
            "priceEstimate": 1200,
        },
    ]


@router.get("/pest-control")
async def pest_control(crop: str):
    return [
        {
            "pest": "Stem Borer",
            "symptoms": [
                "Dead hearts in the vegetative stage",
                "White heads in the reproductive stage",
            ],
            "chemicalControl": "Cartap Hydrochloride 4G @ 8 kg/acre",
            "organicControl": "Neem seed kernel extract (NSKE) 5%",
            "preventiveMeasures": [
                "Use resistant varieties",
                "Clip seedling tips before transplanting",
            ],
        },
        {
            "pest": "Brown Plant Hopper",
            "symptoms": ["Circular patches of drying plants (hopper burn)"],
            "chemicalControl": "Pymetrozine 50% WG @ 120 g/acre",
            "organicControl": "Neem oil spray at 3 ml/litre",
            "preventiveMeasures": [
                "Avoid excess nitrogen",
                "Maintain 30 cm alleyways every 2 m",
            ],
        },
    ]
