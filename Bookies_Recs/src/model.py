import tensorflow as tf
from src.deep_fm.model import DeepFM
from src.data_loader import create_book_dataset

def train_model(feature_columns, X_train, y_train):
    # Tách các cột đặc trưng
    dense_feature_columns, sparse_feature_columns = feature_columns
    # Khởi tạo mô hình
    model = DeepFM(
        feature_columns=(dense_feature_columns, sparse_feature_columns),
        k=6,           
        w_reg=1e-3,
        v_reg=1e-3,
        hidden_units=[32, 16],
        output_dim=1,
        activation='relu'
    )

    # Biên dịch mô hình
    model.compile(
        loss='binary_crossentropy',
        optimizer='adam',
        metrics=['accuracy']
    )

    # Huấn luyện
    model.fit(
        X_train,
        y_train,
        batch_size=32,
        epochs=1,
        validation_split=0.2
    )
    
    return model


def evaluate_model(model, X_test, y_test):
    # Đánh giá mô hình
    loss, accuracy = model.evaluate(X_test, y_test)
    
    # Trả về metrics dưới dạng dictionary
    return {
        'loss': float(loss),
        'accuracy': float(accuracy)
    }
