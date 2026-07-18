const host = "chinatripcheck.com";
const key = "a6b74c1d091842fc94ee197b4ec32748";
const origin = `https://${host}`;
const keyLocation = `${origin}/${key}.txt`;
const sitemapUrl = `${origin}/sitemap.xml`;

const sitemapResponse = await fetch(sitemapUrl);

if (!sitemapResponse.ok) {
  throw new Error(
    `Unable to fetch ${sitemapUrl}: ${sitemapResponse.status} ${sitemapResponse.statusText}`,
  );
}

const sitemap = await sitemapResponse.text();
const urlList = [
  ...new Set(
    [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
      .map((match) => match[1].trim())
      .filter((url) => new URL(url).hostname === host),
  ),
];

if (urlList.length === 0) {
  throw new Error(`No ${host} URLs were found in ${sitemapUrl}.`);
}

const keyResponse = await fetch(keyLocation);
const publishedKey = (await keyResponse.text()).trim();

if (!keyResponse.ok || publishedKey !== key) {
  throw new Error(`IndexNow key is not published correctly at ${keyLocation}.`);
}

const indexNowResponse = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (!indexNowResponse.ok) {
  const responseBody = await indexNowResponse.text();
  throw new Error(
    `IndexNow rejected the submission: ${indexNowResponse.status} ${responseBody}`,
  );
}

console.log(`IndexNow accepted ${urlList.length} URLs for ${host}.`);
