export const visaSources = {
  unilateral: "https://en.nia.gov.cn/n147418/n147463/c183390/content.html",
  expiry: "https://pg.china-embassy.gov.cn/eng/lsyw/zjfw/202606/t20260603_11923715.htm",
  russia: "https://ru.china-embassy.gov.cn/rus/lsfw_143010/zytz_142816/202605/t20260520_11914284.htm",
  transit: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
};
export const unilateralCountries = "Andorra|Austria|Belgium|Bulgaria|Croatia|Cyprus|Denmark|Estonia|Finland|France|Germany|Greece|Hungary|Iceland|Ireland|Italy|Latvia|Liechtenstein|Luxembourg|Malta|Monaco|Montenegro|Netherlands|North Macedonia|Norway|Poland|Portugal|Romania|Russia|Slovakia|Slovenia|Spain|Sweden|Switzerland|United Kingdom|Australia|New Zealand|Bahrain|Brunei|Japan|Kuwait|Oman|South Korea|Saudi Arabia|Argentina|Brazil|Canada|Chile|Peru|Uruguay".split("|");
export const transitCountries = "Albania|Austria|Belarus|Belgium|Bosnia and Herzegovina|Bulgaria|Croatia|Cyprus|Czech Republic|Denmark|Estonia|Finland|France|Germany|Greece|Hungary|Iceland|Ireland|Italy|Latvia|Lithuania|Luxembourg|Malta|Monaco|Montenegro|Netherlands|North Macedonia|Norway|Poland|Portugal|Romania|Russia|Serbia|Slovakia|Slovenia|Spain|Sweden|Switzerland|Ukraine|United Kingdom|Canada|United States|Argentina|Brazil|Chile|Mexico|Australia|New Zealand|Brunei|Indonesia|Japan|Kyrgyzstan|Qatar|Singapore|South Korea|United Arab Emirates|Vietnam".split("|");
export const countryOptions = [...new Set([...unilateralCountries, ...transitCountries, "Malaysia", "Thailand", "India", "Pakistan", "South Africa", "Philippines"])].sort();

export interface VisaRule {
  id: string;
  scheme: "direct" | "transit";
  countries: string[];
  effectiveDate: string | null;
  coverageFrom: string;
  expiryDate: string | null;
  lastVerified: string;
  reviewDue: string;
  sources: string[];
}
// coverageFrom bounds this verified snapshot; it is NOT the policy's original effective date.
export const visaRules: VisaRule[] = [
  { id: "unilateral-30-2026", scheme: "direct", countries: unilateralCountries.filter(c => c !== "Russia" && c !== "Brunei"), effectiveDate: null, coverageFrom: "2026-09-15", expiryDate: "2026-12-31", lastVerified: "2026-09-15", reviewDue: "2026-10-15", sources: [visaSources.unilateral, visaSources.expiry] },
  { id: "russia-extension-2027", scheme: "direct", countries: ["Russia"], effectiveDate: null, coverageFrom: "2026-09-15", expiryDate: "2027-12-31", lastVerified: "2026-09-15", reviewDue: "2026-10-15", sources: [visaSources.russia] },
  { id: "brunei-30", scheme: "direct", countries: ["Brunei"], effectiveDate: null, coverageFrom: "2026-09-15", expiryDate: null, lastVerified: "2026-09-15", reviewDue: "2026-10-15", sources: [visaSources.unilateral, visaSources.expiry] },
  { id: "transit-240-57", scheme: "transit", countries: transitCountries, effectiveDate: "2026-08-20", coverageFrom: "2026-09-15", expiryDate: null, lastVerified: "2026-09-15", reviewDue: "2026-10-15", sources: [visaSources.transit] },
];

