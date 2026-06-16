export const pageFunnels = [
  {
    id: "page_001",
    title: "AI SEO Optimization Guide",
    url: "https://example.com/blog/ai-seo-optimization",
    content_type: "blog",
    primary_issue: "Ranking / impressions decline",
    traffic_risk_score: 91,
    conversion_weak_score: 52,
    gsc: {
      impressions: 92900,
      impressions_delta: -0.29,
      clicks: 1760,
      ctr: 0.0189,
      ctr_delta: -0.0029,
      position: 11.8,
      position_delta: 3.6
    },
    ga4_page_performance: {
      sessions: 1610,
      engagement_rate: 0.48,
      cta_clicks: 72,
      key_events: 41
    },
    search_features: ["video"],
    data_quality: {
      quality_grade: "High",
      reason_codes: []
    }
  },
  {
    id: "page_002",
    title: "Best AI Search Visibility Tools",
    url: "https://example.com/blog/ai-search-visibility-tools",
    content_type: "listicle",
    primary_issue: "CTR decline",
    traffic_risk_score: 73,
    conversion_weak_score: 48,
    gsc: {
      impressions: 64200,
      impressions_delta: 0.35,
      clicks: 940,
      ctr: 0.0146,
      ctr_delta: -0.0048,
      position: 5.8,
      position_delta: -0.4
    },
    ga4_page_performance: {
      sessions: 890,
      engagement_rate: 0.61,
      cta_clicks: 63,
      key_events: 38
    },
    search_features: ["product snippet"],
    data_quality: {
      quality_grade: "Medium",
      reason_codes: ["LOW_SAMPLE_SIZE", "MANUAL_REVIEW_REQUIRED"]
    }
  },
  {
    id: "page_003",
    title: "How to Track Brand Mentions in LLMs",
    url: "https://example.com/blog/track-ai-brand-mentions",
    content_type: "blog",
    primary_issue: "Conversion weakness",
    traffic_risk_score: 38,
    conversion_weak_score: 84,
    gsc: {
      impressions: 74100,
      impressions_delta: 0.46,
      clicks: 1180,
      ctr: 0.0159,
      ctr_delta: -0.0021,
      position: 4.9,
      position_delta: -0.6
    },
    ga4_page_performance: {
      sessions: 1110,
      engagement_rate: 0.71,
      cta_clicks: 39,
      key_events: 8
    },
    search_features: ["forum"],
    data_quality: {
      quality_grade: "High",
      reason_codes: []
    }
  },
  {
    id: "page_004",
    title: "AI Visibility Tools 2026",
    url: "https://example.com/blog/ai-visibility-tools-2026",
    content_type: "blog",
    primary_issue: "Intent cannibalization",
    traffic_risk_score: 76,
    conversion_weak_score: 61,
    gsc: {
      impressions: 40500,
      impressions_delta: -0.11,
      clicks: 530,
      ctr: 0.0131,
      ctr_delta: -0.0012,
      position: 12.2,
      position_delta: 2.4
    },
    ga4_page_performance: {
      sessions: 498,
      engagement_rate: 0.54,
      cta_clicks: 22,
      key_events: 11
    },
    search_features: [],
    data_quality: {
      quality_grade: "Low",
      reason_codes: ["URL_MATCH_FAILED", "EVENT_TRACKING_MISSING"]
    }
  }
];

