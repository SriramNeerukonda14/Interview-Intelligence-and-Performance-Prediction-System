import FeatureCard from "./FeatureCard";

export default function FeatureSection() {

  const features = [
    {
  title: "Performance Prediction Engine",

  description:
    "Predict candidate interview outcomes using advanced performance analytics and intelligent prediction models."
},
    {
      title: "Candidate Analytics",
      description:
        "Analyze communication, aptitude, confidence, and coding performance."
    },
    {
      title: "Recruiter Intelligence",
      description:
        "Generate recruiter-grade insights and hiring recommendations."
    }
  ];

  return (
    <section
      className="
        px-10
        py-32
        bg-slate-950
        text-white
      "
    >

      <h2
        className="
          text-6xl
          font-bold
          text-center
          mb-20
        "
      >
        Platform Features
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-10
        "
      >

        {features.map((feature, index) => (

          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />

        ))}

      </div>

    </section>
  );
}