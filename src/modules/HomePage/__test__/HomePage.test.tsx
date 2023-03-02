import React from "react";
import { render } from "@testing-library/react";

import { HomePage } from "../HomePage";

jest.mock("next/router", () => require("next-router-mock"));

describe("test1", () => {
  it("render", () => {
    render(<HomePage />);
  });
});
