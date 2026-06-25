import WeatherCard from "../components/weatherCard";

export default function Home() {
  return (
    <main className="relative isolate w-full max-w-full min-h-dvh overflow-x-hidden px-4 py-6 sm:py-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.12)_0%,_transparent_55%)]" />
        <div className="absolute top-1/4 left-0 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-0 h-72 w-72 translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-glow" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-5xl min-w-0 flex-col items-stretch py-4 sm:py-6">
        <WeatherCard />
      </div>
    </main>
  );
}