export const queryClusters = [
  {
    id: "cluster_001",
    page_id: "page_001",
    query_cluster: "ai seo optimization",
    intent_type: "informational",
    impressions: 38400,
    clicks: 720,
    ctr: 0.0188,
    position: 9.7,
    content_coverage_score: 76,
    current_content_location: "H2: AI SEO workflow",
    recommended_action: "Refresh examples and add current AI crawler notes",
    attribution_label: "directional",
    data_quality: {
      quality_grade: "High",
      reason_codes: []
    }
  },
  {
    id: "cluster_002",
    page_id: "page_002",
    query_cluster: "ai search visibility tools",
    intent_type: "commercial",
    impressions: 51200,
    clicks: 755,
    ctr: 0.0147,
    position: 5.6,
    content_coverage_score: 58,
    current_content_location: "Comparison table",
    recommended_action: "Improve product comparison and CTA placement",
    attribution_label: "estimated",
    data_quality: {
      quality_grade: "Medium",
      reason_codes: ["MANUAL_REVIEW_REQUIRED"]
    }
  },
  {
    id: "cluster_003",
    page_id: "page_003",
    query_cluster: "track brand mentions in chatgpt",
    intent_type: "tool",
    impressions: 44800,
    clicks: 910,
    ctr: 0.0203,
    position: 4.4,
    content_coverage_score: 34,
    current_content_location: "Short paragraph",
    recommended_action: "Add step-by-step workflow and CTA module",
    attribution_label: "directional",
    data_quality: {
      quality_grade: "High",
      reason_codes: []
    }
  }
];

export const queryMappings = [
  {
    cluster_id: "cluster_003",
    query: "how to track brand mentions in chatgpt",
    query_intent_note: "User wants a practical monitoring workflow.",
    matched_content_snippet: "Mentions can be monitored with AI visibility tools.",
    current_content_location: "Paragraph 6",
    gap_type: "coverage_shallow",
    target_location: "New H2 + checklist",
    evidence_confidence: "High"
  },
  {
    cluster_id: "cluster_003",
    query: "chatgpt brand monitoring tool",
    query_intent_note: "User is comparing tool options.",
    matched_content_snippet: "No direct comparison table found.",
    current_content_location: "None",
    gap_type: "missing_section",
    target_location: "Comparison table",
    evidence_confidence: "Medium"
  }
];

export const intentOverview = [
  {
    intent_cluster: "AI search visibility tools",
    intent_type: "commercial",
    impressions: 95700,
    clicks: 1495,
    avg_position: 5.2,
    avg_ctr: 0.0156,
    primary_landing_page: "Best AI Search Visibility Tools",
    covered_pages: 2,
    coverage_score: 61,
    traffic_risk_score: 74,
    conversion_weak_score: 55,
    cannibalization_flag: true,
    ai_geo_signal: "AI referrals + crawler logs",
    recommended_direction: "Merge overlap and strengthen comparison intent"
  },
  {
    intent_cluster: "Track brand mentions in LLMs",
    intent_type: "tool",
    impressions: 44800,
    clicks: 910,
    avg_position: 4.4,
    avg_ctr: 0.0203,
    primary_landing_page: "How to Track Brand Mentions in LLMs",
    covered_pages: 1,
    coverage_score: 34,
    traffic_risk_score: 38,
    conversion_weak_score: 84,
    cannibalization_flag: false,
    ai_geo_signal: "Crawler logs only",
    recommended_direction: "Add workflow module and stronger CTA"
  }
];

export const aiGeo = {
  referrals: [
    {
      source_medium: "chatgpt.com / referral",
      landing_page: "/blog/ai-seo-optimization",
      sessions: 138,
      engagement_rate: 0.62,
      key_events: 9
    },
    {
      source_medium: "perplexity.ai / referral",
      landing_page: "/blog/ai-search-visibility-tools",
      sessions: 74,
      engagement_rate: 0.57,
      key_events: 4
    }
  ],
  crawler_logs: [
    {
      bot_name: "GPTBot",
      url: "/blog/ai-seo-optimization",
      status_code: 200,
      crawl_count: 18,
      last_seen: "2026-06-15",
      blocked_reason: ""
    },
    {
      bot_name: "ClaudeBot",
      url: "/blog/ai-visibility-tools-2026",
      status_code: 403,
      crawl_count: 3,
      last_seen: "2026-06-12",
      blocked_reason: "robots or firewall rule"
    }
  ]
};
