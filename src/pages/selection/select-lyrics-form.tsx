import React from "react";

import type { Artist } from "../../apis/artist-api";
import SelectField from "../../components/select-field";

interface SelectLyricsFormProps {
  artists: Artist[];
}

const SelectLyricsForm: React.FC<SelectLyricsFormProps> = ({ artists }) => {
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
        onChange={(value) => console.log(value)}
      />
    </form>
  );
};

export default SelectLyricsForm;
