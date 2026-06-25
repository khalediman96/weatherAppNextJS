import WeatherCard from "../components/weatherCard";

export default function Home() {
  return (
    <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden px-4 py-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.15)_0%,_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.12)_0%,_transparent_55%)]" />
      <div className="pointer-events-none absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-glow" />
      <WeatherCard />
    </main>
  );
}
