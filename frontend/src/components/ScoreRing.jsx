import { motion } from "framer-motion";

export default function ScoreRing({ score }) {

  const radius = 90;

  const circumference = 2 * Math.PI * radius;

  const progress =
    circumference - (score / 100) * circumference;

  return (

    <div
      className="
        flex
        items-center
        justify-center
      "
    >

      <div className="relative w-[240px] h-[240px]">

        {/* GLOW */}

        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-blue-500/20
            blur-3xl
            animate-pulse
          "
        />

        <svg
          width="240"
          height="240"
          className="-rotate-90"
        >

          {/* BACKGROUND */}

          <circle
            cx="120"
            cy="120"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="16"
            fill="transparent"
          />

          {/* PROGRESS */}

          <motion.circle
            cx="120"
            cy="120"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="16"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{
              strokeDashoffset: circumference
            }}
            animate={{
              strokeDashoffset: progress
            }}
            transition={{
              duration: 1.5
            }}
          />

        </svg>

        {/* CENTER TEXT */}

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
          "
        >

          <p
            className="
              text-6xl
              font-bold
              text-blue-400
            "
          >
            {score}%
          </p>

          <p
            className="
              text-slate-400
              mt-2
              text-lg
            "
          >
            AI Score
          </p>

        </div>

      </div>

    </div>

  );
}