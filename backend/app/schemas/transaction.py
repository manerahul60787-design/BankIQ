from pydantic import BaseModel


class TransactionCreate(BaseModel):
    amount: float
    category: str
    description: str
    type: str


class TransactionResponse(BaseModel):
    id: int
    amount: float
    category: str
    description: str
    type: str

    class Config:
        from_attributes = True