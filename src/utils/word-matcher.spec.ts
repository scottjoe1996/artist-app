import { getMatchLocations } from "./word-matcher";

describe("getMatchLocations", () => {
  it.each([
    {
      description: "finds all full word matches (case-insensitive)",
      text: "word Word wOrd WORD",
      word: "word",
      expected: [
        { start: 0, end: 3 },
        { start: 5, end: 8 },
        { start: 10, end: 13 },
        { start: 15, end: 18 },
      ],
    },
    {
      description: "does not match partial words",
      text: "getter getting forget",
      word: "get",
      expected: [],
    },
    {
      description: "matches words with punctuation around them",
      text: '...word, (word)? "word"!',
      word: "word",
      expected: [
        { start: 3, end: 6 },
        { start: 10, end: 13 },
        { start: 18, end: 21 },
      ],
    },
    {
      description: "returns empty array for no matches",
      text: "nothing to see here",
      word: "word",
      expected: [],
    },
    {
      description: "handles repeated words correctly",
      text: "word word word word",
      word: "word",
      expected: [
        { start: 0, end: 3 },
        { start: 5, end: 8 },
        { start: 10, end: 13 },
        { start: 15, end: 18 },
      ],
    },
  ])("$description", ({ text, word, expected }) => {
    const result = getMatchLocations(text, word);
    expect(result).toEqual(expected);
  });

  it.each([
    ["."],
    ["*"],
    ["+"],
    ["?"],
    ["^"],
    ["$"],
    ["{"],
    ["}"],
    ["("],
    [")"],
    ["|"],
    ["["],
  ])("should throw error if word has special character", (specialCharacter) => {
    expect(() =>
      getMatchLocations(
        "Special characters are not working!",
        `word${specialCharacter}`
      )
    ).toThrow(
      `Cannot match word [word${specialCharacter}] as it conaints special characters`
    );
  });
});
