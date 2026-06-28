from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.core.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    amount = Column(Float)

    category = Column(String)

    description = Column(String)

    type = Column(String)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )