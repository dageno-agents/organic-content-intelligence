import { aiGeo, intentOverview, pageFunnels, queryClusters, queryMappings } from "./mock-data.js";
import { formatDelta, formatPercent, getActionForQuality, getRiskLabel } from "./scoring.js";

const pageTable = document.querySelector("#page-table");
const issueCards = document.querySelector("#issue-cards");
const clusterList = document.querySelector("#cluster-list");
const intentTable = document.querySelector("#intent-table");
const geoHead = document.querySelector("#geo-head");
const geoBody = document.querySelector("#geo-body");

function scoreClass(score) {
  if (score >= 75) return "high";
  if (score >= 50) return "mid";
  return "low";
}

function renderStats() {
  const impressions = pageFunnels.reduce((sum, page) => sum + page.gsc.impressions, 0);
  const clicks = pageFunnels.reduce((sum, page) => sum + page.gsc.clicks, 0);
  const avgRisk = Math.round(
    pageFunnels.reduce((sum, page) => sum + page.traffic_risk_score, 0) / pageFunnels.length
  );
  document.querySelector("#total-impressions").textContent = impressions.toLocaleString();
  document.querySelector("#total-clicks").textContent = clicks.toLocaleString();
  document.querySelector("#avg-risk").textContent = avgRisk;
}

function renderPages() {
  pageTable.innerHTML = pageFunnels
    .map((page) => {
      const action = getActionForQuality(page.data_quality);
      return `
        <tr>
          <td>
            <span class="page-title">${page.title}</span>
            <span class="url">${page.url}</span>
          </td>
          <td>${page.primary_issue}</td>
          <td><span class="score ${scoreClass(page.traffic_risk_score)}">${page.traffic_risk_score}</span><br><small>${getRiskLabel(page.traffic_risk_score)}</small></td>
          <td><span class="score ${scoreClass(page.conversion_weak_score)}">${page.conversion_weak_score}</span></td>
          <td>${page.gsc.position.toFixed(1)} / ${page.gsc.position_delta > 0 ? "+" : ""}${page.gsc.position_delta.toFixed(1)}</td>
          <td>${formatPercent(page.gsc.ctr, 2)} / ${formatDelta(page.gsc.ctr_delta, 2)}</td>
          <td>${page.ga4_page_performance.sessions.toLocaleString()}</td>
          <td><span class="badge ${page.data_quality.quality_grade}">${page.data_quality.quality_grade}</span></td>
          <td><button ${action.disabled ? "disabled" : ""}>${action.label}</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderIssueGroups() {
  const groups = [
    { name: "CTR decline", count: 18, note: "Pages with stable visibility but weaker click-through." },
    { name: "Conversion weakness", count: 12, note: "Pages with sessions but weak CTA or key event performance." },
    { name: "New query opportunity", count: 9, note: "Queries have impressions, but content coverage is thin." },
    { name: "Stale content", count: 7, note: "Content may be outdated against product or pricing facts." },
    { name: "Intent cannibalization", count: 5, note: "Multiple pages compete for the same intent cluster." },
    { name: "AI/GEO visibility weak", count: 4, note: "Limited AI referral or crawler evidence." }
  ];

  issueCards.innerHTML = groups
    .map(
      (group) => `
        <article class="card">
          <strong>${group.name}</strong>
          <p>${group.note}</p>
          <span class="pill">${group.count} pages</span>
        </article>
      `
    )
    .join("");
}

function renderClusters() {
  clusterList.innerHTML = queryClusters
    .map((cluster) => {
      const mappings = queryMappings.filter((item) => item.cluster_id === cluster.id);
      const details =
        mappings.length === 0
          ? `<p>No mapping details in mock data.</p>`
          : mappings
              .map(
                (item) => `
                  <div class="card">
                    <strong>${item.query}</strong>
                    <p>${item.query_intent_note}</p>
                    <p><b>Current:</b> ${item.current_content_location} · ${item.matched_content_snippet}</p>
                    <p><b>Gap:</b> ${item.gap_type} · <b>Target:</b> ${item.target_location} · <b>Confidence:</b> ${item.evidence_confidence}</p>
                  </div>
                `
              )
              .join("");

      return `
        <article class="cluster">
          <div class="cluster-summary">
            <div>
              <strong>${cluster.query_cluster}</strong>
              <p>${cluster.intent_type} · ${cluster.recommended_action}</p>
            </div>
            <span>Coverage ${cluster.content_coverage_score}</span>
            <span>${formatPercent(cluster.ctr, 2)} CTR</span>
            <button data-cluster="${cluster.id}">View details</button>
          </div>
          <div class="cluster-detail">${details}</div>
        </article>
      `;
    })
    .join("");

  clusterList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".cluster").classList.toggle("open");
    });
  });
}

function renderIntentOverview() {
  intentTable.innerHTML = intentOverview
    .map(
      (intent) => `
        <tr>
          <td>${intent.intent_cluster}</td>
          <td>${intent.intent_type}</td>
          <td>${intent.impressions.toLocaleString()}</td>
          <td>${formatPercent(intent.avg_ctr, 2)}</td>
          <td>${intent.primary_landing_page}</td>
          <td><span class="score ${scoreClass(100 - intent.coverage_score)}">${intent.coverage_score}</span></td>
          <td>${intent.recommended_direction}</td>
        </tr>
      `
    )
    .join("");
}

function renderGeo(tab = "referrals") {
  if (tab === "referrals") {
    geoHead.innerHTML = `
      <tr>
        <th>Source / medium</th>
        <th>Landing page</th>
        <th>Sessions</th>
        <th>Engagement</th>
        <th>Key events</th>
      </tr>
    `;
    geoBody.innerHTML = aiGeo.referrals
      .map(
        (row) => `
          <tr>
            <td>${row.source_medium}</td>
            <td>${row.landing_page}</td>
            <td>${row.sessions}</td>
            <td>${formatPercent(row.engagement_rate)}</td>
            <td>${row.key_events}</td>
          </tr>
        `
      )
      .join("");
    return;
  }

  geoHead.innerHTML = `
    <tr>
      <th>Bot</th>
      <th>URL</th>
      <th>Status</th>
      <th>Crawl count</th>
      <th>Last seen</th>
      <th>Blocked reason</th>
    </tr>
  `;
  geoBody.innerHTML = aiGeo.crawler_logs
    .map(
      (row) => `
        <tr>
          <td>${row.bot_name}</td>
          <td>${row.url}</td>
          <td>${row.status_code}</td>
          <td>${row.crawl_count}</td>
          <td>${row.last_seen}</td>
          <td>${row.blocked_reason || "-"}</td>
        </tr>
      `
    )
    .join("");
}

function setupTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      renderGeo(button.dataset.tab);
    });
  });
}

renderStats();
renderPages();
renderIssueGroups();
renderClusters();
renderIntentOverview();
renderGeo();
setupTabs();
