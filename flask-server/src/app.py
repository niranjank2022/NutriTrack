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
        images = data.get("images")
        print(images[0])
        image_data = images[0]
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


# Predefined chatbot responses
responses = {
    "diabetes": {
        "food": "Low-glycemic index foods like whole grains, leafy vegetables, nuts, and lean proteins.",
        "tips": "Avoid sugary foods and processed carbs. Eat fiber-rich meals and maintain regular physical activity."
    },
    "hypertension": {
        "food": "Potassium-rich foods like bananas, leafy greens, whole grains, and low-fat dairy.",
        "tips": "Reduce salt intake, stay hydrated, and exercise regularly."
    },
    "obesity": {
        "food": "High-protein, fiber-rich foods like eggs, fish, lentils, and vegetables.",
        "tips": "Avoid processed carbs and sugary drinks. Follow portion control."
    },
    "anemia": {
        "food": "Iron-rich foods like spinach, red meat, beans, and fortified cereals.",
        "tips": "Pair iron-rich foods with vitamin C sources like oranges for better absorption."
    },
    "cholesterol": {
        "food": "Oats, nuts, fatty fish, olive oil, and avocados.",
        "tips": "Avoid trans fats and increase healthy fats. Engage in regular exercise."
    },
    "thyroid": {
        "food": "Iodine-rich foods like seaweed, eggs, dairy, and fish.",
        "tips": "Limit soy products and goitrogenic foods like cabbage in excess."
    },
    "heart": {
        "food": "Omega-3-rich fish, nuts, whole grains, and leafy greens.",
        "tips": "Reduce saturated fats and maintain an active lifestyle."
    },
    "pcos": {
        "food": "Fiber-rich foods, lean proteins, and whole grains.",
        "tips": "Avoid processed and high-sugar foods. Maintain a healthy weight."
    },
    "bone": {
        "food": "Calcium and vitamin D-rich foods like dairy, leafy greens, and almonds.",
        "tips": "Get enough sunlight for vitamin D absorption."
    },
    "gut": {
        "food": "Probiotic-rich foods like yogurt, kimchi, and high-fiber foods.",
        "tips": "Avoid excess processed foods and eat a balanced diet."
    },
    "liver": {
        "food": "Antioxidant-rich foods like berries, garlic, turmeric, and green tea.",
        "tips": "Stay hydrated and reduce alcohol intake."
    },
    "kidney": {
        "food": "Low-potassium foods like cabbage, cauliflower, and lean meats.",
        "tips": "Drink plenty of water and limit excessive protein intake."
    },
    "immunity": {
        "food": "Vitamin C-rich foods like citrus fruits, garlic, turmeric, and spinach.",
        "tips": "Get enough sleep and exercise to boost immunity."
    },
    "sleep": {
        "food": "Tryptophan-rich foods like almonds, turkey, and warm milk.",
        "tips": "Maintain a consistent sleep schedule and avoid caffeine before bedtime."
    },
    "water": {
        "food": "Hydrating foods like cucumber, watermelon, and oranges.",
        "tips": "Drink at least 8-10 glasses of water per day."
    },
    # 🔹 2. Nutritional Needs
    "protein": {
        "food": "Protein-rich foods include meat, fish, tofu, lentils, and eggs.",
        "tips": "Protein helps in muscle repair and satiety. Balance your intake based on your activity level."
    },
    "healthy fats": {
        "food": "Nuts, seeds, olive oil, and avocados.",
        "tips": "Healthy fats support brain function and heart health. Avoid trans fats."
    },
    "fiber": {
        "food": "Whole grains, legumes, and vegetables.",
        "tips": "Fiber aids digestion and regulates blood sugar levels."
    },
    "low carb": {
        "food": "Cauliflower rice, zucchini noodles, and leafy greens.",
        "tips": "Low-carb diets can help in weight management and blood sugar control."
    },
    "anti inflammatory": {
        "food": "Turmeric, berries, and fatty fish.",
        "tips": "Anti-inflammatory foods reduce the risk of chronic diseases."
    },
    # 🔹 3. Hydration & Sleep
    "hydration": {
        "food": "Water, coconut water, and hydrating fruits like oranges.",
        "tips": "Stay hydrated throughout the day to prevent fatigue and headaches."
    },
    "sleep": {
        "food": "Sleep-inducing foods like almonds, bananas, and chamomile tea.",
        "tips": "Improve sleep by maintaining a dark, cool room and avoiding screens before bed."
    },
    # 🔹 4. Special Dietary Preferences
    "vegan": {
        "food": "Plant-based proteins like tofu, lentils, and chickpeas.",
        "tips": "Ensure adequate B12 intake from fortified foods or supplements."
    },
    "gluten free": {
        "food": "Rice, quinoa, and oats (certified gluten-free).",
        "tips": "Read labels carefully and opt for whole, naturally gluten-free foods."
    },
    "keto": {
        "food": "Low-carb vegetables, healthy fats like avocados, and moderate protein sources.",
        "tips": "Stay in ketosis by limiting carb intake and increasing healthy fat consumption."
    },
    # 🔹 5. Common Eating Habits
    "skipping meals": {
        "food": "Balanced meals with proteins, carbs, and healthy fats.",
        "tips": "Skipping meals can lead to energy crashes. Plan meals ahead of time."
    },
    "snacking": {
        "food": "Healthy snacks like nuts, yogurt, and fruit.",
        "tips": "Avoid processed snacks high in sugar and salt."
    },
    "mindful eating": {
        "food": "Portion-controlled meals with whole, nutrient-dense foods.",
        "tips": "Eat slowly and focus on the flavors to improve digestion and reduce overeating."
    }
}

@app.route('/chatbot', methods=['POST'])
def chatbot():
    print("****", request.json)
    user_input = request.json.get("message", "").lower()
    
    # Check if user input matches any predefined keywords
    for keyword, response in responses.items():
        if keyword in user_input:
            return jsonify({"message": response})
    
    # Default response
    return jsonify({"message": "I'm not sure about that. Please ask about food recommendations, sleep, or hydration!"})


if __name__ == "__main__":
    PORT = 3001
    print("Flask server is running in port", PORT)
    app.run(host="0.0.0.0", port=PORT)
