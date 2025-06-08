import React from "react";

import { ApiContext } from "../../apis/api-context";
import type { ApiResponse, Track } from "../../apis/artist-api";
import ErrorMessage from "../../components/error-message";
import SelectField from "../../components/select-field";

interface TrackSelectFieldProps {
  artistId: number;
  onChange: (value: string) => void;
}

const TrackSelectField: React.FC<TrackSelectFieldProps> = ({
  artistId,
  onChange,
}) => {
  const { artistApi } = React.useContext(ApiContext);
  const [tracksResponse, setTracksResponse] =
    React.useState<ApiResponse<Track[]>>();

  React.useEffect(() => {
    setTracksResponse(undefined);
    artistApi.getTracks(artistId).then((response) => {
      setTracksResponse(response);
    });
  }, [artistApi, artistId]);

  if (!tracksResponse) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label="Loading tracks to select from."
        className="w-full animate-pulse mt-3"
      >
        <div className="h-4 bg-gray-300 rounded-md w-12 mb-2"></div>
        <div className="h-10 bg-gray-300 rounded-md max-w-full"></div>
      </div>
    );
  }

  if (tracksResponse.isError) {
    return (
      <ErrorMessage message="An error occurred getting the artist's track information, please refresh the page and try again."></ErrorMessage>
    );
  }

  if (tracksResponse.data.length === 0) {
    return <p>No tracks available</p>;
  }

  return (
    <SelectField
      id="track"
      label="Track"
      placeholder="Choose a track"
      options={tracksResponse.data.map((track) => ({
        id: track.id,
        label: track.name,
        value: track.id,
      }))}
      onChange={onChange}
    />
  );
};

export default TrackSelectField;
