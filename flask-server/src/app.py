from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.inception_v3 import preprocess_input
import cv2
import base64
import pandas as pd

app = Flask(__name__)
app.logger.setLevel('ERROR')

# Load trained model
model = tf.keras.models.load_model("./src/model/food.h5")
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Load class indices
class_indices = {v: k for k, v in np.load("./src/model/class_indices.npy", allow_pickle=True).item().items()}

def identify_food(img_array):
    img_array = preprocess_input(img_array)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)[0]
    confidence = np.max(predictions) * 100
    food_name = class_indices.get(predicted_class, "Unknown")
    return food_name, confidence

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        image_data = data.get("image")

        if not image_data:
            return jsonify({"error": "No image provided"}), 400

        # Decode Base64 image
        image_bytes = base64.b64decode(image_data)
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Resize image for model
        img_resized = cv2.resize(img, (224, 224))
        img_array = np.expand_dims(img_resized, axis=0)

        # Identify food
        food_name, confidence = identify_food(img_array)
        
        print("DONE")
        return jsonify({
            "foodName": food_name,
            "confidence": confidence,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    PORT = 3001
    print("Flask server is running in port", PORT)
    app.run(host="0.0.0.0", port=PORT)
