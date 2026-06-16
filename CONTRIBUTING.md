# Contributing

Thanks for considering a contribution.

This project aims to stay useful for content teams, SEO teams, growth teams, and developers building diagnostics around search traffic and page-level conversion.

## Good First Contributions

- Add a connector adapter example.
- Improve the mock dataset.
- Add more data quality reason codes.
- Add validation tests for URL normalization.
- Improve accessibility or responsive behavior in the demo UI.
- Expand docs for GSC, GA4, crawler logs, or brand knowledge base imports.

## Project Principles

- Do not imply query-level conversion attribution unless a real attribution model exists.
- Keep GA4 page performance clearly labeled as page-level data.
- Make data quality visible before recommending action.
- Avoid storing secrets, API keys, private URLs, or customer data.
- Keep the open-source core generic and portable.

## Development

```bash
npm run dev
npm run check
```

## Pull Request Checklist

- The demo still loads with mock data.
- `npm run check` passes.
- New fields are documented in `docs/data-api-spec.md` or `schemas/`.
- Private or proprietary data has not been added.
