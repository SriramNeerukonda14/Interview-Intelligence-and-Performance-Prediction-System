export default function ScoreCard({ title, value }) {

  return (
    <div className="
      bg-white/10
      backdrop-blur-lg
      border
      border-white/10
      rounded-3xl
      p-10
      shadow-2xl
    ">

      <h2 className="text-slate-400 text-xl mb-4">
        {title}
      </h2>

      <p className="text-5xl font-bold">
        {value}
      </p>

    </div>
  );
}