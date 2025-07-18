import React from "react";

import type { Artist } from "../../apis/artist-api";
import SelectField from "../../components/select-field";
import TrackSelectField from "./track-select-field";

interface SelectLyricsFormProps {
  artists: Artist[];
  onSubmit: (artistId: number, trackId: number) => void;
}

const SelectLyricsForm: React.FC<SelectLyricsFormProps> = ({
  artists,
  onSubmit,
}) => {
  const [fields, setFields] = React.useState<{
    artistId?: number;
    trackId?: number;
  }>({
    artistId: undefined,
    trackId: undefined,
  });

  const submitDisabled = !(fields.artistId && fields.trackId);

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
        <>
          <TrackSelectField
            artistId={fields.artistId}
            onChange={(value) =>
              setFields((oldFields) => ({
                ...oldFields,
                trackId: Number(value),
              }))
            }
          />
          <button
            type="button"
            disabled={submitDisabled}
            onClick={() => onSubmit(fields.artistId!, fields.trackId!)}
            className="primary-button mt-4"
          >
            Get lyrics
          </button>
        </>
      )}
    </form>
  );
};

export default SelectLyricsForm;
