from fastapi import FastAPI,Depends
from repository.processfile import load_data,generate_aggre_json,generate_rating_json
from fastapi.middleware.cors import CORSMiddleware
from database import engine,Base
import auth 

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth.router,prefix="/auth",tags=["Auth"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"message":"Welcome to this Application. Use /auth/register and /auth/login"}

@app.get("/ratings") 
def get_ratings(user:dict=Depends(auth.verify_token)): 
    data_lf=load_data()
    ratings_lf=generate_rating_json(data_lf)
    return ratings_lf.collect().to_dicts()

@app.get("/aggregations")
def get_aggregations(user:dict=Depends(auth.verify_token)): 
    data_lf=load_data()
    ratings_lf=generate_rating_json(data_lf)
    aggregations_lf=generate_aggre_json(ratings_lf)
    return aggregations_lf.collect().to_dicts()
    
     
     

