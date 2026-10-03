import os
from typing import Any, Dict, Optional


def _crops(farmer_context: Optional[Dict[str, Any]]) -> str:
    if not farmer_context:
        return "your crops"
    farm_details = farmer_context.get("farmDetails") or {}
    crop = farm_details.get("primaryCrop") or farmer_context.get("primaryCrop")
    return crop or "your crops"


def _location(farmer_context: Optional[Dict[str, Any]]) -> str:
    if not farmer_context:
        return "your area"
    location = farmer_context.get("location") or {}
    return location.get("address") or farmer_context.get("region") or "your area"


def get_bhumi_response(
    message: str,
    farmer_context: Optional[Dict[str, Any]] = None,
    preferred_language: str = "English",
) -> str:
    api_key = os.getenv("LLM_API_KEY")
    if api_key:
        # Placeholder for the real LLM call.
        return f"LLM Response to '{message}' in {preferred_language}"

    message_lower = message.lower()
    crop = _crops(farmer_context)
    location = _location(farmer_context)

    if "disease" in message_lower or "pest" in message_lower:
        return (
            f"Inspect {crop} in zone B7 first: the latest scan flagged a possible leaf blast "
            "there with 91% confidence. Treat before the next rainfall."
        )
    if "weather" in message_lower or "rain" in message_lower:
        return f"Heavy rainfall is expected around {location}. Check field drainage before it arrives."
    if "market" in message_lower or "price" in message_lower or "mandi" in message_lower:
        return f"{crop} prices are moving up in nearby mandis. Review the trends before you sell."
    if "scheme" in message_lower or "apply" in message_lower:
        return "You are likely eligible for PM-KISAN and the state micro-irrigation subsidy."
    if "water" in message_lower or "dam" in message_lower or "flood" in message_lower:
        return "No upstream release is active right now. I will alert you if that changes."

    return f"Hello! How can I help with {crop} today?"
