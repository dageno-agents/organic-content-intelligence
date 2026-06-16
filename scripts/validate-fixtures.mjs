import { pageFunnels, queryClusters, intentOverview } from "../src/mock-data.js";
import { getActionForQuality } from "../src/scoring.js";
import { normalizeUrl } from "../src/url-normalize.js";

const allowedGrades = new Set(["High", "Medium", "Low", "Invalid"]);
const errors = [];

for (const page of pageFunnels) {
  if (!page.id || !page.url || !page.title) errors.push(`Invalid page identity: ${page.id}`);
  if (!allowedGrades.has(page.data_quality?.quality_grade)) {
    errors.push(`Invalid data quality grade for ${page.id}`);
  }
  const action = getActionForQuality(page.data_quality);
  if (!action.label) errors.push(`Missing action for ${page.id}`);
}

for (const cluster of queryClusters) {
  if (!["estimated", "directional"].includes(cluster.attribution_label)) {
    errors.push(`Invalid attribution label for ${cluster.id}`);
  }
}

for (const intent of intentOverview) {
  if (typeof intent.coverage_score !== "number") {
    errors.push(`Invalid coverage score for ${intent.intent_cluster}`);
  }
}

const normalized = normalizeUrl("https://www.Example.com/blog/post/?utm_source=x&gclid=123#faq");
if (normalized !== "example.com/blog/post") {
  errors.push(`URL normalization failed: ${normalized}`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Fixture validation passed.");
