import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import os
import warnings
warnings.filterwarnings("ignore")



BASE_DIR = os.path.dirname(__file__)

Model_Path = os.path.join(BASE_DIR, "Stroke_Trained")

Trained_Stroke = joblib.load(Model_Path)

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
    
def predict_Stroke(features):
    gender,age,hypertension,heart_disease,ever_married,work_type,Residence_type,avg_glucose_level,bmi,smoking_status=features
    val=list(features.values())
    df=pd.DataFrame([val],columns=["gender","age","hypertension","heart_disease","ever_married","work_type","Residence_type","avg_glucose_level","bmi","smoking_status"])
    ans=Trained_Stroke.predict_proba(df)
    return {
        "Stroke_Disease":round(ans[0][1]*100,2),
        "Risk_Category":get_risk_category(ans[0][1]*100),
        "Health_Advice":get_Health_advice(get_risk_category(ans[0][1]*100))
}


