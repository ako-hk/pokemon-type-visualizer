interface SearchFilterProps {
  value: string;
  onChange: (v: string) => void;
  total: number;
  filtered: number;
}

export default function SearchFilter({ value, onChange, total, filtered }: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <input
        type="text"
        placeholder="Search Pokémon by name…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-72 rounded-lg bg-slate-700 border border-slate-600 px-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <span className="text-slate-400 text-sm">
        Showing {filtered} / {total} Pokémon
      </span>
    </div>
  );
}
