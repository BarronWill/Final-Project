import tensorflow as tf
from tensorflow.keras import Model
from tensorflow.keras.layers import Embedding
from src.deep_fm.layer import FM_layer, Dense_layer

class DeepFM(Model):
    def __init__(self, feature_columns, k, w_reg, v_reg, hidden_units, output_dim, activation):
        super().__init__()
        self.dense_feature_columns, self.sparse_feature_columns = feature_columns
        self.embed_layers = {
            'embed_' + str(i): Embedding(feat['feat_onehot_dim'], feat['embed_dim'])
             for i, feat in enumerate(self.sparse_feature_columns)
        }

        self.FM = FM_layer(k, w_reg, v_reg)
        self.Dense = Dense_layer(hidden_units, output_dim, activation)

    def call(self, inputs):
      sparse_inputs, dense_inputs = inputs[:, :len(self.sparse_feature_columns)], inputs[:, len(self.sparse_feature_columns):]
      sparse_embed = tf.concat([
          self.embed_layers[f'embed_{i}'](sparse_inputs[:, i])
          for i in range(sparse_inputs.shape[1])
      ], axis=1)
      dense_inputs = tf.cast(dense_inputs, tf.float32)
      x = tf.concat([sparse_embed, dense_inputs], axis=-1)
      fm_output = self.FM(x)
      dense_output = self.Dense(x)
      output = tf.nn.sigmoid(0.5*(fm_output + dense_output))
      return output