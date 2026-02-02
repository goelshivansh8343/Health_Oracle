import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import warnings
import os
warnings.filterwarnings("ignore")


BASE_DIR=os.path.dirname(__file__)
Model_Path=os.path.join(BASE_DIR,"Trained_Model")
Scaled_Path=os.path.join(BASE_DIR,"Scaler_Model")
Scaled_Model=joblib.load(Scaled_Path)
Trained_Model=joblib.load(Model_Path)

def get_risk_category(risk_percentage):
    if risk_percentage>70:
        return "High Risk"
    elif risk_percentage>=45:
        return "Moderate Risk"
    else:
        return "Low Risk"


def get_Health_advice(category):
    if category == "High Risk":
        return "Immediate medical attention is advised. Consult a specialist as soon as possible."
    elif category == "Moderate Risk":
        return "It's recommended to schedule a health check-up. Consider lifestyle changes and follow a balanced diet."
    else:
        return "You are at low risk. Maintain a healthy lifestyle and regular check-ups."
    

def predict_diabetes(features):
    Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age=features
    features=Scaled_Model.transform(np.array(features).reshape(1,-1))
    ans=Trained_Model.predict_proba(features)
    

    return {
        "Diabetic_Probability":round(ans[0][1]*100,2),
        "Risk_Category":get_risk_category(ans[0][1]*100),
        "Health_Advice":get_Health_advice(get_risk_category(ans[0][1]*100))
    }






