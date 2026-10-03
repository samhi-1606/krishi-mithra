from fastapi import APIRouter

router = APIRouter(prefix="/pest", tags=["Pest Analysis"])

@router.post("/analyze")
async def analyze_pest():
    # Mocking pest analysis response
    return {
        "identified_pest": "Fall Armyworm",
        "confidence": 0.88,
        "severity": "High",
        "recommendation": "Spray Emamectin Benzoate 5% SG at 0.4g/litre of water."
    }
