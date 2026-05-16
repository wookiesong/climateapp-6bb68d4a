import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SCENARIOS, type ScenarioKey } from "@/data/scenarios";
import ScenarioComparison from "@/components/charts/ScenarioComparison";
import SectorEmissions from "@/components/charts/SectorEmissions";
import FuelMixChart from "@/components/charts/FuelMixChart";
import TechnologyChart from "@/components/charts/TechnologyChart";
import ScenarioSelector from "@/components/controls/ScenarioSelector";

export const Route = createFileRoute("/")({
  component: Index,
});

const ALL_KEYS: ScenarioKey[] = ["bau", "ndc", "50pct"];

function Index() {
  const [selected, setSelected] = useState<ScenarioKey[]>([...ALL_KEYS]);
  const [sectorScenario, setSectorScenario] = useState<ScenarioKey>("ndc");

  const toggle = (key: ScenarioKey) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
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
            return (
              <label
                key={key}
                className="flex items-start gap-3 cursor-pointer text-sm leading-snug"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(key)}
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

      <main className="flex-1 p-8 space-y-6">
        <ScenarioComparison selectedScenarios={selected} />

        <div className="rounded-xl bg-[#161b22] border border-[#21262d] p-4 space-y-3">
          <p className="text-xs uppercase tracking-wider text-[#8b949e]">
            Sector view scenario
          </p>
          <ScenarioSelector
            selected={[sectorScenario]}
            onChange={(next) => {
              const pick = next.find((k) => k !== sectorScenario) ?? next[0];
              if (pick) setSectorScenario(pick as ScenarioKey);
            }}
          />
        </div>

        <SectorEmissions scenarioKey={sectorScenario} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FuelMixChart scenarioKey={sectorScenario} />
          <TechnologyChart />
        </div>
      </main>
    </div>
  );
}
