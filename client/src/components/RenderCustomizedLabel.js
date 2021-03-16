const RADIAN = Math.PI / 180;
export const RenderCustomizedLabel = (props) => {
    let {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      label,
    } = props;
    const radius = innerRadius + (outerRadius - innerRadius) *1.3
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${label} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };