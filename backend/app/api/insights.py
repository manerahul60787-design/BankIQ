from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.models.user import User
from app.models.transaction import Transaction

router = APIRouter()


@router.get("/")
def insights(

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user)

):

    transactions = db.query(

        Transaction

    ).filter(

        Transaction.user_id == current_user.id

    ).all()

    if len(transactions) == 0:

        return {

            "message":

            "No transactions found"

        }

    category_totals = {}

    for t in transactions:

        category_totals[t.category] = (

            category_totals.get(

                t.category,

                0

            )

            + t.amount

        )

    highest = max(

        category_totals,

        key=category_totals.get

    )

    return {

        "message":

        f"You spend most on {highest}. Try reducing expenses."

    }