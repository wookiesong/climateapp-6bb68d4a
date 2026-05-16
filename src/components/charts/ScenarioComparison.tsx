import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { SCENARIOS, type ScenarioKey } from "../../data/scenarios";

interface Props {
  selectedScenarios: string[];
}

const ALL_YEARS = [2023, 2024, 2025, 2030, 2035, 2040, 2045, 2050];

function formatK(v: number) {
  if (v >= 1000) return `${Math.round(v / 1000)}k`;
  return `${v}`;
}

function formatFull(v: number) {
  return `${v.toLocaleString()} kt`;
}

export default function ScenarioComparison({ selectedScenarios }: Props) {
  const keys = selectedScenarios.filter(
    (k): k is ScenarioKey => k in SCENARIOS,
  );

  const merged = ALL_YEARS.map((year) => {
    const row: Record<string, number> = { year };
    keys.forEach((k) => {
      const point = SCENARIOS[k].data.find((d) => d.year === year);
      if (point) row[k] = point.total_gross_kt;
    });
    return row;
  }).filter((row) => keys.some((k) => row[k] !== undefined));

  return (
    <div className="rounded-xl bg-[#161b22] border border-[#21262d] p-4">
      <h3 className="text-base font-semibold text-[#c9d1d9] mb-4">
        Total GHG Emissions: Scenario Comparison (kt CO2eq)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={merged} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
          <XAxis
            dataKey="year"
            type="number"
            domain={[2023, 2050]}
            ticks={ALL_YEARS}
            stroke="#8b949e"
            tick={{ fill: "#8b949e", fontSize: 12 }}
          />
          <YAxis
            stroke="#8b949e"
            tick={{ fill: "#8b949e", fontSize: 12 }}
            tickFormatter={formatK}
            label={{
              value: "kt CO2eq",
              angle: -90,
              position: "insideLeft",
              fill: "#8b949e",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip
            contentStyle={{
              background: "#0d1117",
              border: "1px solid #21262d",
              borderRadius: 6,
              color: "#c9d1d9",
            }}
            labelStyle={{ color: "#c9d1d9" }}
            formatter={(value: number, name: string) => [
              formatFull(value),
              SCENARIOS[name as ScenarioKey]?.label ?? name,
            ]}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Legend
            wrapperStyle={{ color: "#c9d1d9", paddingTop: 12 }}
            formatter={(value) =>
              SCENARIOS[value as ScenarioKey]?.label ?? value
            }
          />
          <ReferenceLine
            y={780140}
            stroke="#8b949e"
            strokeDasharray="4 4"
            label={{
              value: "2018 Level: 780,140 kt",
              fill: "#8b949e",
              fontSize: 11,
              position: "insideTopRight",
            }}
          />
          <ReferenceLine
            y={707200}
            stroke="#8b949e"
            strokeDasharray="4 4"
            label={{
              value: "2023 Level: 707,200 kt",
              fill: "#8b949e",
              fontSize: 11,
              position: "insideBottomRight",
            }}
          />
          {keys.map((k) => (
            <Line
              key={k}
              type="monotone"
              dataKey={k}
              stroke={SCENARIOS[k].color}
              strokeWidth={2.5}
              dot={{ r: 3, fill: SCENARIOS[k].color }}
              activeDot={{ r: 5 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
