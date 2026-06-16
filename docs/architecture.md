# Architecture

Organic Content Intelligence is a diagnostics system, not a single dashboard.

It connects several imperfect signals, makes uncertainty visible, and only recommends automation when the evidence is strong enough.

## System Pipeline

```mermaid
flowchart TD
  GSC["Google Search Console<br/>queries, pages, clicks, impressions"] --> N["URL normalization"]
  GA4["GA4 Data API<br/>sessions, engagement, events"] --> N
  LOGS["Server / edge logs<br/>AI crawler access"] --> N
  CRAWL["Content crawl<br/>headings, FAQs, CTAs, snippets"] --> N
  KB["Brand knowledge base<br/>pricing, features, screenshots, FAQ"] --> FRESH["Freshness checks"]

  N --> KEY["canonical_page_key"]
  KEY --> PAGE["Page funnel"]
  KEY --> QUERY["Query and intent clusters"]
  KEY --> GEO["AI/GEO visibility"]
  CRAWL --> MAP["Query-to-content mapping"]

  PAGE --> DIAG["Diagnosis"]
  QUERY --> DIAG
  MAP --> DIAG
  GEO --> DIAG
  FRESH --> DIAG
  DIAG --> QUALITY["Data quality gate"]
  QUALITY --> TASK["Optimization task draft"]
```

## Runtime Layers

### 1. Source Adapters

Adapters import data from external systems:

- Google Search Console Search Analytics API
- Google Analytics Data API
- Server, edge, CDN, or firewall logs
- Optional brand knowledge base files

Each adapter should preserve raw source fields before writing normalized aggregates.

### 2. Normalization

Every source must resolve to a shared `canonical_page_key`.

Common rules:

- Lowercase protocol and hostname.
- Remove fragments.
- Remove known tracking query parameters.
- Preserve business query parameters only when configured.
- Use canonical URL when available.
- Send unmatched URLs to Data Quality with `URL_MATCH_FAILED`.

### 3. Diagnostics Jobs

Diagnostics jobs calculate:

- Traffic Risk Score
- Conversion Weak Score
- Content Coverage Score
- Data Quality grade
- Freshness status
- Cannibalization flags
- AI/GEO visibility status

Scores should store their input components so users can understand why a page was flagged.

### 4. Evidence Model

```mermaid
flowchart LR
  Q["Raw query"] --> C["Query cluster"]
  C --> I["Intent type"]
  I --> S["Page section match"]
  S --> G["Gap type"]
  G --> R["Recommended action"]
  R --> E["Task draft evidence"]
```

The query cluster is the summary layer. Query-to-content mapping is the proof layer.

## API Layer

The UI should consume stable API contracts:

- `/api/pages/funnel`
- `/api/issues/groups`
- `/api/pages/{pageId}/diagnosis`
- `/api/query-clusters/{clusterId}/mapping`
- `/api/intent-clusters/overview`
- `/api/ai-geo/referrals`
- `/api/ai-geo/crawler-logs`
- `/api/task-drafts`

## UI Surfaces

```mermaid
flowchart TD
  O["Page Funnel Overview"] --> I["Issue Groups"]
  I --> D["Single Page Diagnosis"]
  D --> T["Task Draft"]
  G["AI/GEO Signals"] --> D
  C["Intent Cluster Overview"] --> D
  Q["Data Quality"] --> O
  Q --> I
  Q --> D
  Q --> C
  K["Brand Knowledge Base"] --> D
```

The UI has five primary screens:

1. All pages funnel overview
2. Issue groups
3. Single page diagnosis
4. AI/GEO visibility and crawler logs
5. Intent cluster overview

Data Quality and Brand Knowledge Base are global modules, not primary navigation pages.

## Data Boundary

GA4 data is page-level performance data.

Query clusters explain intent and content fit.

Do not present query clusters as exact conversion attribution unless a real attribution model is added later.
