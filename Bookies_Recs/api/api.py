import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
from typing import List, Dict, Optional
import numpy as np
from src.data_loader import get_top_recommendations

app = FastAPI(title="Book Recommender API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load model
MODEL_DIR = "models"
latest_model = max([os.path.join(MODEL_DIR, f) for f in os.listdir(MODEL_DIR) if f.endswith('.pkl')], 
                   key=os.path.getctime)
model = joblib.load(latest_model)

class UserRequest(BaseModel):
    userId: int
    n_books: Optional[int] = 100
    top_k: Optional[int] = 10

class BookRecommendation(BaseModel):
    title: str
    author: str
    publisher: str
    year: int
    prediction: float
    image_url: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Book Recommender API"}

@app.post("/predict", response_model=List[BookRecommendation])
async def predict_post(user_request: UserRequest):
    try:
        # Get recommendations
        recommendations = get_top_recommendations(
            user_id=user_request.userId,
            model=model,
            n_books=user_request.n_books,
            top_k=user_request.top_k
        )
        
        # Convert recommendations to list of dictionaries
        result = []
        for _, row in recommendations.iterrows():
            result.append(BookRecommendation(
                title=row['Title'],
                author=row['Author'],
                publisher=row['Publisher'],
                year=row['Year'],
                prediction=float(row['prediction']),
                image_url=row['Image_URL']
            ))
        
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003) 