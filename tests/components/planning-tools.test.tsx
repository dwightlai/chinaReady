import { render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ChecksPage from "@/app/checks/page";
import HomePage from "@/app/page";
import { planningTools } from "@/components/site/planning-tools";

describe("planning tool discovery", () => {
  it("exposes new tools in initial homepage HTML without client-side effects", () => {
    const html = renderToStaticMarkup(<HomePage />);
    expect(html).toContain('href="/china-visa-free-checker"');
    expect(html).toContain('href="/china-train-ticket-sale-planner"');
  });
  it("lists every planning tool before the full checks", () => {
    render(<ChecksPage />);
    const section = screen.getByRole("region", { name: "One question? Start with a planning tool." });
    for (const tool of planningTools) expect(within(section).getByRole("link", { name: tool.label })).toHaveAttribute("href", tool.href);
    const firstCheck = screen.getAllByTestId("check-card")[0];
    if (!firstCheck) throw new Error("Expected a readiness check card");
    expect(section.compareDocumentPosition(firstCheck) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
