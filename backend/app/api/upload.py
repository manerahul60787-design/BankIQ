from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.models.user import User
from app.models.transaction import Transaction

import pandas as pd
import io

router = APIRouter()


@router.post("/csv")
async def upload_csv(

        file: UploadFile = File(...),

        db: Session = Depends(get_db),

        current_user: User = Depends(get_current_user)

):

    contents = await file.read()

    df = pd.read_csv(

        io.StringIO(

            contents.decode("utf-8")

        )

    )

    count = 0

    for _, row in df.iterrows():

        transaction = Transaction(

            amount=row["amount"],

            category=row["category"],

            description=row["description"],

            type=row["type"],

            user_id=current_user.id

        )

        db.add(

            transaction

        )

        count += 1

    db.commit()

    return {

        "message":

        f"{count} Transactions Imported"

    }