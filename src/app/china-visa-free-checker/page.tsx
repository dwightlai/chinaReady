import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { SoftwareApplicationJsonLd } from "@/components/site/seo-json-ld";
import { VisaChecker } from "@/features/planning-tools/visa-checker";
const path = "/china-visa-free-checker";
const description = "Check a possible China visa-free entry scheme by nationality and entry date, then review passport, stay, purpose and transit conditions with official sources.";
export const metadata: Metadata = { title: "China Visa-Free Eligibility Checker", description, alternates: { canonical: path } };
export default function VisaPage() {
  return <main className="py-12"><Container><SoftwareApplicationJsonLd name="China Visa-Free Eligibility Checker" description={description} path={path} /><h1 className="text-4xl font-extrabold">China Visa-Free Eligibility Checker</h1><p className="my-6 max-w-3xl text-lg">Start with nationality and entry date. Check the conditions that apply to your visit, with official policy sources and review dates.</p><VisaChecker /></Container></main>;
}
