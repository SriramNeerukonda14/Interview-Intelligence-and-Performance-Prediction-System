import { useState } from "react";
import { motion } from "framer-motion";

import API from "../api/api";

import AnalyticsRadar from "./AnalyticsRadar";
import ScoreRing from "./ScoreRing";

export default function PredictionForm() {

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    coding_skill_score: 75,
    communication_skill_score: 70,
    confidence_score: 72,
    mock_interview_score: 68,
    logical_reasoning_score: 74,
    aptitude_score: 78,
    cgpa: 8
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await API.post(
        "/predict",
        formData
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);

      alert("Prediction Failed");

    } finally {

      setLoading(false);

    }

  };

  const handleDownloadReport = async () => {

    try {

      const response = await API.post(
        "/generate-report",
        formData,
        {
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "Candidate_Report.pdf"
      );

      document.body.appendChild(link);

      link.click();

    } catch (error) {

      console.error(error);

      alert("PDF Download Failed");

    }

  };

  const sliders = [
    {
      label: "Coding Skill",
      name: "coding_skill_score"
    },
    {
      label: "Communication Skill",
      name: "communication_skill_score"
    },
    {
      label: "Confidence Score",
      name: "confidence_score"
    },
    {
      label: "Mock Interview",
      name: "mock_interview_score"
    },
    {
      label: "Logical Reasoning",
      name: "logical_reasoning_score"
    },
    {
      label: "Aptitude Score",
      name: "aptitude_score"
    }
  ];

  return (

    <div className="space-y-12">

      {/* FORM */}

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
        className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-10
          shadow-2xl
        "
      >

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-10
          "
        >

          {sliders.map((slider, index) => (

            <div key={index}>

              <div
                className="
                  flex
                  justify-between
                  mb-4
                "
              >

                <label className="text-lg">
                  {slider.label}
                </label>

                <span
                  className="
                    text-blue-400
                    font-bold
                  "
                >
                  {formData[slider.name]}
                </span>

              </div>

              <input
                type="range"
                min="0"
                max="100"
                name={slider.name}
                value={formData[slider.name]}
                onChange={handleChange}
                className="
                  w-full
                  accent-blue-500
                  cursor-pointer
                "
              />

            </div>

          ))}

        </div>

        {/* CGPA */}

        <div className="mt-12">

          <div
            className="
              flex
              justify-between
              mb-4
            "
          >

            <label className="text-lg">
              CGPA
            </label>

            <span
              className="
                text-blue-400
                font-bold
              "
            >
              {formData.cgpa}
            </span>

          </div>

          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            className="
              w-full
              accent-blue-500
              cursor-pointer
            "
          />

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            mt-14
            py-5
            rounded-2xl
            bg-blue-600
            hover:bg-blue-700
            hover:scale-[1.02]
            transition-all
            duration-300
            text-xl
            font-bold
            shadow-lg
            shadow-blue-500/30
          "
        >

          {loading
            ? "Analyzing Candidate..."
            : "Predict Performance"}

        </button>

      </motion.form>

      {/* RESULT SECTION */}

      {result && (

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-10
            shadow-2xl
          "
        >

          <h2
            className="
              text-4xl
              font-bold
              mb-10
              text-center
            "
          >
            Candidate Performance Analysis
          </h2>

          {/* SCORE RING */}

          <div className="mb-14">

            <ScoreRing score={result.score} />

          </div>

          {/* RESULT CARDS */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-8
            "
          >

            {/* SCORE */}

            <div
              className="
                bg-blue-600/20
                rounded-2xl
                p-8
                text-center
              "
            >

              <h3 className="text-xl mb-4">
                Performance Score
              </h3>

              <p
                className="
                  text-5xl
                  font-bold
                  text-blue-400
                "
              >
                {result.score}%
              </p>

            </div>

            {/* LEVEL */}

            <div
              className="
                bg-purple-600/20
                rounded-2xl
                p-8
                text-center
              "
            >

              <h3 className="text-xl mb-4">
                Candidate Level
              </h3>

              <p
                className="
                  text-3xl
                  font-bold
                  text-purple-400
                "
              >

                {result.score > 80
                  ? "Excellent"
                  : result.score > 60
                  ? "Good"
                  : result.score > 40
                  ? "Average"
                  : "Needs Improvement"}

              </p>

            </div>

            {/* RECOMMENDATION */}

            <div
              className="
                bg-green-600/20
                rounded-2xl
                p-8
                text-center
              "
            >

              <h3 className="text-xl mb-4">
                Hiring Recommendation
              </h3>

              <p
                className="
                  text-3xl
                  font-bold
                  text-green-400
                "
              >

                {result.score > 75
                  ? "Hire"
                  : result.score > 50
                  ? "Review"
                  : "Reject"}

              </p>

            </div>

          </div>

          {/* CHARTS */}

          <div className="mt-12">

            <AnalyticsRadar formData={formData} />

          </div>

          {/* RECRUITER INSIGHTS */}

          <div
            className="
              mt-12
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-10
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-8
                text-white
              "
            >
              Recruiter Insights
            </h2>

            <div className="space-y-6">

              {/* TECHNICAL */}

              <div
                className="
                  bg-blue-600/10
                  border
                  border-blue-500/20
                  rounded-2xl
                  p-5
                "
              >

                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  Technical Analysis
                </h3>

                <p className="text-slate-300">

                  {formData.coding_skill_score > 80
                    ? "Strong technical capabilities detected. Candidate demonstrates excellent coding proficiency."
                    : formData.coding_skill_score > 60
                    ? "Good coding skills observed with moderate technical confidence."
                    : "Technical skills need improvement for advanced interview rounds."}

                </p>

              </div>

              {/* COMMUNICATION */}

              <div
                className="
                  bg-purple-600/10
                  border
                  border-purple-500/20
                  rounded-2xl
                  p-5
                "
              >

                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  Communication Analysis
                </h3>

                <p className="text-slate-300">

                  {formData.communication_skill_score > 80
                    ? "Excellent communication and articulation skills detected."
                    : formData.communication_skill_score > 60
                    ? "Communication skills are solid with room for refinement."
                    : "Candidate should improve communication clarity and confidence."}

                </p>

              </div>

              {/* CONFIDENCE */}

              <div
                className="
                  bg-cyan-600/10
                  border
                  border-cyan-500/20
                  rounded-2xl
                  p-5
                "
              >

                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  Confidence Analysis
                </h3>

                <p className="text-slate-300">

                  {formData.confidence_score > 80
                    ? "High interview confidence detected with leadership potential."
                    : formData.confidence_score > 60
                    ? "Moderate confidence level suitable for most interviews."
                    : "Candidate may require mock interview practice to improve confidence."}

                </p>

              </div>

              {/* FINAL RECOMMENDATION */}

              <div
                className="
                  bg-green-600/10
                  border
                  border-green-500/20
                  rounded-2xl
                  p-5
                "
              >

                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  Final Recruiter Recommendation
                </h3>

                <p className="text-slate-300">

                  {result.score > 80
                    ? "Candidate is highly suitable for recruitment and demonstrates strong overall interview readiness."
                    : result.score > 60
                    ? "Candidate shows good potential with minor improvement areas."
                    : "Candidate requires additional preparation before recruitment consideration."}

                </p>

              </div>

            </div>

          </div>

          {/* DOWNLOAD REPORT */}

          <div className="mt-12 text-center">

            <button

              onClick={handleDownloadReport}

              className="
                px-10
                py-4
                bg-purple-600
                hover:bg-purple-700
                rounded-2xl
                text-lg
                font-bold
                transition-all
                duration-300
                hover:scale-105
                shadow-lg
                shadow-purple-500/30
              "
            >

              Download Candidate Report

            </button>

          </div>

          {/* FINAL RESULT */}

          <div
            className="
              mt-10
              bg-white/5
              rounded-2xl
              p-6
              text-center
            "
          >

            <h3
              className="
                text-2xl
                font-semibold
                mb-4
              "
            >
              Final Decision
            </h3>

            <p
              className={`
                text-5xl
                font-bold
                ${
                  result.prediction === "Selected"
                    ? "text-green-400"
                    : "text-red-400"
                }
              `}
            >
              {result.prediction}
            </p>

          </div>

        </motion.div>

      )}

    </div>

  );
}