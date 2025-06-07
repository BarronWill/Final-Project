import pandas as pd
from pathlib import Path
import os
from src.utils.process_location import process_location
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import numpy as np
import pickle

RAW_DATA_DIR = Path("data/raw")
PROCESSED_DATA_DIR = Path("data/processed")
ENCODER_PATH = Path("data/processed/encoders.pkl")

class DataEncoder:
    def __init__(self):
        self.encoders = {}
        
    def fit_transform(self, data: pd.DataFrame, features: list[str]) -> pd.DataFrame:
        """Encode categorical features and store encoders"""
        data = data.copy()
        for feat in features:
            if feat not in self.encoders:
                self.encoders[feat] = LabelEncoder()
            data[feat] = self.encoders[feat].fit_transform(data[feat].astype(str))
        return data
    
    def transform(self, data: pd.DataFrame, features: list[str]) -> pd.DataFrame:
        """Transform data using stored encoders"""
        data = data.copy()
        for feat in features:
            if feat in self.encoders:
                data[feat] = self.encoders[feat].transform(data[feat].astype(str))
        return data
    
    def save(self, path: Path = ENCODER_PATH):
        """Save encoders to file"""
        os.makedirs(path.parent, exist_ok=True)
        with open(path, 'wb') as f:
            pickle.dump(self.encoders, f)
        print(f"Encoders saved to {path}")
    
    @classmethod
    def load(cls, path: Path = ENCODER_PATH) -> 'DataEncoder':
        """Load encoders from file"""
        encoder = cls()
        if path.exists():
            with open(path, 'rb') as f:
                encoder.encoders = pickle.load(f)
            print(f"Encoders loaded from {path}")
        return encoder

def load_raw_data():
    print("Loading Books.csv...")
    books = pd.read_csv(RAW_DATA_DIR / "Books.csv", usecols=['ISBN','Book-Title', 'Book-Author', 'Year-Of-Publication', 'Publisher', 'Image-URL-L'], low_memory=False)
    print("Loading Users.csv...")
    users = pd.read_csv(RAW_DATA_DIR / "Users.csv", usecols=['User-ID', 'Location', 'Age'])
    print("Loading Ratings.csv...")
    ratings = pd.read_csv(RAW_DATA_DIR / "Ratings.csv", usecols=['User-ID', 'ISBN', 'Book-Rating'])

    # Print column names for debugging
    print("\nColumns in Ratings.csv:", ratings.columns.tolist())
    print("Columns in Books.csv:", books.columns.tolist())
    print("Columns in Users.csv:", users.columns.tolist())

    return books, users, ratings

def preprocess_data(df_book, df_user, df_rating):
    # Rename columns
    df_book = df_book.rename(columns={
        'Book-Title': 'Title',
        'Book-Author': 'Author',
        'ISBN': 'ISBN',
        'Year-Of-Publication':'Year',
        'Image-URL-L': 'Image_URL'
    })
    
    df_rating = df_rating.rename(columns={
        'Book-Rating': 'Rating',
        'User-ID': 'User',
        'ISBN': 'ISBN'
    })
    
    df_user = df_user.rename(columns={
        'User-ID': 'User',
        'Location': 'Location'
    })

    # Clean data
    df_user = df_user[df_user['Location'] != 'n/a, n/a, n/a']
    df_user.loc[:, 'Age'] = df_user['Age'].fillna(df_user['Age'].mean().round()).astype(int)
    df_book = df_book.dropna()
    df_rating = df_rating.dropna()

    # Lọc bỏ đánh giá có rating = 0 (nhiều dataset dùng 0 là implicit)
    df_user['Location'] = df_user['Location'].astype(str)
    df_user['Location'] = df_user['Location'].apply(process_location)
    df_rating = df_rating[df_rating['Rating'] > 0]

    df_book = df_book[df_book['Year'].astype(str).str.isnumeric()]
    df_book['Year'] = df_book['Year'].astype(int)
    df_user['Age'] = df_user['Age'].astype(int)

    df_rating['Rating'] = df_rating['Rating'].apply(lambda x: 1 if x > 5 else 0)

    # Merge data
    print("\nMerging data...")
    merged_data = pd.merge(df_rating, df_user, on="User", how="inner")
    df = pd.merge(merged_data, df_book, on="ISBN", how="inner")

    print("Final data shape:", df.shape)
    print("Final columns:", df.columns.tolist())

    return df

def create_book_dataset(file_path: str, embed_dim: int = 8, test_size: float = 0.2):
    data = pd.read_csv(file_path)
    sparse_features = ['User', 'ISBN', 'Title', 'Author', 'Location', 'Publisher']
    dense_features = ['Age', 'Year']

    # Try to load existing encoder, if not create new one
    encoder = DataEncoder.load()
    if not encoder.encoders:
        data = encoder.fit_transform(data, sparse_features)
        encoder.save()
    else:
        data = encoder.transform(data, sparse_features)

    data['label'] = data['Rating']
    
    sparse_feature_columns = [{'feat': feat, 'feat_onehot_dim': data[feat].nunique(), 'embed_dim': embed_dim} 
                            for feat in sparse_features]

    X = data[sparse_features + dense_features].values
    y = data['label'].values
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)
    
    return [dense_features, sparse_feature_columns], (X_train, y_train), (X_test, y_test)

def get_user_predictions(user_id: int, n_books: int = 100):
    # Load processed data
    processed_data = pd.read_csv(PROCESSED_DATA_DIR / "processed_ratings.csv")
    
    # Get user information
    user_info = processed_data[processed_data['User'] == user_id][['User', 'Age', 'Location']].iloc[0]
    
    # Get n random books
    books = processed_data[['ISBN', 'Title', 'Author', 'Publisher', 'Year', 'Image_URL']].drop_duplicates().sample(n=n_books)
    
    # Create prediction dataframe
    pred_data = pd.DataFrame()
    pred_data['User'] = [user_id] * n_books
    pred_data['Age'] = [user_info['Age']] * n_books
    pred_data['Location'] = [user_info['Location']] * n_books
    pred_data = pd.concat([pred_data, books.reset_index(drop=True)], axis=1)
    
    # Encode the data
    sparse_features = ['User', 'ISBN', 'Title', 'Author', 'Location', 'Publisher']
    encoder = DataEncoder.load()
    if not encoder.encoders:
        raise ValueError("No encoders found. Please train the model first.")
    
    encoded_data = encoder.transform(pred_data.drop(columns=['Image_URL']), sparse_features)
    
    # Prepare features for prediction
    dense_features = ['Age', 'Year']
    X = encoded_data[sparse_features + dense_features].values
    
    return pred_data, X

def get_top_recommendations(user_id: int, model, n_books: int = 100, top_k: int = 10):
    pred_data, X = get_user_predictions(user_id, n_books)
    
    # Get predictions
    predictions = model.predict(X)
    
    # Add predictions to dataframe
    pred_data['prediction'] = predictions
    
    # Get top k recommendations
    top_recommendations = pred_data.sort_values('prediction', ascending=False).head(top_k)
    
    return top_recommendations[['Title', 'Author', 'Publisher', 'Year', 'prediction', 'Image_URL']]

