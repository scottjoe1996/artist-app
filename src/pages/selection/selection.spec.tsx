import { mock, type MockProxy } from "vitest-mock-extended";
import { waitFor, fireEvent } from "@testing-library/react";

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

const MOCK_TRACKS = [
  { id: 6, name: "Mr Blue Sky" },
  { id: 7, name: "Don't Stop Me Now" },
  { id: 8, name: "Wonderwall" },
  { id: 9, name: "All Star" },
  { id: 10, name: "Take On Me" },
];

describe("Selection", () => {
  let artistApi: MockProxy<ArtistApi>;

  beforeEach(() => {
    artistApi = mock<ArtistApi>();
    artistApi.getAllArtists.mockResolvedValue({
      isError: false,
      data: MOCK_ARTISTS,
    });
    artistApi.getTracks.mockResolvedValue({
      isError: false,
      data: MOCK_TRACKS,
    });
  });

  it("should be able to select artist and track", async () => {
    const { getByText, getByLabelText } = render(<Selection />, artistApi);

    getByText("Selection");
    expect(artistApi.getAllArtists).toHaveBeenCalled();
    await waitFor(() => getByText("Choose an artist"));

    fireEvent.change(getByLabelText("Artist"), {
      target: { value: MOCK_ARTISTS[1].id },
    });
    getByText(MOCK_ARTISTS[1].name);
    expect(artistApi.getTracks).toHaveBeenCalledWith(MOCK_ARTISTS[1].id);

    await waitFor(() => getByText("Choose a track"));
    fireEvent.change(getByLabelText("Track"), {
      target: { value: MOCK_TRACKS[1].id },
    });
    getByText(MOCK_TRACKS[1].name);
  });

  it("should display no artists message if none exist", async () => {
    artistApi.getAllArtists.mockResolvedValue({
      isError: false,
      data: [],
    });
    const { getByText } = render(<Selection />, artistApi);

    expect(artistApi.getAllArtists).toHaveBeenCalled();
    await waitFor(() => getByText("No artists available"));
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

  it("should display error message on error retrieving tracks", async () => {
    artistApi.getTracks.mockResolvedValue({
      isError: true,
    });
    const { getByText, getByLabelText } = render(<Selection />, artistApi);

    getByText("Selection");
    expect(artistApi.getAllArtists).toHaveBeenCalled();
    await waitFor(() => getByText("Choose an artist"));

    fireEvent.change(getByLabelText("Artist"), {
      target: { value: MOCK_ARTISTS[1].id },
    });
    getByText(MOCK_ARTISTS[1].name);
    expect(artistApi.getTracks).toHaveBeenCalledWith(MOCK_ARTISTS[1].id);

    await waitFor(() =>
      getByText(
        "An error occurred getting the artist's track information, please refresh the page and try again."
      )
    );
  });

  it("should display no tracks message if none exist", async () => {
    artistApi.getTracks.mockResolvedValue({
      isError: false,
      data: [],
    });
    const { getByText, getByLabelText } = render(<Selection />, artistApi);

    getByText("Selection");
    expect(artistApi.getAllArtists).toHaveBeenCalled();
    await waitFor(() => getByText("Choose an artist"));

    fireEvent.change(getByLabelText("Artist"), {
      target: { value: MOCK_ARTISTS[1].id },
    });
    getByText(MOCK_ARTISTS[1].name);
    expect(artistApi.getTracks).toHaveBeenCalledWith(MOCK_ARTISTS[1].id);

    await waitFor(() => getByText("No tracks available"));
  });
});
