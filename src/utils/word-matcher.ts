interface MatchLocation {
  start: number;
  end: number;
}

export const getMatchLocations = (
  textToHighlight: string,
  wordToMatch: string
): MatchLocation[] => {
  const matchLocations: MatchLocation[] = [];

  if (wordToMatch === "") {
    return matchLocations;
  }

  const boundary = "\\b"; // Word boundary regex (i.e. "word " or "word.")
  const specialCharsRegex = /[.*+?^${}()|[\]\\]/;
  const hasSpecialCharacters = specialCharsRegex.test(wordToMatch);

  if (hasSpecialCharacters) {
    throw new Error(
      `Cannot match word [${wordToMatch}] as it conaints special characters`
    );
  }

  const regex = new RegExp(`${boundary}${wordToMatch}${boundary}`, "gi");
  const matches = textToHighlight.matchAll(regex);

  Array.from(matches).forEach((match) =>
    matchLocations.push({
      start: match.index,
      end: match.index + match[0].length,
    })
  );

  return matchLocations;
};
