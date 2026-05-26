from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from pydantic import BaseModel

import joblib
import numpy as np

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

from reportlab.lib.pagesizes import letter


# -----------------------------------
# FASTAPI APP
# -----------------------------------

app = FastAPI()


# -----------------------------------
# CORS
# -----------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------
# LOAD MODEL + SCALER
# -----------------------------------

model = joblib.load("model.pkl")

scaler = joblib.load("scaler.pkl")


# -----------------------------------
# REQUEST MODEL
# -----------------------------------

class CandidateData(BaseModel):

    coding_skill_score: float

    communication_skill_score: float

    confidence_score: float

    mock_interview_score: float

    logical_reasoning_score: float

    aptitude_score: float

    cgpa: float


# -----------------------------------
# HOME ROUTE
# -----------------------------------

@app.get("/")
def home():

    return {
        "message": "Interview Intelligence API Running"
    }


# -----------------------------------
# PREDICT ROUTE
# -----------------------------------

@app.post("/predict")
def predict(data: CandidateData):

    input_data = np.array([[
        data.coding_skill_score,
        data.communication_skill_score,
        data.confidence_score,
        data.mock_interview_score,
        data.logical_reasoning_score,
        data.aptitude_score,
        data.cgpa
    ]])

    scaled_data = scaler.transform(input_data)

    prediction = model.predict(scaled_data)[0]

    probability = model.predict_proba(
        scaled_data
    )[0][1]

    score = round(probability * 100, 2)

    result = (
        "Selected"
        if prediction == 1
        else "Not Selected"
    )

    return {
        "prediction": result,
        "score": score
    }


# -----------------------------------
# PDF REPORT ROUTE
# -----------------------------------

@app.post("/generate-report")
def generate_report(data: CandidateData):

    input_data = np.array([[
        data.coding_skill_score,
        data.communication_skill_score,
        data.confidence_score,
        data.mock_interview_score,
        data.logical_reasoning_score,
        data.aptitude_score,
        data.cgpa
    ]])

    scaled_data = scaler.transform(input_data)

    prediction = model.predict(scaled_data)[0]

    probability = model.predict_proba(
        scaled_data
    )[0][1]

    score = round(probability * 100, 2)

    result = (
        "Selected"
        if prediction == 1
        else "Not Selected"
    )

    # PDF FILE

    pdf_path = "candidate_report.pdf"

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter
    )

    styles = getSampleStyleSheet()

    elements = []

    # TITLE

    elements.append(
        Paragraph(
            "AI Interview Intelligence Report",
            styles["Title"]
        )
    )

    elements.append(Spacer(1, 20))

    # PERFORMANCE

    elements.append(
        Paragraph(
            f"<b>Performance Score:</b> {score}%",
            styles["BodyText"]
        )
    )

    elements.append(Spacer(1, 10))

    # LEVEL

    level = (
        "Excellent"
        if score > 80
        else "Good"
        if score > 60
        else "Average"
    )

    elements.append(
        Paragraph(
            f"<b>Candidate Level:</b> {level}",
            styles["BodyText"]
        )
    )

    elements.append(Spacer(1, 10))

    # RECOMMENDATION

    recommendation = (
        "Hire"
        if score > 75
        else "Review"
        if score > 50
        else "Reject"
    )

    elements.append(
        Paragraph(
            f"<b>Hiring Recommendation:</b> {recommendation}",
            styles["BodyText"]
        )
    )

    elements.append(Spacer(1, 20))

    # INSIGHTS

    elements.append(
        Paragraph(
            "<b>AI Recruiter Insights</b>",
            styles["Heading2"]
        )
    )

    elements.append(Spacer(1, 10))

    elements.append(
        Paragraph(
            "Candidate demonstrates strong analytical and technical capabilities.",
            styles["BodyText"]
        )
    )

    elements.append(Spacer(1, 8))

    elements.append(
        Paragraph(
            "Communication and confidence levels indicate interview readiness.",
            styles["BodyText"]
        )
    )

    elements.append(Spacer(1, 8))

    elements.append(
        Paragraph(
            "AI model suggests recruiter review based on current metrics.",
            styles["BodyText"]
        )
    )

    # BUILD PDF

    doc.build(elements)

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="AI_Candidate_Report.pdf"
    )