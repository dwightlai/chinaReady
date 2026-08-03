import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { Header } from "@/components/site/header";

describe("HomePage", () => {
  it("presents the approved brand, message and seven working checks", () => {
    render(<><Header /><HomePage /></>);

    expect(screen.getByRole("link", { name: "ChinaTripCheck home" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "China Travel Readiness Checker" })).toBeInTheDocument();
    expect(screen.getByText("Check if you're ready to travel to China before payment, apps, bookings or identity checks interrupt your trip.")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Start Free Readiness Check" }).length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByRole("link", { name: "Start Free Readiness Check" })[0]).toHaveAttribute("href", "/checks/readiness");
    expect(screen.getByRole("img", { name: /traveler checking china travel readiness/i })).toBeInTheDocument();

    expect(screen.getAllByTestId("check-card")).toHaveLength(7);
    expect(screen.getByText("China Readiness Check")).toBeInTheDocument();
    expect(screen.getByText("China App Readiness Checker")).toBeInTheDocument();
    expect(screen.getByText("Payment & Phone Resilience Check")).toBeInTheDocument();
    expect(screen.getByText("Passport Carry & Identity Checker")).toBeInTheDocument();
    expect(screen.getByText("Train Booking Readiness Checker")).toBeInTheDocument();
    expect(screen.getByText("Travel Date Check")).toBeInTheDocument();
    expect(screen.getByText("Hotel Arrival Check")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Am I ready for China?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tools first. Supporting answers second." })).toBeInTheDocument();
    expect(screen.getByText("Can foreigners use Alipay in China?")).toBeInTheDocument();
  });

  it("does not advertise excluded or unfinished features", () => {
    render(<HomePage />);

    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/train baggage/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/visa checker/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/China Ready/i)).not.toBeInTheDocument();
  });
});
