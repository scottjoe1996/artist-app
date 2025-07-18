import React from "react";

import { ApiContext } from "../../apis/api-context";
import LoadingSpinner from "../../components/loading-spinner";
import type { ApiResponse, Artist } from "../../apis/artist-api";
import ErrorMessage from "../../components/error-message";
import SelectLyricsForm from "./select-lyrics-form";

interface SelectLyricsSectionProps {
  onSubmitLyricSelection: (artistId: number, trackId: number) => void;
}

const SelectLyricsSection: React.FC<SelectLyricsSectionProps> = ({
  onSubmitLyricSelection,
}) => {
  const { artistApi } = React.useContext(ApiContext);
  const [artistsResponse, setArtistsResponse] =
    React.useState<ApiResponse<Artist[]>>();

  React.useEffect(() => {
    artistApi.getAllArtists().then((response) => {
      setArtistsResponse(response);
    });
  }, [artistApi]);

  if (!artistsResponse) {
    return <LoadingSpinner label="Loading artists..." />;
  }

  if (artistsResponse.isError) {
    return (
      <ErrorMessage message="An error occurred getting the artists information, please refresh the page and try again."></ErrorMessage>
    );
  }

  if (artistsResponse.data.length === 0) {
    return <p>No artists available</p>;
  }

  return (
    <section>
      <h2>Get track lyrics</h2>
      <p className="mb-5">
        Choose an artist and one of their tracks to see the track's lyrics
      </p>
      <SelectLyricsForm
        artists={artistsResponse.data}
        onSubmit={onSubmitLyricSelection}
      />
    </section>
  );
};

export default SelectLyricsSection;
