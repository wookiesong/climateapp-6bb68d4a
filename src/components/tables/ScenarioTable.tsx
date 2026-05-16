interface Row {
  label: string;
  bau: string;
  ndc: string;
  pct50: string;
}

const ROWS: Row[] = [
  { label: "Total Emissions (kt)", bau: "883,544", ndc: "270,606", pct50: "172,031" },
  { label: "Reduction vs 2018", bau: "-13.2%", ndc: "65.4%", pct50: "77.9%" },
  { label: "Energy Sector (kt)", bau: "423,893", ndc: "89,384", pct50: "15,801" },
  { label: "Industry (kt)", bau: "283,408", ndc: "122,619", pct50: "100,197" },
  { label: "Transport (kt)", bau: "93,661", ndc: "16,796", pct50: "14,962" },
  { label: "Grid Carbon Intensity (gCO2/kWh)", bau: "389.3", ndc: "69.9", pct50: "14.1" },
  { label: "Renewables Share (%)", bau: "17.1", ndc: "62.9", pct50: "67.5" },
  { label: "BEV Share (%)", bau: "32.0", ndc: "83.2", pct50: "83.5" },
];

export default function ScenarioTable() {
  return (
    <div className="rounded-xl bg-[#161b22] border border-[#21262d] p-4">
      <h3 className="text-base font-semibold text-[#c9d1d9] mb-4">
        2050 Scenario Comparison
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-[#8b949e] border-b border-[#21262d]">
              <th className="py-2 px-3 font-medium">Metric</th>
              <th className="py-2 px-3 font-medium">BAU 2050</th>
              <th className="py-2 px-3 font-medium">NDC 2050</th>
              <th className="py-2 px-3 font-medium border-l-2 border-[#10b981]">
                50% 2050
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr
                key={r.label}
                className="border-b border-[#21262d] last:border-b-0"
                style={{ background: i % 2 === 0 ? "#161b22" : "#1c2128" }}
              >
                <td className="py-2 px-3 text-[#c9d1d9]">{r.label}</td>
                <td className="py-2 px-3 text-[#c9d1d9]">{r.bau}</td>
                <td className="py-2 px-3 text-[#c9d1d9]">{r.ndc}</td>
                <td className="py-2 px-3 text-[#c9d1d9] border-l-2 border-[#10b981] font-medium">
                  {r.pct50}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
