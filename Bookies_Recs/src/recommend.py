import pandas as pd
from src.data_loader import encode_data

def recommend_books(user_id, location, books, model):
    user_features = []
    for _, book_row in books[:200].iterrows():
        feature = {
            'User': user_id,
            'ISBN': book_row['ISBN'],
            'Title': book_row['Title'],
            'Author': book_row['Author'],
            'Location': location
        }
        user_features.append(feature)
    sparse_features = ['User', 'ISBN', 'Title', 'Author', 'Location']
    data = encode_data(user_features, sparse_features)
    preds = model.predict(data)
    return preds