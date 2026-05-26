import PredictionForm from "../components/PredictionForm";

export default function Predict() {

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
        py-20
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-16">

          <h1
            className="
              text-5xl
              md:text-6xl
              font-extrabold
              mb-6
            "
          >

            Candidate Performance
            <span
              className="
                bg-gradient-to-r
                from-blue-400
                to-purple-500
                bg-clip-text
                text-transparent
              "
            >
              {" "}Analysis
            </span>

          </h1>

          <p
            className="
              text-xl
              text-slate-300
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >

            Analyze candidate interview performance
            using advanced recruiter analytics and
            performance intelligence.

          </p>

        </div>

        {/* FORM */}

        <PredictionForm />

      </div>

    </div>

  );
}