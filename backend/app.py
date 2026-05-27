import streamlit as st
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import joblib

# ---------------------------------------------------
# PAGE CONFIG
# ---------------------------------------------------

st.set_page_config(
    page_title="Interview Intelligence System",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ---------------------------------------------------
# LOAD MODEL
# ---------------------------------------------------

model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

# ---------------------------------------------------
# CUSTOM CSS
# ---------------------------------------------------

st.markdown("""
<style>

/* Main Background */

.stApp {
    background: linear-gradient(
        to bottom right,
        #020617,
        #000000,
        #0f172a
    );
    color: white;
}

/* Sidebar */

section[data-testid="stSidebar"] {
    background: #081028;
    border-right: 1px solid rgba(255,255,255,0.08);
}

/* Metric Cards */

[data-testid="metric-container"] {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 20px;
    border-radius: 20px;
    backdrop-filter: blur(12px);
}

/* Chart Containers */

.chart-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 20px;
    margin-top: 10px;
}

/* Headings */

h1, h2, h3 {
    color: white !important;
}

/* Hide Streamlit Branding */

#MainMenu {
    visibility: hidden;
}

footer {
    visibility: hidden;
}

header {
    visibility: hidden;
}

</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------
# SIDEBAR INPUTS
# ---------------------------------------------------

st.sidebar.title("Candidate Inputs")

coding = st.sidebar.slider(
    "Coding Skill",
    0,
    100,
    75
)

communication = st.sidebar.slider(
    "Communication Skill",
    0,
    100,
    70
)

confidence = st.sidebar.slider(
    "Confidence Score",
    0,
    100,
    72
)

mock = st.sidebar.slider(
    "Mock Interview",
    0,
    100,
    68
)

reasoning = st.sidebar.slider(
    "Logical Reasoning",
    0,
    100,
    74
)

aptitude = st.sidebar.slider(
    "Aptitude Score",
    0,
    100,
    78
)

cgpa = st.sidebar.slider(
    "CGPA",
    0.0,
    10.0,
    8.0
)

st.sidebar.success("Live Analysis Active")

# ---------------------------------------------------
# MODEL PREDICTION
# ---------------------------------------------------

input_data = np.array([[
    coding,
    communication,
    confidence,
    mock,
    reasoning,
    aptitude,
    cgpa
]])

scaled_data = scaler.transform(input_data)

prediction = model.predict(
    scaled_data
)[0]

probability = model.predict_proba(
    scaled_data
)[0][1]

score = round(probability * 100, 2)

result = (
    "Selected"
    if prediction == 1
    else "Not Selected"
)

# ---------------------------------------------------
# HERO SECTION
# ---------------------------------------------------

st.markdown("""
<h1 style='
font-size:72px;
font-weight:900;
line-height:1.1;
margin-bottom:10px;
'>
Interview Intelligence &<br>
Performance Prediction System
</h1>
""", unsafe_allow_html=True)

st.markdown("""
<h3 style='
color:#94a3b8;
font-size:28px;
font-weight:500;
margin-top:-10px;
margin-bottom:40px;
'>
Advanced candidate analytics, recruiter insights,
and interview performance prediction.
</h3>
""", unsafe_allow_html=True)

st.markdown("---")

# ---------------------------------------------------
# TOP METRIC CARDS
# ---------------------------------------------------

col1, col2, col3, col4 = st.columns(4)

with col1:

    st.metric(
        "Prediction",
        result
    )

with col2:

    st.metric(
        "Performance Score",
        f"{score}%"
    )

with col3:

    st.metric(
        "Hiring Status",
        "Approved"
        if score > 70
        else "Review"
    )

with col4:

    st.metric(
        "Readiness",
        "High"
        if score > 75
        else "Moderate"
    )

st.markdown("---")

# ---------------------------------------------------
# RADAR CHART DATA
# ---------------------------------------------------

radar_df = pd.DataFrame({
    "Skill": [
        "Coding",
        "Communication",
        "Confidence",
        "Mock",
        "Reasoning",
        "Aptitude"
    ],
    "Score": [
        coding,
        communication,
        confidence,
        mock,
        reasoning,
        aptitude
    ]
})

# ---------------------------------------------------
# RADAR CHART
# ---------------------------------------------------

radar_fig = go.Figure()

radar_fig.add_trace(go.Scatterpolar(
    r=radar_df["Score"],
    theta=radar_df["Skill"],
    fill='toself',
    line=dict(color="#3B82F6"),
    fillcolor="rgba(59,130,246,0.5)",
    name='Performance'
))

radar_fig.update_layout(
    polar=dict(
        radialaxis=dict(
            visible=True,
            range=[0, 100]
        )
    ),
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
    font=dict(color="white"),
    showlegend=False,
    height=500
)

# ---------------------------------------------------
# PIE CHART
# ---------------------------------------------------

pie_fig = px.pie(
    radar_df,
    names="Skill",
    values="Score",
    hole=0.55
)

pie_fig.update_layout(
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
    font=dict(color="white"),
    height=500
)

# ---------------------------------------------------
# CHART SECTION
# ---------------------------------------------------

chart1, chart2 = st.columns(2)

with chart1:

    st.markdown("""
    <div class="chart-card">
    <h2>Candidate Analytics</h2>
    </div>
    """, unsafe_allow_html=True)

    st.plotly_chart(
        radar_fig,
        use_container_width=True
    )

with chart2:

    st.markdown("""
    <div class="chart-card">
    <h2>Skill Distribution</h2>
    </div>
    """, unsafe_allow_html=True)

    st.plotly_chart(
        pie_fig,
        use_container_width=True
    )

st.markdown("---")

# ---------------------------------------------------
# SKILL BREAKDOWN
# ---------------------------------------------------

st.subheader("Skill Breakdown")

skills = {
    "Technical Skills": coding,
    "Communication": communication,
    "Confidence": confidence,
    "Logical Reasoning": reasoning,
    "Aptitude": aptitude
}

for skill, value in skills.items():

    st.write(f"{skill} — {value}%")

    st.progress(value / 100)

st.markdown("---")

# ---------------------------------------------------
# RECRUITER INSIGHTS
# ---------------------------------------------------

st.subheader("Recruiter Insights")

insights = []

if coding > 80:
    insights.append(
        "Strong technical problem-solving ability."
    )

if communication > 75:
    insights.append(
        "Excellent communication and articulation."
    )

if confidence > 75:
    insights.append(
        "High interview confidence detected."
    )

if aptitude > 80:
    insights.append(
        "Strong aptitude and reasoning capability."
    )

if score > 75:
    insights.append(
        "Recommended for technical hiring roles."
    )

if not insights:

    insights.append(
        "Candidate shows moderate performance with improvement potential."
    )

for insight in insights:

    st.success(insight)

st.markdown("---")

# ---------------------------------------------------
# FINAL RECOMMENDATION
# ---------------------------------------------------

st.subheader("Final Recommendation")

if score > 80:

    st.success(
        "Candidate demonstrates excellent interview readiness and hiring potential."
    )

elif score > 60:

    st.warning(
        "Candidate shows good potential with moderate improvement areas."
    )

else:

    st.error(
        "Candidate requires additional preparation before recruitment consideration."
    )