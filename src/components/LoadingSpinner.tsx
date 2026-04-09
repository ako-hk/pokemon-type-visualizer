export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="w-14 h-14 border-4 border-slate-600 border-t-red-500 rounded-full animate-spin" />
      <p className="text-slate-400 text-sm tracking-wide">Fetching Pokémon data…</p>
    </div>
  );
}
