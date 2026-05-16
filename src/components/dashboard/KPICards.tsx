interface CardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor?: string;
}

function Card({ title, value, subtitle, subtitleColor = "#8b949e" }: CardProps) {
  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
      <p className="text-xs uppercase tracking-wider text-[#8b949e] mb-2">
        {title}
      </p>
      <p className="text-2xl font-bold text-[#c9d1d9] mb-1">{value}</p>
      <p className="text-sm font-medium" style={{ color: subtitleColor }}>
        {subtitle}
      </p>
    </div>
  );
}

export default function KPICards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        title="2023 Baseline"
        value="707,200 kt"
        subtitle="Korea's total GHG emissions"
      />
      <Card
        title="2050 BAU"
        value="883,544 kt"
        subtitle="+25.0% vs 2023"
        subtitleColor="#ef4444"
      />
      <Card
        title="2050 NDC"
        value="270,606 kt"
        subtitle="-61.8% vs 2023"
        subtitleColor="#f59e0b"
      />
      <Card
        title="2050 50% Path"
        value="172,031 kt"
        subtitle="-75.6% vs 2023"
        subtitleColor="#10b981"
      />
    </div>
  );
}
