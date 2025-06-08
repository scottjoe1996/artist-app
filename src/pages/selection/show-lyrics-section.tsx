import React from "react";

import { ApiContext } from "../../apis/api-context";
import type { ApiResponse, TrackWihLyrics } from "../../apis/artist-api";
import LoadingSpinner from "../../components/loading-spinner";
import ErrorMessage from "../../components/error-message";

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
      <p>{lyricResponse.data.lyrics}</p>
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
