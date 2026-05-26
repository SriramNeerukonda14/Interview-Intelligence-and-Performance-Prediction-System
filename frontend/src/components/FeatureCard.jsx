export default function FeatureCard({
  title,
  description,
}) {
  return (
    <div
      className="
        bg-white/5
        border
        border-white/10
        backdrop-blur-xl
        rounded-3xl
        p-8
        hover:scale-105
        hover:-translate-y-2
        transition-all
        duration-300
        shadow-xl
      "
    >

      <h3 className="
        text-3xl
        font-bold
        mb-4
      ">
        {title}
      </h3>

      <p className="
        text-slate-400
        text-lg
      ">
        {description}
      </p>

    </div>
  );
}