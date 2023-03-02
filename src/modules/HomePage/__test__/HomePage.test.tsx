import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { TextConstants } from "@/assets/str/TextConstants";

import { HomePage } from "../HomePage";

jest.mock("next/router", () => require("next-router-mock"));

describe("test1", () => {
    test("render", () => {
        expect.assertions(2);

        render(<HomePage />);
        const homePageDescription = document.querySelector(
            "#homepage_header_description",
        );

        expect(homePageDescription).not.toBeNull();
        expect(homePageDescription?.innerHTML).toStrictEqual(
            TextConstants.CONTENT.HOME_PAGE.DESCRIPTION,
        );
    });

    test("click signup button", () => {
        expect.assertions(1);

        render(<HomePage />);
        const signUpButton = screen.getAllByRole("button")[0];

        expect(signUpButton).not.toBeNull();

        fireEvent.click(signUpButton);
    });
});
