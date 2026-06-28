from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.user import router as user_router
from app.api.transaction import router as transaction_router
from app.api.upload import router as upload_router
from app.api.insights import router as insights_router

from app.core.database import Base, engine

from app.models.user import User
from app.models.transaction import Transaction

Base.metadata.create_all(bind=engine)

app = FastAPI(

    title="BankIQ API",

    version="1.0.0",

    description="AI Banking Intelligence Platform"

)

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:5173",

        "http://localhost:5174"

    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

app.include_router(

    user_router,

    prefix="/users",

    tags=["Users"]

)

app.include_router(

    transaction_router,

    prefix="/transactions",

    tags=["Transactions"]

)

app.include_router(

    upload_router,

    prefix="/upload",

    tags=["Upload"]

)

app.include_router(

    insights_router,

    prefix="/insights",

    tags=["Insights"]

)


@app.get("/")
def root():

    return {

        "message": "Welcome to BankIQ API 🚀"

    }