import { mock, type MockProxy } from "vitest-mock-extended";
import { waitFor } from "@testing-library/react";

import { ArtistApi } from "../../apis/artist-api";
import { render } from "../../utils/render-wrapper";

import Selection from "./selection";

const MOCK_ARTISTS = [
  { id: 1, name: "Sabrina Carpenter" },
  { id: 2, name: "Bob Dylan" },
  { id: 3, name: "Cassie" },
  { id: 4, name: "Charlie XCX" },
  { id: 5, name: "Bon Jovi" },
];

describe("Selection", () => {
  let artistApi: MockProxy<ArtistApi>;

  beforeEach(() => {
    artistApi = mock<ArtistApi>();
    artistApi.getAllArtists.mockResolvedValue({
      isError: false,
      data: MOCK_ARTISTS,
    });
  });

  it("should render with title and TODO component", async () => {
    const { getByText } = render(<Selection />, artistApi);

    getByText("Selection");
    expect(artistApi.getAllArtists).toHaveBeenCalled();
    await waitFor(() => getByText("TODO"));
  });

  it("should display error message on error retrieving artists", async () => {
    artistApi.getAllArtists.mockResolvedValue({
      isError: true,
    });
    const { getByText } = render(<Selection />, artistApi);

    expect(artistApi.getAllArtists).toHaveBeenCalled();
    await waitFor(() =>
      getByText(
        "An error occurred getting the artists information, please refresh the page and try again."
      )
    );
  });
});
