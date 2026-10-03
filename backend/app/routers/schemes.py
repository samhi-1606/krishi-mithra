from typing import Optional

from fastapi import APIRouter

from app.data.schemes_data import SCHEMES

router = APIRouter(prefix="/schemes", tags=["Schemes"])

_PUBLIC_FIELDS = ("id", "title", "description", "eligibility", "benefits", "deadline", "applicationUrl")


def _matches(values, wanted: str) -> bool:
    return "All" in values or wanted.lower() in [v.lower() for v in values]


@router.get("")
async def schemes(region: Optional[str] = None, crop: Optional[str] = None):
    results = SCHEMES
    if region:
        results = [s for s in results if _matches(s["applicable_regions"], region)]
    if crop:
        results = [s for s in results if _matches(s["applicable_crops"], crop)]
    return [{key: scheme[key] for key in _PUBLIC_FIELDS} for scheme in results]
