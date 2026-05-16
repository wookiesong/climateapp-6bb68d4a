import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SCENARIOS, type ScenarioKey } from "../../data/scenarios";

interface Props {
  scenarioKey: ScenarioKey;
}

export default function FuelMixChart({ scenarioKey }: Props) {
  const scenario = SCENARIOS[scenarioKey];
  return (
    <div className="rounded-xl bg-[#161b22] border border-[#21262d] p-4">
      <h3 className="text-base font-semibold text-[#c9d1d9] mb-4">
        Power Generation Mix (%) — {scenario.label}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={scenario.data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
          <XAxis dataKey="year" stroke="#8b949e" tick={{ fill: "#8b949e", fontSize: 12 }} />
          <YAxis
            domain={[0, 100]}
            stroke="#8b949e"
            tick={{ fill: "#8b949e", fontSize: 12 }}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              background: "#0d1117",
              border: "1px solid #21262d",
              borderRadius: 6,
              color: "#c9d1d9",
            }}
            labelStyle={{ color: "#c9d1d9" }}
            formatter={(value: number) => `${value.toFixed(2)}%`}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Legend wrapperStyle={{ color: "#c9d1d9", paddingTop: 12 }} />
          <Line type="monotone" dataKey="coal_pct" name="Coal" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="nuclear_pct" name="Nuclear" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="renewables_pct" name="Renewables" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
