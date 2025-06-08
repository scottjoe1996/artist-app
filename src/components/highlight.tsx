import React from "react";
import Highlighter from "react-highlight-words";
import { getMatchLocations } from "../utils/word-matcher";

interface HighLightProps {
  textToHighlight: string;
  searchWord: string;
}

const HighLight: React.FC<HighLightProps> = ({
  textToHighlight,
  searchWord,
}) => {
  return (
    <Highlighter
      searchWords={[searchWord]}
      autoEscape={true}
      textToHighlight={textToHighlight}
      findChunks={({ textToHighlight }) => {
        return getMatchLocations(textToHighlight, searchWord);
      }}
    />
  );
};

export default HighLight;
