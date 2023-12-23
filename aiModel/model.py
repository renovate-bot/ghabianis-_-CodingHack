import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load your training data from the database or a CSV file
# Adjust column names and data source accordingly
# Example: df = pd.read_sql("SELECT * FROM your_table", your_database_connection)
df = pd.read_csv('training.csv')

# Assuming your training data has columns like 'bloodPressure', 'bloodSugar', 'breathingRate', 'heartRate', and 'target'
# Adjust column names accordingly
X_train = df[['blood', 'sugar', 'heartbeats', 'breath']]
y_train = df.iloc[:, -1]

# Standardize the features (scaling)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_train, test_size=0.2, random_state=42)

# Train a Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

print("test elements Y",y_test ,"test element X", X_test , "predection Y" , y_pred )

# Calculate the accuracy
accuracy = accuracy_score(y_test, y_pred)

# Print the accuracy
print(f"Accuracy: {accuracy * 100:.2f}%")
# Save the trained model to a pickle file
# joblib.dump(model, 'medical_model.pkl')
