import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  Tooltip
} from "recharts";

import { motion } from "framer-motion";

import ScoreRing from "../components/ScoreRing";

export default function Dashboard() {

  // --------------------------------
  // SAMPLE ANALYTICS DATA
  // --------------------------------

  const radarData = [
    { subject: "Coding", value: 90 },
    { subject: "Communication", value: 78 },
    { subject: "Confidence", value: 85 },
    { subject: "Aptitude", value: 88 },
    { subject: "Reasoning", value: 82 }
  ];

  const pieData = [
    { name: "Technical", value: 40 },
    { name: "Communication", value: 25 },
    { name: "Confidence", value: 20 },
    { name: "Aptitude", value: 15 }
  ];

  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#06B6D4",
    "#10B981"
  ];

  const skillData = [
    { skill: "Technical", score: 90 },
    { skill: "Communication", score: 78 },
    { skill: "Confidence", score: 85 },
    { skill: "Aptitude", score: 88 },
    { skill: "Reasoning", score: 82 }
  ];

  // --------------------------------
  // COMPONENT
  // --------------------------------

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-black
        to-slate-900
        text-white
        px-6
        py-12
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* -------------------------------- */}
        {/* PAGE TITLE */}
        {/* -------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h1
            className="
              text-5xl
              md:text-6xl
              font-extrabold
              mb-4
            "
          >
            Interview Analytics Dashboard
          </h1>

          <p
            className="
              text-slate-400
              text-xl
              mb-14
            "
          >
            Executive-level interview intelligence,
            analytics, and recruiter insights.
          </p>

        </motion.div>

        {/* -------------------------------- */}
        {/* TOP METRIC CARDS */}
        {/* -------------------------------- */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-4
            gap-6
            mb-12
          "
        >

          {[
            {
              title: "Prediction",
              value: "Selected"
            },
            {
              title: "Performance Score",
              value: "87%"
            },
            {
              title: "Hiring Status",
              value: "Recommended"
            },
            {
              title: "Readiness",
              value: "High"
            }
          ].map((card, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1
              }}
              className="
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-8
                shadow-xl
              "
            >

              <p
                className="
                  text-slate-400
                  text-lg
                  mb-4
                "
              >
                {card.title}
              </p>

              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                {card.value}
              </h2>

            </motion.div>

          ))}

        </div>

        {/* -------------------------------- */}
        {/* CHART SECTION */}
        {/* -------------------------------- */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            mb-12
          "
        >

          {/* RADAR CHART */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-8
              shadow-xl
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >
              Candidate Analytics
            </h2>

            <div className="h-[400px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <RadarChart data={radarData}>

                  <PolarGrid />

                  <PolarAngleAxis dataKey="subject" />

                  <PolarRadiusAxis />

                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />

                </RadarChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

          {/* PIE CHART */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-8
              shadow-xl
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >
              Skill Distribution
            </h2>

            <div className="h-[400px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={140}
                    label
                  >

                    {pieData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))}

                  </Pie>

                </PieChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

        </div>

        {/* -------------------------------- */}
        {/* SCORE RING + SKILLS */}
        {/* -------------------------------- */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            mb-12
          "
        >

          {/* SCORE RING */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-10
              shadow-xl
              flex
              flex-col
              items-center
              justify-center
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-10
              "
            >
              Overall Performance
            </h2>

            <ScoreRing score={87} />

          </motion.div>

          {/* SKILL BREAKDOWN */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-10
              shadow-xl
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-10
              "
            >
              Skill Breakdown
            </h2>

            <div className="space-y-8">

              {skillData.map((skill, index) => (

                <div key={index}>

                  <div
                    className="
                      flex
                      justify-between
                      mb-3
                    "
                  >

                    <span className="text-lg">
                      {skill.skill}
                    </span>

                    <span className="font-bold">
                      {skill.score}%
                    </span>

                  </div>

                  <div
                    className="
                      w-full
                      h-4
                      bg-white/10
                      rounded-full
                      overflow-hidden
                    "
                  >

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${skill.score}%`
                      }}
                      transition={{
                        duration: 1
                      }}
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-blue-500
                        to-purple-500
                      "
                    />

                  </div>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

        {/* -------------------------------- */}
        {/* RECRUITER INSIGHTS */}
        {/* -------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-10
            shadow-xl
          "
        >

          <h2
            className="
              text-4xl
              font-bold
              mb-10
            "
          >
            Recruiter Insights
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-8
            "
          >

            {[
              "Strong technical problem-solving ability",
              "Excellent interview confidence and clarity",
              "High aptitude and reasoning capability",
              "Recommended for technical hiring roles"
            ].map((insight, index) => (

              <div
                key={index}
                className="
                  bg-white/5
                  rounded-2xl
                  p-6
                  border
                  border-white/10
                "
              >

                <p
                  className="
                    text-lg
                    text-slate-300
                  "
                >
                  {insight}
                </p>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </div>

  );
}