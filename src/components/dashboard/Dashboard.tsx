import { useState } from "react";
import { SCENARIOS, type ScenarioKey } from "../../data/scenarios";
import KPICards from "./KPICards";
import ScenarioComparison from "../charts/ScenarioComparison";
import SectorEmissions from "../charts/SectorEmissions";
import FuelMixChart from "../charts/FuelMixChart";
import TechnologyChart from "../charts/TechnologyChart";
import CarbonBudgetTracker from "../charts/CarbonBudgetTracker";
import ScenarioTable from "../tables/ScenarioTable";
import AuthButton from "../auth/AuthButton";
import CommentSection from "../comments/CommentSection";

const ALL_KEYS: ScenarioKey[] = ["bau", "ndc", "50pct"];
const SHORT: Record<ScenarioKey, string> = {
  bau: "BAU",
  ndc: "NDC",
  "50pct": "50% Path",
};

export default function Dashboard() {
  const [selectedScenarios] = useState<ScenarioKey[]>([...ALL_KEYS]);
  const [activeSectorScenario, setActiveSectorScenario] =
    useState<ScenarioKey>("ndc");

  return (
    <div
      className="min-h-screen scroll-smooth"
      style={{ background: "#0d1117", color: "#c9d1d9" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">
              KLEAP GHG Projection Dashboard
            </h1>
            <p className="text-sm text-[#8b949e] mt-1">
              Korean Climate Policy Analysis Tool | 2024–2050 Projections
            </p>
          </div>
          <AuthButton />
        </header>

        <div className="mb-6">
          <KPICards />
        </div>

        <div className="mb-6">
          <ScenarioComparison selectedScenarios={selectedScenarios} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FuelMixChart scenarioKey={activeSectorScenario} />
          <SectorEmissions scenarioKey={activeSectorScenario} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TechnologyChart />
          <CarbonBudgetTracker />
        </div>

        <div className="rounded-xl bg-[#161b22] border border-[#21262d] p-4">
          <p className="text-xs uppercase tracking-wider text-[#8b949e] mb-3">
            Active sector / fuel mix scenario
          </p>
          <div className="inline-flex rounded-lg border border-[#21262d] overflow-hidden">
            {ALL_KEYS.map((key) => {
              const s = SCENARIOS[key];
              const active = activeSectorScenario === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSectorScenario(key)}
                  className="px-4 py-2 text-sm font-medium transition-colors border-r border-[#21262d] last:border-r-0"
                  style={{
                    background: active ? s.color : "transparent",
                    color: active ? "#0d1117" : "#c9d1d9",
                  }}
                >
                  {SHORT[key]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <ScenarioTable />
        </div>

        <div className="mt-6">
          <CommentSection />
        </div>

        <footer className="mt-10 pt-6 border-t border-[#21262d] text-center space-y-1">
          <p className="text-xs text-[#484f58]">
            KLEAP (Korean Long-term Energy & climate Analysis Platform) | Data:
            GHG projections 2024–2050
          </p>
          <p className="text-xs text-[#484f58]">
            Based on Korea's 2023 National GHG Inventory (707,200 kt CO2eq)
          </p>
        </footer>
      </div>
    </div>
  );
}
