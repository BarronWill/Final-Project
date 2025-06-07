# Book Recommendation System

This project consists of three main components:
- Frontend (React)
- Backend (Django)
- Recommendation System (Python)

## Prerequisites

- Python 3.8 or higher
- Node.js and npm
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Backend Setup (Django)
```bash
cd Bookies_BE

# Create virtual environment
python -m venv venv

# Activate virtual environment
# For Windows:
venv\Scripts\activate
# For Unix/MacOS:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the backend server
python manage.py runserver
```
The backend will be running at `http://localhost:8000`

### 3. Frontend Setup (React)
```bash
cd Bookies_FE

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will be running at `http://localhost:5173`

### 4. Recommendation System Setup
```bash
cd Bookies_Recs

# Create virtual environment
python -m venv venv

# Activate virtual environment
# For Windows:
venv\Scripts\activate
# For Unix/MacOS:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Create .env file and configure necessary environment variables
# (Check the documentation for required environment variables)

# Start the recommendation system
python run api/api.py
```

### 5. Dataset Setup
1. Download the dataset from [Book Recommendation Dataset](https://www.kaggle.com/datasets/arashnic/book-recommendation-dataset)
2. Extract the downloaded files
3. Place the dataset files in the `data/raw` directory of the recommendation system

## Project Structure
```
├── Bookies_BE/          # Django Backend
├── Bookies_FE/          # React Frontend
└── Bookies_Recs/        # Recommendation System
    └── data/
        └── raw/         # Place dataset files here
```

## Running the Complete System
1. Start the backend server (Django)
2. Start the frontend development server (React)
3. Start the recommendation system
4. Access the application through your web browser at `http://localhost:5173`

## Troubleshooting
- If you encounter any port conflicts, make sure no other services are running on ports 8000 (backend) or 5173 (frontend)
- Ensure all virtual environments are properly activated before running the respective components
- Check that all required environment variables are properly set in the .env files

## Support
For any issues or questions, please open an issue in the repository. 