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
import { PCT50_DATA } from "../../data/scenarios";

export default function TechnologyChart() {
  const data = PCT50_DATA.map((d) => ({
    year: d.year,
    bev_share_pct: d.bev_share_pct,
    eaf_share_pct: d.steel_eaf_share * 100,
  }));

  return (
    <div className="rounded-xl bg-[#161b22] border border-[#21262d] p-4">
      <h3 className="text-base font-semibold text-[#c9d1d9] mb-4">
        Key Technology Adoption (50% Reduction Scenario)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
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
          <Line type="monotone" dataKey="bev_share_pct" name="BEV Share" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="eaf_share_pct" name="EAF Share (%)" stroke="#f97316" strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
