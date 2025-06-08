import React from "react";

import type { Artist } from "../../apis/artist-api";
import SelectField from "../../components/select-field";
import TrackSelectField from "./track-select-field";

interface SelectLyricsFormProps {
  artists: Artist[];
}

const SelectLyricsForm: React.FC<SelectLyricsFormProps> = ({ artists }) => {
  const [fields, setFields] = React.useState<{
    artistId?: number;
    trackId?: number;
  }>({
    artistId: undefined,
    trackId: undefined,
  });

  return (
    <form>
      <SelectField
        id="artist"
        label="Artist"
        placeholder="Choose an artist"
        options={artists.map((artist) => ({
          id: artist.id,
          label: artist.name,
          value: artist.id,
        }))}
        onChange={(value) => setFields({ artistId: Number(value) })}
        className="mb-2"
      />
      {fields.artistId && (
        <TrackSelectField
          artistId={fields.artistId}
          onChange={(value) =>
            setFields((oldFields) => ({ ...oldFields, trackId: Number(value) }))
          }
        />
      )}
    </form>
  );
};

export default SelectLyricsForm;
