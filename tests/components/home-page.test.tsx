import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { Header } from "@/components/site/header";

describe("HomePage", () => {
  it("presents the approved brand, message and four working checks", () => {
    render(<><Header /><HomePage /></>);

    expect(screen.getByRole("link", { name: "ChinaTripCheck home" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Find the risks before they disrupt your China trip." })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Check my trip" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Check my trip" })[0]).toHaveAttribute("href", "/checks/readiness");
    expect(screen.getByRole("img", { name: /traveler preparing for a china trip/i })).toBeInTheDocument();

    expect(screen.getAllByTestId("check-card")).toHaveLength(4);
    expect(screen.getByText("China Readiness Check")).toBeInTheDocument();
    expect(screen.getByText("Payment Setup Check")).toBeInTheDocument();
    expect(screen.getByText("Travel Date Check")).toBeInTheDocument();
    expect(screen.getByText("Hotel Arrival Check")).toBeInTheDocument();
  });

  it("does not advertise excluded or unfinished features", () => {
    render(<HomePage />);

    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/train check/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/China Ready/i)).not.toBeInTheDocument();
  });
});
