const TRACKING_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ref"
]);

export function normalizeUrl(input, options = {}) {
  const { removeWww = true, keepParams = [] } = options;
  const keep = new Set(keepParams);
  const url = new URL(input, "https://example.com");

  url.protocol = url.protocol.toLowerCase();
  url.hostname = url.hostname.toLowerCase();

  if (removeWww && url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.slice(4);
  }

  url.hash = "";

  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAMS.has(key) && !keep.has(key)) {
      url.searchParams.delete(key);
    }
  }

  let pathname = decodeURI(url.pathname);
  if (pathname.length > 1) pathname = pathname.replace(/\/+$/, "");
  url.pathname = pathname;

  return `${url.hostname}${url.pathname}${url.search}`;
}
