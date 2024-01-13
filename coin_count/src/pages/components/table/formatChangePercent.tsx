
export const formatChangePercent = (percent: string) => {
  const change = parseFloat(percent);
  const className = change < 0 ? "text-red-500" : "text-green-500";
  return <span className={className}>{change.toFixed(2)}%</span>;
};
