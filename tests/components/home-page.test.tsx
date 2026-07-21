import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { Header } from "@/components/site/header";

describe("HomePage", () => {
  it("presents the approved brand, message and six working checks", () => {
    render(<><Header /><HomePage /></>);

    expect(screen.getByRole("link", { name: "ChinaTripCheck home" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Find the risks before they disrupt your China trip." })).toBeInTheDocument();
    expect(screen.getByText("Apps, payments and train booking")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Check my trip" }).length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByRole("link", { name: "Check my trip" })[0]).toHaveAttribute("href", "/checks/readiness");
    expect(screen.getByRole("img", { name: /traveler preparing for a china trip/i })).toBeInTheDocument();

    expect(screen.getAllByTestId("check-card")).toHaveLength(6);
    expect(screen.getByText("China Readiness Check")).toBeInTheDocument();
    expect(screen.getByText("China App Readiness Checker")).toBeInTheDocument();
    expect(screen.getByText("Payment Readiness Test")).toBeInTheDocument();
    expect(screen.getByText("Train Booking Readiness Checker")).toBeInTheDocument();
    expect(screen.getByText("Travel Date Check")).toBeInTheDocument();
    expect(screen.getByText("Hotel Arrival Check")).toBeInTheDocument();
  });

  it("does not advertise excluded or unfinished features", () => {
    render(<HomePage />);

    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/train baggage/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/visa checker/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/China Ready/i)).not.toBeInTheDocument();
  });
});