export interface VisaInput {
  nationality: string; entryDate: string; scheme: "direct" | "transit";
  passport?: string; days?: number; purpose?: string; validPassport?: string;
  previous?: string; next?: string; port?: string; portConfirmed?: string; areasConfirmed?: string; onwardConfirmed?: string;
}
export type VisaResult = { status: "eligible" | "ineligible" | "review"; reasons: string[]; rule?: VisaRule };
export function assessVisa(input: VisaInput, today: string, rules = visaRules): VisaResult {
  const review = (reason: string, rule?: VisaRule): VisaResult => ({ status: "review", reasons: [reason], rule });
  if (!input.nationality || !input.entryDate) return review("Select your nationality and entry date to find a possible policy.");
  const parsed = new Date(`${input.entryDate}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.entryDate) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== input.entryDate) return review("Enter a valid entry date.");
  const candidates = rules.filter(r => r.scheme === input.scheme && r.countries.includes(input.nationality)).sort((a, b) => b.coverageFrom.localeCompare(a.coverageFrom));
  const rule = candidates.find(r => input.entryDate >= r.coverageFrom && (!r.expiryDate || input.entryDate <= r.expiryDate)) ?? candidates[0];
  if (!rule) return review("This nationality has no verified rule for the selected scheme in this tool. Bilateral agreements, 24-hour transit and regional exemptions may apply. Check NIA or your Chinese embassy.");
  if (input.entryDate < rule.coverageFrom || (rule.effectiveDate && input.entryDate < rule.effectiveDate) || (rule.expiryDate && input.entryDate > rule.expiryDate)) return review("Your date is outside this rule's verified coverage. An extension or another policy may exist; this does not mean you must obtain a visa.", rule);
  if (today > rule.reviewDue) return review("This rule is due for re-verification. Confirm the latest official policy before relying on it.", rule);
  const failed: string[] = [];
  if (input.passport && input.passport !== "ordinary" && input.passport !== "unsure") failed.push("The selected scheme covers ordinary passports; another document may be covered by a different agreement.");
  if (input.validPassport === "no") failed.push("A valid travel document is required for this scheme.");
  if (input.purpose === "work" || input.purpose === "study" || input.purpose === "journalism") failed.push("Work, study and journalism are outside this scheme's permitted short-visit purposes.");
  const limit = input.scheme === "direct" ? 30 : 10;
  if (input.days !== undefined && Number.isFinite(input.days) && input.days > limit) failed.push(`The proposed stay exceeds this scheme's ${limit}-day limit.`);
  if (input.scheme === "transit") {
    if (input.previous && input.next && input.previous !== "Other / not listed" && input.previous === input.next) failed.push("The place immediately before mainland China and the next destination must be different countries or regions.");
    if (input.portConfirmed === "no" || input.areasConfirmed === "no") failed.push("The entry port and all planned stay areas must be covered by the 240-hour policy.");
    if (input.onwardConfirmed === "no") failed.push("A confirmed onward ticket with date and seat is required.");
  }
  if (failed.length) return { status: "ineligible", reasons: failed, rule };
  if (input.passport !== "ordinary" || input.validPassport !== "yes" || !input.days || !Number.isInteger(input.days) || input.days < 1 || !["tourism", "business", "visit", "exchange", "transit"].includes(input.purpose ?? "")) return review("A possible policy matches. Complete passport, stay length and visit purpose to check its conditions.", rule);
  if (input.scheme === "transit" && (!input.previous || !input.next || input.previous === "Other / not listed" || input.next === "Other / not listed" || !input.port?.trim() || input.portConfirmed !== "yes" || input.areasConfirmed !== "yes" || input.onwardConfirmed !== "yes")) return review("Confirm the immediate inbound/outbound countries or regions, official entry port, permitted stay areas and onward ticket. Port and area checks are your confirmations, not an automated route approval.", rule);
  return { status: "eligible", reasons: ["Your answers match the checked conditions of this scheme. This is a preliminary assessment; immigration authorities decide admission.", ...(input.scheme === "transit" ? ["Port and area eligibility are based on your confirmation against the official NIA list. Check the full route with your carrier."] : []), "Recheck policy updates before departure. No passport number or document upload is needed here."], rule };
}
