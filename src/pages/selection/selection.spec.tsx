import { render } from "@testing-library/react";

import Selection from "./selection";

describe("Selection", () => {
  it("should render with title", () => {
    const { getByText } = render(<Selection />);

    getByText("Selection");
  });
});
