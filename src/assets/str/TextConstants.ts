import { ValidationConstants } from "../validation/ValidationConstants";

export const TextConstants = {
    CONTENT: {
        HOME_PAGE: {
            BUTTON_1_TEXT: "Sign Up",
            BUTTON_2_TEXT: "Log In",
            DESCRIPTION:
                "This is a chat application that allows for users to chat with each other. Have a good time! You can make however many accounts you want, and even sign up with the same emails (although the new account will replace the old one). The more messages you send, the higher your reputation grows, and messages can be up-voted and down-voted as well, which affects your reputation also.",
            TITLE: "Welcome to Buckles Chat!",
        },
        SIGN_UP: {
            FORM_1_LABEL: "First Name",
            FORM_1_PLACEHOLDER: "Enter your first name",
            FORM_2_LABEL: "Last Name",
            FORM_2_PLACEHOLDER: "Enter your last name",
            TITLE: "Sign Up",
        },
    },
    VALIDATION: {
        INVALID: {
            SIGN_UP: {
                FORM_1: {
                    MAX_LENGTH: `First Name cannot be more then ${ValidationConstants.SIGN_UP.FORM.FIRST_NAME.MAX_LENGTH} characters`,
                    PATTERN:
                        "First Name cannot contain digits, underscores, or any space characters",
                    REQUIRED: "First Name is required",
                },
                FORM_2: {
                    MAX_LENGTH: `Last Name cannot be more then ${ValidationConstants.SIGN_UP.FORM.LAST_NAME.MAX_LENGTH} characters`,
                    PATTERN:
                        "Last Name cannot contain digits, underscores, or any space characters",
                    REQUIRED: "Last Name is required",
                },
            },
        },
        VALID: {
            SIGN_UP: {
                FORM_1: "First Name is valid!",
                FORM_2: "Last Name is valid!",
            },
        },
    },
};
