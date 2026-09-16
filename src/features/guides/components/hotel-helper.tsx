"use client";

import { useState } from "react";

export function HotelHelper({ mode }: { mode: "arrival" | "address" }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const arrival = mode === "arrival";
  const fields = arrival
    ? [["name", "Booking name", "text"], ["night", "Booked check-in date (hotel night)", "date"], ["arrival", "Actual arrival date and time (China local time, UTC+8)", "datetime-local"]]
    : [["hotel", "Official Chinese hotel name", "text"], ["address", "Full Chinese address, including city and district", "text"], ["phone", "Hotel phone number (optional)", "tel"]];
  const value = (key: string, fallback: string) => values[key]?.trim() || fallback;
  const text = arrival
    ? `Hello, my booking is under ${value("name", "[booking name]")}, with check-in booked for ${value("night", "[booked date]")}. I expect to arrive at ${value("arrival", "[actual arrival date and time]").replace("T", " ")} China local time (UTC+8). Please confirm in writing that you will hold the room and can check me in at that time. Please send the night contact number and any late-arrival instructions.\n\n您好，我的预订姓名是 ${value("name", "[预订姓名]")}，预订入住日期是 ${value("night", "[预订日期]")}。预计实际到店时间为 ${value("arrival", "[实际到店日期和时间]").replace("T", " ")}（北京时间，UTC+8）。请书面确认届时会保留房间并安排办理入住，并告知夜间联系电话及晚到入住须知。`
    : `请送我到这家酒店：\n酒店名称：${value("hotel", "[酒店官方中文名称]")}\n地址：${value("address", "[完整中文地址]")}\n酒店电话：${value("phone", "[未提供]")}\n\nPlease take me to the hotel at the address above. If the location is unclear, please contact the hotel.`;
  const ready = arrival ? Boolean(values.name?.trim() && values.night && values.arrival) : Boolean(values.hotel?.trim() && values.address?.trim());
  async function copy() {
    try { await navigator.clipboard.writeText(text); setNotice("Copied. Save it in an offline note or send it to the hotel yourself."); }
    catch { setNotice("Copy was blocked. Select the preview text and copy it manually."); }
  }
  return <section className="my-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6" aria-label={arrival ? "Late-arrival message builder" : "Chinese hotel address card"}>
    <h2 className="text-2xl font-bold">{arrival ? "Copy a late-arrival request in English and Chinese" : "Make a Chinese hotel address card"}</h2>
    <p className="mt-3 leading-7">{arrival ? "After-midnight arrival can be on a different date from the hotel night you booked. Enter both dates; this tool does not decide which night to book. A generated request is not hotel confirmation." : "Paste the official Chinese details supplied by your hotel. This tool formats them; it does not translate or verify the address. Save the result before going offline."}</p>
    <div className="mt-4 grid gap-4">{fields.map(([key, label, type]) => <label key={key} className="font-bold">{label}<input className="mt-2 block w-full rounded-xl border border-[var(--line)] bg-white p-3 font-normal" type={type} maxLength={300} value={values[key!] ?? ""} onChange={event => { setValues(current => ({ ...current, [key!]: event.target.value })); setNotice(""); }} /></label>)}</div>
    <label className="mt-5 block font-bold">{arrival ? "Message preview" : "Address card preview"}<textarea readOnly className="mt-2 min-h-64 w-full rounded-xl border border-[var(--line)] bg-white p-4 font-normal" value={text} /></label>
    <button type="button" disabled={!ready} onClick={copy} className="mt-4 rounded-full bg-[var(--primary)] px-5 py-3 font-bold text-white disabled:opacity-50">{arrival ? "Copy bilingual request" : "Copy address card"}</button>
    <p role="status" className="mt-3 text-sm">{notice}</p>
    <p className="mt-3 text-sm text-[var(--muted)]">Details are not saved or sent by this tool. Copying is explicit; nothing is sent to the hotel automatically. Reloading clears the fields. Do not enter passport or payment details.</p>
  </section>;
}
