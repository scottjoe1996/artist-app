import React from "react";

import Title from "../../components/title";
import SelectLyricsSection from "./select-lyrics-section";

const Selection: React.FC = () => {
  return (
    <>
      <Title>Track Selection</Title>
      <SelectLyricsSection
        onSubmitLyricSelection={(artistId, trackId) =>
          console.log({ artistId, trackId })
        }
      />
    </>
  );
};

export default Selection;
