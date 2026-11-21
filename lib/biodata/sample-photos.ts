// Illustrated stand-in portraits for the fictional sample biodatas (see
// sample-values.ts). Deliberately drawn, not photos: the samples are
// marketing examples, and a real-looking face would suggest a real person.
// Inline SVG data URLs, so they render in the preview and PDF capture with
// no network request. Never stored in a user's draft (the photo field only
// accepts JPEGs from preparePhoto).

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_PHOTO_MAN = svgDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
<rect width="120" height="160" fill="#E9DCCB"/>
<path d="M14 160c2-30 20-44 46-44s44 14 46 44z" fill="#2F4A6B"/>
<path d="M50 112h20v14c-3 5-17 5-20 0z" fill="#B9825F"/>
<path d="M48 120l12 16 12-16" fill="none" stroke="#F4EDE2" stroke-width="3"/>
<ellipse cx="60" cy="76" rx="25" ry="30" fill="#C48D69"/>
<path d="M35 72c-2-22 10-34 26-34 17 0 28 10 26 32-4-10-11-16-26-16-14 0-22 7-26 18z" fill="#231915"/>
<ellipse cx="51" cy="78" rx="2.4" ry="2.8" fill="#231915"/>
<ellipse cx="69" cy="78" rx="2.4" ry="2.8" fill="#231915"/>
<path d="M53 92c4 3 10 3 14 0" fill="none" stroke="#7A4433" stroke-width="2" stroke-linecap="round"/>
</svg>`);

export const SAMPLE_PHOTO_WOMAN = svgDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
<rect width="120" height="160" fill="#F1DDD6"/>
<path d="M30 70c-4 40 2 70 12 90h36c10-20 16-50 12-90z" fill="#2A1A16"/>
<path d="M14 160c2-28 20-42 46-42s44 14 46 42z" fill="#9C2A4A"/>
<path d="M50 112h20v12c-3 5-17 5-20 0z" fill="#C08F72"/>
<ellipse cx="60" cy="76" rx="24" ry="29" fill="#CB9878"/>
<path d="M36 76c-3-24 8-38 24-38 17 0 28 13 25 38-3-14-12-22-25-22-12 0-21 8-24 22z" fill="#2A1A16"/>
<circle cx="60" cy="66" r="2" fill="#B3263E"/>
<ellipse cx="51" cy="78" rx="2.3" ry="2.7" fill="#231915"/>
<ellipse cx="69" cy="78" rx="2.3" ry="2.7" fill="#231915"/>
<path d="M53 92c4 3 10 3 14 0" fill="none" stroke="#8A4A3A" stroke-width="2" stroke-linecap="round"/>
<path d="M14 160c6-20 22-32 46-36" fill="none" stroke="#E2B65C" stroke-width="3"/>
</svg>`);
