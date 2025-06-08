import React from "react";

import { ApiContext } from "../../apis/api-context";
import type { ApiResponse, TrackWihLyrics } from "../../apis/artist-api";
import LoadingSpinner from "../../components/loading-spinner";
import ErrorMessage from "../../components/error-message";
import HighLight from "../../components/highlight";
import { getMatchLocations } from "../../utils/word-matcher";

interface ShowLyricsSectionProps {
  artistId: number;
  trackId: number;
  onChooseAnotherTrack: () => void;
}

const ShowLyricsSection: React.FC<ShowLyricsSectionProps> = ({
  artistId,
  trackId,
  onChooseAnotherTrack,
}) => {
  const { artistApi } = React.useContext(ApiContext);
  const [lyricResponse, setLyricResponse] =
    React.useState<ApiResponse<TrackWihLyrics>>();
  const [filter, setFilter] = React.useState("");
  const [filterCount, setFilterCount] = React.useState<number>(0);

  const handleFilterChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, lyrics: string) => {
      const value = event.target.value;
      const containsNoneAlphanumericaCharacters = /[^a-zA-Z0-9]/g.test(value);

      if (!containsNoneAlphanumericaCharacters) {
        const matches = getMatchLocations(lyrics, event.target.value);
        setFilter(event.target.value);
        setFilterCount(matches.length);
      }
    },
    []
  );

  React.useEffect(() => {
    artistApi.getLyrics(artistId, trackId).then((response) => {
      setLyricResponse(response);
    });
  }, [artistApi, artistId, trackId]);

  if (!lyricResponse) {
    return <LoadingSpinner label="Loading lyrics..." />;
  }

  if (lyricResponse.isError) {
    return (
      <ErrorMessage message="An error occurred getting the lyrics, please refresh the page and try again."></ErrorMessage>
    );
  }

  return (
    <section>
      <h2>Track: {lyricResponse.data.name}</h2>
      <div className="w-full">
        <label htmlFor={"wordHighlight"} className="font-semibold">
          Highlight word
        </label>
        <div className="w-full flex mb-3 items-center justify-start">
          <input
            id="wordHighlight"
            aria-describedby="wordHighlightCount"
            className="size-2/5 px-2 py-3 border rounded-md"
            onChange={(event) =>
              handleFilterChange(event, lyricResponse.data.lyrics)
            }
            value={filter}
            placeholder="Highlight single word"
          />
          <div
            id="wordHighlightCount"
            aria-live="polite"
            className="flex justify-center items-center rounded-full bg-violet-200 mx-2 p-3"
          >
            <span>{filterCount} found</span>
          </div>
        </div>
      </div>

      <HighLight
        searchWord={filter}
        textToHighlight={lyricResponse.data.lyrics}
      />
      <button
        type="button"
        onClick={onChooseAnotherTrack}
        className="primary-button mt-6"
      >
        Choose another track
      </button>
    </section>
  );
};

export default ShowLyricsSection;
