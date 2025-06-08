import { mock, type MockProxy } from "vitest-mock-extended";
import { fireEvent, waitFor } from "@testing-library/react";
import { vi, type Mock } from "vitest";

import { ArtistApi, type TrackWihLyrics } from "../../apis/artist-api";
import { render } from "../../utils/render-wrapper";

import ShowLyricsSection from "./show-lyrics-section";

const ARTIST_ID = 1;
const MOCK_TRACK_WITH_LYRICS: TrackWihLyrics = {
  id: 6,
  name: "Happy birthday",
  lyrics:
    "Happy Birthday to You Happy Birthday to You Happy Birthday Dear (name) Happy Birthday to You. From good friends and true, From old friends and new, May good luck go with you, And happiness too.",
};
describe("ShowLyricsSection", () => {
  let artistApi: MockProxy<ArtistApi>;
  let onChooseAnotherTrack: Mock;

  beforeEach(() => {
    artistApi = mock<ArtistApi>();
    artistApi.getLyrics.mockResolvedValue({
      isError: false,
      data: MOCK_TRACK_WITH_LYRICS,
    });
    onChooseAnotherTrack = vi.fn();
  });

  it("should display track name and lyrics and choose another track when button is clicked", async () => {
    const { getByText } = render(
      <ShowLyricsSection
        artistId={ARTIST_ID}
        trackId={MOCK_TRACK_WITH_LYRICS.id}
        onChooseAnotherTrack={onChooseAnotherTrack}
      />,
      artistApi
    );

    expect(artistApi.getLyrics).toHaveBeenCalledWith(
      ARTIST_ID,
      MOCK_TRACK_WITH_LYRICS.id
    );
    await waitFor(() => {
      getByText(`Track: ${MOCK_TRACK_WITH_LYRICS.name}`);
      getByText(MOCK_TRACK_WITH_LYRICS.lyrics);
    });

    fireEvent.click(getByText("Choose another track"));
    expect(onChooseAnotherTrack).toHaveBeenCalled();
  });

  it("should display error message on error retrieving lyrics", async () => {
    artistApi.getLyrics.mockResolvedValue({
      isError: true,
    });
    const { getByText } = render(
      <ShowLyricsSection
        artistId={ARTIST_ID}
        trackId={MOCK_TRACK_WITH_LYRICS.id}
        onChooseAnotherTrack={onChooseAnotherTrack}
      />,
      artistApi
    );

    expect(artistApi.getLyrics).toHaveBeenCalledWith(
      ARTIST_ID,
      MOCK_TRACK_WITH_LYRICS.id
    );
    await waitFor(() =>
      getByText(
        "An error occurred getting the lyrics, please refresh the page and try again."
      )
    );
  });
});
