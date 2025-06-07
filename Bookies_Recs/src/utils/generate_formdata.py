import numpy as np
import pandas as pd

def generate_form(books):
    user_features = []
    for _, book_row in books[:200].iterrows():
        feature = {
            'User': '123',
            'ISBN': book_row['ISBN'],
            'Title': book_row['Title'],
            'Author': book_row['Author'],
            'Location': "usa"
        }
        user_features.append(feature)

        df_input = pd.DataFrame(user_features)

        return df_input