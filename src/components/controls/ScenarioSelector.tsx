import { SCENARIOS, type ScenarioKey } from "../../data/scenarios";

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
}

const KEYS: ScenarioKey[] = ["bau", "ndc", "50pct"];
const SHORT: Record<ScenarioKey, string> = {
  bau: "BAU",
  ndc: "NDC",
  "50pct": "50pct",
};

export default function ScenarioSelector({ selected, onChange }: Props) {
  const toggle = (key: ScenarioKey) => {
    if (selected.includes(key)) {
      onChange(selected.filter((k) => k !== key));
    } else {
      onChange([...selected, key]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {KEYS.map((key) => {
        const s = SCENARIOS[key];
        const active = selected.includes(key);
        return (
          <button
            key={key}
            type="button"
            onClick={() => toggle(key)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors border-2"
            style={{
              borderColor: s.color,
              background: active ? s.color : "transparent",
              color: active ? "#0d1117" : s.color,
            }}
          >
            {SHORT[key]}
          </button>
        );
      })}
    </div>
  );
}
