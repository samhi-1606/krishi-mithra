from typing import List, Dict, Any

def get_recommendations(disease_risk: str, rain: str, dam_release: str, farm_location: str, market_price: str) -> List[Dict[str, str]]:
    recommendations = []
    
    if disease_risk.lower() == "high" and rain.lower() == "high":
        recommendations.append({"action": "Inspect affected zone before rainfall", "priority": "High"})
        
    if dam_release.lower() == "active" and farm_location.lower() == "downstream":
        recommendations.append({"action": "Potential water risk, monitor drainage", "priority": "High"})
        
    if market_price.lower() == "rising":
        recommendations.append({"action": "Consider selling at peak", "priority": "Medium"})
        
    if not recommendations:
        recommendations.append({"action": "Continue regular maintenance", "priority": "Low"})
        
    return recommendations
