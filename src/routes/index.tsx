import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SCENARIOS, type ScenarioKey } from "@/data/scenarios";
import ScenarioComparison from "@/components/charts/ScenarioComparison";

export const Route = createFileRoute("/")({
  component: Index,
});

const ALL_KEYS: ScenarioKey[] = ["bau", "ndc", "50pct"];

function Index() {
  const [selected, setSelected] = useState<Set<ScenarioKey>>(
    new Set(ALL_KEYS),
  );

  const toggle = (key: ScenarioKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#0d1117", color: "#c9d1d9" }}
    >
      <aside
        className="flex flex-col p-6 shrink-0"
        style={{
          width: 256,
          background: "#161b22",
          borderRight: "1px solid #21262d",
        }}
      >
        <h1 className="text-2xl font-bold tracking-wide mb-8" style={{ color: "#c9d1d9" }}>
          KLEAP
        </h1>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider" style={{ color: "#8b949e" }}>
            Scenarios
          </p>
          {ALL_KEYS.map((key) => {
            const s = SCENARIOS[key];
            const checked = selected.has(key);
            return (
              <label
                key={key}
                className="flex items-start gap-3 cursor-pointer text-sm leading-snug"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(key)}
                  className="mt-0.5 cursor-pointer"
                  style={{ accentColor: s.color }}
                />
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ background: s.color }}
                  />
                  <span>{s.label}</span>
                </span>
              </label>
            );
          })}
        </div>
      </aside>

      <main className="flex-1 p-8">
        <ScenarioComparison selectedScenarios={Array.from(selected)} />
      </main>
    </div>
  );
}
