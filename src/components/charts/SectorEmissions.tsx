import {
  BarChart,
  Bar,
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

const SECTORS = [
  { key: "energy_kt", name: "Energy", fill: "#2563eb" },
  { key: "industry_kt", name: "Industry", fill: "#dc2626" },
  { key: "transport_kt", name: "Transport", fill: "#f59e0b" },
  { key: "buildings_kt", name: "Buildings", fill: "#10b981" },
  { key: "agriculture_kt", name: "Agriculture", fill: "#8b5cf6" },
  { key: "waste_kt", name: "Waste", fill: "#ec4899" },
] as const;

const formatK = (v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`);
const formatFull = (v: number) => `${v.toLocaleString()} kt`;

export default function SectorEmissions({ scenarioKey }: Props) {
  const scenario = SCENARIOS[scenarioKey];
  const data = scenario.data;

  return (
    <div className="rounded-xl bg-[#161b22] border border-[#21262d] p-4">
      <h3 className="text-base font-semibold text-[#c9d1d9] mb-4">
        Sector Emissions Breakdown — {scenario.label}
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
          <XAxis
            dataKey="year"
            stroke="#8b949e"
            tick={{ fill: "#8b949e", fontSize: 12 }}
          />
          <YAxis
            stroke="#8b949e"
            tick={{ fill: "#8b949e", fontSize: 12 }}
            tickFormatter={formatK}
          />
          <Tooltip
            contentStyle={{
              background: "#0d1117",
              border: "1px solid #21262d",
              borderRadius: 6,
              color: "#c9d1d9",
            }}
            labelStyle={{ color: "#c9d1d9" }}
            formatter={(value: number) => formatFull(value)}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Legend wrapperStyle={{ color: "#c9d1d9", paddingTop: 12 }} />
          {SECTORS.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              stackId="a"
              fill={s.fill}
              name={s.name}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
