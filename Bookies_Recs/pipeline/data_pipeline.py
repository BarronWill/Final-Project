import os
import sys

# Add project root to Python path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

from src.data_loader import load_raw_data, preprocess_data


def main():
    # 1. Xử lý dữ liệu
    print("Loading raw data...")
    books, users, ratings = load_raw_data()

    print("Preprocessing data...")
    df_processed = preprocess_data(books, users, ratings)

    print("Saving processed data...")
    df_processed.to_csv("data/processed/processed_ratings.csv", index=False)

if __name__ == "__main__":
    main()
