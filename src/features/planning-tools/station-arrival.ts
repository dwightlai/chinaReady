export interface StationArrivalInput {
  station: string;
  departureTime: string;
  travelMinutes: number;
  firstHighSpeedRailTrip: boolean;
  foreignPassport: boolean;
  largeLuggage: boolean;
  criticalConnection: boolean;
  peakPeriod: boolean;
}

export interface StationArrivalResult {
  bufferMinutes: number;
  level: "Standard" | "Extra" | "High";
  arrivalWindow: string;
  leaveTime: string;
  warnings: string[];
}

function parseTime(value: string) {
  const [hours = Number.NaN, minutes = Number.NaN] = value.split(":").map(Number);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Enter a valid departure time.");
  }
  return hours * 60 + minutes;
}

export function formatClock(totalMinutes: number) {
  const dayOffset = Math.floor(totalMinutes / 1440);
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const clock = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  if (dayOffset < 0) return `${clock} the previous day`;
  if (dayOffset > 0) return `${clock} the next day`;
  return clock;
}

export function calculateStationArrival(input: StationArrivalInput): StationArrivalResult {
  if (!Number.isFinite(input.travelMinutes) || input.travelMinutes < 0 || input.travelMinutes > 300) {
    throw new Error("Travel time must be between 0 and 300 minutes.");
  }

  let bufferMinutes = 25;
  if (input.firstHighSpeedRailTrip) bufferMinutes += 5;
  if (input.foreignPassport) bufferMinutes += 5;
  if (input.largeLuggage) bufferMinutes += 5;
  if (input.criticalConnection) bufferMinutes += 10;
  if (input.peakPeriod) bufferMinutes += 15;
  bufferMinutes = Math.min(bufferMinutes, 75);

  const departure = parseTime(input.departureTime);
  const latestArrival = departure - bufferMinutes;
  const leaveTime = latestArrival - input.travelMinutes - 10;
  const warnings: string[] = [];
  if (input.foreignPassport) warnings.push("Allow for a staffed passport or manual gate instead of relying on an ID-card lane.");
  if (input.firstHighSpeedRailTrip) warnings.push("Large stations can add time for the correct entrance, security and waiting area.");
  if (input.largeLuggage) warnings.push("Large luggage can slow security, station walking and boarding.");
  if (input.criticalConnection) warnings.push("A fixed flight, hotel or last connection makes a missed train harder to recover from.");
  if (input.peakPeriod) warnings.push("Weekend, holiday or rush-hour crowds can lengthen every station queue.");

  return {
    bufferMinutes,
    level: bufferMinutes >= 60 ? "High" : bufferMinutes >= 40 ? "Extra" : "Standard",
    arrivalWindow: `${formatClock(latestArrival - 10)}–${formatClock(latestArrival)}`,
    leaveTime: formatClock(leaveTime),
    warnings,
  };
}
