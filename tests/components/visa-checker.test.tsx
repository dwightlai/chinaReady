import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { VisaChecker } from "@/features/planning-tools/visa-checker";

it("progressively reveals visit and transit conditions and resets port confirmation", () => {
  render(<VisaChecker />);
  expect(screen.queryByLabelText("Passport type")).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Passport nationality"), { target: { value: "France" } });
  fireEvent.change(screen.getByLabelText("Entry date (mainland China)"), { target: { value: "2026-10-01" } });
  expect(screen.getByLabelText("Passport type")).toBeInTheDocument();
  expect(screen.queryByLabelText("Entry port")).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Scheme to assess"), { target: { value: "transit" } });
  fireEvent.change(screen.getByLabelText("Is this entry port on the official 240-hour list?"), { target: { value: "yes" } });
  fireEvent.change(screen.getByLabelText("Entry port"), { target: { value: "Shanghai Pudong" } });
  expect(screen.getByLabelText("Is this entry port on the official 240-hour list?")).toHaveValue("");
  expect(screen.queryByRole("heading", { name: "Preliminarily eligible" })).not.toBeInTheDocument();
});
