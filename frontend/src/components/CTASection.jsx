import { useNavigate } from "react-router-dom";

export default function CTASection() {

  const navigate = useNavigate();

  return (
    <section
      className="
        px-10
        py-32
        bg-slate-950
        text-white
      "
    >

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-20
          text-center
        "
      >

        {/* GLOW EFFECT */}
        <div
          className="
            absolute
            w-[400px]
            h-[400px]
            bg-blue-500/20
            rounded-full
            blur-3xl
            top-[-150px]
            left-[50%]
            -translate-x-1/2
            pointer-events-none
          "
        />

        <div className="relative z-10">

          <h2
            className="
              text-5xl
              md:text-6xl
              font-bold
              mb-8
            "
          >
            Start Predicting
            <br />

            Candidate Success
          </h2>

          <p
            className="
              text-slate-400
              text-xl
              max-w-2xl
              mx-auto
              mb-12
            "
          >
            Experience AI-powered interview intelligence,
            recruiter analytics, and candidate performance prediction.
          </p>

          <button
            onClick={() => navigate("/predict")}
            className="
              px-10
              py-5
              bg-blue-600
              hover:bg-blue-700
              hover:scale-105
              transition-all
              duration-300
              rounded-2xl
              text-xl
              font-bold
              shadow-lg
              shadow-blue-500/30
            "
          >
            Launch Prediction Engine
          </button>

        </div>

      </div>

    </section>
  );
}