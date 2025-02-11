from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session 
from passlib.context import CryptContext 
from jose import JWTError,jwt 
from datetime import datetime,timedelta
from database import SessionLocal 
from models import User 
from schemas import UserCreate, UserLogin, TokenData 
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY="1234567890"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30 

pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")

def get_db(): 
    db=SessionLocal()
    try:    
        yield db 
    finally: 
        db.close()
        
        
router=APIRouter()
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="/auth/login")

def verify_token(token:str=Depends(oauth2_scheme)): 
    try: 
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        email: str=payload.get("sub")
        if email is None: 
            raise HTTPException(status_code=401,detail="Invalid Token")
        return TokenData(email=email)
    except JWTError: 
        raise HTTPException(status_code=401,detail="Invalid Token")

def hash_password(password:str): 
    return pwd_context.hash(password)

def verify_password(plain_password,hashed_password): 
    return pwd_context.verify(plain_password,hashed_password)

def create_access_token(data:dict,expires_delta:timedelta|None=None):
    to_encode=data.copy()
    expire=datetime.utcnow()+(expires_delta or timedelta(minutes=15))
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)

@router.post("/register")
def register(user: UserCreate,db: Session=Depends(get_db)): 
    db_user=db.query(User).filter(User.email==user.email).first()
    
    if db_user: 
        raise HTTPException(status_code=400,detail="Email already exists")
    
    hashed_password=hash_password(user.password)
    new_user=User(name=user.name,email=user.email,password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message":"User registered successfully"}

@router.post("/login")

def login(user:UserLogin,db:Session=Depends(get_db)):
    db_user=db.query(User).filter(User.email==user.email).first()
    
    if not db_user or not verify_password(user.password,db_user.password): 
        raise HTTPException(status_code=400,detail="Invalid credentials")
    
    token=create_access_token(data={"sub":db_user.email},expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token":token,"token_type":"bearer"}