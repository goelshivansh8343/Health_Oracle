function getStarted() {
    // later this will go to login page
    window.location.href = "diseases.html";
}


function selectDisease(disease) {
    // store selected disease
    localStorage.setItem("selectedDisease", disease);

    // next page (login or form)
    window.location.href = "login.html";
}

function selectDisease(disease) {
    localStorage.setItem("selectedDisease", disease);

    if (disease === "heart") {
        window.location.href = "heart.html";
    }
    else if(disease === "diabetes"){
        window.location.href = "Diabetes.html"
    }
    else if(disease === "liver"){
        window.location.href = "Liver.html"
    }
    else if(disease === "stroke"){
        window.location.href ="Stroke.html"
    }
     else {
        window.location.href = "login.html"; // temporary for others
    }
}


function submitHeartForm(event) {
    event.preventDefault();

    const data = {
        Age: Number(document.getElementById("age").value),
        Sex: Number(document.getElementById("sex").value),
        Cp: Number(document.getElementById("cp").value),
        Trestbps: Number(document.getElementById("trestbps").value),
        Chol: Number(document.getElementById("chol").value),
        Fbs: Number(document.getElementById("fbs").value),
        RestECG: Number(document.getElementById("restecg").value),
        ThalAch: Number(document.getElementById("thalach").value),
        Exang: Number(document.getElementById("exang").value),
        OldPeak: Number(document.getElementById("oldpeak").value),
        Slope: Number(document.getElementById("slope").value),
        CA: Number(document.getElementById("ca").value),
        Thal: Number(document.getElementById("thal").value)
    };
    
   fetch("http://127.0.0.1:8000/predict/Heart", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
.then(res => res.json())
.then(result => {
    console.log("Prediction:", result);
    // print(result)

    const risk = Number(result.Heart_Disease);
    const category = result.Risk_Category;
    const advice = result.Health_Advice;

    document.getElementById("result").innerHTML = `
        <h2>Heart Disease Risk</h2>
        <p><strong>Risk:</strong> ${risk.toFixed(2)}%</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Advice:</strong> ${advice}</p>
    `;
})
.catch(err => {
    console.error("Error:", err);
});

}

function submitDiabetesForm(event) {
    event.preventDefault();

    const data = {
        Pregnancies: Number(document.getElementById("pregnancies").value),
        Glucose: Number(document.getElementById("glucose").value),
        BloodPressure: Number(document.getElementById("bloodpressure").value),
        SkinThickness: Number(document.getElementById("skinthickness").value),
        Insulin: Number(document.getElementById("insulin").value),
        BMI: Number(document.getElementById("bmi").value),
        DiabetesPedigreeFunction: Number(document.getElementById("dpf").value),
        Age: Number(document.getElementById("age").value)
    };

    fetch("http://127.0.0.1:8000/predict/Diabetes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        document.getElementById("result").innerHTML = `
            <h2>Diabetes Risk</h2>
            <p><strong>Risk:</strong> ${result.Diabetic_Probability}%</p>
            <p><strong>Category:</strong> ${result.Risk_Category}</p>
            <p><strong>Advice:</strong> ${result.Health_Advice}</p>
        `;
    })
    .catch(err => {
        console.error(err);
        alert("Server error. Try again.");
    });
}


function submitLiverForm(event) {
    event.preventDefault();

    const data = {
        Age: Number(document.getElementById("age").value),
        Gender: Number(document.getElementById("gender").value),
        TBilirubin: Number(document.getElementById("tbilirubin").value),
        DBilirubin: Number(document.getElementById("dbilirubin").value),
        AAPhosphotase: Number(document.getElementById("aaphosphotase").value),
        SpAAmino: Number(document.getElementById("spaamino").value),
        SoAAmino: Number(document.getElementById("soaamino").value),
        Protiens: Number(document.getElementById("protiens").value),
        Albumin: Number(document.getElementById("albumin").value),
        Globulin: Number(document.getElementById("globulin").value)
    };
    

    fetch("http://127.0.0.1:8000/predict/Liver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        document.getElementById("result").innerHTML = `
            <h2>Liver Disease Risk</h2>
            <p><strong>Risk:</strong> ${result.Liver_Disease}%</p>
            <p><strong>Category:</strong> ${result.Risk_Category}</p>
            <p><strong>Advice:</strong> ${result.Health_Advice}</p>
        `;
    })
    .catch(err => {
        console.error(err);
        alert("Server error. Please try again.");
    });
}


function submitStrokeForm(event) {
    event.preventDefault();

    const data = {
        Gender: document.getElementById("gender").value,
        Age: Number(document.getElementById("age").value),
        Hypertension: Number(document.getElementById("hypertension").value),
        HeartDisease: Number(document.getElementById("heartdisease").value),
        Married: document.getElementById("married").value,
        WorkType: document.getElementById("worktype").value,
        ResidenceType: document.getElementById("residencetype").value,
        Glucose_Level: Number(document.getElementById("glucose_level").value),
        BMI: Number(document.getElementById("bmi").value),
        Smoking_Status: document.getElementById("smoking_status").value
    };

    fetch("http://127.0.0.1:8000/predict/Stroke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        document.getElementById("result").innerHTML = `
            <h2>Stroke Risk</h2>
            <p><strong>Risk:</strong> ${result.Stroke_Disease}%</p>
            <p><strong>Category:</strong> ${result.Risk_Category}</p>
            <p><strong>Advice:</strong> ${result.Health_Advice}</p>
        `;
    })
    .catch(err => {
        console.error(err);
        alert("Server error. Please try again.");
    });
}
