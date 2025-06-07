import os
import sys

# Add project root to Python path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

import joblib
import mlflow
from datetime import datetime
from src.model import train_model, evaluate_model
from src.data_loader import create_book_dataset, load_raw_data, preprocess_data

# Cấu hình thư mục
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

def main():
    # # 1. Xử lý dữ liệu
    # print("Loading raw data...")
    # books, users, ratings = load_raw_data()

    # print("Preprocessing data...")
    # df_processed = preprocess_data(books, users, ratings)

    # print("Saving processed data...")
    # df_processed.to_csv("data/processed/processed_ratings.csv", index=False)

    # 2. Load dữ liệu đã xử lý và train model
    print("Loading processed data for training...")
    feature_columns, (X_train, y_train), (X_test, y_test) = create_book_dataset('data/processed/processed_ratings.csv')
    
    # 3. Bắt đầu tracking bằng MLflow
    mlflow.set_experiment("Book Recommender Experiment")

    with mlflow.start_run():
        # 4. Huấn luyện mô hình
        print("Training model...")
        model = train_model(feature_columns, X_train, y_train)
        print("Training done")
        
        # 5. Đánh giá mô hình
        metrics = evaluate_model(model, X_test, y_test)
        print("Evaluation metrics:", metrics)

        # 6. Log các metric lên MLflow
        for key, value in metrics.items():
            mlflow.log_metric(key, value)

        # 7. Lưu mô hình
        model_path = os.path.join(MODEL_DIR, f"model_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pkl")
        joblib.dump(model, model_path)
        mlflow.log_artifact(model_path)

        print(f"Model saved at {model_path}")

if __name__ == "__main__":
    main()
