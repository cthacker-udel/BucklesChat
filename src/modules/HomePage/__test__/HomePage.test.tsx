import React from "react";
import { render } from "@testing-library/react";

import { HomePage } from "../HomePage";
import { TextConstants } from "@/assets/str/TextConstants";

jest.mock("next/router", () => require("next-router-mock"));

describe("test1", () => {
  it("render", () => {
    render(<HomePage />);
    const homePageDescription = document.getElementById(
      "homepage_header_description"
    );
    expect(homePageDescription).not.toBeNull();
    expect(homePageDescription?.innerHTML).toEqual(
      TextConstants.HOME_PAGE.DESCRIPTION
    );
  });
});
