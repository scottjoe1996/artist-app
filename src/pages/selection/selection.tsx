import React from "react";

import Title from "../../components/title";
import { ApiContext } from "../../apis/api-context";
import LoadingSpinner from "../../components/loading-spinner";
import type { ApiResponse, Artist } from "../../apis/artist-api";
import ErrorMessage from "../../components/error-message";

const PageContent: React.FC = () => {
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

  return <span>TODO</span>;
};

const Selection: React.FC = () => {
  return (
    <>
      <Title>Selection</Title>
      <PageContent />
    </>
  );
};

export default Selection;
