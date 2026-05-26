export default function Navbar() {
  return (
    <nav className="
      w-full
      px-10
      py-6
      flex
      justify-between
      items-center
      bg-black
      border-b
      border-white/10
    ">

      <h1 className="text-3xl font-bold text-white">
        InterviewAI
      </h1>

      <div className="flex gap-8 text-slate-300">

        <a href="#">
          Features
        </a>

        <a href="#">
          Predict
        </a>

        <a href="#">
          Dashboard
        </a>

      </div>

    </nav>
  );
}