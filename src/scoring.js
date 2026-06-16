export function getActionForQuality(dataQuality) {
  const grade = dataQuality?.quality_grade;
  if (grade === "High") return { label: "Generate task draft", disabled: false };
  if (grade === "Medium") return { label: "Needs verification", disabled: false };
  if (grade === "Low") return { label: "Diagnostics only", disabled: true };
  return { label: "No judgment", disabled: true };
}

export function getRiskLabel(score) {
  if (score >= 80) return "High risk";
  if (score >= 60) return "Elevated";
  if (score >= 40) return "Watch";
  return "Healthy";
}

export function formatPercent(value, digits = 1) {
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatDelta(value, digits = 1) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(digits)}%`;
}
