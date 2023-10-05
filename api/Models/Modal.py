from pydantic import BaseModel
from typing import List, Optional

class Item(BaseModel):
    title: str
    price: float
    quantity: int
    reviewed: bool

class OrderCreateRequest(BaseModel):
    locale: str
    items: List[Item]
    email: str
    address: Optional[str] = None
    name: str



class OrderCreateResponse(BaseModel):
    session_id: str
