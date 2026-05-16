import { useState } from "react";
import { CARBON_BUDGETS, PCT50_DATA } from "../../data/scenarios";

function cumulativeThrough(year: number): number {
  return PCT50_DATA.filter((d) => d.year <= year).reduce(
    (sum, d) => sum + d.total_gross_kt,
    0,
  );
}

function Bar({
  label,
  used,
  budget,
  fillColor,
}: {
  label: string;
  used: number;
  budget: number;
  fillColor: string;
}) {
  const pct = Math.min(100, (used / budget) * 100);
  const remaining = Math.max(0, budget - used);
  const exhausted = used >= budget;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline text-sm">
        <span className="font-medium text-[#c9d1d9]">{label}</span>
        <span className="text-[#8b949e]">
          {used.toLocaleString()} / {budget.toLocaleString()} kt
        </span>
      </div>
      <div className="w-full h-4 rounded-full bg-[#21262d] overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: exhausted ? "#dc2626" : fillColor,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-[#8b949e]">
        <span>{pct.toFixed(1)}% used</span>
        <span>
          {exhausted
            ? "Budget exhausted"
            : `${remaining.toLocaleString()} kt remaining`}
        </span>
      </div>
    </div>
  );
}

export default function CarbonBudgetTracker() {
  const years = PCT50_DATA.map((d) => d.year);
  const [year, setYear] = useState<number>(2050);
  const used = cumulativeThrough(year);

  return (
    <div className="rounded-xl bg-[#161b22] border border-[#21262d] p-4 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-[#c9d1d9]">
          Carbon Budget Tracking (50% Reduction Scenario)
        </h3>
        <label className="flex items-center gap-2 text-sm text-[#8b949e]">
          Through year:
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-[#0d1117] border border-[#21262d] rounded px-2 py-1 text-[#c9d1d9]"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Bar
        label="1.5°C Budget"
        used={used}
        budget={CARBON_BUDGETS.budget_1_5c_kt}
        fillColor="#10b981"
      />
      <Bar
        label="2.0°C Budget"
        used={used}
        budget={CARBON_BUDGETS.budget_2_0c_kt}
        fillColor="#10b981"
      />

      <p className="text-sm text-[#8b949e] pt-2 border-t border-[#21262d]">
        At current trajectory (50% reduction scenario), the 1.5°C budget is
        exhausted by ~2036.
      </p>
    </div>
  );
}
