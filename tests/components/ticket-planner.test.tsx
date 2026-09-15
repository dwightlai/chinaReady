import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { TicketPlanner } from "@/features/planning-tools/ticket-planner";

afterEach(() => vi.useRealTimers());
it("shows results without submission and clears a stale station time", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-15T08:00:00Z"));
  render(<TicketPlanner />);
  fireEvent.change(screen.getByLabelText("Train departure date"), { target: { value: "2026-10-01" } });
  expect(screen.getByText("2026-09-17")).toBeInTheDocument();
  const download = screen.getByRole("button", { name: "Download calendar reminder" });
  expect(download).toBeDisabled();
  fireEvent.change(screen.getByLabelText("Departure station"), { target: { value: "Shanghai Hongqiao" } });
  fireEvent.change(screen.getByLabelText("Confirmed sale time (Beijing, UTC+8)"), { target: { value: "08:00" } });
  expect(download).toBeEnabled();
  fireEvent.change(screen.getByLabelText("Departure station"), { target: { value: "Beijing South" } });
  expect(download).toBeDisabled();
  fireEvent.change(screen.getByLabelText("Current booking status"), { target: { value: "reserved" } });
  expect(screen.getByText(/does not guarantee a seat/)).toBeInTheDocument();
});
