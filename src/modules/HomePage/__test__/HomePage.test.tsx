import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import { HomePage } from "../HomePage";
import { TextConstants } from "@/assets/str/TextConstants";
import "@testing-library/jest-dom";

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
  it("click signup button", () => {
    render(<HomePage />);
    const signUpButton = screen.getAllByRole("button")[0];
    expect(signUpButton).not.toBeNull();
    // TODO: Figure out how to test for button onclick
  });
});
