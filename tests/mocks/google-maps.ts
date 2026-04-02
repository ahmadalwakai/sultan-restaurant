import { vi } from "vitest";

export const googleMapsMock = {
  geocode: vi.fn().mockResolvedValue({
    results: [
      {
        geometry: { location: { lat: 55.8530, lng: -4.2180 } },
        formatted_address: "577 Gallowgate, Glasgow G40 2PE, UK",
        place_id: "ChIJ_test_place_id",
      },
    ],
    status: "OK",
  }),
  directions: vi.fn().mockResolvedValue({
    routes: [
      {
        legs: [
          {
            distance: { text: "2.5 km", value: 2500 },
            duration: { text: "8 mins", value: 480 },
          },
        ],
      },
    ],
    status: "OK",
  }),
  distanceMatrix: vi.fn().mockResolvedValue({
    rows: [
      {
        elements: [
          {
            distance: { text: "2.5 km", value: 2500 },
            duration: { text: "8 mins", value: 480 },
            status: "OK",
          },
        ],
      },
    ],
    status: "OK",
  }),
  nearbySearch: vi.fn().mockResolvedValue({
    results: [],
    status: "ZERO_RESULTS",
  }),
};
