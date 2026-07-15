import type { TrainJourney } from "train-times";

import type { MarkdownTableDataRow } from "./table";

const trainTableColumns = [
  "Schedule",
  "Departure Status",
  "Platform",
  "Destination Arrival",
  "Journey Duration",
  "Operator",
] as const;

type TrainTableColumn = (typeof trainTableColumns)[number];

type TrainsTableDataRow = MarkdownTableDataRow<TrainTableColumn>;

function convertToTableData(journeys: TrainJourney[]): TrainsTableDataRow[] {
  return journeys.map((j) => {
    if (j.status === "cancelled") {
      return {
        Schedule: j.scheduleOriginDepartureTime,
        "Departure Status": "Cancelled",
        Operator: j.operator,
      };
    }

    if (j.status === "delayed") {
      return {
        Schedule: j.scheduleOriginDepartureTime,
        "Departure Status": "Delayed",
        Operator: j.operator,
      };
    }

    const journeyDuration = j.journeyDurationMinutes
      ? `${j.journeyDurationMinutes} minutes`
      : "";

    if (j.status === "on-time") {
      return {
        Schedule: j.scheduleOriginDepartureTime,
        "Departure Status": j.originDepartureTime,
        Platform: j.platform ?? "TBD",
        "Destination Arrival": j.destinationArrivalTime,
        "Journey Duration": journeyDuration,
        Operator: j.operator,
      };
    }

    const departureStatus = j.originDepartureTime
      ? j.departureLateByMinutes
        ? `${j.originDepartureTime} (late by ${j.departureLateByMinutes} minutes)`
        : `${j.originDepartureTime} (late)`
      : "?";

    return {
      Schedule: j.scheduleOriginDepartureTime,
      "Departure Status": departureStatus,
      Platform: j.platform ?? "TBD",
      "Destination Arrival": j.destinationArrivalTime,
      "Journey Duration": journeyDuration,
      Operator: j.operator,
    };
  });
}

export { convertToTableData, trainTableColumns };
