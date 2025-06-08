import React from "react";

import Title from "../../components/title";

import SelectLyricsSection from "./select-lyrics-section";
import ShowLyricsSection from "./show-lyrics-section";

type Section =
  | { type: "CHOOSE_LYRICS" }
  | { type: "SHOW_LYRICS"; artistId: number; trackId: number };

const Selection: React.FC = () => {
  const [section, setSection] = React.useState<Section>({
    type: "CHOOSE_LYRICS",
  });

  const handleTrackSubmit = React.useCallback(
    (artistId: number, trackId: number) => {
      setSection({ type: "SHOW_LYRICS", artistId, trackId });
    },
    []
  );

  return (
    <>
      <Title>Track Selection</Title>
      {section.type === "CHOOSE_LYRICS" ? (
        <SelectLyricsSection onSubmitLyricSelection={handleTrackSubmit} />
      ) : (
        <ShowLyricsSection
          artistId={section.artistId}
          trackId={section.trackId}
        />
      )}
    </>
  );
};

export default Selection;
