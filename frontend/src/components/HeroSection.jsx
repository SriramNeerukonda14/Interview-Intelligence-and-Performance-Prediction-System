import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {

  const navigate = useNavigate();

  return (

    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        relative
        overflow-hidden
        px-6
        bg-gradient-to-br
        from-slate-950
        via-black
        to-slate-900
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-blue-500/20
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-purple-500/20
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          max-w-6xl
          text-center
        "
      >

        {/* TITLE */}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            text-5xl
            md:text-7xl
            font-extrabold
            leading-tight
            text-white
          "
        >

          Interview Intelligence
          <br />

          <span
            className="
              bg-gradient-to-r
              from-blue-400
              to-purple-500
              bg-clip-text
              text-transparent
            "
          >
            & Performance Prediction System
          </span>

        </motion.h1>

        {/* SUBTITLE */}

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="
            mt-8
            text-xl
            md:text-2xl
            text-slate-300
            max-w-4xl
            mx-auto
            leading-relaxed
          "
        >

          Advanced candidate performance analytics,
          recruiter insights, and interview prediction
          using data-driven intelligence.

        </motion.p>

        {/* BUTTONS */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="
            mt-14
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-6
          "
        >

          {/* START ANALYSIS */}

          <button

            onClick={() => navigate("/predict")}

            className="
              px-10
              py-5
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              transition-all
              duration-300
              text-lg
              font-bold
              shadow-lg
              shadow-blue-500/30
              hover:scale-105
            "
          >

            Start Analysis

          </button>

          {/* VIEW DASHBOARD */}

          <button

            onClick={() => navigate("/dashboard")}

            className="
              px-10
              py-5
              rounded-2xl
              border
              border-white/20
              bg-white/5
              backdrop-blur-xl
              hover:bg-white/10
              transition-all
              duration-300
              text-lg
              font-bold
              hover:scale-105
            "
          >

            View Dashboard

          </button>

        </motion.div>

      </div>

    </section>

  );
}