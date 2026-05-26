import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

export default function AnalyticsRadar({ formData }) {

  // RADAR DATA

  const radarData = [
    {
      subject: "Coding",
      value: formData.coding_skill_score
    },
    {
      subject: "Communication",
      value: formData.communication_skill_score
    },
    {
      subject: "Confidence",
      value: formData.confidence_score
    },
    {
      subject: "Mock",
      value: formData.mock_interview_score
    },
    {
      subject: "Logic",
      value: formData.logical_reasoning_score
    },
    {
      subject: "Aptitude",
      value: formData.aptitude_score
    }
  ];

  // PIE CHART DATA

  const pieData = [
    {
      name: "Technical",
      value: formData.coding_skill_score
    },
    {
      name: "Communication",
      value: formData.communication_skill_score
    },
    {
      name: "Confidence",
      value: formData.confidence_score
    },
    {
      name: "Problem Solving",
      value: formData.logical_reasoning_score
    }
  ];

  // COLORS

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#06b6d4",
    "#10b981"
  ];

  return (

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-10
      "
    >

      {/* RADAR CHART */}

      <div
        className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          min-h-[500px]
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            mb-8
            text-center
            text-white
          "
        >
          Skill Analytics Radar
        </h2>

        <ResponsiveContainer width="100%" height={400}>

          <RadarChart data={radarData}>

            <PolarGrid stroke="#475569" />

            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#cbd5e1" }}
            />

            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "#64748b" }}
            />

            <Radar
              name="Candidate"
              dataKey="value"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />

          </RadarChart>

        </ResponsiveContainer>

      </div>

      {/* PIE CHART */}

      <div
        className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          min-h-[500px]
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            mb-8
            text-center
            text-white
          "
        >
          Performance Distribution
        </h2>

        <ResponsiveContainer width="100%" height={400}>

          <PieChart>

            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={130}
              dataKey="value"
              label
            >

              {pieData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}