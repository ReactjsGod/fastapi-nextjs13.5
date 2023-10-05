from pydantic import BaseModel
from typing import List  # Import List from typing module

# Create a Pydantic model for your request data
class CreateCheckoutSessionRequest(BaseModel):
    locale: str
    items: List[dict]  # Use List with an uppercase 'L' and quotes
    name: str
    email: str
