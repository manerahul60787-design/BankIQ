from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.models.user import User
from app.models.transaction import Transaction

from app.schemas.transaction import TransactionCreate

import pandas as pd
import io

router = APIRouter()


@router.post("/add")
def add_transaction(

        transaction: TransactionCreate,

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user)

):

    new_transaction = Transaction(

        amount=transaction.amount,

        category=transaction.category,

        description=transaction.description,

        type=transaction.type,

        user_id=current_user.id

    )

    db.add(new_transaction)

    db.commit()

    db.refresh(new_transaction)

    return {

        "message": "Transaction Added",

        "id": new_transaction.id

    }


@router.get("/all")
def get_transactions(

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user)

):

    transactions = db.query(

        Transaction

    ).filter(

        Transaction.user_id == current_user.id

    ).all()

    return transactions


@router.get("/summary")
def summary(

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user)

):

    transactions = db.query(

        Transaction

    ).filter(

        Transaction.user_id == current_user.id

    ).all()

    income = 0

    expense = 0

    for t in transactions:

        if t.type.lower() == "income":

            income += t.amount

        else:

            expense += t.amount

    return {

        "income": income,

        "expense": expense,

        "balance": income - expense

    }


@router.get("/category-wise")
def category_wise(

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user)

):

    transactions = db.query(

        Transaction

    ).filter(

        Transaction.user_id == current_user.id

    ).all()

    result = {}

    for t in transactions:

        if t.type.lower() == "expense":

            result[t.category] = (

                result.get(

                    t.category,

                    0

                )

                + t.amount

            )

    return result


@router.get("/monthly")
def monthly(

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user)

):

    transactions = db.query(

        Transaction

    ).filter(

        Transaction.user_id == current_user.id

    ).all()

    result = {}

    for t in transactions:

        month = "Current Month"

        result[month] = (

            result.get(

                month,

                0

            )

            + t.amount

        )

    return result


@router.delete("/{id}")
def delete_transaction(

        id: int,

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user)

):

    transaction = db.query(

        Transaction

    ).filter(

        Transaction.id == id,

        Transaction.user_id == current_user.id

    ).first()

    if transaction:

        db.delete(transaction)

        db.commit()

        return {

            "message": "Transaction Deleted"

        }

    return {

        "message": "Transaction Not Found"

    }


@router.put("/{id}")
def update_transaction(

        id: int,

        transaction: TransactionCreate,

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user)

):

    existing = db.query(

        Transaction

    ).filter(

        Transaction.id == id,

        Transaction.user_id == current_user.id

    ).first()

    if existing:

        existing.amount = transaction.amount

        existing.category = transaction.category

        existing.description = transaction.description

        existing.type = transaction.type

        db.commit()

        return {

            "message": "Transaction Updated"

        }

    return {

        "message": "Transaction Not Found"

    }


@router.get("/export")
def export_csv(

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user)

):

    transactions = db.query(

        Transaction

    ).filter(

        Transaction.user_id == current_user.id

    ).all()

    data = []

    for t in transactions:

        data.append({

            "description": t.description,

            "category": t.category,

            "type": t.type,

            "amount": t.amount

        })

    df = pd.DataFrame(data)

    stream = io.StringIO()

    df.to_csv(

        stream,

        index=False

    )

    response = io.BytesIO()

    response.write(

        stream.getvalue().encode()

    )

    response.seek(0)

    return StreamingResponse(

        response,

        media_type="text/csv",

        headers={

            "Content-Disposition":

            "attachment; filename=transactions.csv"

        }

    )