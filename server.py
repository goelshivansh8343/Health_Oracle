from fastapi import FastAPI
from pydantic import BaseModel
from Diabetes.Predict_Diabetes import predict_diabetes
from Liver_Disease.Predict_Liver import predict_disease
from Stroke_Disease.Predict_Stroke import predict_Stroke
from Heart_Disease.Predict_Heart import predict_HeartDiseases
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app=FastAPI(title="Health_Oracle")
app.mount("/static", StaticFiles(directory="Frontend"), name="static")

@app.get("/")
def serve_index():
    return FileResponse("Frontend/index.html")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Diabetic(BaseModel):
    Pregnancies:float
    Glucose:float
    BloodPressure:float
    SkinThickness:float
    Insulin:float
    BMI:float
    DiabetesPedigreeFunction:float
    Age:int


class Heart(BaseModel):
    Age:int
    Sex:int
    Cp:int
    Trestbps:float
    Chol:float
    Fbs:int
    RestECG:int
    ThalAch:float
    Exang:int
    OldPeak:float
    Slope:int
    CA:int
    Thal:int


class Liver(BaseModel):
    Age:int
    Gender:int
    TBilirubin:float
    DBilirubin:float
    AAPhosphotase:float
    SpAAmino:float
    SoAAmino:float
    Protiens:float
    Albumin:float
    Globulin:float


class Stroke(BaseModel):
    Gender:str
    Age:int
    Hypertension:int
    HeartDisease:int
    Married:str
    WorkType:str
    ResidenceType:str
    Glucose_Level:float
    BMI:float
    Smoking_Status:str


@app.post("/predict/Heart")
def Predict_Heart(Features:Heart):
    data=Features.model_dump()
    return predict_HeartDiseases(list(data.values()))

@app.post("/predict/Diabetes")
def Predict_Diabetes(Features:Diabetic):
    data=Features.model_dump()
    return predict_diabetes(list(data.values()))

@app.post("/predict/Liver")
def Predict_Liver(Features:Liver):
    data=Features.model_dump()
    return predict_disease(list(data.values()))

@app.post("/predict/Stroke")
def Predict_Stroke(Features:Stroke):
    data=Features.model_dump()
    return predict_Stroke(data)



