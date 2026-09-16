import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { HotelHelper } from "@/features/guides/components/hotel-helper";

afterEach(() => vi.unstubAllGlobals());
it("keeps the booking night distinct from after-midnight arrival and copies only on request", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", { clipboard: { writeText } });
  render(<HotelHelper mode="arrival" />);
  expect(screen.getByRole("button", { name: "Copy bilingual request" })).toBeDisabled();
  fireEvent.change(screen.getByLabelText("Booking name"), { target: { value: "Jane Doe" } });
  fireEvent.change(screen.getByLabelText("Booked check-in date (hotel night)"), { target: { value: "2026-10-01" } });
  fireEvent.change(screen.getByLabelText("Actual arrival date and time (China local time, UTC+8)"), { target: { value: "2026-10-02T01:00" } });
  expect(writeText).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Copy bilingual request" }));
  await waitFor(() => expect(writeText).toHaveBeenCalledOnce());
  expect(writeText.mock.calls[0]?.[0]).toContain("2026-10-01");
  expect(writeText.mock.calls[0]?.[0]).toContain("2026-10-02 01:00");
  expect(writeText.mock.calls[0]?.[0]).toContain("请书面确认");
});

it("shows a manual fallback if copying is blocked", async () => {
  vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("blocked")) } });
  render(<HotelHelper mode="address" />);
  fireEvent.change(screen.getByLabelText("Official Chinese hotel name"), { target: { value: "测试酒店" } });
  fireEvent.change(screen.getByLabelText("Full Chinese address, including city and district"), { target: { value: "上海市测试地址" } });
  fireEvent.click(screen.getByRole("button", { name: "Copy address card" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("copy it manually"));
  expect((screen.getByLabelText("Address card preview") as HTMLTextAreaElement).value).toContain("测试酒店");
});

it("does not interpret hotel input as HTML and clears it on a fresh mount", () => {
  const { unmount } = render(<HotelHelper mode="address" />);
  fireEvent.change(screen.getByLabelText("Official Chinese hotel name"), { target: { value: "<script>bad</script>" } });
  expect(document.querySelector("script")).toBeNull();
  unmount();
  render(<HotelHelper mode="address" />);
  expect(screen.getByLabelText("Official Chinese hotel name")).toHaveValue("");
});
