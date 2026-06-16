# Architecture

SEO Content Funnel is organized around a simple diagnostics pipeline.

```text
GSC data
  -> URL normalization
  -> page and query metrics
  -> query clustering

GA4-style data
  -> URL normalization
  -> page funnel metrics
  -> conversion weakness scoring

Content crawl
  -> page structure
  -> query-to-content mapping
  -> coverage scoring

Brand knowledge base
  -> product facts
  -> pricing, screenshots, FAQs
  -> freshness checks

AI/GEO signals
  -> referral sessions
  -> crawler logs
  -> visibility diagnostics

All sources
  -> data quality checks
  -> page funnel dashboard
  -> page diagnosis
  -> intent cluster overview
  -> task draft generation
```

## Runtime Layers

### 1. Source Adapters

Adapters import data from external systems:

- Google Search Console Search Analytics API
- Google Analytics Data API
- Server, edge, or CDN logs
- Optional brand knowledge base files

### 2. Normalization

Every source must resolve to a shared `canonical_page_key`.

Common rules:

- Lowercase protocol and hostname.
- Remove fragments.
- Remove known tracking query parameters.
- Preserve business query parameters only when configured.
- Use canonical URL when available.

### 3. Diagnostics

Diagnostics jobs calculate:

- Traffic Risk Score
- Conversion Weak Score
- Content Coverage Score
- Data Quality grade
- Freshness status
- Cannibalization flags

### 4. API Layer

The UI should consume stable API contracts:

- `/api/pages/funnel`
- `/api/issues/groups`
- `/api/pages/{pageId}/diagnosis`
- `/api/query-clusters/{clusterId}/mapping`
- `/api/intent-clusters/overview`
- `/api/ai-geo/referrals`
- `/api/ai-geo/crawler-logs`
- `/api/task-drafts`

### 5. UI

The UI has five primary screens:

1. All pages funnel overview
2. Issue groups
3. Single page diagnosis
4. AI/GEO visibility and crawler logs
5. Intent cluster overview

Data Quality and Brand Knowledge Base are global modules, not primary navigation pages.
