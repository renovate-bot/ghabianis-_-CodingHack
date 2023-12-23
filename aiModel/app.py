from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the trained model
model = joblib.load('medical_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    features = [data['bloodPressure'], data['bloodSugar'], data['breathingRate'], data['heartRate']]
    
    # Debugging: Print the input features
    print("Input Features:", features)

    prediction = model.predict([features])[0]

    # Debugging: Print the raw prediction from the model
    print("Raw Prediction:", prediction)

    # Convert prediction to a standard Python integer
    prediction = int(prediction)

    # Debugging: Print the final prediction
    print("Final Prediction:", prediction)

    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(port=5000)
