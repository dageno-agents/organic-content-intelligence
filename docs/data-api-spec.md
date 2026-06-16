# Data and API Spec

This document defines the portable data contract for Organic Content Intelligence.

## Google Search Console

Use the Search Analytics query endpoint.

Reference:

```text
https://developers.google.com/webmaster-tools/v1/searchanalytics/query
```

Recommended requests:

| Purpose | Dimensions | Target table |
| --- | --- | --- |
| Page daily metrics | `date,page` | `gsc_page_daily` |
| Page-query daily metrics | `date,page,query` | `gsc_query_daily` |
| SERP features | `date,page,searchAppearance` | `gsc_search_appearance_daily` |

Response metrics:

- `clicks`
- `impressions`
- `ctr`
- `position`

Implementation notes:

- Use `rowLimit`.
- Use `startRow` for pagination.
- Store `ctr` as a `0-1` decimal.
- `position` is average ranking; lower is better.

## GA4 Data API

Use `properties.runReport`.

References:

```text
https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport
https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema
```

Recommended page-level dimensions:

- `date`
- `landingPagePlusQueryString`
- `sessionSourceMedium`

Recommended page-level metrics:

- `sessions`
- `engagedSessions`
- `engagementRate`
- `keyEvents`

Recommended event dimensions:

- `date`
- `landingPagePlusQueryString`
- `eventName`

Recommended event metrics:

- `eventCount`
- `keyEvents`

Important boundary:

GA4 data is page-level performance data. It should be displayed as:

```text
GA4 Page Performance, not query attribution
```

Query clusters explain search intent and content fit. They do not prove exact conversions from a specific query cluster.

## Required Events

- `article_cta_view`
- `article_cta_click`
- `hero_cta_click`
- `inline_cta_click`
- `pricing_click`
- `signup_click`
- `demo_click`
- `comparison_table_click`
- `toc_click`
- `faq_expand`
- `copy_prompt_click`
- `outbound_tool_click`
- `internal_link_click`

## Required Params

- `article_id`
- `page_path`
- `page_url`
- `article_title`
- `content_type`
- `module_id`
- `module_type`
- `module_position`
- `cta_id`
- `cta_text`
- `cta_type`
- `destination_url`
- `destination_domain`
- `query_cluster`
- `ab_variant`

## Data Quality

All surfaces should read the same object:

```json
{
  "quality_grade": "High",
  "reason_codes": [],
  "checked_at": "2026-06-16T00:00:00Z"
}
```

Allowed grades:

- `High`
- `Medium`
- `Low`
- `Invalid`

Suggested reason codes:

| Code | Meaning | Default impact |
| --- | --- | --- |
| `GSC_MISSING` | No Search Console data | Invalid |
| `GA4_MISSING` | No GA4 page data | Medium/Low |
| `URL_MATCH_FAILED` | Source URLs could not be joined | Low |
| `LOW_SAMPLE_SIZE` | Sessions or impressions too low | Medium |
| `PARTIAL_RECENT_DATA` | Recent GSC data may be incomplete | Medium |
| `EVENT_TRACKING_MISSING` | Required events missing | Low |
| `KB_MISSING` | No brand knowledge base | Medium |
| `KB_STALE` | Knowledge base is outdated | Medium |
| `CRAWLER_LOG_MISSING` | No crawler logs connected | Medium |
| `MANUAL_REVIEW_REQUIRED` | Conflicting or low-confidence evidence | Medium |

## Scoring

Scores are risk scores. Higher means worse.

### Traffic Risk Score

```text
traffic_risk_score = round(
  0.30 * impressions_weight +
  0.25 * clicks_decline_weight +
  0.20 * position_decline_weight +
  0.15 * ctr_decline_weight +
  0.10 * serp_feature_risk_weight
)
```

### Conversion Weak Score

```text
conversion_weak_score = round(
  0.25 * low_engagement_weight +
  0.25 * low_cta_click_weight +
  0.20 * low_key_event_weight +
  0.15 * low_scroll_or_module_weight +
  0.15 * intent_cta_mismatch_weight
)
```

## Task Draft Rules

| Data quality | Page list action | Detail page action |
| --- | --- | --- |
| High | Generate task draft | Generate task draft |
| Medium | Needs verification | Requires manual confirmation |
| Low | Diagnostics only | Disabled |
| Invalid | No judgment | Disabled |
